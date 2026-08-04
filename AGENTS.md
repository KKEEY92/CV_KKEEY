# AGENTS.md -- KKI-Standard fuer AI-Coding-Agenten in diesem Repo

Dieses Repo wird von mehreren KI-Tools bearbeitet (Claude/Cowork, GitHub Copilot, Google Jules, Gemini/Antigravity). Diese Datei gilt fuer alle.

## Harte Regeln (nicht verhandelbar)

1. ZERO DESTRUCTION -- niemals Dateien oder Branches loeschen. Niemals bestehende Funktionalitaet oder bestehendes Design ersetzen oder kaputt machen, ausser der Owner (Kev) sagt es explizit. Additiv arbeiten, nicht ueberschreiben.
2. DRY-RUN FIRST -- bei riskanten Aenderungen erst Plan zeigen, erst nach expliziter Freigabe ausfuehren. Keine automatischen Merges nach main ohne Bestaetigung von Kev.
3. Read-First -- bestehenden Code erst lesen und verstehen, bevor Aenderungen vorgeschlagen werden. Keine Annahmen, keine Vermutungen als Fakten -- bei Unklarheit gezielt nachfragen.
4. Branch statt Umbau -- groessere oder experimentelle Aenderungen auf einem eigenen Feature-/Lab-Branch, nie direkt auf main.

## Design-Constraint (dieses Repo)

Das dynamic-orange Glassmorphism-Design (WebGL-Shader-Hintergrund, .glass-card, data-color-theme) ist die visuelle Identitaet dieses Portfolios. Es darf niemals durch generisches Standarddesign ersetzt oder optisch verschlechtert werden. Verbesserungen sind willkommen, aber ausschliesslich additiv und auf Basis des bestehenden Designs.

## Format fuer mehrstufige Plaene

Role: praezise Rolle
Context: Systemumgebung/Ziel
Constraints: harte Regeln fuer den Task
Execution_Steps: Schritt-fuer-Schritt

## Branch-Namenskonvention

agent/<tool>/<feature>, z.B. agent/copilot/readme-update, agent/jules/pr-fix. Kein direkter Push auf main.

## PR-Pflicht

Alle Aenderungen laufen ueber einen Pull Request gegen main mit ausgefuelltem PR-Template. Merge erfolgt ausschliesslich durch Kev.

## Logging

Groessere Aenderungen werden in AGENT_LOG.md eingetragen (Datum, Tool, Branch, Kurzbeschreibung, PR-Link).
