/**
 * KKEEY Portfolio — Inhaltsdatei
 * IAM / KRITIS / AI Focus
 */
window.KK_DATA = {

  // ─── HERO ───────────────────────────────────────────────────────────────────
  hero: {
    name: 'Kevin Kuck',
    greeting: { de: 'Hallo, ich bin', en: "Hi, I'm" },
    tagline: 'IAM · KRITIS · AI · SYSTEM ARCHITECTURE',
    roles: {
      de: [
        'IAM & Security Expert',
        'IT Systems Engineer',
        'AI Agent Architekt',
        'Neurodivergenter Systemdenker',
        'Prozess-Automatisierer',
      ],
      en: [
        'IAM & Security Expert',
        'IT Systems Engineer',
        'AI Agent Architect',
        'Neurodivergent Systems Thinker',
        'Process Automation Expert',
      ],
    },
    cta1: { de: 'Projekte ansehen', en: 'View Projects' },
    cta2: { de: 'Kontakt aufnehmen', en: 'Get in touch' },
    available: { de: 'Verfügbar ab sofort', en: 'Available now' },
  },

  // ─── TRIO ───────────────────────────────────────────────────────────────────
  trio: [
    {
      icon: '🛡️',
      label: { de: 'IAM & KRITIS Security', en: 'IAM & KRITIS Security' },
      sub:   { de: 'Active Directory · Entra ID · Zero Trust', en: 'Active Directory · Entra ID · Zero Trust' },
      detail: {
        de: 'Tiefgehende Erfahrung in der Administration von Identity & Access Management Systemen in bundesweiten KRITIS-Umgebungen. Fokus auf Sicherheit, Compliance und reibungslose Zugriffssteuerung.',
        en: 'Deep experience administrating Identity & Access Management systems in national critical infrastructures. Focus on security, compliance, and frictionless access control.',
      },
    },
    {
      icon: '🤖',
      label: { de: 'AI Agent Architekt', en: 'AI Agent Architect' },
      sub:   { de: 'Python · Gemini · RAG · Local AI', en: 'Python · Gemini · RAG · Local AI' },
      detail: {
        de: 'Entwicklung und Deployment autonomer AI-Agentensysteme (Claire V2.5, AFM Chat). Brücke zwischen traditioneller Enterprise IT und modernsten KI-Workflows.',
        en: 'Development and deployment of autonomous AI agent systems (Claire V2.5, AFM Chat). Bridging the gap between traditional enterprise IT and bleeding-edge AI workflows.',
      },
    },
    {
      icon: '⚙️',
      label: { de: 'Systemdenken & Automation', en: 'Systems Thinking & Automation' },
      sub:   { de: '15 J. Operational Track Record', en: '15 Yrs Operational Track Record' },
      detail: {
        de: '15 Jahre operative Praxiserfahrung in hochkomplexen Umgebungen (Supply Chain / Inventory). Ich optimiere und automatisiere Prozesse nicht nach Theorie, sondern für die Realität.',
        en: '15 years of operational hands-on experience in highly complex environments. I optimize and automate processes not based on theory, but for reality.',
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
        de: 'Standalone Voice Agent auf Basis von Gemini Native Audio. Ersetzt STT→LLM→TTS durch eine einzige Echtzeit-Session (~200ms). EmotionEngine v2, persistentes SQLite-Memory.',
        en: 'Standalone voice agent built on Gemini Native Audio. Replaces STT→LLM→TTS with a single real-time session (~200ms). EmotionEngine v2, persistent SQLite memory.',
      },
      stack: ['Python', 'FastAPI', 'Gemini Native Audio', 'WebGL Shaders', 'SQLite', 'Vertex AI'],
      link: 'https://github.com/KKEEY92/claire-v2.5-native-audio',
      linkLabel: { de: 'Auf GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      name: 'CV Manager Pro',
      color: '#f7a841',
      colorRgb: '247,168,65',
      tag: 'Local App',
      sub: { de: 'Karriere-Manager & ATS-Analyzer', en: 'Career Manager & ATS Analyzer' },
      desc: {
        de: 'Lokale React/Electron-Applikation zur Verwaltung von Lebensläufen mit KI-gestützter ATS-Analyse und Anschreiben-Generierung via Gemini API.',
        en: 'Local React/Electron application for resume management with AI-powered ATS analysis and cover letter generation via Gemini API.',
      },
      stack: ['Electron', 'React / Vite', 'Express', 'Google Gemini'],
      link: 'https://github.com/KKEEY92',
      linkLabel: { de: 'Auf GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      name: 'AFM Chat',
      color: '#3b82f6',
      colorRgb: '59,130,246',
      tag: 'macOS Native · Local AI',
      sub: { de: 'Swift WKWebView · Apple Foundation Model · Komplett offline', en: 'Swift WKWebView · Apple Foundation Model · Fully offline' },
      desc: {
        de: 'Native macOS-App mit eigenem UI für das Apple Foundation Model (AFM-3-Core) — komplett lokal, kein Cloud-Abo. Matrix Rain UI, RAG mit Obsidian-Vault-Indexierung, Neural TTS.',
        en: 'Native macOS app with custom UI for Apple Foundation Model (AFM-3-Core) — fully local, no cloud subscription. Matrix Rain UI, RAG with Obsidian Vault indexing, Neural TTS.',
      },
      stack: ['Swift / WKWebView', 'Python http.server', 'Apple AFM-3-Core', 'ComfyUI API'],
      link: 'https://github.com/KKEEY92/afm-chat',
      linkLabel: { de: 'GitHub ansehen →', en: 'View on GitHub →' },
    },
    {
      name: 'AuraTone AI',
      color: '#8b5cf6',
      colorRgb: '139,92,246',
      tag: 'Architecture Showcase',
      sub: { de: 'Local-First Audio Intelligence Workstation', en: 'Local-First Audio Intelligence Workstation' },
      desc: {
        de: 'Native Apple-Silicon macOS-Workstation für lokale Audioanalyse, harmonische Playlist-Curation und kontrolliertes Mastering. Rust/Tauri orchestriert Dateisystem, Job-Pipeline, SQLite-Katalog und macOS-Integration; React/TypeScript liefert die interaktive Workstation inklusive GPU-optimierter Waveform-Visualisierung. Proprietär — Demo auf Anfrage.',
        en: 'Native Apple-Silicon macOS workstation for local audio analysis, harmonic playlist curation, and controlled mastering. Rust/Tauri orchestrates file systems, job pipelines, SQLite catalogs, and macOS integration; React/TypeScript provides the interactive UI including GPU-optimized waveform visualization. Proprietary — demo on request.',
      },
      stack: ['Rust', 'Tauri 2.0', 'React', 'TypeScript', 'Metal GPU', 'SQLite'],
      link: 'https://github.com/KKEEY92/AuraTone-Architecture',
      linkLabel: { de: 'Architektur ansehen →', en: 'View Architecture →' },
    }
  ],

  // ─── SKILLS ─────────────────────────────────────────────────────────────────
  skillGroups: [
    {
      label: { de: 'IAM, KRITIS & Infrastruktur', en: 'IAM, KRITIS & Infrastructure' },
      skills: [
        { name: 'Active Directory / Entra ID', pct: 95 },
        { name: 'Identity & Access Mgmt (IAM)', pct: 90 },
        { name: 'KRITIS Compliance & Security', pct: 85 },
        { name: 'Windows Server / Migrationen', pct: 88 },
        { name: 'Omnitracker / ITSM',          pct: 82 },
      ],
    },
    {
      label: { de: 'Sprachen & Code', en: 'Languages & Code' },
      skills: [
        { name: 'Python',              pct: 90 },
        { name: 'PowerShell',          pct: 85 },
        { name: 'TypeScript / React',  pct: 75 },
        { name: 'Bash / Linux CLI',    pct: 80 },
      ],
    },
    {
      label: { de: 'AI & Automatisierung', en: 'AI & Automation' },
      skills: [
        { name: 'LLM Orchestration / RAG', pct: 92 },
        { name: 'Gemini API / Vertex AI',  pct: 88 },
        { name: 'Docker / CI/CD',          pct: 75 },
        { name: 'Local AI (LM Studio, AFM)',pct: 85 },
      ],
    },
  ],

  // ─── KARRIERE TIMELINE ──────────────────────────────────────────────────────
  timeline: [
    {
      period:  { de: 'bis Ende 2024 · 15 Jahre', en: 'Until end 2024 · 15 years' },
      role:    { de: 'Inventory Management & Operations', en: 'Inventory Management & Operations' },
      company: 'BAUHAUS',
      color:   '#7c6af7',
      active:  false,
      desc: {
        de: '15 Jahre operative Tiefe in Supply Chain, Logistik und Prozessoptimierung. Dieses tiefgreifende Systemverständnis aus dem operativen Alltag ist heute das Fundament meiner Arbeit in IT-Infrastrukturen.',
        en: '15 years of operational depth in supply chain, logistics, and process optimization. This profound systems understanding forms the foundation of my work in IT infrastructures today.',
      },
      tags: ['Inventory', 'Supply Chain', 'Prozessoptimierung', 'Systemdenken'],
    },
    {
      period:  { de: 'Dez 2025 – Mai 2026', en: 'Dec 2025 – May 2026' },
      role:    { de: 'IT-Administrator (Fokus IAM & KRITIS)', en: 'IT Administrator (Focus IAM & KRITIS)' },
      company: 'Johanniter Bundes-IT',
      color:   '#f7a841',
      active:  false,
      desc: {
        de: 'Zentrale Verwaltung von Active Directory und Entra ID in einer bundesweiten KRITIS-Umgebung. Verantwortung für Identity & Access Management (IAM), Windows 11 Migrationen und 2nd-Level Support via Omnitracker.',
        en: 'Central administration of Active Directory and Entra ID in a national critical infrastructure environment. Responsible for Identity & Access Management (IAM), Windows 11 migrations, and 2nd-level support via Omnitracker.',
      },
      tags: ['Active Directory', 'Entra ID', 'IAM', 'Windows 11', 'Omnitracker', 'KRITIS'],
    },
    {
      period:  { de: 'Juni 2026 · aktuell', en: 'June 2026 · present' },
      role:    { de: 'IT Systems Engineer & AI Architect', en: 'IT Systems Engineer & AI Architect' },
      company: { de: 'Freelance / Open Source', en: 'Freelance / Open Source' },
      color:   '#00d4aa',
      active:  true,
      desc: {
        de: 'Architektur und Entwicklung hybrider Systeme: Von hochsicheren IT-Prozessen bis hin zu modernsten, autonomen AI-Agenten (Claire V2.5). Bereit für die nächste Herausforderung in der Enterprise IT.',
        en: 'Architecture and development of hybrid systems: From highly secure IT processes to state-of-the-art autonomous AI agents (Claire V2.5). Ready for the next challenge in Enterprise IT.',
      },
      tags: ['IAM', 'IT Security', 'AI Agents', 'Python', 'Automation'],
    },
  ],

  // ─── I18N STRINGS ────────────────────────────────────────────────────────────
  i18n: {
    trioLabel:     { de: 'Differenziator',              en: 'Differentiator' },
    trioTitle:     { de: 'Das Profil im Detail',     en: 'Profile Details' },
    trioSub:       { de: 'Infrastruktur-Sicherheit trifft auf modernste KI.', en: 'Infrastructure security meets cutting-edge AI.' },
    projTitle:     { de: 'AI Showcase & Projekte',         en: 'AI Showcase & Projects' },
    projSub:       { de: 'Gebaut. Deployed. Öffentlich.', en: 'Built. Deployed. Public.' },
    skillsTitle:   { de: 'Skills & Kompetenzprofil',   en: 'Skills & Expertise' },
    careerLabel:   { de: 'Karriere',                    en: 'Career' },
    careerTitle:   { de: 'Beruflicher Werdegang',       en: 'Career Story' },
    contactLabel:  { de: 'Kontakt',                     en: 'Contact' },
    contactTitle:  { de: 'Lass uns sprechen.',          en: "Let's talk." },
    contactDesc:   { de: 'Offen für spannende Rollen im Bereich IT Administration, IAM und System Engineering.', en: 'Open for exciting roles in IT Administration, IAM, and System Engineering.' },
    namePH:        { de: 'Dein Name',                   en: 'Your name' },
    emailPH:       { de: 'Deine E-Mail',                en: 'Your email' },
    msgPH:         { de: 'Deine Nachricht...',          en: 'Your message...' },
    submitLabel:   { de: 'Nachricht senden →',          en: 'Send message →' },
    sentMsg:       { de: '✓ E-Mail-Client geöffnet — bis bald.', en: '✓ Email client opened — talk soon.' },
    darkBtnLight:  { de: 'Hellmodus',                   en: 'Light mode' },
    darkBtnDark:   { de: 'Dunkelmodus',                 en: 'Dark mode' },
  },

};
