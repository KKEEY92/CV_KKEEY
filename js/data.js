/**
 * KKEEY Portfolio — Inhaltsdatei
 * Hier alle Texte, Projekte, Skills und Timeline pflegen.
 * Kein Code-Wissen nötig. Einfach Werte ändern und speichern.
 */
window.KK_DATA = {

  // ─── HERO ───────────────────────────────────────────────────────────────────
  hero: {
    name: 'Kevin Kuck',
    greeting: { de: 'Hallo, ich bin', en: "Hi, I'm" },
    tagline: 'IT · AI · AUDIO · 15+ JAHRE PRAXIS',
    roles: {
      de: [
        'IT Systems Engineer',
        'AI Agent Architekt',
        'Neurodivergenter Systemdenker',
        'DJ & Audio Engineer',
        'KMU Prozess-Automatisierer',
      ],
      en: [
        'IT Systems Engineer',
        'AI Agent Architect',
        'Neurodivergent Systems Thinker',
        'DJ & Audio Engineer',
        'SME Automation Expert',
      ],
    },
    cta1: { de: 'Projekte ansehen', en: 'View Projects' },
    cta2: { de: 'Kontakt aufnehmen', en: 'Get in touch' },
    cta3: { de: 'CV herunterladen', en: 'Download CV' },
    available: { de: 'Verfügbar ab sofort', en: 'Available now' },
  },

  // ─── TRIO ───────────────────────────────────────────────────────────────────
  trio: [
    {
      icon: '⚙️',
      label: { de: 'Operationale Tiefe', en: 'Operational Depth' },
      sub:   { de: '15 J. Inventory & Supply Chain · BAUHAUS', en: '15 Yrs Inventory & Supply Chain · BAUHAUS' },
      detail: {
        de: 'Systemdenken aus dem echten Handelsbetrieb. Ich weiß wie operative KMU wirklich funktionieren — nicht aus Büchern, sondern aus 15 Jahren täglicher Praxis.',
        en: 'Systems thinking from real-world operations. I know how SMEs actually function — not from theory, but 15 years of hands-on practice.',
      },
    },
    {
      icon: '🤖',
      label: { de: 'AI Agent Architekt', en: 'AI Agent Architect' },
      sub:   { de: '100% From Scratch · GitHub Actions · Cloud Run', en: '100% From Scratch · GitHub Actions · Cloud Run' },
      detail: {
        de: 'Ich baue Agentensysteme komplett ohne Frameworks auf der grünen Wiese – jeder Code-Ordner startet leer mit einer CLAUDE.md oder AGENT.md. Deployments laufen via Docker, GitHub Actions und Google Cloud Run.',
        en: 'I build agent systems entirely from scratch without frameworks – every code folder starts empty with a CLAUDE.md or AGENT.md. Deployments run via Docker, GitHub Actions, and Google Cloud Run.',
      },
    },
    {
      icon: '🎚️',
      label: { de: 'Audio & DJ Engineering', en: 'Audio & DJ Engineering' },
      sub:   { de: '10 Jahre · 5.000+ Tracks · Traktor Pro · Rekordbox', en: '10 Years · 5,000+ Tracks · Traktor Pro · Rekordbox' },
      detail: {
        de: 'Tiefe Domainkenntnis in Audio-DSP, harmonischem Mixen und Musikanalyse. Fundament für AuraTone AI.',
        en: 'Deep domain knowledge in audio DSP, harmonic mixing, and music analysis. The foundation of AuraTone AI.',
      },
    },
  ],

  // ─── PROJEKTE ───────────────────────────────────────────────────────────────
  projects: [
    {
      id: 'claire-v25-native-audio',
      repo: 'KKEEY92/claire-v2.5-native-audio',
      status: { latestTag: null }, // no git tag exists on this repo yet — do not fabricate one
      name: 'Claire V2.5 Native Audio',
      color: '#00d4aa',
      colorRgb: '0,212,170',
      tag: '● Produktiv v2.5 · Open Source · LiveKit 2.x',
      sub: { de: 'Voice AI Agent · Full-Duplex · ~200ms Latenz · Local LLM Switch', en: 'Voice AI Agent · Full-Duplex · ~200ms Latency · Local LLM Switch' },
      desc: {
        de: 'Echtzeit Voice AI Agent auf LiveKit 2.x Agents Basis. Unterstützt Google Speech/TTS, Gemini 2.5 Flash sowie per .env Switch ein lokales LM Studio LLM (Qwen2.5-7B). Enthält EmotionEngine v2 (±0.08 Energy Clamp), Silero VAD, Google Drive RAG Gedächtnis und WebGL Audio Visualizer.',
        en: 'Real-time voice AI agent built on LiveKit 2.x Agents framework. Supports Google Speech/TTS, Gemini 2.5 Flash, and a .env switch to local LM Studio (Qwen2.5-7B). Features EmotionEngine v2 (±0.08 energy clamp), Silero VAD, Google Drive RAG memory, and WebGL audio visualizer.',
      },
      stack: ['Python 3.13', 'LiveKit Agents 2.x', 'Gemini 2.5 Flash', 'LM Studio (Local LLM)', 'Silero VAD', 'Google Drive RAG', 'React / Vite'],
      link: 'https://github.com/KKEEY92/claire-v2.5-native-audio',
      linkLabel: { de: 'Auf GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      id: 'auratone-ai',
      repo: 'KKEEY92/AuraTone-AI-by-KKEEy',
      status: { type: 'implemented', codeVersion: '2.0.0', latestTag: 'v1.3.0' },
      name: 'AuraTone AI Desktop',
      color: '#f7a841',
      colorRgb: '247,168,65',
      sub: { de: 'Native Audio-Analyse-Workstation · Tauri · Rust · Python DSP', en: 'Native Audio Analysis Workstation · Tauri · Rust · Python DSP' },
      desc: {
        de: 'Native Desktop-Anwendung für Audioanalyse und harmonische Musikorganisation. Der Tauri-/Rust-Kern verwaltet lokale Dateien, SQLite-Datenbestände und Waveform-Peaks. Die Python-DSP-Pipeline analysiert Lautheit, BPM und Tonart mit ffmpeg, librosa und NumPy.',
        en: 'Native desktop app for audio analysis and harmonic music organization. The Tauri/Rust core manages local files, SQLite data, and waveform peaks. The Python DSP pipeline analyzes loudness, BPM, and key using ffmpeg, librosa, and NumPy.',
      },
      stack: ['Tauri 2', 'Rust', 'React 19', 'Python DSP', 'ffmpeg ebur128', 'librosa', 'SQLite', 'Metal Shader + CPU-Fallback'],
      note: {
        de: 'Codeversion 2.0.0, aktueller Git-Tag v1.3.0. CI-Workflow vorhanden; Release-, Signierungs- und Notarisierungsstatus werden separat ausgewiesen.',
        en: 'Code version 2.0.0, current git tag v1.3.0. CI workflow in place; release, signing, and notarization status tracked separately.',
      },
      links: [
        { href: 'https://github.com/KKEEY92/AuraTone-AI-by-KKEEy', label: { de: 'Quellcode ansehen →', en: 'View source →' } },
        { href: 'https://github.com/KKEEY92/AuraTone-AI-by-KKEEy/blob/main/aura_tone_dsp/BENCHMARK.md', label: { de: 'Beispielanalyse & Benchmark →', en: 'View example analysis & benchmark →' } },
        { href: 'https://github.com/KKEEY92/AuraTone-AI-by-KKEEy/blob/main/docs/auratone-dashboard.png', label: { de: 'Screenshot ansehen →', en: 'View screenshot →' } },
        { href: 'https://github.com/KKEEY92/AuraTone-AI-by-KKEEy/blob/main/CHANGELOG.md', label: { de: 'Release-Status (Changelog) →', en: 'Release status (changelog) →' } },
      ],
    },
    {
      id: 'ai-virtual-calling',
      repo: 'KKEEY92/AI-Virtual-Calling-and-Write-a-friend',
      status: { latestTag: null },
      name: 'AI Virtual Calling',
      color: '#f43f5e',
      colorRgb: '244,63,94',
      tag: '● Demo / Prototype · WebRTC · React',
      sub: { de: 'Gemini Live Voice UI mit Video-Avatar', en: 'Gemini Live Voice UI with Video Avatar' },
      desc: {
        de: 'Full-Stack WebRTC-Applikation. React-Frontend mit Tailwind (Liquid Glass Design) kommuniziert über WebSockets und FastAPI mit der Gemini Multimodal Live API. Echtzeit-Sprache, Avatar-Animation und Screen-Sharing.',
        en: 'Full-stack WebRTC application. React frontend with Tailwind (Liquid Glass Design) communicates via WebSockets & FastAPI with Gemini Multimodal Live API. Real-time voice, video avatar animation & screen sharing.',
      },
      stack: ['React', 'TypeScript', 'WebRTC', 'Python FastAPI', 'Gemini Multimodal Live API'],
      link: 'https://github.com/KKEEY92/AI-Virtual-Calling-and-Write-a-friend',
      linkLabel: { de: 'Auf GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      id: 'afm-3-chat',
      repo: 'KKEEY92/afm-chat',
      status: { latestTag: null },
      name: 'AFM-3 Chat',
      color: '#3b82f6',
      colorRgb: '59,130,246',
      tag: '● Local macOS App · Apple Foundation Model',
      sub: { de: 'Swift WKWebView · Apple Foundation Model · Offline', en: 'Swift WKWebView · Apple Foundation Model · Offline' },
      desc: {
        de: 'Native macOS-App mit Swift WKWebView für das Apple Foundation Model (AFM-3-Core) — 100% lokal ohne Cloud. Matrix Rain UI, Obsidian Vault RAG, macOS say Neural TTS, ComfyUI Bildgenerierung & Push-to-Talk.',
        en: 'Native macOS app with Swift WKWebView for Apple Foundation Model (AFM-3-Core) — 100% local without cloud. Matrix Rain UI, Obsidian Vault RAG, macOS say Neural TTS, ComfyUI image gen & Push-to-Talk.',
      },
      stack: ['Swift / WKWebView', 'Python http.server', 'Apple AFM-3-Core', 'ComfyUI API', 'macOS Neural TTS'],
      link: 'https://github.com/KKEEY92/afm-chat',
      linkLabel: { de: 'Auf GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      id: 'architecture-documentation',
      repo: 'KKEEY92/Claire-V2-Architecture',
      status: { type: 'documentation', codeVersion: null, latestTag: null },
      name: 'Architecture Documentation',
      color: '#94a3b8',
      colorRgb: '148,163,184',
      sub: { de: 'C4-Architekturdokumentation zu Claire V2 & AuraTone AI', en: 'C4 architecture documentation for Claire V2 & AuraTone AI' },
      desc: {
        de: 'Öffentliche Architekturdokumentation zu den privaten Implementierungen von Claire V2 (LiveKit-Backend) und AuraTone AI — zeigt Systemgrenzen, Komponenten, Datenflüsse und technische Entscheidungen, ohne den privaten Quellcode offenzulegen. Die separate Standalone-Variante Claire V2.5 Native Audio ist ein eigenes, öffentliches Repository (siehe eigene Karte).',
        en: 'Public architecture documentation for the private Claire V2 (LiveKit backend) and AuraTone AI implementations — shows system boundaries, components, data flows, and technical decisions without exposing the private source code. The separate standalone Claire V2.5 Native Audio variant is its own public repository (see its own card).',
      },
      stack: ['C4-Modell', 'Mermaid', 'System Context', 'Container Architecture', 'Voice Pipeline', 'Memory Architecture', 'Desktop Architecture'],
      links: [
        { href: 'https://github.com/KKEEY92/Claire-V2-Architecture', label: { de: 'Claire V2 Architektur →', en: 'Claire V2 architecture →' } },
        { href: 'https://github.com/KKEEY92/AuraTone-Architecture', label: { de: 'AuraTone Architektur →', en: 'AuraTone architecture →' } },
      ],
    },
    {
      id: 'sortiere-py',
      repo: 'KKEEY92/sortiere.py',
      status: { latestTag: null },
      name: 'sortiere.py',
      color: '#22c55e',
      colorRgb: '34,197,94',
      tag: '● CLI Utility v1.0 · Open Source',
      sub: { de: 'Universeller CLI Datei-Organizer · Python 3.12', en: 'Universal CLI File Organizer · Python 3.12' },
      desc: {
        de: 'Intelligenter Datei-Organizer mit token-basiertem Matching, Dry-Run-Modus und 5-Pillar-Kategorisierung. Sortiert beliebige Verzeichnisse nach konfigurierbaren Regeln.',
        en: 'Smart file organizer with token-based matching, dry-run mode, and 5-pillar categorization. Sorts any directory by configurable rules.',
      },
      stack: ['Python 3.12', 'CLI / argparse', 'OS / Pathlib', 'Token Matching', 'Dry-Run Mode'],
      link: 'https://github.com/KKEEY92',
      linkLabel: { de: 'GitHub-Profil →', en: 'GitHub profile →' },
    },
  ],

  // ─── ZERTIFIZIERUNGEN ───────────────────────────────────────────────────────
  // Nur echte, geprüfte Zertifizierungen als Karten. Kursabschlüsse (LinkedIn
  // Learning etc.) stehen als kompakte Liste weiter unten unter `education`.
  certifications: [
    {
      name: 'Microsoft KI-Grundlagen',
      color: '#0ea5e9',
      colorRgb: '14,165,233',
      tag: '✓ Microsoft Certified',
      sub: { de: 'Zertifizierung · 2026', en: 'Certification · 2026' },
      desc: {
        de: 'Offizielle Microsoft-Zertifizierung zu KI-Grundlagen — Konzepte, Einsatzbereiche und verantwortungsvoller Umgang mit generativer KI.',
        en: 'Official Microsoft certification covering AI fundamentals — concepts, use cases, and responsible use of generative AI.',
      },
      link: 'https://www.linkedin.com/in/kevin-kuck-it/details/certifications/',
      linkLabel: { de: 'Nachweis auf LinkedIn →', en: 'View credential on LinkedIn →' },
    },
  ],

  // ─── WEITERBILDUNG ──────────────────────────────────────────────────────────
  // Kursabschlüsse ohne formale Prüfung (LinkedIn Learning etc.) — kompakte
  // Liste statt Karten, um sie von echten Zertifizierungen abzugrenzen.
  education: {
    label: { de: 'Weiterbildung', en: 'Further education' },
    linkedinLink: 'https://www.linkedin.com/in/kevin-kuck-it/details/certifications/',
    linkedinLabel: { de: 'Alle Nachweise auf LinkedIn ansehen →', en: 'View all credentials on LinkedIn →' },
    items: [
      { de: 'Grundwissen Generative KI · Microsoft & LinkedIn Learning Lernpfad (4 Std. 25 Min.) — Mai 2026', en: 'Generative AI Foundations · Microsoft & LinkedIn Learning path (4h 25min) — May 2026' },
      { de: 'Was ist Generative KI? · LinkedIn Learning + PMI — Mai 2026', en: 'What Is Generative AI? · LinkedIn Learning + PMI — May 2026' },
      { de: 'Generative KI: Die Entwicklung einer durchdachten Online-Suche · LinkedIn Learning + PMI — Mai 2026', en: 'Generative AI: Developing Thoughtful Online Search · LinkedIn Learning + PMI — May 2026' },
      { de: 'Künstliche Intelligenz Grundlagen · LinkedIn Learning — 2026', en: 'Artificial Intelligence Foundations · LinkedIn Learning — 2026' },
      { de: 'Mit KI zusammenarbeiten · LinkedIn Learning — 2026', en: 'Collaborating with AI · LinkedIn Learning — 2026' },
      { de: 'Medienkompetenz im KI-Zeitalter — 2026', en: 'Media Literacy in the AI Era — 2026' },
      { de: 'Active Directory-Verwaltung automatisieren mit PowerShell · LinkedIn Learning — Mai 2026', en: 'Automating Active Directory Management with PowerShell · LinkedIn Learning — May 2026' },
    ],
  },

  // ─── SKILLS ─────────────────────────────────────────────────────────────────
  skillGroups: [
    {
      label: { de: 'Sprachen & Core Code', en: 'Languages & Core Code' },
      skills: [
        { name: 'Python 3.12+ (AsyncIO, FastAPI)', pct: 92 },
        { name: 'TypeScript',                      pct: 85 },
        { name: 'JavaScript / React 19 / Vite 6',   pct: 82 },
        { name: 'PowerShell Automatisierung',      pct: 82 },
        { name: 'HTML5 / Modern Vanilla CSS',      pct: 88 },
        { name: 'Rust / Tauri 2.0 (Native Core)',   pct: 75 },
      ],
    },
    {
      label: { de: 'AI, Agents & Voice', en: 'AI, Agents & Voice' },
      skills: [
        { name: 'From-Scratch Agent Architekturen', pct: 95 },
        { name: 'Gemini API / Vertex AI',           pct: 94 },
        { name: 'LiveKit 2.x Agents (Voice AI)',    pct: 92 },
        { name: 'Local LLMs (LM Studio, Qwen2.5)',  pct: 88 },
        { name: 'RAG Systems (Drive & Obsidian RAG)', pct: 86 },
        { name: 'ComfyUI / Multimodal AI',          pct: 82 },
      ],
    },
    {
      label: { de: 'Systeme, Cloud & DevOps', en: 'Systems, Cloud & DevOps' },
      skills: [
        { name: 'Active Directory & Entra ID (IAM)', pct: 88 },
        { name: 'Docker & Containerization',        pct: 85 },
        { name: 'Google Cloud Run & Serverless',    pct: 85 },
        { name: 'GitHub Actions (CI/CD Pipelines)', pct: 84 },
        { name: 'FastAPI / Node.js Backend',        pct: 80 },
        { name: 'SQLite / PostgreSQL / Firebase',   pct: 82 },
      ],
    },
    {
      label: { de: 'Audio DSP & Enterprise Ops', en: 'Audio DSP & Enterprise Ops' },
      skills: [
        { name: 'Traktor Pro 4 / Rekordbox',        pct: 95 },
        { name: 'Inventory Management & Supply Chain', pct: 95 },
        { name: 'Audio DSP (librosa, ffmpeg)',      pct: 85 },
        { name: 'Apple Metal GPU Acceleration',     pct: 80 },
        { name: 'KRITIS IT & Endpoint Security',    pct: 85 },
      ],
    },
  ],

  // ─── KARRIERE TIMELINE ──────────────────────────────────────────────────────
  timeline: [
    {
      period:  { de: 'bis Ende 2024 · 15 Jahre', en: 'Until end 2024 · 15 years' },
      role:    { de: 'Inventory Management', en: 'Inventory Management' },
      company: 'BAUHAUS',
      color:   '#7c6af7',
      active:  false,
      desc: {
        de: '15 Jahre operative Tiefe in Inventory Management und Supply Chain. Systemdenken im Handelsbetrieb — diese Erfahrung wirkt heute als direkter AI-Differenziator.',
        en: '15 years of operational depth in inventory management and supply chain. Systems thinking that is now a direct AI differentiator.',
      },
      tags: ['Inventory', 'Supply Chain', 'Prozessoptimierung', 'Systemdenken'],
    },
    {
      period:  { de: 'Dez 2025 – Mai 2026', en: 'Dec 2025 – May 2026' },
      role:    { de: 'IT-Administrator', en: 'IT Administrator' },
      company: 'Johanniter Bundes-IT',
      color:   '#7c6af7',
      active:  false,
      desc: {
        de: 'Active Directory, Entra ID, Citrix (NetScaler), Omnitracker, Innovaphone PBX. Windows-11-Rollouts via Deskcenter Studio & Custom-PowerShell (Pausierung 46%-Update zur Speed-Optimierung). Endpoint-Security via FortiClient & Sophos. Eigene Ticket-Automation & der KKEEY-Standard.',
        en: 'Active Directory, Entra ID, Citrix (NetScaler), Omnitracker, Innovaphone PBX. Windows 11 rollouts via Deskcenter Studio & custom PowerShell (pausing 46% update for speed optimization). Endpoint security via FortiClient & Sophos. Custom ticket automation & the KKEEY Standard.',
      },
      tags: ['Active Directory', 'Citrix', 'Deskcenter Studio', 'PowerShell', 'KRITIS', 'FortiClient'],
    },
    {
      period:  { de: 'Juni 2026 · aktuell', en: 'June 2026 · present' },
      role:    { de: 'AI-Architekt & Entwickler', en: 'AI Architect & Developer' },
      company: { de: 'Selbstständig / Freelance', en: 'Self-employed / Freelance' },
      color:   '#00d4aa',
      active:  true,
      desc: {
        de: 'Aufbau von AI-Agent-Systemen für KMU. Claire V2.5 und AuraTone AI als öffentliche Proof-of-Work-Projekte.',
        en: 'Building AI agent systems for SMEs. Claire V2.5 and AuraTone AI as public proof-of-work projects.',
      },
      tags: ['AI Agents', 'Python', 'Gemini API', 'KMU Automation', 'Freelance'],
    },
  ],

  // ─── I18N STRINGS ────────────────────────────────────────────────────────────
  i18n: {
    trioLabel:     { de: 'Differenziator',              en: 'Differentiator' },
    trioTitle:     { de: 'Das seltene Dreierpaket',     en: 'The Rare Trio' },
    trioSub:       { de: 'Drei Domänen. Eine Person. Diese Kombination gibt es kaum.', en: 'Three domains. One person. Almost no one has this combination.' },
    projTitle:     { de: 'Projekte & Showcase',         en: 'Projects & Showcase' },
    projSub:       { de: 'Gebaut. Deployed. Öffentlich.', en: 'Built. Deployed. Public.' },
    skillsTitle:   { de: 'Skills & Kompetenzprofil',   en: 'Skills & Expertise' },
    certLabel:     { de: 'Verifiziert',                 en: 'Verified' },
    certTitle:     { de: 'Zertifizierungen',            en: 'Certifications' },
    certEmpty:     { de: 'Zertifizierungen werden aktuell ergänzt — schau bald wieder vorbei.', en: 'Certifications are being added soon — check back shortly.' },
    careerLabel:   { de: 'Karriere',                    en: 'Career' },
    careerTitle:   { de: 'Beruflicher Werdegang',       en: 'Career Story' },
    contactLabel:  { de: 'Kontakt',                     en: 'Contact' },
    contactTitle:  { de: 'Lass uns sprechen.',          en: "Let's talk." },
    contactDesc:   { de: 'Offen für Festanstellungen, Freelance-Projekte und Kollaborationen. Remote · Hybrid · DE & EN.', en: 'Open for full-time roles, freelance projects, and collaborations. Remote · Hybrid · DE & EN.' },
    namePH:        { de: 'Dein Name',                   en: 'Your name' },
    emailPH:       { de: 'Deine E-Mail',                en: 'Your email' },
    msgPH:         { de: 'Deine Nachricht...',          en: 'Your message...' },
    submitLabel:   { de: 'Nachricht senden →',          en: 'Send message →' },
    sentMsg:       { de: '✓ Nachricht gesendet — ich melde mich.', en: '✓ Message sent — I\'ll get back to you.' },
    sendingLabel:  { de: 'Wird gesendet…',              en: 'Sending…' },
    sendErr:       { de: 'Fehler — bitte direkt mailen', en: 'Error — please email directly' },
    darkBtnLight:  { de: 'Hellmodus aktivieren',        en: 'Switch to light mode' },
    darkBtnDark:   { de: 'Dunkelmodus aktivieren',      en: 'Switch to dark mode' },
    footerCross:   { de: 'IT-Profil ansehen: Systemadministration · IAM →', en: 'View IT profile: system administration · IAM →' },
  },

};
