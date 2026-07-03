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
      sub:   { de: 'Python · TypeScript · Gemini · ComfyUI · LM Studio', en: 'Python · TypeScript · Gemini · ComfyUI · LM Studio' },
      detail: {
        de: 'Baut und deployt eigenständige AI-Agentensysteme. Claire V2.5, AuraTone, Sortier-Pipelines — Code der funktioniert und sichtbar ist.',
        en: 'Builds and deploys autonomous AI agent systems. Claire V2.5, AuraTone, sorting pipelines — code that works and is visible.',
      },
    },
    {
      icon: '🎚️',
      label: { de: 'Audio & DJ Engineering', en: 'Audio & DJ Engineering' },
      sub:   { de: '10 Jahre · 5.000+ Tracks · Traktor Pro · Rekordbox', en: '10 Years · 5,000+ Tracks · Traktor Pro · Rekordbox' },
      detail: {
        de: 'Tiefe Domainkenntnis in Audio-DSP, harmonischem Mixen und Musikanalyse. Fundament für AuraTone.',
        en: 'Deep domain knowledge in audio DSP, harmonic mixing, and music analysis. The foundation of AuraTone.',
      },
    },
  ],

  // ─── PROJEKTE ───────────────────────────────────────────────────────────────
  projects: [
    {
      name: 'Claire V2.5',
      color: '#00d4aa',
      colorRgb: '0,212,170',
      tag: 'Open Source · MIT',
      sub: { de: 'Voice AI Agent · Full-Duplex · ~200ms Latenz', en: 'Voice AI Agent · Full-Duplex · ~200ms Latency' },
      desc: {
        de: 'Standalone Voice Agent auf Basis von Gemini Native Audio. Ersetzt STT→LLM→TTS durch eine einzige Echtzeit-Session (~200ms). EmotionEngine v2, persistentes SQLite-Memory, WebGL Shader Cockpit — startet per Doppelklick.',
        en: 'Standalone voice agent built on Gemini Native Audio. Replaces STT→LLM→TTS with a single real-time session (~200ms). EmotionEngine v2, persistent SQLite memory, WebGL shader cockpit — starts with a double-click.',
      },
      stack: ['Python', 'FastAPI', 'Gemini Native Audio', 'WebGL Shaders', 'SQLite', 'Vertex AI'],
      link: 'https://github.com/KKEEY92/claire-v2.5-native-audio',
      linkLabel: { de: 'Auf GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      name: 'AuraTone AI',
      color: '#f7a841',
      colorRgb: '247,168,65',
      tag: 'Architecture Showcase',
      sub: { de: 'DJ Mastering & Harmonic Mixing Engine', en: 'DJ Mastering & Harmonic Mixing Engine' },
      desc: {
        de: 'AI-gestützte Audio-Mastering & Harmonic-Mixing Engine. Analysiert Tracks (Key, BPM, Energy), normalisiert auf LUFS-Ziel, baut harmonisch kohärente Sets via Camelot Wheel. Hybrid TypeScript + Python DSP.',
        en: 'AI-assisted audio mastering & harmonic mixing engine. Analyzes tracks (key, BPM, energy), normalizes to LUFS target, builds harmonically coherent sets via Camelot Wheel. Hybrid TypeScript + Python DSP.',
      },
      stack: ['TypeScript', 'React / Vite', 'Python DSP', 'librosa / ffmpeg', 'Google Gemini', 'Firebase'],
      link: 'https://github.com/KKEEY92/AuraTone-Architecture',
      linkLabel: { de: 'Architektur ansehen →', en: 'View Architecture →' },
    },
    {
      name: 'AFM-3-Chat',
      color: '#3b82f6',
      colorRgb: '59,130,246',
      tag: 'macOS Native · Local AI',
      sub: { de: 'Swift WKWebView · Apple Foundation Model · Komplett offline', en: 'Swift WKWebView · Apple Foundation Model · Fully offline' },
      desc: {
        de: 'Native macOS-App mit eigenem UI für das Apple Foundation Model (AFM-3-Core) — komplett lokal, kein Cloud-Abo. Matrix Rain UI, RAG mit Obsidian-Vault-Indexierung, Neural TTS via macOS say, ComfyUI Bildgenerierung, Push-to-Talk.',
        en: 'Native macOS app with custom UI for Apple Foundation Model (AFM-3-Core) — fully local, no cloud subscription. Matrix Rain UI, RAG with Obsidian Vault indexing, Neural TTS via macOS say, ComfyUI image gen, Push-to-Talk.',
      },
      stack: ['Swift / WKWebView', 'Python http.server', 'Apple AFM-3-Core', 'ComfyUI API', 'Web Speech API', 'Canvas 2D'],
      link: null,
      linkLabel: { de: 'Privat · Demo auf Anfrage', en: 'Private · Demo on request' },
    },
    {
      name: 'PersonaOS',
      color: '#8b5cf6',
      colorRgb: '139,92,246',
      tag: 'Proprietary · React',
      sub: { de: 'Prompt & Persona Engineering Studio · Gemini-powered', en: 'Prompt & Persona Engineering Studio · Gemini-powered' },
      desc: {
        de: 'Workbench für AI-Persona-Engineering. Strukturiert Personas als konfigurierbare Layer (YAML/JSON), testet sie live gegen Gemini und versioniert sie sauber — Grundlage für glaubwürdige, konsistente AI-Charaktere.',
        en: 'Workbench for AI persona engineering. Structures personas as configurable layers (YAML/JSON), tests them live against Gemini, and versions them cleanly — the foundation for believable, consistent AI characters.',
      },
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Gemini API', 'Express', 'zod', 'js-yaml'],
      link: null,
      linkLabel: { de: 'Proprietär · Auf Anfrage', en: 'Proprietary · On request' },
    },
    {
      name: 'sortiere.py',
      color: '#22c55e',
      colorRgb: '34,197,94',
      tag: '✓ Abgeschlossen',
      sub: { de: 'Universeller CLI Datei-Organizer · Python · 5-Pillar-Struktur', en: 'Universal CLI File Organizer · Python · 5-Pillar Structure' },
      desc: {
        de: 'Intelligenter Datei-Organizer mit token-basiertem Matching, Dry-Run-Modus und 5-Pillar-Kategorisierung. Sortiert beliebige Verzeichnisse nach konfigurierbaren Regeln — erster shipped open-source Build.',
        en: 'Smart file organizer with token-based matching, dry-run mode, and 5-pillar categorization. Sorts any directory by configurable rules — first shipped open-source build.',
      },
      stack: ['Python 3.12', 'CLI / argparse', 'OS / Pathlib', 'Token Matching', 'Dry-Run Mode'],
      link: 'https://github.com/KKEEY92',
      linkLabel: { de: 'GitHub-Profil →', en: 'GitHub profile →' },
    },
    {
      name: 'ComfyUI Pipeline System',
      color: '#e879f9',
      colorRgb: '232,121,249',
      tag: 'Aktiv',
      sub: { de: 'AI Character Generator · ComfyUI · FaceID + IPAdapter', en: 'AI Character Generator · ComfyUI · FaceID + IPAdapter' },
      desc: {
        de: 'Eigenständige ComfyUI-Pipeline für konsistente AI-Character-Generierung. Master-Script mit 5 Extensions: --reference Foto-Injektion, LoRA-Steuerung, Validierung, --dry-run und Prompt-Injection.',
        en: 'Autonomous ComfyUI pipeline for consistent AI character generation. Master script with 5 extensions: --reference photo injection, LoRA control, validation, --dry-run, and prompt injection.',
      },
      stack: ['Python', 'ComfyUI API', 'FaceID', 'IPAdapter', 'LoRA', 'Stable Diffusion'],
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
        { name: 'TypeScript',          pct: 75 },
        { name: 'JavaScript / React',  pct: 78 },
        { name: 'PowerShell',          pct: 80 },
        { name: 'HTML / CSS',          pct: 85 },
      ],
    },
    {
      label: { de: 'AI & Agents', en: 'AI & Agents' },
      skills: [
        { name: 'Gemini API / Vertex AI', pct: 92 },
        { name: 'LLM Orchestration',       pct: 88 },
        { name: 'Prompt Engineering',      pct: 90 },
        { name: 'ComfyUI / Image AI',      pct: 80 },
        { name: 'LM Studio (Local LLMs)',  pct: 82 },
      ],
    },
    {
      label: { de: 'Systeme & Infra', en: 'Systems & Infrastructure' },
      skills: [
        { name: 'Active Directory / IAM', pct: 82 },
        { name: 'Docker / Linux',         pct: 70 },
        { name: 'FastAPI / Node.js',      pct: 72 },
        { name: 'Firebase / Cloud',       pct: 68 },
      ],
    },
    {
      label: { de: 'Audio & Ops Domäne', en: 'Audio & Operational Domain' },
      skills: [
        { name: 'Traktor 4 Pro / Rekordbox', pct: 95 },
        { name: 'Audio DSP (librosa)',     pct: 78 },
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
        de: 'Active Directory, Entra ID, IAM, Citrix, Omnitracker, Innovaphone PBX, Windows-11-Migration und PowerShell-Automatisierung in einer bundesweiten KRITIS-Infrastrukturumgebung. Eigenentwicklungen: JoBIT Tracker V12 (automatisierte Ticket-Zuweisung) und der KKEEY-Standard für reproduzierbare Fehlerdiagnose.',
        en: 'Active Directory, Entra ID, IAM, Citrix, Omnitracker, Innovaphone PBX, Windows 11 migration, and PowerShell automation in a national critical infrastructure environment. Built the JoBIT Tracker V12 (automated ticket assignment) and the KKEEY Standard for reproducible fault diagnosis.',
      },
      tags: ['Active Directory', 'IAM', 'Citrix', 'PowerShell', 'Windows 11', 'KRITIS'],
    },
    {
      period:  { de: 'Juni 2026 · aktuell', en: 'June 2026 · present' },
      role:    { de: 'AI-Architekt & Entwickler', en: 'AI Architect & Developer' },
      company: { de: 'Selbstständig / Freelance', en: 'Self-employed / Freelance' },
      color:   '#00d4aa',
      active:  true,
      desc: {
        de: 'Aufbau von AI-Agent-Systemen für KMU. Claire V2.5 und AuraTone als öffentliche Proof-of-Work-Projekte.',
        en: 'Building AI agent systems for SMEs. Claire V2.5 and AuraTone as public proof-of-work projects.',
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
