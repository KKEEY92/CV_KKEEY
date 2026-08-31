# Claire V2.5 — data.js Patch

Nicht mergen als alleinige Änderung ohne den Block in `js/data.js` einzusetzen.
Branch `feat/claire-v25-private-card` ist **ungültig** (data.js dort verstümmelt). `main` ist clean.

In `js/data.js` das Objekt `id: 'claire-v25-native-audio'` ersetzen durch:

- `status.sourceVisibility: 'private'`
- kein `link` auf `claire-v2.5-native-audio`
- `links[]` auf `Claire-V2-Architecture` (Anker `#claire-v2-vs-claire-v25` + Repo-Root)
- `note`: zwei getrennte Codebasen (V2 Container vs V2.5 local-first)
- Tag-Text „Open Source“ entfernen

Muster: AuraTone-Karte in derselben Datei.

Danach `claire-v2.5-native-audio` in GitHub Settings → Change visibility → private.
Fork bleibt öffentlich. GCP-Defaults rotieren separat.
