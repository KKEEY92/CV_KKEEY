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
      name: 'Claire V2.5 Native Audio',
      color: '#00d4aa',
      colorRgb: '0,212,170',
      tag: 'Open Source · LiveKit 2.x',
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
      name: 'AuraTone AI v2.0',
      color: '#f7a841',
      colorRgb: '247,168,65',
      tag: 'Tauri 2.0 · Rust · Metal GPU',
      sub: { de: 'Native Standalone Workstation · Audio Mastering & Harmonic Mixing', en: 'Native Standalone Workstation · Audio Mastering & Harmonic Mixing' },
      desc: {
        de: 'AI-gestützte Audio-Mastering & Harmonic-Mixing Workstation. Native Desktop-App unter Tauri 2.0 (Rust-Kernel) mit Metal GPU Unified Memory Waveform-Rendering (120Hz), 3-Way SQLite Triade, Python DSP (librosa, ffmpeg) und Google Gemini 1.5 Pro Musikologie-Orchestrierung.',
        en: 'AI-assisted audio mastering & harmonic mixing workstation. Native desktop app built on Tauri 2.0 (Rust kernel) with Metal GPU Unified Memory waveform rendering (120Hz), 3-Way SQLite triad, Python DSP (librosa, ffmpeg), and Google Gemini 1.5 Pro musicology orchestration.',
      },
      stack: ['Tauri 2.0 (Rust)', 'Apple Silicon Metal GPU', 'React 19 / Vite 6', 'TypeScript', '3-Way SQLite', 'Python DSP (librosa/ffmpeg)', 'Google Gemini 1.5 Pro'],
      link: 'https://github.com/KKEEY92/AuraTone-AI-by-KKEEy',
      linkLabel: { de: 'Auf GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      name: 'AI Virtual Calling',
      color: '#f43f5e',
      colorRgb: '244,63,94',
      tag: 'WebRTC · React',
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
      name: 'AFM-3 Chat',
      color: '#3b82f6',
      colorRgb: '59,130,246',
      tag: 'macOS Native · Local AI',
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
      name: 'Architecture Showcases',
      color: '#8b5cf6',
      colorRgb: '139,92,246',
      tag: 'Public Documentation',
      sub: { de: 'Claire V2 & AuraTone Systemarchitekturen', en: 'Claire V2 & AuraTone System Architecture' },
      desc: {
        de: 'Öffentliche Architektur-Repositories (Claire-V2-Architecture & AuraTone-Architecture) zur Demonstration von C4 / Mermaid Systemdesign, SLSA Level 3 Provenance und Serverless Cloud Run / Container Setups.',
        en: 'Public architecture repositories (Claire-V2-Architecture & AuraTone-Architecture) demonstrating C4 / Mermaid system design, SLSA Level 3 provenance, and serverless Cloud Run / container setups.',
      },
      stack: ['Mermaid JS', 'C4 Architecture', 'Docker', 'Google Cloud Run', 'GitLab / GitHub Sync'],
      link: 'https://github.com/KKEEY92/Claire-V2-Architecture',
      linkLabel: { de: 'Architektur ansehen →', en: 'View Architecture →' },
    },
    {
      name: 'sortiere.py',
      color: '#22c55e',
      colorRgb: '34,197,94',
      tag: 'Open Source CLI',
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

  // ─── SKILLS ─────────────────────────────────────────────────────────────────
  skillGroups: [
    {
      label: { de: 'Sprachen & Code', en: 'Languages & Code' },
      skills: [
        { name: 'Python',              pct: 90 },
        { name: 'TypeScript',          pct: 82 },
        { name: 'JavaScript / React',  pct: 80 },
        { name: 'PowerShell',          pct: 80 },
        { name: 'HTML / CSS',          pct: 85 },
      ],
    },
    {
      label: { de: 'AI & Agents', en: 'AI & Agents' },
      skills: [
        { name: 'Gemini API / Vertex AI', pct: 92 },
        { name: 'LiveKit 2.x Agents',      pct: 90 },
        { name: 'From-Scratch Architekturen', pct: 95 },
        { name: 'LM Studio (Local LLMs)',  pct: 85 },
        { name: 'ComfyUI / Image AI',      pct: 80 },
      ],
    },
    {
      label: { de: 'Systeme & Infra', en: 'Systems & Infrastructure' },
      skills: [
        { name: 'Active Directory / IAM', pct: 85 },
        { name: 'Docker / Cloud Run',     pct: 85 },
        { name: 'GitHub Actions (CI/CD)', pct: 82 },
        { name: 'FastAPI / Node.js',      pct: 78 },
      ],
    },
    {
      label: { de: 'Audio & Ops Domäne', en: 'Audio & Operational Domain' },
      skills: [
        { name: 'Traktor 4 Pro / Rekordbox', pct: 95 },
        { name: 'Audio DSP (librosa/ffmpeg)', pct: 82 },
        { name: 'Inventory Management',   pct: 95 },
        { name: 'Supply Chain / Ops',     pct: 90 },
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
