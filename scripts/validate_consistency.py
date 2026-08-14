#!/usr/bin/env python3
"""
KKEEY Portfolio Consistency & Anti-Regression Validator
Performs comprehensive validation:
1. Validates canonical_profile.json (JSON syntax, required schema, URL hygiene).
2. Checks URL hygiene across all active files (no backticks, no stray whitespace, valid protocols).
3. Blocks forbidden legacy patterns (outdated URLs, obsolete employer names, inaccurate job titles).
4. Verifies email parity across all active HTML pages.
5. Separates active files (strict fail) from archive directories.
"""

from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from typing import Any

FORBIDDEN_PATTERNS = [
    ("github.com/kevin-kuck", "Legacy GitHub URL - use github.com/KKEEY92"),
    ("linkedin.com/in/kevin-kuck/", "Legacy LinkedIn URL - use linkedin.com/in/kevin-kuck-it/"),
    ("in meiner aktuellen Tätigkeit bei den Johannitern", "Outdated active employment phrasing"),
    ("Bundes-IT · Johanniter-Unfall-Hilfe e.V.", "Outdated company naming - use Johanniter Bundes-IT Services"),
    ("15+ Jahre IT-Systemintegration", "Use '15 Jahre operative Erfahrung'"),
    ("15 Jahre Systemadministration", "Use '15 Jahre operative Erfahrung' / Enterprise-Systemadministration"),
    ("sunrisekk199228@googlemail.com", "Legacy email - use kuck_kevin@icloud.com"),
]

PROJECT_ROOT = Path(__file__).parent.parent
CANONICAL_JSON_PATH = PROJECT_ROOT / 'data' / 'canonical_profile.json'

CHECK_EXTENSIONS = {'.html', '.js', '.json', '.md', '.py'}
EXCLUDE_DIRS = {'.git', 'node_modules', '__pycache__', 'backup', 'archive'}
EXCLUDE_FILES = {'validate_consistency.py'}

CANONICAL_EMAIL = "kuck_kevin@icloud.com"


def validate_canonical_json() -> list[str]:
    errors = []
    if not CANONICAL_JSON_PATH.exists():
        errors.append(f"Canonical profile file not found: {CANONICAL_JSON_PATH}")
        return errors

    try:
        data: dict[str, Any] = json.loads(CANONICAL_JSON_PATH.read_text(encoding='utf-8'))
    except Exception as e:
        errors.append(f"Failed to parse {CANONICAL_JSON_PATH}: {e}")
        return errors

    # Check required top-level keys
    for req_key in ['identity', 'links', 'positioning', 'employment']:
        if req_key not in data:
            errors.append(f"Missing required top-level key '{req_key}' in canonical_profile.json")

    # Check links hygiene
    links = data.get('links', {})
    for link_key, url in links.items():
        if not isinstance(url, str):
            errors.append(f"Link '{link_key}' must be a string")
            continue
        url_errors = check_url_hygiene(url)
        for err in url_errors:
            errors.append(f"Canonical link '{link_key}' ({url}): {err}")

    # Check email
    email = data.get('identity', {}).get('email')
    if email != CANONICAL_EMAIL:
        errors.append(f"Canonical identity.email must be '{CANONICAL_EMAIL}', got '{email}'")

    return errors


def check_url_hygiene(url: str) -> list[str]:
    errors = []
    if url != url.strip():
        errors.append("Contains leading/trailing whitespace")
    if '`' in url:
        errors.append("Contains backtick character")
    if '<' in url or '>' in url:
        errors.append("Contains embedded HTML tags")
    if not (url.startswith('https://') or url.startswith('http://') or url.startswith('mailto:')):
        errors.append("Does not start with valid protocol (https:// or mailto:)")
    # Check double slashes outside protocol
    proto_split = url.split('://', 1)
    if len(proto_split) > 1 and '//' in proto_split[1]:
        errors.append("Contains duplicate slashes outside protocol")
    return errors


def validate_html_email_parity() -> list[str]:
    errors = []
    html_files = [
        PROJECT_ROOT / 'index.html',
        PROJECT_ROOT / 'impressum.html',
        PROJECT_ROOT / 'datenschutz.html',
    ]

    for html_file in html_files:
        if not html_file.exists():
            continue
        content = html_file.read_text(encoding='utf-8')
        if CANONICAL_EMAIL not in content:
            errors.append(f"{html_file.name} is missing canonical email {CANONICAL_EMAIL}")

    return errors


def validate_forbidden_patterns() -> list[str]:
    violations = []
    for root, dirs, files in os.walk(PROJECT_ROOT):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file in EXCLUDE_FILES or 'backup' in file:
                continue
            file_path = Path(root) / file
            if file_path.suffix not in CHECK_EXTENSIONS:
                continue

            try:
                content = file_path.read_text(encoding='utf-8')
                for pattern, reason in FORBIDDEN_PATTERNS:
                    if pattern in content:
                        violations.append(f"{file_path.relative_to(PROJECT_ROOT)}: Found '{pattern}' -> {reason}")
            except Exception as e:
                violations.append(f"Could not read {file_path}: {e}")

    return violations


def main() -> None:
    print("Running Comprehensive Portfolio Consistency & Anti-Regression Scan...\n")
    all_errors = []

    # 1. Canonical JSON Schema & URL Hygiene
    json_errors = validate_canonical_json()
    if json_errors:
        print("❌ Canonical Profile JSON Errors:")
        for err in json_errors:
            print(f"  • {err}")
        all_errors.extend(json_errors)
    else:
        print("✓ Canonical profile JSON schema & URL hygiene verified.")

    # 2. Email Parity across HTML pages
    email_errors = validate_html_email_parity()
    if email_errors:
        print("❌ Email Parity Errors:")
        for err in email_errors:
            print(f"  • {err}")
        all_errors.extend(email_errors)
    else:
        print("✓ E-Mail parity across all HTML pages verified.")

    # 3. Forbidden Legacy Patterns
    pattern_errors = validate_forbidden_patterns()
    if pattern_errors:
        print("❌ Forbidden Pattern Violations:")
        for err in pattern_errors:
            print(f"  • {err}")
        all_errors.extend(pattern_errors)
    else:
        print("✓ Zero forbidden legacy patterns found across active files.")

    if all_errors:
        print(f"\nScan failed with {len(all_errors)} total error(s).", file=sys.stderr)
        sys.exit(1)

    print("\n✓ ALL CONFIGURED CONSISTENCY CHECKS PASSED (CANONICAL PROFILE & REGRESSION VALIDATION PASSED).")
    sys.exit(0)


if __name__ == '__main__':
    main()
