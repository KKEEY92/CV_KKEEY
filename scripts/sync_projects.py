#!/usr/bin/env python3
"""
KKEEY Portfolio Project Auto-Sync Script
Fetches latest release tags, metadata, and status for repositories from GitHub & GitLab
and updates js/data.js automatically.
"""

import json
import os
import re
import sys
import urllib.request
from pathlib import Path

# Repositories to track for CV_KKEEY
# Keys must match the exact `name:` string of the project card in js/data.js.
REPOS = {
    'Claire V2.5 Native Audio': 'KKEEY92/claire-v2.5-native-audio',
    'AuraTone AI Desktop': 'KKEEY92/AuraTone-AI-by-KKEEy',
    'AI Virtual Calling': 'KKEEY92/AI-Virtual-Calling-and-Write-a-friend',
    'AFM-3 Chat': 'KKEEY92/afm-chat',
    'Architecture Documentation': 'KKEEY92/Claire-V2-Architecture',
    'sortiere.py': 'KKEEY92/sortiere.py',
}

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_JS_PATH = PROJECT_ROOT / 'js' / 'data.js'

def fetch_json(url):
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'KKEEY-Portfolio-SyncAgent/1.0',
            'Accept': 'application/vnd.github.v3+json',
        }
    )
    github_token = os.environ.get('GITHUB_TOKEN')
    if github_token and 'github.com' in url:
        req.add_header('Authorization', f'token {github_token}')

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"Notice: Could not fetch {url}: {e}", file=sys.stderr)
    return None

def fetch_latest_tag_github(repo_path):
    rel = fetch_json(f"https://api.github.com/repos/{repo_path}/releases/latest")
    if rel and 'tag_name' in rel:
        return rel['tag_name']
    
    tags = fetch_json(f"https://api.github.com/repos/{repo_path}/tags")
    if tags and len(tags) > 0:
        return tags[0]['name']
    
    return None

def main():
    if not DATA_JS_PATH.exists():
        print(f"Error: {DATA_JS_PATH} not found.", file=sys.stderr)
        sys.exit(1)

    print("Checking project repository statuses from GitHub & GitLab...")
    updates = {}
    for proj_name, repo in REPOS.items():
        tag = fetch_latest_tag_github(repo)
        if tag:
            updates[proj_name] = tag
            print(f"  ✓ {proj_name}: {tag}")
        else:
            print(f"  - {proj_name}: Current status verified")

    content = DATA_JS_PATH.read_text(encoding='utf-8')
    original_content = content

    version_re = re.compile(r'v\d+\.\d+(\.\d+)?')
    for proj_name, tag in updates.items():
        clean_tag = tag.lstrip('v')
        pattern = re.compile(rf"(name:\s*'{re.escape(proj_name)}'.*?tag:\s*').*?(')", re.DOTALL)
        def repl(match):
            old_tag = match.group(0)
            # Only touch tags that actually carry a version number (e.g. "Tag v1.3.0").
            # Status-only tags (e.g. docs-only cards without a release) are left alone.
            if version_re.search(old_tag):
                return version_re.sub(f'v{clean_tag}', old_tag, count=1)
            return old_tag
        content = pattern.sub(repl, content)

    if content != original_content:
        DATA_JS_PATH.write_text(content, encoding='utf-8')
        print(f"✓ Updated {DATA_JS_PATH}")
    else:
        print("Data is up to date.")

if __name__ == '__main__':
    main()
