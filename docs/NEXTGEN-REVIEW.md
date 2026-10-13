# KKEEY Signal Field — Review Candidate

Review context: user Auftrag 13.10.2026 (Europe/Berlin). No production release is authorized. Base `b51ec1793a9d548fb378170e18dd6610ced70019`, branch `feature/kkeey-nextgen-experience`.

## P0 — Verified audit

- Clean isolated clone. No AGENTS.md found in the repository. The user's Mac and its uncommitted work are inaccessible and **UNVERIFIED**; nothing there was modified.
- HTML/CSS/Vanilla JS, local WOFF2 fonts, data-driven projects/skills/certifications/career and five UI languages verified from current source and live browser.
- Dark/Light, Purple/Teal and Orange/Cyan, typewriter, avatar, responsive menu, Web3Forms contact, PDF download, legal pages, canonical and Person schema present.
- Original `initBg()` renders a full-screen quad with sin/cos waves. Original resize failed to update backing dimensions/viewport; no shader status checks, visibility pause, reduced motion or context recovery.
- GitHub Pages workflow runs on `main` push or manual dispatch. Daily project sync at 04:00 UTC can commit `js/data.js` to `main`. Both workflows, CNAME and hosting configuration remain untouched.
- Open PRs observed: #9 Context Gap case study and #7 Claire showcase. Neither merged or copied into this branch. Their integration requires separate review. No Antigravity control channel exists here; branch isolation is the coordination mechanism. Antigravity must not write to this feature branch.
- Existing claims and project statuses are preserved, **not independently certified**. Some project links lead to the GitHub profile rather than a specific repository. Qualifier/status accuracy and destination specificity remain editorial follow-up items.

## P1 — Design system

Graphite `#101115`, near-white `#f4f3ef`, restrained glass surfaces, Space Grotesk/JetBrains Mono retained locally. Orange/Cyan becomes the default for fresh visitors; saved Purple preference survives. Light palette uses darker accents for text contrast. Visible focus outlines, 44px navigation controls, skip link, semantic main and sections.

Hero: asymmetrical desktop content + independent Agent Core stage; ~100svh, no sticky-scroll. Mobile stacks content/CTAs/core and may extend past one viewport to preserve legibility. Avatar stays real HTML. Static role position makes the profession readable without waiting for the decorative typewriter. All CTAs and PDFs remain semantic links.

Portfolio: consistent card hierarchy, vertically arranged title/status, wrapping badges, legible stack labels, generous link targets. No invented case studies, qualifications, releases or percentages. Existing work/language content is retained.

## P2/P3 — Shader and motion architecture

- `js/particle-hero.js`: lazy same-origin import of vendored Three.js **0.180.0**, immutable deterministic Float32 seeds, BufferGeometry, one Points instance and ShaderMaterial. No Google code or assets.
- Vertex shader derives the original asymmetric volumetric Agent Core, slow rotation, pointer repulsion/brightening, click impulse, and scroll contraction. Only uniforms change each frame; seed buffers are not rewritten. The only Points draw is complemented by the separate ambient quad (two effects, not a claim of one draw for the entire site).
- Fragment shader clips soft round points, interpolates theme colors and modulates pointer glow. No bloom/postprocessing passes.
- `js/motion.js`: shared requestAnimationFrame scheduler, Page Visibility guard, per-client visibility, zero repeating frames in reduced motion or user pause. Resuming does not fast-forward through hidden time.
- Mobile starts at **16,000**, desktop at **36,000**; measured scheduler intervals can raise desktop to **60,000** or lower to **16,000**. Hysteresis prevents constant switching. Quality uses actual frame interval, viewport and capped DPR, never CPU-core count. Low caps render frequency around 30fps.
- DPR caps: particle low 1.25, other levels 1.75; ambient 1.25 with adaptive scale reduction. ResizeObserver updates hero backing store/camera; ambient updates backing store and viewport.
- Particle frames stop when its stage is outside the viewport. Ambient remains visible throughout the page and runs at up to ~30fps; both stop on hidden page/user pause. If all clients are inactive the scheduler has no repeating RAF.
- Ambient's original mathematical shader retained, reduced intensity, compile/link checks and context-loss recovery added. CSS background/core provides the non-WebGL fallback.
- Interaction ignores touch pointer forces and clicks on links/buttons; no canvas pointer capture, dragging or OrbitControls. No scroll interception.
- User-visible pause control stores its preference. OS reduced motion takes precedence over resume.

## P4 — Functional changes

Escape closes the mobile menu and restores focus; section observer supplies aria-current. Language changes set HTML lang and refresh contact accessible names. Forms expose sending/success/error via a live status, restore retry button, enforce 15s timeout and retain entered text on error. Botcheck honeypot included. No test messages transmitted. Existing endpoint/public Web3Forms key preserved. Legal pages and existing SEO/schema URLs untouched.

## P5 — Tests and performance

Raw results: `evidence/nextgen/results.json`; automated contrast/accessibility result: `evidence/nextgen/axe.json`. Screenshots in the same directory.

Environment: Chromium 153 headless, Linux, SwiftShader/software GPU, localhost, default viewport DPR 1. Unthrottled, single representative final run. This is **lab evidence**, not real-user field data or Apple GPU evidence.

| Viewport | Local LCP | Local CLS | Particle tier | Overflow |
|---|---:|---:|---|---|
| 390×844 | 740 ms | 0.00891 | Low | None |
| 768×1024 | 236 ms | 0.00914 | Low | None |
| 1440×900 | 332 ms | 0.00118 | Medium | None |
| 2560×1440 | 1940 ms | 0.00256 | Medium | None |

These local samples meet LCP ≤2.5s and CLS ≤0.1. **Production LCP/CLS and INP ≤200ms remain UNVERIFIED.** No INP estimate is substituted for field measurement. Three.js adds ~720 KB uncompressed JS; production gzip/Brotli/cache transfer was not measured. Imports occur only once the decorative stage enters view. Cold slow-network tests and real GPU power measurements remain outstanding.

PASS: all four viewport renders; theme/palette switching; five languages; 35 local/anchor/link inspections with actual PDF magic checks; mobile keyboard open/Escape; contact success/error UI with intercepted test transport; backing-store resize; **zero hero draw calls during an offscreen sample**; user pause stops both renderers; both WebGL contexts lost/restored; identical static canvas captures under reduced motion; WebGL-unavailable CSS/HTML fallback; axe WCAG 2/2.1/2.2 A/AA tags in dark and light; zero unexpected page/console errors and local 404s in normal rendering.

Automated WCAG checks do not prove complete WCAG conformance. Formal screen-reader review remains UNVERIFIED. Contact transport was deliberately intercepted only in tests; live inbox receipt and external link destinations were not tested. Production rendering code has no mocks.

| Platform/check | Status |
|---|---|
| Chromium 153 desktop + mobile viewport | PASS within recorded scope |
| Chrome branded release on physical hardware | UNVERIFIED |
| Safari macOS / Safari iPhone | UNVERIFIED — no access to user's devices |
| Firefox / WebKit test engine | BLOCKED — testbrowser archive download failed |
| Physical touch / high-DPR phone | UNVERIFIED |
| True background-tab integration | UNVERIFIED; Page Visibility handler source-reviewed |
| Real Web3Forms delivery / production INP | UNVERIFIED |

## Run the actual preview

No build or runtime npm dependency install:

```sh
git switch feature/kkeey-nextgen-experience
python3 -m http.server 8080
```

Open `http://localhost:8080/`. This serves the actual site, including particles, theme/language navigation, projects and form. This is not a screenshot mockup. No public preview deployment was made; GitHub Pages remains on the existing production branch. `file://` is unsuitable for ES modules.

Reproduce QA with Node/npm and a supported Chromium installation:

```sh
npm ci
npx playwright install chromium
npm test
```

The QA script owns its HTTP server and writes screenshots/results. Test-time dependencies are pinned in package-lock.json; they do not change the static production architecture. In this environment official browser-download archives failed. A registry-distributed `@sparticuz/chromium@153.0.0` binary was used with explicit environment overrides, normal multi-process operation, and SwiftShader. QA imports can be overridden with `PLAYWRIGHT_MODULE`, `CHROMIUM_MODULE`, `AXE_MODULE`; no credential is needed.

## P6 — Risks, review and rollback

This is a **draft review candidate**, not production-approved. Real Safari/iPhone/Firefox, device power/thermal load, slow network, field CWV and live form delivery must be verified before release. The large vendored dependency can affect cold network loads; future optimization can tree-shake it without introducing a framework. Dynamic sync may move main while this branch is reviewed; compare main again and preserve new js/data.js content before merge. Open PR #9 may touch the same HTML/CSS/JS and needs conflict-aware integration.

No DNS/domain/CNAME/workflow updates, main commits, force-pushes or production deployment. No Aria/Claire repository writes. User's explicit GO is required for any production merge.

Rollback before merge: close the draft PR / leave feature branch unmerged. After a separately approved deployment: revert the modernization commit through a new reviewed PR while preserving later data-sync changes; do not reset main or force-push. All runtime effects are isolated to new motion/particle modules and additive CSS plus audited main integration. Original shader formula, data and download assets remain available.
