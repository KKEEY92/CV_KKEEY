# Context architecture content review — 11 November 2026

The portfolio now distinguishes the operating model (KKEEY Agent OS), the local graph/context application (ContextNexus), its Context Bridge M4 module, the Aria companion product strand, the separate Claire voice/runtime variants, Persona OS modeling and the separate Job-Scout career application.

The existing three engineering cases and eight project-card identities remain. ContextNexus is a fourth case in the existing component, with German, English, French, Ukrainian and Polish content. The three earlier cases retain their documented German/English availability and explicit English fallback. The IT portfolio has a compact link to this case rather than a duplicate case study.

## Evidence and public boundaries

- Website baseline: [3ce81a4](https://github.com/KKEEY92/CV_KKEEY/commit/3ce81a414cd342f1451a3c100eb1c45b18fa7f21), including the approved October engineering/particle release.
- The source review distinguishes implementation, documented test results and actual provider/product acceptance. Source references for non-public implementations are available for review separately; private source text, context datasets, credentials and transport identifiers are excluded from this repository.
- M4 is described as development-branch implementation. The documented 69-case synthetic suite and the separate uncommitted 85-case overlay are different revisions. These counts are source-documentation evidence, not tests executed by the website task and not production integration evidence.
- Reported transport readback of a synthetic pair does not establish signed approval, consumer activation or a full use/update/recovery cycle.
- Aria has its own voice code. No accepted shared Aria/Claire runtime or M4 integration is asserted. Persona OS is a modeling layer. V2 evidence is not assigned to V2.5.
- Agent OS's 30+ roster describes roles; the showcase does not certify continuous production execution. Historical governance cases remain explicitly historical and scoped to their specific reported results.
- Historical open [PR #9](https://github.com/KKEEY92/CV_KKEEY/pull/9) was reviewed for its context-conflict explanation. The existing engineering component carries that explanatory idea without adding another demo. [PR #7](https://github.com/KKEEY92/CV_KKEEY/pull/7) was not merged or copied over the current multilingual data.

## Validation

Local environment: macOS ARM64, Node and Playwright 1.62.1, headless Chrome 157.0.8103.39. The website task does not establish physical Safari/iPhone acceptance or screen-reader certification.

- Existing particle/UI regression suite: 20/20 checks passed, including emulated touch ripples, eight GPU anchors, full-page rendering at contact, pause, reduced motion, framebuffer fallback and context recovery. Form success/failure is tested with intercepted transport only.
- Architecture browser suite: 120 combinations across the main and Agent OS pages (five languages × 390/768/1440 px × two themes × two palettes); navigation/deep links, native disclosure keyboard/touch use, seven department controls, static/no-WebGL fallback, local resources and automated WCAG 2.2 AA checks on touched content.
- Existing Node Agent OS integration: 40 width/language diagram combinations; all eight project IDs/order, unrelated cards and profile data compared with the approved baseline.
- Existing topology, consistency, strict markup/resource/SVG checks and JavaScript syntax checks passed.
- Visual review and baseline/candidate screenshots are retained outside the published repository.

The original particle suite expected a hero-only renderer to stop below the hero. That assertion also failed on the unchanged October baseline. Its replacement checks the already approved full-page signal at contact; renderer code was not changed. The test records its actual platform/browser instead of a fixed historical environment label.

Run after installing the repository's existing QA dependencies:

```sh
npm ci --ignore-scripts --no-audit --no-fund
node scripts/test-topology.mjs
node scripts/test-agent-os.mjs
python3 scripts/validate-agent-os.py
python3 scripts/validate_consistency.py
npm test
node scripts/test-architecture.mjs
```

`BROWSER_CHANNEL=chrome` selects an installed Chrome. `PLAYWRIGHT_MODULE`, `AXE_MODULE` and `QA_OUT` optionally point to an existing isolated QA installation/output directory. No new website/runtime dependency is introduced. Generated QA output is not published.

Modern Web Guidance was consulted before implementation. Applied guides: `html`, `accessibility`, `accordion`, `css-layout`. Native details/summary behavior, DOM language, visible focus and intrinsic layout are retained without experimental APIs. Navigation and background-processing guides informed regression boundaries; the existing navigation/render architecture is preserved.

## Release and rollback boundary

This is a draft review change. No merge, production deployment, consumer activation, provider test, real contact submission or Job-Scout operation is authorized by these checks.

Before release, obtain a separate physical Safari/iPhone scroll/touch/particle check and explicit approval of the reviewed commit. Publish the main portfolio before the IT cross-link, then verify the new anchor and only proceed with the separately approved IT change.

Before merging, rollback means closing the draft without changing main. After any separately authorized release, revert the actual accepted commit/merge through a reviewed change; retain the October baseline. Never reset or overwrite unrelated work.
