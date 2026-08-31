#!/usr/bin/env python3
"""
KKEEY Portfolio Project Auto-Sync Script.

Fetches the latest release tag for each registered project from GitHub and
writes it into that project's `status.latestTag` field in js/data.js.

Design decision (see PROJECT_REGISTRY below): matching is done exclusively by
a stable machine-readable `id`/`repo` pair, never by the project's visible
`name` or by decorative characters (e.g. the '●' status-pill bullet) in its
rendered tag text. Names and status labels are presentation data and change
independently of what this automation needs to find.

Usage:
    python3 scripts/sync_projects.py                 # check & update all registered projects
    python3 scripts/sync_projects.py --dry-run        # show intended changes, write nothing
    python3 scripts/sync_projects.py --id auratone-ai # target a single project
    python3 scripts/sync_projects.py --id auratone-ai --dry-run

Exit codes: 0 on success (including "nothing to update" and skipping
projects whose tags/releases return HTTP 403/404), non-zero on hard-failure
conditions listed under `fail()` calls below. Inaccessible private sibling
repos are a warning + skip so other projects still sync; genuine API/parse
failures still abort.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

# Machine-readable registry: id -> GitHub "owner/repo". Independent of the
# visible card name and status label in js/data.js.
PROJECT_REGISTRY = {
    'claire-v25-native-audio': 'KKEEY92/claire-v2.5-native-audio',
    'auratone-ai': 'KKEEY92/AuraTone-AI-by-KKEEy',
    'ai-virtual-calling': 'KKEEY92/AI-Virtual-Calling-and-Write-a-friend',
    'afm-3-chat': 'KKEEY92/afm-chat',
    'architecture-documentation': 'KKEEY92/Claire-V2-Architecture',
    'sortiere-py': 'KKEEY92/sortiere.py',
}

SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_JS_PATH = PROJECT_ROOT / 'js' / 'data.js'

VERSION_RE = re.compile(r'v?\d+\.\d+(\.\d+)?')


def fail(message: str, code: int = 1) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(code)


def fetch_json(url: str):
    """
    Returns (data, error, http_status). error is None on any response GitHub's
    API returned a well-formed JSON body for — including 404, which GitHub
    uses to say "not found" via a JSON `{"message": "Not Found", ...}` body,
    not a transport failure. Callers that care about 404 specifically should
    check http_status; genuine network/parse failures set error and status=None.
    """
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'KKEEY-Portfolio-SyncAgent/2.0',
            'Accept': 'application/vnd.github.v3+json',
        },
    )
    github_token = os.environ.get('GITHUB_TOKEN')
    if github_token and 'github.com' in url:
        req.add_header('Authorization', f'token {github_token}')

    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            status = resp.status
            body = resp.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        # HTTPError IS the response for non-2xx statuses — GitHub still sends
        # a JSON body (e.g. {"message": "Not Found"}) that we need to inspect,
        # so this is not automatically a hard failure.
        status = e.code
        try:
            body = e.read().decode('utf-8')
        except Exception as read_err:
            return None, f"HTTP {status} from {url}, body unreadable: {read_err}", None
    except Exception as e:
        return None, f"request to {url} failed: {e}", None

    try:
        return json.loads(body), None, status
    except json.JSONDecodeError as e:
        return None, f"invalid JSON from {url} (HTTP {status}): {e}", None


def fetch_latest_tag(repo_path: str):
    """
    Returns (tag_or_none, error, skip). tag=None with error=None and skip=False
    means "repo exists but genuinely has no releases/tags yet" — a valid,
    non-error state. skip=True means tags/releases (or similar repo metadata)
    returned HTTP 403/404, typically a private sibling the default GITHUB_TOKEN
    cannot read — caller must warn and continue. error != None is a hard
    failure; caller must abort.
    """
    rel, err, status = fetch_json(f"https://api.github.com/repos/{repo_path}/releases/latest")
    if err is not None:
        return None, err, False
    if status == 200 and isinstance(rel, dict) and 'tag_name' in rel:
        return rel['tag_name'], None, False
    if status not in (403, 404):
        return None, f"unexpected HTTP {status} from /releases/latest for {repo_path}: {rel!r}", False
    # 404 here is the documented, expected way GitHub says "no release yet" —
    # fall through and check tags instead. 403 is treated the same so a
    # private sibling repo does not abort the whole job before /tags.

    tags, err, status = fetch_json(f"https://api.github.com/repos/{repo_path}/tags")
    if err is not None:
        return None, err, False
    if status in (403, 404):
        return None, None, True
    if status != 200:
        return None, f"unexpected HTTP {status} from /tags for {repo_path}: {tags!r}", False
    if not isinstance(tags, list):
        return None, f"unexpected /tags response shape for {repo_path}", False
    if len(tags) == 0:
        return None, None, False  # genuinely no tags — valid state, not an error
    if 'name' not in tags[0]:
        return None, f"malformed tag entry from {repo_path}: {tags[0]!r}", False
    return tags[0]['name'], None, False


def find_project_span(content: str, project_id: str):
    """
    Returns (start, end) character offsets of the single project object that
    declares `id: '<project_id>'`, or raises with a specific, actionable
    error if it's missing or ambiguous. Object boundary = from this `id:` key
    to the next top-level `{` ... `}` close at the same brace depth.
    """
    id_pattern = re.compile(rf"id:\s*'{re.escape(project_id)}'")
    matches = list(id_pattern.finditer(content))
    if len(matches) == 0:
        fail(f"project id '{project_id}' not found in {DATA_JS_PATH} (no `id: '{project_id}'` present)")
    if len(matches) > 1:
        fail(
            f"project id '{project_id}' is declared {len(matches)} times in {DATA_JS_PATH} — "
            f"ids must be unique, refusing to guess which one to update"
        )

    id_start = matches[0].start()
    # Walk forward from the object's opening '{' (the nearest one before id_start)
    # to find its matching close, tracking brace depth so we don't stop at a
    # nested object's '}' (e.g. sub: {...}, status: {...}).
    obj_start = content.rfind('{', 0, id_start)
    if obj_start == -1:
        fail(f"could not locate the opening '{{' of the project object for id '{project_id}'")

    depth = 0
    i = obj_start
    while i < len(content):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                return obj_start, i + 1
        i += 1
    fail(f"unbalanced braces while scanning for the end of project object '{project_id}'")


def update_status_latest_tag(content: str, project_id: str, new_tag: str) -> str:
    obj_start, obj_end = find_project_span(content, project_id)
    obj_text = content[obj_start:obj_end]

    status_match = re.search(r'status:\s*\{', obj_text)
    if not status_match:
        fail(
            f"project '{project_id}' has no `status: {{ ... }}` block in {DATA_JS_PATH} — "
            f"cannot write latestTag. Add a status object (see AuraTone AI Desktop for the shape) "
            f"before this project can be auto-synced."
        )

    status_block_start = status_match.end() - 1  # position of the '{'
    depth = 0
    j = status_block_start
    while j < len(obj_text):
        if obj_text[j] == '{':
            depth += 1
        elif obj_text[j] == '}':
            depth -= 1
            if depth == 0:
                status_block_end = j + 1
                break
        j += 1
    else:
        fail(f"unbalanced braces in status block for project '{project_id}'")

    status_block = obj_text[status_block_start:status_block_end]
    latest_tag_match = re.search(r'latestTag:\s*(null|\'[^\']*\')', status_block)
    if not latest_tag_match:
        fail(
            f"project '{project_id}' has a `status` block but no `latestTag` field in {DATA_JS_PATH} — "
            f"the version field is missing, not just empty. Add `latestTag: null` explicitly."
        )

    new_status_block = (
        status_block[: latest_tag_match.start(1)]
        + f"'{new_tag}'"
        + status_block[latest_tag_match.end(1):]
    )
    new_obj_text = obj_text[:status_block_start] + new_status_block + obj_text[status_block_end:]
    return content[:obj_start] + new_obj_text + content[obj_end:]


def get_current_latest_tag(content: str, project_id: str):
    obj_start, obj_end = find_project_span(content, project_id)
    obj_text = content[obj_start:obj_end]
    status_match = re.search(r'status:\s*\{([^{}]*)\}', obj_text)
    if not status_match:
        return None  # caller decides whether that's fatal
    m = re.search(r'latestTag:\s*(null|\'([^\']*)\')', status_match.group(1))
    if not m:
        return None
    return None if m.group(1) == 'null' else m.group(2)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument('--dry-run', action='store_true', help='Show intended changes without writing files or committing.')
    parser.add_argument('--id', dest='project_id', default=None, help='Only check/update this single project id (must exist in PROJECT_REGISTRY).')
    args = parser.parse_args()

    if not DATA_JS_PATH.exists():
        fail(f"expected file not found: {DATA_JS_PATH}")

    if args.project_id is not None:
        if args.project_id not in PROJECT_REGISTRY:
            fail(
                f"project id '{args.project_id}' has no repository mapping in PROJECT_REGISTRY "
                f"(known ids: {', '.join(sorted(PROJECT_REGISTRY))})"
            )
        targets = {args.project_id: PROJECT_REGISTRY[args.project_id]}
    else:
        targets = PROJECT_REGISTRY

    content = DATA_JS_PATH.read_text(encoding='utf-8')
    original_content = content
    dry_run_report = []

    for project_id, repo in targets.items():
        new_tag, err, skip = fetch_latest_tag(repo)
        if skip:
            print(
                f"WARNING: skipping '{project_id}' ({repo}): tags/releases "
                f"inaccessible (HTTP 403/404) — continuing with other projects",
                file=sys.stderr,
            )
            dry_run_report.append({
                'id': project_id, 'repo': repo, 'previous': None,
                'detected': None, 'change': 'skipped (inaccessible)',
            })
            continue
        if err is not None:
            fail(f"invalid API response while checking '{project_id}' ({repo}): {err}")

        current_tag = get_current_latest_tag(content, project_id)

        if new_tag is None:
            dry_run_report.append({
                'id': project_id, 'repo': repo, 'previous': current_tag,
                'detected': None, 'change': 'none (no tags/releases on repo)',
            })
            print(f"  - {project_id} ({repo}): no tags/releases found — nothing to sync")
            continue

        if current_tag == new_tag:
            dry_run_report.append({
                'id': project_id, 'repo': repo, 'previous': current_tag,
                'detected': new_tag, 'change': 'none (already up to date)',
            })
            print(f"  ✓ {project_id} ({repo}): already at {new_tag}")
            continue

        dry_run_report.append({
            'id': project_id, 'repo': repo, 'previous': current_tag,
            'detected': new_tag, 'change': f'{current_tag!r} -> {new_tag!r}', 'file': str(DATA_JS_PATH),
        })
        print(f"  → {project_id} ({repo}): {current_tag} -> {new_tag}")
        if not args.dry_run:
            content = update_status_latest_tag(content, project_id, new_tag)

    if args.dry_run:
        print("\n--dry-run: no files written, nothing committed.")
        print(json.dumps(dry_run_report, indent=2))
        return 0

    if content != original_content:
        DATA_JS_PATH.write_text(content, encoding='utf-8')
        print(f"\n✓ Updated {DATA_JS_PATH}")
    else:
        print("\nData is up to date.")

    return 0


if __name__ == '__main__':
    sys.exit(main())
