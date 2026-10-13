# KKEEY Neural Topology — Architektur-README

**Status: Architekturentwurf zur Prüfung. Option 3 ist NICHT implementiert.**  
Stand: 13. Oktober 2026 · Auftraggeber: Kevin Kuck · Produkt: KKEEY.dev  
Geltungsbereich: ausschließlich `KKEEY92/CV_KKEEY`. Keine Aria-/Claire-Integration.

Dieses Dokument beschreibt die technische Umsetzung der dritten Konzeptansicht aus der visuellen Auswahl: ein fließender Orange/Cyan-Partikelkern, der beim normalen Scrollen in eine räumliche Topologie übergeht und ausgewählte Projektkarten visuell verbindet. Die Ansicht ist eine generierte Gestaltungsidee, kein Nachweis bereits vorhandener Shader, Simulation oder gemessener Performance. Ein statisches Bild kann insbesondere Federverhalten, Scroll-Morphing, Scramble und zeitliche Kohärenz nicht beweisen.

**Freigabegrenze:** Nur diese separate README wird erstellt. Keine neuen Website-Dateien, Commits, Branch-Updates, PR-Änderungen oder Deployments für Option 3. Der bestehende Draft PR #10 bleibt beim zuvor freigegebenen Entwicklungsstand. Die später beschriebene Implementierung braucht einen gesonderten Auftrag.

## 1. Verifizierte Ausgangsbasis

Remote-Review-Commit: `1dfce8f99745dd42a33ff5cbcb1159ce44903bd3` auf `feature/kkeey-nextgen-experience`. Lokaler geprüfter Commit: `fc8afbd715afba2f2cc2b6b69f3448993771c38e`. Beide haben denselben Datei-Tree `af92da97915cbc8b38c7fb416bf3c1062ccb208e`. Die unterschiedliche Commit-ID stammt aus dem früheren Transport über GitHub; der Dateiinhalt ist identisch.

| Bereich | Aktuell vorhanden | Für Option 3 neu |
|---|---|---|
| Plattform | Statisches HTML/CSS/Vanilla JS, GitHub Pages | Keine Framework-/Hosting-Migration |
| GPU-Bibliothek | Lokal versioniertes Three.js 0.180.0, MIT | Version zunächst beibehalten; API gegen diese Version prüfen |
| Partikel | `Points`, `BufferGeometry`, eigene Shader, deterministische Seeds | Curl-Feld, optional zustandsbehaftete GPU-Advektion |
| Partikelbewegung | Parametrische Sinus-/Kosinus-Verformung | Fließende Ströme mit gedämpftem Nachlauf |
| Pointer | Direktes Kraftfeld ohne integrierte Partikelgeschwindigkeit | Gedämpfter Attractor, Geschwindigkeit und Wake |
| Klickwellen | Acht Slots, sechs Sekunden Auslauf, keine Überschreibung aktiver Wellen | Erhalten und mit Simulation/Glow verbinden |
| Morphing | Leichte Hero-Verdichtung beim Scrollen | Kontinuierlicher Übergang Kern → Ströme → Karten-Topologie |
| Optik | Weiche runde Punkte, normales Alpha-Blending | Z-abhängiges Faux-Bokeh, begrenzte selektive Emission |
| Hintergrund | Ambient-Fullscreen-Quad, verstärkte Bewegung | Räumlich kohärente Dithering-Textur |
| Motion | Gemeinsamer Scheduler, Visibility, Reduced Motion, Pause | Getrennte Simulations-/Präsentationszeit, vollständiger Lifecycle |
| Hero | Ca. doppelt vergrößerter Kern, Porträt 144/112 px | Größe erhalten; Eyebrow-Kapsel und Scroll-Bühne überarbeiten |
| Karten | Transparente Glass-Surfaces, 10-px-Backdrop-Blur | Pointerabhängige 1-px-Kantenreflexe |
| HUD | Statische dekorative Caption | Wahrheitsgetreue Runtime-Telemetrie |
| QA | 18 Chromium-Prüfgruppen für die bestehende Revision | Neue Simulations-, Morphing- und Interaktionstests |

Die bisherigen Prüfergebnisse gelten **nicht** als Tests für diese geplante Architektur. Safari auf realen Apple-Geräten, Produktions-INP und echte Formularzustellung bleiben offen.

## 2. Visuelles Ziel und technische Grenzen

Der große Kern bleibt rechts im Hero, das Porträt und die Positionierung links. Beim Scrollen verlässt ein Teil der Partikel den Kern und bildet fließende Verbindungen zu den oberen Kanten der sichtbaren Projektkarten. Karten, Überschriften, Links und Texte bleiben HTML. Die Verbindung ist dekorativ und behauptet keine tatsächliche technische Abhängigkeit zwischen den Projekten.

Die Bildidee wird nicht durch ein Hintergrundvideo ersetzt. Andererseits wird keine starre Pixelidentität zu einem generierten Bild versprochen: Partikelverteilung, Tiefenschärfe und Glow ändern sich in Bewegung und müssen gestalterisch abgenommen werden. Die bereits vergrößerte Porträtfläche bleibt erhalten; das Gesicht wird nicht per ImageGen ersetzt.

Präzise Abgrenzungen:

- `curl(A)` liefert bei ausreichend glattem Vektorpotential ein divergenzfreies Geschwindigkeitsfeld. Das ist keine vollständige Navier–Stokes-Simulation, keine Drucklösung und keine Partikel-Kollisionserkennung [S1]. Zusätzliche Federn und Attraktoren machen das kombinierte Feld nicht automatisch inkompressibel.
- Die Architektur erzeugt **glaubwürdige Fluid-Anmutung**, keine wissenschaftlich korrekte Plasma- oder Flüssigkeitssimulation.
- Additive Beiträge summieren Lichtwerte; sie hellen nicht von sich aus exponentiell auf. Ein LDR-Canvas ist kein HDR-Ausgabegerät.
- Faux-Bokeh ist ein tiefenabhängiger Point-Sprite-Effekt, kein kompletter Kamera-DOF-Postprozess mit korrekter Verdeckung.
- Dithering kann Banding deutlich reduzieren. Es garantiert keine vollständige Beseitigung auf jedem Display, Codec oder Screenshot.
- Browser liefern keine universell zuverlässige VRAM-Auslastung. Speicherberechnungen werden als Schätzung gekennzeichnet.
- Awards-Niveau ist eine gestalterische Ambition, keine technische Zertifizierung oder garantierte Auszeichnung.

## 3. Architekturentscheidung: echte Simulation mit ehrlichem Fallback

**Empfohlenes Ziel:** Zustandsbehaftete GPU-Simulation für geeignete WebGL2-Geräte; eine leichtere, zustandslose Curl-Verformung als Fallback. Kein CPU-Update und Upload aller Partikelpositionen pro Frame.

Die reine heutige Vertex-Verformung kann einen fließenden Eindruck erzeugen, speichert aber keinen Partikel-Nachlauf. Für glaubwürdiges Reagieren auf schnelle Pointerbewegungen braucht die volle Variante Position und Geschwindigkeit über mehrere Frames.

| Modus | Datenzustand | Einsatz | Aussage im HUD |
|---|---|---|---|
| `curl-sim` | Position + Geschwindigkeit in GPU-Texturen | WebGL2 + erfolgreiche Float-FBO-Probe + ausreichendes Budget | `SIM: CURL_SIM` |
| `curl-deform` | Unveränderliche Seeds, analytische Verformung | Ohne geeignete Float-Render-Targets oder nach Qualitätsabstieg | `SIM: CURL_DEFORM` |
| `static` | Ein Standbild aus definierter Ausgangsform | Reduced Motion oder manuelle Pause | `STATE: STATIC` / `PAUSED` |
| `css-fallback` | Gradient + CSS-Core, semantisches HTML | Kein geeigneter WebGL-Kontext / endgültiger Fehler | `STATE: FALLBACK` |

Three.js WebGLRenderer nutzt WebGL2 [S2]. Ob Float-Render-Targets funktionieren, wird nicht anhand des Gerätenamens angenommen: Extension-Prüfung plus tatsächliche Framebuffer-/Shader-Probe. `RGBA16F`-Renderbarkeit ist beispielsweise Teil von `EXT_color_buffer_float` [S3]. Bei alternativen Fähigkeiten entscheidet ebenfalls eine echte Probe. Kein Browser-Fingerprinting und keine dauerhafte Speicherung einer GPU-ID.

## 4. Modulstruktur und Eingriffspunkte

Die folgende Struktur ist **geplant**, nicht angelegt:

```text
js/
  motion.js                       bestehender Scheduler, vorsichtig erweitern
  main.js                         i18n, Karten-IDs, Hintergrundintegration
  particle-hero.js                 Einstieg, Init/Dispose, Render-Scope
  signal/
    config.js                     zentrale Grenzen und Qualitätsprofile
    field.js                      Kernform, Noise-Potential, GLSL-Bausteine
    simulation.js                 Float-Probe, Ping-Pong-State, Reset
    shaders.js                    Simulations-/Point-Shader-Komposition
    interaction.js                Spring-Attractor, Pointer-/Tap-Filter, Ripples
    topology.js                   DOM-Messung, Anker, Pfade, Scrollzustand
    interface.js                  HUD, Scramble, Glass-Highlights
assets/
  noise/blue-noise-64.png          lokal erzeugte/geprüfte Dither-Textur
css/style.css                     Kapsel, Render-Scope, Glas, Mobile/Fallback
index.html                        semantische Bühne, dekorativer Canvas/HUD
scripts/test-nextgen.mjs           bestehende Regression + neue Abnahmen
```

Shader liegen zunächst als GLSL-Strings in ES-Modulen, damit GitHub Pages ohne Build/Importloader funktioniert. Keine Laufzeit-Downloads von Shader-CDNs, keine unnötigen Addons. Noise-Code wird eigenständig implementiert oder mit dokumentierter kompatibler Lizenz eingebunden; keine unklare Tutorial-Kopie. Die genaue Noise-Implementierung ist vor der ersten Shader-Abnahme zu dokumentieren.

`js/data.js` bleibt kanonischer Inhalt und wird nicht für erfundene Relationsdaten verändert. Neue `data-project-id`-Attribute entstehen beim bestehenden Kartenrendering aus einer stabilen, geprüften Zuordnung. Kein Mapping allein über wechselnde DOM-Reihenfolge. Workflows, CNAME und Kontakt-Endpunkt bleiben unangetastet.

## 5. Render-Scope und Layering

Für Verbindungen zwischen Hero und Projekten kann der Canvas nicht dauerhaft im heutigen `overflow:hidden`-Hero eingeschlossen bleiben.

**Geplant:** Ein gemeinsamer semantischer Render-Scope enthält Hero, die bestehende About-Sektion und Projekte in derselben Inhaltsreihenfolge. Der dekorative Canvas ist im Scope viewportbezogen angeheftet, bleibt `pointer-events:none` und endet mit diesem Scope. Es gibt kein erzwungenes Sticky-Hero von 160–180svh und keinen Scroll-Hijack. Der Canvas-Scope ist nicht mit der Animation eines künstlich verlängerten Heros gleichzusetzen.

Layer:

1. CSS-Fallback und vorhandener Ambient-Canvas als Atmosphäre.
2. Signal-Canvas: Kern, Partikelströme und Topologie.
3. Semantisches HTML: Porträt, Texte, Projektkarten, CTAs.
4. Zurückhaltende Kartenkante und HUD; Navigation darüber.

Die bestehende About-Sektion liegt zwischen Hero und Projekten. Sie wird nicht ungefragt verschoben: Der Übergang folgt der tatsächlichen Strecke. Die Kernwolke reduziert dort ihre Dichte; Verbindungspartikel treten erst sichtbar in den Projektbereich ein. Die Konzeptansicht stellt diesen Übergang verdichtet dar.

Canvas-Backing-Store bleibt maximal viewportgroß plus begrenztem Overscan, niemals die komplette Dokumenthöhe. CSS-Layoutgrenzen und Render-Auflösung sind getrennt. Sichtbarkeitsprüfung umfasst den gesamten Signal-Scope, nicht nur den Hero. Dadurch laufen die Partikel im Projektbereich weiter und stoppen danach vollständig. Ambient bleibt als sichtbarer globaler Hintergrund bestehen.

## 6. Datenlayout und GPU-Ressourcen

### Unveränderliche Attribute

| Attribut | Typ | Zweck |
|---|---|---|
| `position` | `vec3` Seed | Three.js-Positionsattribut; deterministische Herkunft, keine Frame-Uploads |
| `aStateUV` | `vec2` | Texel-Adresse des GPU-Zustands |
| `aDomain` | `float` | Stabile Zugehörigkeit zu Kern/Verbindung/Topologie |

24 Byte pro Partikel: 60.000 × 24 = 1.440.000 Byte, etwa 1,37 MiB Attributdaten pro CPU-/GPU-Kopie. Das ist eine rechnerische Datenmenge, keine VRAM-Messung. Zusätzlich können kleine Initialisierungstexturen und Geometrien bestehen.

### Ping-Pong-State

Vier Texturen: `positionRead`, `positionWrite`, `velocityRead`, `velocityWrite`. Format `RGBA16F`, Nearest-Filter, ClampToEdge, keine Mipmaps, kein Depth-/Stencil-Buffer, kein MSAA.

- Position RGB: Weltposition; A: deterministische Phase/Lebensalter nach festgelegtem Vertrag.
- Velocity RGB: Geschwindigkeit; A: reserviert und eindeutig initialisiert.
- Für jede Textur ein `WebGLRenderTarget`; Zustände niemals gleichzeitig lesen und in dasselbe Target schreiben.
- 256×256 Kapazität = 65.536 Slots; davon maximal 60.000 sichtbar/aktiv.
- Vier Targets × 65.536 × 8 Byte = **2 MiB** reine Zustandstexturen.

| Profil | State-Raster | Maximale sichtbare Punkte | Reiner Ping-Pong-State |
|---|---:|---:|---:|
| Low | 128×128 | 16.000 | 0,5 MiB |
| Medium | 192×192 | 36.000 | 1,125 MiB |
| High | 256×256 | 60.000 | 2 MiB |

Diese Werte schließen Canvas, Treiber, Shader, Backdrop-Compositing und Browserpuffer aus. Ein einzelner 2560×1440-RGBA8-Puffer hat bereits rund 14,1 MiB; bei DPR 2 rund 56,3 MiB. Darum werden Auflösung und Overscan besonders begrenzt.

Beim Rasterwechsel: neue Targets anlegen, Zustand GPU-seitig resamplen/neu zuordnen, kurze kontrollierte Überblendung, alte Targets entsorgen. Bei Fehlern sofort deterministisch zurücksetzen. Kein synchroner Readback von 60.000 Punkten zur CPU. Bei Context-Loss ist ein sauberer Seed-Neustart erlaubt; die verlorene Simulation lässt sich nicht zuverlässig rekonstruieren.

## 7. Simulationspipeline und Mathematik

### Curl-Feld

Ein dreidimensionales glattes Noise-Vektorpotential `A(p,t)` erzeugt:

```text
curl(A) = (
  dAz/dy - dAy/dz,
  dAx/dz - dAz/dx,
  dAy/dx - dAx/dy
)
```

Bevorzugt analytische Ableitungen eines glatten Gradient-Noise-Verfahrens. Finite Differenzen sind ein Referenz-/Fallback-Verfahren, können aber wegen mehrfacher Noise-Auswertungen teuer werden. High startet versuchsweise mit zwei Oktaven, Medium/Low mit einer. Diese Werte sind Startparameter und werden gemessen, nicht als garantiert performante Konfiguration verkauft.

Das Feld wird zeitlich langsam verschoben/verformt; Partikel bewegen sich entlang der Strömung. Noise dient nicht bloß als unabhängiges Zittern einzelner Punkte. Keine Normalisierung jedes Vektors mit anschließendem Anspruch auf Divergenzfreiheit. Amplituden werden global begrenzt; die kombinierte Gestaltung mit Federn ist bewusst keine reine inkompressible Strömung.

### Kraftmodell

```text
acceleration =
    flowGain * (curlVelocity - velocity)
  + coreSpring * (restPosition - position)
  + pointerAttraction(position, pointer, pointerVelocity)
  + topologySpring * morphWeight * (targetPosition - position)
  + rippleForce(position, activeRipples)
  - drag * velocity
```

Kernrückstellkraft verhindert unkontrolliertes Wegdriften. Der Attractor hat einen glatten endlichen Radius, keine singuläre `1/r²`-Kraft. Geschwindigkeit und Beschleunigung erhalten harte Sicherheitsgrenzen. Topologie-Federn wirken nur bei entsprechendem Scroll-Morph-Anteil. Partikel behalten ihre Identität; es wird kein neuer CPU-Positionssatz pro Frame berechnet.

### Integration

Geplant sind zwei klare GPU-Pässe pro Simulationsschritt:

1. Velocity-Pass liest altes P/V und schreibt neue V.
2. Position-Pass liest altes P und neue V und schreibt neue P.
3. Read-/Write-Paare tauschen.

Symplektischer Euler als pragmatischer Start. Feste Simulationsschritte: 1/60 s auf High/Medium, 1/30 s auf Low. Maximal zwei Schritte pro Präsentationsframe; nach langem Stillstand keine Catch-up-Lawine. Große Zeitlücken werden verworfen; bei Wiederaufnahme läuft die Simulation aus eingefrorenem Zustand weiter. Instabilität/NaN → deterministischer Reset + gemeldeter Runtime-Zustand.

Die zustandslose Alternative berechnet `restPosition + boundedCurlDisplacement` im Vertex-Shader. Sie hat keine echte Advektion; HUD und Dokumentation nennen das offen.

### Renderkosten

Bei einem Simulationsschritt: zwei Simulations-Draws + ein Points-Draw + ein Ambient-Draw = ungefähr vier Draw Calls, ohne zusätzliche Postprocessing-Pipeline. Bei zwei Substeps entsprechend sechs. Diese Zählung beschreibt das Design, keine ausgeführte Messung. Der heutige Anspruch „ein Draw Call“ bleibt für die **Darstellung der Punktwolke**, nicht für eine vollständige GPU-Simulation. Keine Behauptung, das gesamte System werde mit einem Draw Call simuliert und gerendert.

## 8. Pointer, Feder und Klickwellen

Pointer-Ziel kommt aus CSS-Pixeln → NDC → Kamerastrahl → definierter Interaktionsebene. Kamera-Zoom, Canvas-Overscan und Scrollposition werden berücksichtigt. Für einzelne Kartenanschlüsse gelten dieselben Koordinatenverträge.

Ein CPU-seitig integrierter **einzelner** Spring-Attractor besitzt Position und Geschwindigkeit; nur dessen wenige Uniformwerte gehen an die GPU. Das ist kein CPU-Update aller Partikel.

Startwerte, in lokalen Weltkoordinaten zu kalibrieren:

| Parameter | Startwert / Grenze |
|---|---|
| Pointer-Feder | `omega = 12 s⁻¹`, `zeta = 0.9` |
| Interaktionsradius | etwa 0,5–0,8 Welt-Einheiten |
| Wake | aus begrenzter Pointergeschwindigkeit, max. ~0,2–0,3 Einheiten Offset |
| Ripple-Slots | 8 |
| Ripple-Lebensdauer | 6 s |
| Input-Debounce | 90 ms tatsächliche Eingabezeit |
| Tap | <10 px Weg, <600 ms, <5 px Scrolländerung |

Bei Pointerleave fällt die Kraft weich ab. Keine Capture-Gesten, keine Orbit-Steuerung, kein Festhalten des Scrollens. Beim Verweilen entsteht eine lokale Verdichtung durch das Kraftmodell, nicht durch neu erfundene Partikelzahl. Starke Verdichtung wird begrenzt, damit der Kern nicht weiß ausbrennt.

Die bereits vorhandenen Wellen-Slots bleiben erhalten: Nur abgelaufene Slots werden wiederverwendet. Bei voller Belegung werden zusätzliche Impulse ausgelassen, statt aktive Wellen zu löschen. Jeder Slot enthält Zentrum und Simulations-Startzeit. Wellenfront und gedämpfte Folgeberge wirken additiv auf die Kraft, mit begrenzter Gesamtauslenkung. Eingabezeit und Simulationszeit werden nicht verwechselt.

Touch-Taps können Wellen auslösen; bewegte Gesten und `pointercancel` nicht. Reduced Motion deaktiviert diese Reaktionen. Tastaturbedienung verlangt keine Partikelinteraktion, da die komplette Animation dekorativ ist.

## 9. Scroll-Morphing und DOM-Topologie

Drei gestalterische Zustände, kontinuierlich und reversibel:

- `core`: asymmetrischer organischer Energie-Kern.
- `bridge`: ein begrenzter Anteil geht in Ströme über; Kern bleibt erkennbar.
- `topology`: ausgewählte Ströme erreichen die oberen Kartenkanten; keine Linien über Text oder Buttons.

Progress wird aus der tatsächlichen Lage von Hero-Ende und Projekt-Ankerzone gewonnen. Kein pauschales Scrollprozent der gesamten Website. Beim Rückwärtsscrollen kehrt dieselbe Zuordnung zum Kern zurück. Schnelles Springen per Anker, Home/End oder Tab muss ohne Aufholanimation den korrekten Zustand erreichen. Reduced Motion zeigt einen statischen Zustand und verzichtet auf kameranahe Z-Dispersion.

DOM-Messung nach Kartenrender, Sprache, Schriftladeabschluss, Resize/Orientation und relevantem Layoutwechsel. `ResizeObserver` + explizites Invalidation-Event des Renderers. Messen gebündelt vor DOM-Schreiboperationen; keine `getBoundingClientRect()`-Schleife für jede Karte in jedem Frame. Stabile IDs und Cache. Nach einer Sprachänderung müssen alte Kartenreferenzen verworfen werden.

Bis zu acht aktive Kartenanker als Uniformarrays; nur sichtbare/nachfolgende Anker. CPU überträgt wenige Ankerwerte nach Layout- oder Scrolländerung. Dokumentkoordinaten werden nach Layoutänderungen gecacht; bei Scroll werden daraus mit aktuellem Scrolloffset die Viewportkoordinaten berechnet, ohne erneute DOM-Messung aller Karten. Die vielen Partikelziele ergeben sich GPU-seitig aus Seeds und Domain-Zuordnung.

Koordinatenvertrag bei einer Interaktionsebene mit Abstand `d` zur Kamera:

```text
viewHeight = 2 * tan(fovRadians / 2) * d / cameraZoom
ndcX = 2 * viewportX / viewportWidth - 1
ndcY = 1 - 2 * viewportY / viewportHeight
worldX = ndcX * viewHeight * aspect / 2
worldY = ndcY * viewHeight / 2
viewportY = cachedDocumentY - currentScrollY
```

Core-Anker und Kartenanker verwenden denselben Vertrag. `uCoreAnchor` hält die Kern-Austrittszone an der vorgesehenen Position, während `uCardTargets` aus den gecachten Kartendaten folgen. Pixelwerte, NDC und Weltkoordinaten werden nicht vermischt. Übergangsgewicht: `smoothstep(start, end, normalizedBridgeProgress)`; Anfang/Ende kommen aus realen Abschnittsankern und werden bei Layoutänderung neu bestimmt. Die Werte sind kein künstlich verlängertes Scroll-Dokument.

Pfadmodell: kubische Bézier-Verbindung zwischen einer Kern-Austrittszone und der Kartenoberkante; Noise als kleine Querabweichung. Partikel sampeln mit ihrer stabilen Phase entlang des Pfads. Bogenlängen-LUT wird bei Layoutänderung berechnet, damit die Bewegung nicht an Bézierparameter-Spitzen beschleunigt. Keine vollständigen Positions-Uploads pro Frame. Zielpunkte liegen vor/hinter der Karte dekorativ, Text bleibt oberhalb der Effekt-Ebene.

Mobile: Verbindungen folgen der vertikalen Kartenfolge; keine breiten Querpfade, kein permanenter Portalflug. Die Z-Annäherung bleibt gering. Ein Portal-/Fly-through-Modus wäre eine separate spätere Designfreigabe.

## 10. Point-Optik: Faux-Bokeh, Emission und Farbe

Vertex-Shader liefert positive View-Tiefe, Fokusabweichung, Wellenenergie, Domain und Farbgewicht an den Fragment-Shader. Fokus liegt am Kern; Größe wird aus Perspektive und Circle-of-Confusion-Approximation abgeleitet.

```glsl
// Vertragsskizze, kein fertiger Shader.
float coc = clamp(abs(viewDepth - focusDepth) / focusRange, 0.0, 1.0);
float radius = baseRadius * mix(1.0, bokehScale, coc);
float energyCompensation = 1.0 / max(1.0, radius * radius / (baseRadius * baseRadius));
```

Scharfe Partikel erhalten kompakte Kanten; defokussierte größere Sprites weicheren Abfall und niedrigere Alphaenergie. Point-Größe wird auf das Geräte-Limit `ALIASED_POINT_SIZE_RANGE` und das Qualitätsprofil begrenzt. High zunächst max. 10–12 Device-Pixel, Low 4–6. Bokeh nur für einen kleinen stabilen Anteil; nicht der ganze Bildschirm voller unscharfer Lichtkreise.

Dark: eine Points-Darstellung mit begrenzter additiver Emission (`SRC_ALPHA`, `ONE`), geringe Baseline und erhöhter Beitrag nur für Wellen-/Kernenergie. Überlagerung ist lineare Addition, keine HDR-Zusage. Light: normales Alpha-Blending bzw. stark reduzierte Emission zur Lesbarkeit. Dieselbe Simulation und Seed-Zuordnung bleibt erhalten.

Farben werden bewusst in Three.js-Color-Management eingebunden; eigene Shader nutzen passende Farbkonvertierung, insbesondere den dokumentierten `colorspace_fragment`-Chunk [S4]. Tone-Mapping-/Output-Verhalten ist explizit festzulegen, nicht mit zufällig passend wirkenden RGB-Werten zu kaschieren.

Ein Float-HDR-Offscreen-Buffer mit Tone-Mapping und Glow-Pass wäre eine zusätzliche, zunächst ausgeschlossene Variante: mehr Speicher, Draws, Fillrate und Tests. Selektive LDR-Emission wird zuerst abgenommen.

## 11. Ambient und Blue-Noise-Dithering

Der bestehende Ambient-Shader bleibt Grundlage. Neue Dither-Textur: 64×64, einkanaliges lineares Datenmuster, lokal, periodisch kachelbar, Nearest-Filter, keine Mipmaps. Echte Blue-Noise-Verteilung erzeugen und prüfen; beliebiges weißes Hash-Rauschen nicht als Blue Noise deklarieren.

Zielamplitude etwa ±0,5/255 am finalen 8-Bit-Ausgabewert, zu kalibrieren. Muster an Device-Pixelkoordinaten ausrichten, zeitlich zunächst stabil: kein Filmkorn-Flimmern, keine zusätzliche Bewegung unter Reduced Motion. Dither darf gemischte Transparenz/Farbkonvertierung nicht doppelt verzerren. Shaderausgabe und Browser-Compositing sind auf dunklen und hellen Verläufen visuell zu prüfen.

Verbindungen zwischen Kern und Ambient bleiben dezent: kleine Uniform-Kopplung von Wellenenergie, keine flächige Helligkeitsexplosion. Intensitätsgrenzen schützen Kartenkontrast. Hintergrund weiter maximal ca. 30 fps, auf schwachen Geräten niedriger.

## 12. HUD und Micro-Interactions

### Ehrliche Telemetrie

Daten aus tatsächlich aktiven Ressourcen, nicht fest geschriebene Marketingwerte:

```js
// Geplanter Datenvertrag; noch kein implementiertes Modul.
const telemetry = {
  mode: 'curl-sim',        // curl-deform | static | css-fallback
  quality: 'medium',      // low | medium | high
  pointCount: 36000,      // aktueller drawRange.count
  state: 'running',       // paused | hidden | lost | recovering | fallback
  cpuFrameP95Ms: null,    // nur bei ausreichenden Messsamples
  gpuMs: null,            // optional; Timer-Query verfügbar und nicht disjoint
  estimatedStateBytes: 1179648
};
```

Beispiel: `SIM: CURL_SIM · PTS: 36K · QUALITY: MED · STATE: RUNNING`. Kein `VRAM: ADAPTIVE` als vermeintliche Messung. Speicher nur als `STATE BUFFER EST.` in optionalen Details. Renderer-eigene Ressourcenstatistik ist keine komplette VRAM-Messung. GPU-Timer nur mit unterstützter Extension; unbekannt bleibt unbekannt.

HUD aktualisiert maximal zweimal pro Sekunde, nur sichtbar. Es ist kein Live-Region-Spam. Dekorativer Kurztext kann `aria-hidden` sein; Pause/Fallback-Meldungen stehen separat zugänglich bereit. Ein Statustext allein beweist keinen echten GPU-Code; nachvollziehbare Architektur und tatsächliche Messungen sind die Evidenz.

### Scramble

Auf wenige Nav-/Badge-Labels begrenzen. Dauer 150–180 ms, erster Hover pro Element und Seitenansicht, kein permanentes Flackern. Breite wird reserviert. Zugänglicher Originaltext bleibt konstant; animierter visueller Span ist `aria-hidden`. Keine Scramble-Animation auf Touch, bei Reduced Motion oder Tastaturfokus. Sprachwechsel setzt Originaltext/visuellen Zustand neu, ohne zusätzliche Listener pro Render.

### Spatial Glass

CSS-Pseudoelement mit 1-px-Border-Maske, `pointer-events:none`, reflektierte Radial-/Conic-Gradienten. Custom Properties `--glass-x`, `--glass-y`, `--glass-energy`. Pointerwerte nur für die aktive Karte, maximal einmal pro Presentation-Frame. Keine neuen RAF-Loops pro Karte. Wenn Mask-Compositing nicht unterstützt wird: einfache Border, gleiche Bedienbarkeit.

Das ist eine **Fresnel-inspirierte** Glaskante, keine berechnete Brechung eines 3D-Glaskörpers. Hoher Backdrop-Blur und zusätzliche Layer bleiben begrenzt; mobile Karten bekommen einen ruhigen statischen Reflex.

### Eyebrow-Kapsel

Vorhandene Begrüßung und `KKEEY / SYSTEMS IN MOTION` bilden eine gemeinsame zurückhaltende Kapsel. Keine neue Hauptüberschrift und keine Verdopplung des Namens. DE/EN und die erhaltenen UI-Sprachen werden geprüft. Kapsel darf mobil auf zwei Zeilen gehen, ohne das Hero-Layout zu verschieben.

## 13. Zentrale Konfiguration und Runtime-Verträge

```js
// Planwerte, vor Freigabe zu messen. Kein produktiver Code.
export const SIGNAL_CONFIG = {
  maxParticles: 60000,
  quality: {
    low:    { count:16000, grid:128, dpr:1.00, fps:30, curlOctaves:1, bokehMaxPx:6 },
    medium: { count:36000, grid:192, dpr:1.25, fps:60, curlOctaves:1, bokehMaxPx:8 },
    high:   { count:60000, grid:256, dpr:1.50, fps:60, curlOctaves:2, bokehMaxPx:12 }
  },
  ripples: { capacity:8, lifetimeSec:6, debounceMs:90 },
  topology: { maxAnchors:8, preserveSectionOrder:true },
  motion: { maxSubsteps:2, fixedStepSec:1/60, hudHz:2 },
  field: { flowGain:2.0, coreSpring:8.0, topologySpring:14.0, drag:1.5 },
  features: { simulation:true, bokeh:true, glow:true, dither:true,
              topology:true, scramble:true, glassHighlights:true }
};
```

`frame`-Vertrag: aktive Präsentationszeit, ungeclampte valide Framezeit für Qualitätsmessung, begrenztes Simulations-dt, sichtbarer Scope, Pointerzustand, Morphzustand. Die heutige Begrenzung des Scheduler-dt darf schlechte Framezeiten nicht vor dem Quality Manager verstecken.

Wesentliche Uniforms:

| Familie | Geplante Werte |
|---|---|
| Zeit/State | `uSimTime`, `uDt`, `uPositionTex`, `uVelocityTex`, `uStateResolution` |
| Feld | `uCurlAmplitude`, `uCurlFrequency`, `uCoreSpring`, `uFlowGain`, `uDrag` |
| Input | `uPointerPosition`, `uPointerVelocity`, `uPointerStrength`, `uRipples[8]` |
| Morph | `uMorph`, `uCoreAnchor`, `uCardTargets[8]`, `uCardSizes[8]`, `uAnchorCount` |
| Optik | `uFocusDepth`, `uFocusRange`, `uDpr`, `uWarm`, `uCool`, `uLight`, `uGlowGain` |
| Ambient | vorhandene Zeit/Resolution/Farben + `uBlueNoise`, `uDitherAmplitude` |

Ein Lifecycle-Owner koordiniert Init, Render, Context-Recovery und Dispose. Eventlistener, Observer und GPU-Ressourcen haben eindeutige Besitzer und werden beim Dispose entfernt. Kein mehrfaches Initialisieren derselben Bühne nach Theme-/Sprachwechsel.

## 14. Qualitätssteuerung, Sicherheit und Accessibility

Start: mobile Low; Desktop Medium. High nur nach stabilen Messsamples. Median/p95 ungeclampter aktiver Frameintervalle, getrennt von GPU-Zeit. Dokumentunsichtbarkeit, Resume-Gaps und FBO-Init werden nicht als normale Samples behandelt. Abstieg schneller als Aufstieg; Hysterese und mehrere stabile Sekunden verhindern Flattern.

Praktische Abstiegskette: zweite Noise-Oktave abschalten → Bokeh/Glow begrenzen → DPR reduzieren → Partikelzahl/Simulationsraster reduzieren → Präsentationsrate reduzieren → `curl-deform` → statische Komposition. Wiederaufstieg kontrolliert, keine ständige Target-Neuanlage.

Reduced Motion: definierte statische Komposition, keine Pointerfedern, keine Klickwellen, keine Scroll-Z-Flüge, kein Scramble, keine wandernden Glass-Highlights. Manuelle Pause friert den zuletzt dargestellten Zustand ein; das ist vom OS-Reduced-Motion-Initialzustand zu unterscheiden. Themewechsel im pausierten Zustand zeichnet nur einmal neu. Tab verborgen: keine Simulationsschritte und keine wiederholten GPU-Draws. Rückkehr: kein Zeitraffer.

Die sichtbare Pause-Steuerung bleibt erhalten; WCAG beschreibt entsprechende Mechanismen für automatisch laufende parallele Bewegung [S5]. Canvas dekorativ, Inhalt und Navigation vollständig ohne WebGL. Kein GPU-/VRAM-Identifier-Tracking. Keine externen Shader-/Noise-Requests. Kontakt wird ausschließlich durch das bestehende Formular ausgelöst, nicht durch Effekte oder Telemetrie.

## 15. Implementierungsreihenfolge und Abnahmekriterien

| Schritt | Ergebnis | Abnahme vor dem nächsten Schritt |
|---|---|---|
| A0 | Read-only Diff/Branch-/PR-Prüfung und Vorher-Aufnahmen | Kein Drift/konkurrierender Writer, unveränderte Produktion |
| A1 | Featureflags, Scope und Lifecycle | Bestehende Navigation, PDF, Sprachen, Form und Pause funktionieren |
| A2 | Curl-Verformung + Referenz-Shadertests | Eigenständige Form, keine Compilefehler, Low/Fallback sichtbar |
| A3 | GPU-State/Integration + Spring-Attractor | FBO-Probe, stabile begrenzte Werte, kein CPU-Positionsupload, sauberer Reset |
| A4 | Bestehende Ripple-Slots integrieren | Erste Welle bleibt nach Folgeklicks erhalten; Tap/Scroll-Filter |
| A5 | DOM-Anker und Topologie-Morph | DE/EN/weitere UI-Sprachen, Resize, Vor-/Rückwärtsscroll, About-Reihenfolge |
| A6 | Bokeh, selektive Emission, Dither | Farb-/Kontrastprüfung, kein weißes Ausbrennen, kein Noise-Flimmern |
| A7 | Kapsel, HUD, Scramble, Glass-Reflexe | Semantischer Text stabil, kein Layoutsprung, keine falschen Statistiken |
| A8 | Browser-/Performance-/Regressionstests | Messdaten und offen benannte BLOCKED/UNVERIFIED-Plattformen |
| A9 | Separater Review-Commit/Draft-PR-Update | Erst nach späterem Umsetzungsauftrag; kein Merge/Deploy ohne GO |

Neue Prüfungen zusätzlich zur vorhandenen Suite:

- GPU-Zustand bleibt zwischen Frames erhalten; Read/Write sind verschiedene Targets; keine NaN/Inf bei Pointer-Spitzen.
- Kleine analytische Tests des Curl-Operators und Referenz-Divergenz, mit begründetem numerischem Toleranzbereich. Kein Anspruch, das gesamte Attractor-Feld sei divergenzfrei.
- Time-step-Stabilität für 30/60-Hz-Profile, lange Framepausen, Pause/Resume, Context-Loss.
- GPU-Uniform-/State-Prüfung bestätigt fortlaufende Ripple-Zeitstempel und begrenzte Slots.
- Karten-Anker treffen bei Sprach-/Font-/Orientation-Wechsel und nach dynamischem Render die richtigen Kanten.
- Scroll-Morph ist reversibel; Ankersprung und Tab-Ziel werden nicht durch Glättung behindert.
- Tatsächliche Draw-/Simulationsanzahl, Render-Target-Lifecycle und konstante Ressourcenanzahl nach wiederholten Theme-/Resize-/Restore-Zyklen.
- Reduced Motion und Pause liefern keine wiederholten GPU-Frames, Scramble bleibt aus, zugängliche Linktexte ändern sich nicht.
- Viewports 390×844, 768×1024, 1440×900, 2560×1440 sowie DPR 1/2/3 mit begrenzter Render-DPR.
- Chromium, Firefox, reales Safari macOS/iPhone nach Verfügbarkeit; Headless-WebKit ersetzt keinen echten iPhone-Test.
- Lighthouse/PerformanceObserver-Labdaten mit dokumentiertem Netz-/CPU-Profil; Produktions-LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1 als weiterhin zu belegende Ziele.
- Scroll-/Input-Latenz und länger laufende Geräte-/Energieprüfung; Screenshots allein beweisen keine Motion-Qualität.
- Video-/Browserabnahme der Bewegung in mindestens Hero, Bridge und Topologie. Kein MP4 wird als tatsächliche Implementierung ausgegeben.

**Heute durchgeführte Prüfung:** bestehender Code gelesen, Remote-/Local-Tree abgeglichen, technische Primärquellen geprüft, Dokument auf Konsistenz geprüft. Keine Option-3-Shader gebaut, keine neue Laufzeit gemessen.

## 16. Risiken und offene Designentscheidungen

| Risiko | Konsequenz | Gegenmaßnahme |
|---|---|---|
| Curl-Simulation zu teuer | ruckelnder Scroll/Input, Akkulast | adaptive Profile, einfacher Curl-Fallback, reale Geräteprüfung |
| Float-FBO nicht verwendbar | State-Simulation startet nicht | echte Capability-Probe, kein Browsernamen-Raten |
| Großes Bokeh/Canvas-Overscan | Fillrate und Speicher steigen | Point-/DPR-/Viewport-Grenzen, kein Full-Page-Framebuffer |
| Partikel vor HTML | schlechte Lesbarkeit | Layering, Flow-Masken, geringe Emission, Kontrasttests |
| About zwischen Hero/Projekten | Bildidee passt nicht exakt zur Inhaltsstrecke | echter normaler Scroll-Scope; kein ungefragter Inhaltsumbau |
| Dynamische Karten/Sprachen | falsche Anschlusspositionen | IDs, Invalidation, gebündelte DOM-Messung |
| Pausiertes Feld + Layoutänderung | Canvas passt nicht mehr | neu messen und einmal neu zeichnen, Zeit nicht weiterführen |
| Shader-/Noise-Lizenz | rechtliche/technische Wartungsrisiken | eigener oder nachvollziehbar lizenzierter Code, lokale Quellen |
| PR #9 / automatische Daten-Synchronisation | Merge-/Inhaltskonflikt | späterer aktueller Branch-Abgleich, kanonische Daten schützen |
| Telemetrie als Deko | irreführende Engineering-Behauptung | nur echte Ressourcen/Zustände, unbekannte Werte nicht erfinden |

Noch vor der visuellen Abnahme festzulegen: Stärke der Topologie-Verbindungen, ob sie nur die erste sichtbare Kartenreihe oder weitere Karten verbinden, gewünschte Bokeh-Dichte und erlaubte Glow-Spitzen. Dafür gibt es konservative Defaults: erste sichtbare Gruppe, sparsame Hintergrund-Unschärfe, schwache nicht flächige Emission. Das generierte Bild darf nicht automatisch zu maximalen Effekten auf jedem Gerät führen.

## 17. Rollback und Freigabe

Erster späterer Umsetzungsschritt bleibt ein isolierter Review-Branch auf dem dann aktuellen Stand. Keine direkte main-Arbeit, keine DNS-/CNAME-/Workflow-Änderung. Features einzeln abschaltbar. Fällt die neue Simulation aus, übernimmt Curl-Verformung oder der bestehende statische/CSS-Fallback, nicht eine leere Bühne.

Vor einem Merge genügt das Zurücklassen/Schließen des Drafts als Rücknahme. Nach einer separat genehmigten Veröffentlichung erfolgt ein Revert über einen neuen geprüften PR; kein Reset oder Force-Push auf main. Spätere `js/data.js`-Updates dürfen beim Revert nicht verloren gehen.

**Dieses Dokument ist die technische Entscheidungsgrundlage. Seine Erstellung ist keine Freigabe zur Umsetzung oder Produktionsveröffentlichung.**

## 18. Primärquellen und Quellenabgrenzung

Die Quellen belegen Rendering-Fähigkeiten und mathematische Prinzipien, nicht die Performance oder Qualität des noch nicht gebauten Designs. Parameter, Modulgrenzen und Abnahmeplan sind eigene Architekturentscheidungen.

- [S1] Bridson, Houriham, Nordenstam: *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007. https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf
- [S2] Three.js: WebGLRenderer. https://threejs.org/docs/pages/WebGLRenderer.html
- [S3] Khronos: EXT_color_buffer_float. https://registry.khronos.org/webgl/extensions/EXT_color_buffer_float/
- [S4] Three.js: Color Management. https://threejs.org/manual/pages/color-management.html
- [S5] W3C: Understanding SC 2.2.2 Pause, Stop, Hide. https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- Three.js: ShaderMaterial. https://threejs.org/docs/pages/ShaderMaterial.html
- Three.js: Render Targets. https://threejs.org/manual/pages/rendertargets.html
- Three.js: WebGLRenderTarget. https://threejs.org/docs/pages/WebGLRenderTarget.html

Die aktuellen Three.js-Seiten können gegenüber 0.180.0 fortgeschrieben sein; Implementierungsdetails werden deshalb zusätzlich gegen die bereits lokal fixierte Version geprüft. Im Nutzertext war nur ein generischer Tutorial-Titel enthalten, keine eindeutige YouTube-URL. Ein konkretes Video wurde weder geöffnet noch als technische Quelle oder Code-Lizenz verwendet.
