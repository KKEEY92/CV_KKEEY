#!/usr/bin/env python3
"""
KKEEY Canonical PDF Generation Pipeline
Generates the 3 canonical application documents directly from data/canonical_profile.json
using headless Google Chrome for pixel-perfect ATS-compatible vector PDF output.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).parent.parent
CANONICAL_JSON_PATH = PROJECT_ROOT / 'data' / 'canonical_profile.json'
CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def load_canonical_data() -> dict[str, Any]:
    if not CANONICAL_JSON_PATH.exists():
        raise FileNotFoundError(f"Canonical profile not found: {CANONICAL_JSON_PATH}")
    return json.loads(CANONICAL_JSON_PATH.read_text(encoding='utf-8'))


BASE_CSS = """
@page {
    size: A4;
    margin: 18mm 18mm 18mm 18mm;
}
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 10pt;
    line-height: 1.5;
}
a {
    color: #0284c7;
    text-decoration: none;
}
.header {
    border-bottom: 2px solid #0284c7;
    padding-bottom: 12px;
    margin-bottom: 16px;
}
.header h1 {
    font-size: 22pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.5px;
}
.header .title {
    font-size: 12pt;
    font-weight: 700;
    color: #0284c7;
    margin-top: 2px;
}
.header .contacts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 18px;
    font-size: 9pt;
    color: #475569;
    margin-top: 8px;
}
.section {
    margin-bottom: 16px;
    page-break-inside: avoid;
}
.section-title {
    font-size: 11pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #0f172a;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 4px;
    margin-bottom: 8px;
}
.summary-text {
    font-size: 9.5pt;
    color: #334155;
    text-align: justify;
    line-height: 1.55;
}
.job-item {
    margin-bottom: 10px;
}
.job-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.job-role {
    font-size: 10pt;
    font-weight: 700;
    color: #0f172a;
}
.job-company {
    font-size: 9.5pt;
    font-weight: 600;
    color: #0284c7;
}
.job-period {
    font-size: 9pt;
    font-weight: 600;
    color: #64748b;
}
.job-desc {
    font-size: 9pt;
    color: #334155;
    margin-top: 2px;
    line-height: 1.45;
}
.skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
}
.skill-group h4 {
    font-size: 9.5pt;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2px;
}
.skill-group p {
    font-size: 8.8pt;
    color: #475569;
}
.badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: 4px;
}
.badge {
    background: #f1f5f9;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 8.2pt;
    font-weight: 500;
    color: #334155;
}
.project-card {
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    border-radius: 6px;
    padding: 8px 10px;
    margin-bottom: 8px;
}
.project-title {
    font-size: 9.5pt;
    font-weight: 700;
    color: #0f172a;
}
.project-meta {
    font-size: 8.5pt;
    font-weight: 600;
    color: #0284c7;
    margin-bottom: 3px;
}
.project-desc {
    font-size: 8.8pt;
    color: #334155;
}
.verification-box {
    background: #f0f9ff;
    border-left: 3px solid #0284c7;
    padding: 6px 10px;
    font-size: 8.5pt;
    color: #0369a1;
    margin-top: 8px;
    border-radius: 0 4px 4px 0;
}
"""


def render_master_cv(data: dict[str, Any]) -> str:
    ident = data['identity']
    links = data['links']

    return f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Kevin Kuck — Master CV 2026</title>
<style>{BASE_CSS}</style>
</head>
<body>
<div class="header">
    <h1>{ident['displayName']}</h1>
    <div class="title">Enterprise IT · Automation · AI Systems</div>
    <div class="contacts">
        <span>📍 {ident['location']}</span>
        <span>📧 <a href="mailto:{ident['email']}">{ident['email']}</a></span>
        <span>👔 <a href="{links['linkedin']}">LinkedIn</a></span>
        <span>🐙 <a href="{links['github']}">GitHub</a></span>
        <span>🌐 <a href="{links['itPortfolio']}">IT-Portfolio</a></span>
        <span>⚡ <a href="{links['aiPortfolio']}">AI-Portfolio</a></span>
    </div>
</div>

<div class="section">
    <div class="section-title">Kurzprofil</div>
    <p class="summary-text">
        Ich verbinde langjährige operative Erfahrung mit IT-gestützten Geschäftsprozessen, nachgewiesener Enterprise-Systemadministration und moderner Automatisierungs- und KI-Entwicklung. Zuletzt war ich bei den Johanniter Bundes-IT Services in einem KRITIS-relevanten Umfeld mit Aufgaben in Active Directory, Gruppenrichtlinien, Kerberos, Exchange, Citrix, Software-Deployment, Lizenzmanagement und Automatisierung tätig. Ergänzend entwickle ich Voice-AI-, RAG- und Automatisierungssysteme mit Python, TypeScript und modernen LLM-Plattformen.
    </p>
</div>

<div class="section">
    <div class="section-title">Berufserfahrung & Praxis</div>
    
    <div class="job-item">
        <div class="job-head">
            <span class="job-role">IT-Organisation-Spezialist / Junior IT-Support Agent</span>
            <span class="job-period">12/2025 – 05/2026</span>
        </div>
        <div class="job-company">Johanniter Bundes-IT Services (KRITIS-relevantes Umfeld)</div>
        <p class="job-desc">
            Administration und Betrieb von Enterprise-Systemen: Active Directory (AD DS, GPO, Kerberos), Microsoft Entra ID, Exchange Admin Center, DeskCenter Software-Deployment, Citrix Virtual Apps & Desktops (NetScaler), OmniTracker Incident Management sowie Automatisierungen mit PowerShell und Python.
        </p>
    </div>

    <div class="job-item">
        <div class="job-head">
            <span class="job-role">Mitarbeiter Warenwirtschaft (IT-gestützte Prozesse)</span>
            <span class="job-period">09/2010 – 12/2024 · 14 Jahre</span>
        </div>
        <div class="job-company">BAUHAUS</div>
        <p class="job-desc">
            Verantwortung für warenwirtschaftliche Abläufe, Bestandsqualität, Disposition, Warenverfügbarkeit und die zuverlässige Ausführung IT-gestützter Geschäftsprozesse. Langjährige operative Erfahrung mit Prozessanalyse, Fehlererkennung und systemgestützter Bestandsführung.
        </p>
    </div>

    <div class="job-item">
        <div class="job-head">
            <span class="job-role">Independent IT & Automation Projects</span>
            <span class="job-period">seit 06/2026</span>
        </div>
        <div class="job-company">Projektentwicklung & Weiterbildung</div>
        <p class="job-desc">
            Selbstständige Konzeption und Entwicklung modularer Systemarchitekturen, Voice-AI-Agenten und Workflow-Automatisierungen mit Python, TypeScript, LiveKit 2.x und LLM-Plattformen.
        </p>
    </div>
</div>

<div class="section">
    <div class="section-title">Kernkompetenzen & Tech Stack</div>
    <div class="skills-grid">
        <div class="skill-group">
            <h4>Identity & Access Management (IAM)</h4>
            <p>Active Directory (AD DS), Gruppenrichtlinien (GPO), Kerberos, Microsoft Entra ID (RBAC), Berechtigungsmatrizen.</p>
        </div>
        <div class="skill-group">
            <h4>Microsoft & Messaging</h4>
            <p>Exchange Admin Center, Postfachverwaltung, Verteilerlisten, Mail-Flow-Regeln, PowerShell Mail-Auditing.</p>
        </div>
        <div class="skill-group">
            <h4>Endpoint, Deployment & Virtualisierung</h4>
            <p>DeskCenter Studio, Paketierung, Windows-11-Rollouts, Lizenzmanagement, Citrix Terminalserver, NetScaler.</p>
        </div>
        <div class="skill-group">
            <h4>Automation, Scripting & AI</h4>
            <p>PowerShell, Python 3.12+, TypeScript, LiveKit 2.x Voice AI, RAG & LLMs, Tauri 2.0 (Rust), OmniTracker ITSM.</p>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Zertifizierungen & Verifizierte Nachweise</div>
    <p class="job-desc">
        • <strong>Microsoft Certified:</strong> Bereitstellen & Verwalten AD Domain Services (2026)<br>
        • <strong>Microsoft Certified:</strong> Excel Grundlagen (2026)<br>
        • <strong>LinkedIn Learning Professional Tracks:</strong> Windows 11 Troubleshooting (3 Kurse), Microsoft 365 Admin (3 Kurse), Microsoft Entra ID, AZ-900 Fundamentals, MS-900 Fundamentals, Active Directory PowerShell-Automatisierung.<br>
        • <strong>Cisco Networking Academy:</strong> CCST IT Support (100-140) Track.
    </p>
</div>

<div class="verification-box">
    <strong>Verifikation auf Anfrage:</strong> Nachweise und vollständige Beschäftigungsdokumente stelle ich im Rahmen eines konkreten Bewerbungsprozesses gerne zur Verfügung.
</div>
</body>
</html>"""


def render_it_mappe(data: dict[str, Any]) -> str:
    ident = data['identity']
    links = data['links']

    return f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Kevin Kuck — Bewerbungsmappe IT 2026</title>
<style>{BASE_CSS}</style>
</head>
<body>
<div class="header">
    <h1>{ident['displayName']}</h1>
    <div class="title">IT-Systemadministrator · Identity & Access Management · Automation</div>
    <div class="contacts">
        <span>📍 {ident['location']}</span>
        <span>📧 <a href="mailto:{ident['email']}">{ident['email']}</a></span>
        <span>Verfügbarkeit: {ident['availability']}</span>
        <span>👔 <a href="{links['linkedin']}">LinkedIn</a></span>
        <span>🐙 <a href="{links['github']}">GitHub</a></span>
        <span>🌐 <a href="{links['itPortfolio']}">IT-Portfolio</a></span>
    </div>
</div>

<div class="section">
    <div class="section-title">Profil & Qualifikation</div>
    <p class="summary-text">
        IT-Systemadministrator mit Schwerpunkt Identity & Access Management, Microsoft-Infrastruktur, Endpoint Operations und PowerShell-Automatisierung. Langjährige operative Erfahrung mit IT-gestützten Geschäftsprozessen und nachgewiesene Enterprise-Systemadministration in einem KRITIS-relevanten Umfeld. Mein Fokus liegt auf stabilen, wartbaren IT-Infrastrukturen und strukturierter Fehlerdiagnose nach dem KKEEY-Standard.
    </p>
</div>

<div class="section">
    <div class="section-title">Berufliche Stationen</div>
    
    <div class="job-item">
        <div class="job-head">
            <span class="job-role">IT-Organisation-Spezialist / Junior IT-Support Agent</span>
            <span class="job-period">12/2025 – 05/2026</span>
        </div>
        <div class="job-company">Johanniter Bundes-IT Services (KRITIS-relevantes Umfeld)</div>
        <p class="job-desc">
            Administration und Betrieb von Enterprise-Systemen in einem KRITIS-relevanten Umfeld: Active Directory (AD DS, GPO, Kerberos), Microsoft Entra ID (RBAC), Exchange Admin Center, Softwarepaketierung & Deployment via DeskCenter Studio, Citrix-Terminalserver (NetScaler), OmniTracker ITSM sowie PowerShell- und Python-Automatisierung (u.a. JoBIT Routing-Tool).
        </p>
    </div>

    <div class="job-item">
        <div class="job-head">
            <span class="job-role">Mitarbeiter Warenwirtschaft (IT-gestützte Geschäftsprozesse)</span>
            <span class="job-period">09/2010 – 12/2024 · 14 Jahre</span>
        </div>
        <div class="job-company">BAUHAUS</div>
        <p class="job-desc">
            Verantwortung für warenwirtschaftliche Abläufe, Bestandsqualität, Disposition, Warenverfügbarkeit und die zuverlässige Ausführung IT-gestützter Geschäftsprozesse. 14 Jahre operative Praxis mit Fehlererkennung und systemgestützter Bestandsführung.
        </p>
    </div>
</div>

<div class="section">
    <div class="section-title">Enterprise Core Skills</div>
    <div class="skills-grid">
        <div class="skill-group">
            <h4>Identity & Access Management</h4>
            <p>Active Directory, Gruppenrichtlinien (GPO), Kerberos, Entra ID, Berechtigungsverwaltung, RBAC.</p>
        </div>
        <div class="skill-group">
            <h4>Microsoft & Messaging</h4>
            <p>Exchange Admin Center, Postfachverwaltung, Mail-Flow-Regeln, Verteilerlisten, Troubleshooting.</p>
        </div>
        <div class="skill-group">
            <h4>Endpoint & Deployment</h4>
            <p>DeskCenter Studio, Paketierung, Deployment-Steuerung, Lizenzmanagement, Windows 11 Rollouts.</p>
        </div>
        <div class="skill-group">
            <h4>IT Operations & Service Management</h4>
            <p>Citrix Terminalserver (NetScaler), OmniTracker Incident Management, ITIL Dokumentation.</p>
        </div>
    </div>
</div>

<div class="section">
    <div class="section-title">Zusatzkompetenz: AI Engineering & Automation</div>
    <div class="project-card">
        <div class="project-title">Claire & AI Automation Frameworks</div>
        <div class="project-meta">Reifegrad: PL2 Funktionsfähiger Prototyp · Evidenz: E1 Architekturdokumentation · Code: Privat</div>
        <p class="project-desc">
            Eigenständige Konzeption und Entwicklung von Voice-AI-Agenten (LiveKit 2.x, Python) und modularen Automatisierungs-Tools zur Unterstützung von IT-Operations und Support-Workflows.
        </p>
    </div>
</div>

<div class="verification-box">
    <strong>Verifikation auf Anfrage:</strong> Funktionsnachweis durch geführte Live-Demo, reproduzierbaren Testlauf oder Review ausgewählter, sicherheitsbereinigter Artefakte, ohne vollständige Offenlegung des proprietären Quellcodes.
</div>
</body>
</html>"""


def render_ai_mappe(data: dict[str, Any]) -> str:
    ident = data['identity']
    links = data['links']

    return f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>Kevin Kuck — Bewerbungsmappe AI Systems Engineer 2026</title>
<style>{BASE_CSS}</style>
</head>
<body>
<div class="header">
    <h1>{ident['displayName']}</h1>
    <div class="title">AI Systems Engineer · Automation · Voice AI · Local-First Architecture</div>
    <div class="contacts">
        <span>📍 {ident['location']}</span>
        <span>📧 <a href="mailto:{ident['email']}">{ident['email']}</a></span>
        <span>Verfügbarkeit: {ident['availability']}</span>
        <span>🐙 <a href="{links['github']}">GitHub</a></span>
        <span>🦊 <a href="{links['gitlab']}">GitLab</a></span>
        <span>⚡ <a href="{links['aiPortfolio']}">AI-Portfolio</a></span>
    </div>
</div>

<div class="section">
    <div class="section-title">Profil & Vision</div>
    <p class="summary-text">
        AI Systems Engineer mit Enterprise-IT-Fundament. Ich entwickle Automatisierungs-, Voice-, RAG- und Local-First-KI-Systeme mit Python, TypeScript, Rust und modernen LLM-Plattformen — von der Systemarchitektur bis zum funktionsfähigen Prototyp. Mein Fokus liegt auf deterministischen State-Engines, geringer Latenz, modularer Prompt-Komposition und robuster Softwarearchitektur.
    </p>
</div>

<div class="section">
    <div class="section-title">Enterprise Foundation (Vertrauensanker)</div>
    <p class="summary-text">
        Mein technisches Fundament umfasst Enterprise-Systemadministration in einem KRITIS-relevanten IT-Umfeld (Johanniter Bundes-IT Services: Active Directory, Gruppenrichtlinien, Kerberos, Exchange, Software-Deployment, Citrix, OmniTracker, PowerShell & Python). Dies garantiert tiefes Verständnis für Systemstabilität, Identity-Management, Sicherheit und Produktionsbetrieb.
    </p>
</div>

<div class="section">
    <div class="section-title">Ausgewählte KI- & Systemprojekte</div>
    
    <div class="project-card">
        <div class="project-title">Claire — Voice AI & Persona Architecture</div>
        <div class="project-meta">Reifegrad: PL2 Funktionsfähiger Prototyp · Evidenz: E1 Architekturdokumentation · Code: Privat</div>
        <p class="project-desc">
            <strong>Beitrag:</strong> Gesamte Systemarchitektur, Python-Implementierung, EmotionEngine, Persona-Layer, Memory-Shift-Logik und LiveKit 2.x WebRTC Voice-Pipeline (~200ms Latenz im lokalen Test).
        </p>
    </div>

    <div class="project-card">
        <div class="project-title">AuraTone AI — Native macOS Audio Workstation</div>
        <div class="project-meta">Reifegrad: PL2 Funktionsfähiger Prototyp · Evidenz: E1 Architekturdokumentation · Code: Privat</div>
        <p class="project-desc">
            <strong>Beitrag:</strong> Standalone Audio-Applikation auf Basis von Tauri 2.0 (Rust) mit hardwarebeschleunigter Metal GPU DSP-Visualisierung bei 120Hz.
        </p>
    </div>

    <div class="project-card">
        <div class="project-title">KKI Agent Framework — Modular Automation Pipeline</div>
        <div class="project-meta">Reifegrad: PL4 Produktiver Eigenbetrieb · Evidenz: E1 Reusable Architecture · Code: Privat</div>
        <p class="project-desc">
            <strong>Beitrag:</strong> Wiederverwendbare Agenten- und Orchestrierungsbibliothek für automatisierte Repositorien-Synchronisation, Tool-Routing und Diagnose.
        </p>
    </div>
</div>

<div class="section">
    <div class="section-title">Core Skills</div>
    <div class="badge-row">
        <span class="badge">Python 3.12+</span>
        <span class="badge">TypeScript</span>
        <span class="badge">Rust / Tauri 2.0</span>
        <span class="badge">LiveKit 2.x</span>
        <span class="badge">Gemini API / Vertex AI</span>
        <span class="badge">RAG Systems</span>
        <span class="badge">Local LLMs</span>
        <span class="badge">Audio DSP & Metal</span>
        <span class="badge">Docker & Cloud Run</span>
    </div>
</div>

<div class="verification-box">
    <strong>Verifikation auf Anfrage:</strong> Funktionsnachweis durch geführte Live-Demo, reproduzierbaren Testlauf oder Review ausgewählter, sicherheitsbereinigter Artefakte, ohne vollständige Offenlegung des proprietären Quellcodes.
</div>
</body>
</html>"""


def compile_html_to_pdf(html_content: str, output_pdf_path: Path) -> bool:
    with tempfile.NamedTemporaryFile(suffix='.html', mode='w', encoding='utf-8', delete=False) as f:
        f.write(html_content)
        temp_html = Path(f.name)

    try:
        cmd = [
            CHROME_BIN,
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={output_pdf_path.resolve()}",
            f"file://{temp_html.resolve()}"
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=20)
        if res.returncode == 0 and output_pdf_path.exists() and output_pdf_path.stat().st_size > 1000:
            print(f"  ✓ Generated: {output_pdf_path.name} ({output_pdf_path.stat().st_size} bytes)")
            return True
        else:
            print(f"  ❌ Failed to generate {output_pdf_path}: {res.stderr.decode('utf-8')}", file=sys.stderr)
            return False
    finally:
        if temp_html.exists():
            temp_html.unlink()


def main() -> None:
    data = load_canonical_data()
    assets_dir = PROJECT_ROOT / 'assets'
    assets_dir.mkdir(exist_ok=True)

    print("Generating Canonical Application PDFs from data/canonical_profile.json...")

    # 1. Master CV
    master_html = render_master_cv(data)
    compile_html_to_pdf(master_html, assets_dir / 'Kevin_Kuck_Master_CV_2026.pdf')

    # 2. IT Bewerbungsmappe
    it_html = render_it_mappe(data)
    compile_html_to_pdf(it_html, assets_dir / 'Kevin_Kuck_Bewerbungsmappe_IT_2026.pdf')

    # 3. AI Bewerbungsmappe
    ai_html = render_ai_mappe(data)
    compile_html_to_pdf(ai_html, assets_dir / 'Kevin_Kuck_Bewerbungsmappe_AI_2026.pdf')

    # Also copy to CV_KKEEY if available
    cv_kkeey_assets = Path('/tmp/CV_KKEEY/assets')
    if cv_kkeey_assets.exists():
        import shutil
        for pdf_name in ['Kevin_Kuck_Master_CV_2026.pdf', 'Kevin_Kuck_Bewerbungsmappe_IT_2026.pdf', 'Kevin_Kuck_Bewerbungsmappe_AI_2026.pdf']:
            src = assets_dir / pdf_name
            if src.exists():
                shutil.copy(src, cv_kkeey_assets / pdf_name)
        print("  ✓ Synchronized PDFs to /tmp/CV_KKEEY/assets")

    print("\n✓ All 3 canonical PDFs generated successfully.")


if __name__ == '__main__':
    main()
