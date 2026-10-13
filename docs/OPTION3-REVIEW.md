# Option 3 — Neural Topology: Test Candidate

Datum: 13.10.2026. Basis: Nextgen-Stand `1dfce8f`, separater Branch `feature/kkeey-neural-topology`. Keine Freigabe für kkeey.dev-Produktion.

## Tatsächliche Implementierung

- `js/signal/field.js`: analytisch differenziertes 3D-Lattice-Noise-Vektorpotential; dessen Curl erzeugt das Strömungsfeld. Keine Kollisionssimulation.
- `js/signal/simulation.js`: Position und Geschwindigkeit in vier RGBA-Half-Float-Render-Targets (mobil 128×128, Desktop 256×256), Ping-Pong; zwei Simulationspasses je Schritt, feste Zeitschritte und maximal zwei Schritte je Frame. 524.288 Bytes mobil / 2.097.152 Bytes Desktop für diese vier Targets; keine behauptete gesamte VRAM-Auslastung.
- `js/particle-hero.js`: 16K/36K/60K sichtbare Partikel, CPU-Seeds nur beim Start, GPU-Zustand, gedämpfter Pointer-Federattraktor, acht weiterlaufende Wellen, Faux-Bokeh und selektiver zusätzlicher Glow-Pass. Dunkelmodus Medium/High: zwei Punktwolken-Draws; Low/Light: einer. Kein echtes HDR.
- `js/signal/topology.js`: reale DOM-Kartenanker, invalidierte Layoutmessungen; beim Scrollen wechseln Partikel in Bezier-Verbindungen zu den Karten. Normales Scrollen, keine Sticky-Scroll-Sperre.
- `js/signal/interface.js`: kurzer First-Hover-Cipher, zugängliche stabile Labels, Pointer-Lichtreflex an Glaskanten.
- Ambient: bestehende Lichtwellen weitergeführt, texturbasiertes Dithering (`assets/noise/`), gemeinsame Pause-/Visibility-Steuerung.
- HUD zeigt tatsächlichen Modus und Partikelzahl. Half-Float-Framebuffer nicht verfügbar: zustandslose Curl-Deformation; ohne WebGL: CSS/HTML. Reduced Motion bleibt statisch.

## Verifikation

Gespeicherter Prüflauf vor dem Scroll-Fix: `evidence/nextgen/results.json`; 20/20 Chromium-Prüfgruppen PASS. Alle vier Zielgrößen, GPU-Schritte und DOM-Anker, Float-Fallback, Kontextverlust/-wiederherstellung, Pause, Reduced Motion, Touch-Taps, aufeinanderfolgende Wellen, PDF-Dateien, Themes/Sprachen, Kontakt-Status mit abgefangenem Transport sowie axe Dark/Light geprüft. Quellen-Mtime liegt vor dem Ergebnis-Mtime.

Lokales Chromium 153 unter Linux mit Software-GPU, ungedrosselt: LCP 52–668 ms, CLS maximal 0,001184. Keine Produktionsmessung. Vollständige WCAG-Konformität nicht durch axe belegt.

UNVERIFIED: Safari macOS/iPhone, physische Touch-Geräte, Firefox, reale GPU-Belastung, INP/Produktions-CWV und echter Web3Forms-Empfang. Die Sites-Hosting-Kopie konnte in dieser Fortsetzung nicht erneut per Browser geprüft werden: `$control-browser` nicht verfügbar. Vorhandene Browser-Evidenz stammt vom identischen Anwendungscode auf localhost.

## Lokal testen

Separater Checkout, unabhängig von vorhandenen Experimenten:

```sh
git clone --branch feature/kkeey-neural-topology https://github.com/KKEEY92/CV_KKEEY.git ~/Downloads/KKEEY-Option3
cd ~/Downloads/KKEEY-Option3
python3 -m http.server 8080
```

Öffnen: http://localhost:8080. iPhone im gleichen WLAN: http://MAC-IP:8080. Das Formular nutzt weiterhin den echten Versanddienst.

## Grenzen und Rollback

Zusätzliche GPU-Passes kosten Leistung; adaptive Qualität senkt Partikelzahl/DPR, Low schaltet zusätzlichen Glow ab. Simulation läuft weiterhin über die feste State-Textur; reale Gerätetests bleiben erforderlich. Morphing verbindet reale Kartenanker, reproduziert nicht pixelgenau ein generiertes Konzeptbild.

Produktivdomain, CNAME, Workflows und `js/data.js` bleiben unverändert. Nextgen-Branch und Produktionssnapshot bleiben erhalten. Test-Rollback: diesen Branch nicht mergen; private Test-Site getrennt zurücksetzen. Jede Änderung an main/Produktionshosting benötigt Kevins gesondertes GO.


## Scroll-Revision nach iPhone-Rückmeldung

- Sichtbare Karten wechseln keine Routen mehr; bis zu acht stabile Kartenanker in Dokumentreihenfolge.
- Framerate-unabhängiges exponentielles Morph-Easing mit Faktor 12/s.
- Endpunkte verteilen sich über die Kartenbreite, statt alle Partikel in einen schmalen mittigen Strang zu konzentrieren. Bezier-Loop blendet an Anfang/Ende aus.
- Mobile State-Textur 128² statt 256²: ein Viertel der State-Texel und State-Speicher, weiterhin 16K sichtbare Partikel. Das ist keine gemessene vierfache FPS-Steigerung.
- Simulation bleibt fest getaktet, Darstellung interpoliert vorige/aktuelle Positionen und rendert in jedem Scheduler-Frame. Keine erzwungenen 30-FPS-Pausen im Scroll-Rendering.
- `node scripts/test-topology.mjs`: PASS für stabile Routen beim Vor-/Zurückscrollen, finite Kartenkoordinaten, gebundenes und framerate-unabhängiges Easing, statische und leere Zustände. JS-Syntax und git diff --check PASS.
- Die historischen 20 Browser-Prüfgruppen gelten für die Vorversion. Neue Scroll-Revision im Browser und auf physischem iPhone: UNVERIFIED; Test-Site für Nutzerabnahme aktualisiert. Frühere Screenshots zeigen die Vorversion.


## Produktionsfreigabe und erneute Verifikation

Kevin hat am 13.10.2026 die Veröffentlichung auf https://kkeey.dev ausdrücklich freigegeben. Vollständiger Chromium-Prüflauf nach dem Scroll-Fix: 20/20 PASS, einschließlich GPU-Shader, Context-Recovery, Float-Fallback, vier Viewports, Touch-Wellen und axe Dark/Light. Lokale Rohwerte stehen in evidence/nextgen/results.json. Die Logiktests test-topology.mjs bestehen zusätzlich.

Physisches Safari/iPhone, Firefox, Produktions-INP und echter Formular-Empfang bleiben UNVERIFIED. Die bisherigen Einschränkungen zur nicht getesteten Scroll-Revision sind durch diesen erneuten Linux-Chromium-Lauf aufgehoben; echte Gerätetests bleiben offen. Im GitHub-Branch verbleibende ältere Screenshots sind historische Nextgen-Aufnahmen und kein Beleg für den aktuellen Renderzustand.

Produktionssnapshot b51ec1793a9d548fb378170e18dd6610ced70019 bleibt über backup/production-2026-10-13-b51ec17 erhalten. Workflow, CNAME und js/data.js bleiben unverändert. Rücknahme über einen Review-PR, keine destruktiven Resets.
