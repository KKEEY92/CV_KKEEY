# Three.js dependency provenance

Vendored from npm `three@0.180.0` (MIT). Only the two production ES modules and the original license are included. Runtime imports stay same-origin; no CDN calls, tracking, build step, or package installation is required to serve the site.

Reproduce in a temporary directory:

```sh
npm pack three@0.180.0
mkdir unpacked
tar -xzf three-0.180.0.tgz -C unpacked
cp unpacked/package/build/three.module.min.js js/vendor/
cp unpacked/package/build/three.core.min.js js/vendor/
cp unpacked/package/LICENSE js/vendor/THREE-LICENSE.txt
```

SHA-256:

- `three.core.min.js`: `61ba0df005b05991361d040d8ff670e1aadfd0ce7aeebd1fdb0725957a8957de`
- `three.module.min.js`: `e2b5ee6bccd38fd6d8a2428546b83c5f2426d84b152ef82be8055556e3b40eb6`

Uncompressed ES modules total about 720 KB. Lazy import occurs when the decorative stage is visible. Compressed transfer and production cache behavior remain deployment-dependent.
