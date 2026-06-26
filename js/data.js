const CV_DATA = {
  meta: {
    name: "Kevin Kuck",
    email: "kuck_kevin@icloud.com",
    phone: "+49 170 413 05 92",
    location: "Butzbach, Deutschland",
    github: "https://github.com/KKEEY92",
    linkedin: "https://linkedin.com/in/kevin-kuck",
    available: { de: "Verfügbar ab sofort — Remote / Hybrid", en: "Available now — Remote / Hybrid" }
  },

  hero: {
    greeting: { de: "Hallo, ich bin", en: "Hi, I'm" },
    roles: {
      de: ["IT Systems Engineer", "KI-Integrator", "Sole Developer"],
      en: ["IT Systems Engineer", "AI Integrator", "Sole Developer"]
    }
  },

  about: {
    bio: {
      de: "IT Systems Engineer mit 15 Jahren Praxis an der Schnittstelle von Systemadministration, Prozessoptimierung und KI-Entwicklung. Mein Antrieb ist der Dienst am Helfer: Ich halte Infrastruktur stabil, damit andere ihren Dienst am Menschen leisten. In einer KRITIS-Umgebung administriere ich Active Directory, Entra ID und Citrix und automatisiere Abläufe per PowerShell. Parallel entwickle ich als Sole Developer KI-Anwendungen auf Basis von React, TypeScript und Google Gemini. Ich verwalte nicht nur Systeme — ich baue sie.",
      en: "IT Systems Engineer with 15 years of hands-on experience at the intersection of system administration, process optimization, and AI development. My drive is to serve those who serve others: I keep infrastructure stable so that people can focus on their mission. In a critical infrastructure environment, I administer Active Directory, Entra ID, and Citrix while automating workflows with PowerShell. In parallel, I build AI applications as a sole developer using React, TypeScript, and Google Gemini. I don't just manage systems — I build them."
    },
    stats: [
      { value: "15+", label: { de: "Jahre Praxis", en: "Years Experience" } },
      { value: "10+", label: { de: "Parallele Systeme", en: "Parallel Systems" } },
      { value: "6", label: { de: "Zertifizierungen", en: "Certifications" } }
    ]
  },

  skills: [
    {
      category: { de: "Cloud & Identity", en: "Cloud & Identity" },
      items: [
        { name: "Active Directory", level: 95 },
        { name: "Microsoft Entra ID", level: 90 },
        { name: "Azure", level: 85 },
        { name: "Citrix", level: 88 },
        { name: "Windows 11", level: 92 },
        { name: "Intune / ABM", level: 80 }
      ]
    },
    {
      category: { de: "Automatisierung", en: "Automation" },
      items: [
        { name: "PowerShell", level: 90 },
        { name: "OmniTracker", level: 85 },
        { name: "Python", level: 75 },
        { name: "CI/CD · SLSA", level: 70 }
      ]
    },
    {
      category: { de: "KI & Development", en: "AI & Development" },
      items: [
        { name: "React", level: 82 },
        { name: "TypeScript", level: 80 },
        { name: "Google Gemini", level: 78 },
        { name: "Vertex AI", level: 72 },
        { name: "RAG", level: 75 },
        { name: "HTML / JS / CSS", level: 92 }
      ]
    }
  ],

  languages: [
    { name: "Deutsch", level: { de: "Muttersprache", en: "Native" }, percent: 100 },
    { name: "Englisch", level: { de: "Verhandlungssicher", en: "Business fluent" }, percent: 85 }
  ],

  strengths: {
    de: [
      "Hyperfokus in Krisen & Eskalationen",
      "Paralleles Arbeiten über 10+ Systeme",
      "Prozessautomatisierung & Eigenentwicklung",
      "Stakeholder-Kommunikation bis C-Level"
    ],
    en: [
      "Hyperfocus during crises & escalations",
      "Parallel operations across 10+ systems",
      "Process automation & in-house development",
      "Stakeholder communication up to C-Level"
    ]
  },

  experience: [
    {
      title: { de: "IT Systems Engineer", en: "IT Systems Engineer" },
      subtitle: { de: "Junior IT Support Agent", en: "Junior IT Support Agent" },
      org: "Johanniter Bundes-IT-Services (JoBITS)",
      period: "Dez 2025 – Mai 2026",
      bullets: {
        de: [
          "Systemadministration in einer KRITIS-Umgebung: Active Directory, Microsoft Entra ID, Citrix, OmniTracker, Windows-11-Rollouts.",
          "Eigenständige Entwicklung des 'JoBIT Tracker V12' (HTML/JS/CSS) zur automatisierten Ticket-Zuweisung.",
          "Einführung des 'KKEEY-Standards' zur strukturierten Fehlerdiagnose.",
          "Paralleler Betrieb von 10+ Systemen für Notärzte und Rettungswachen unter Echtzeit-Druck."
        ],
        en: [
          "System administration in a critical infrastructure environment: Active Directory, Microsoft Entra ID, Citrix, OmniTracker, Windows 11 rollouts.",
          "Independent development of the 'JoBIT Tracker V12' (HTML/JS/CSS) for automated ticket assignment.",
          "Introduction of the 'KKEEY Standard' for structured error diagnosis.",
          "Parallel operation of 10+ systems for emergency physicians and rescue stations under real-time pressure."
        ]
      }
    },
    {
      title: { de: "IT-Beauftragter & Warenwirtschaft", en: "IT Officer & Inventory Management" },
      subtitle: null,
      org: "BAUHAUS GmbH & Co. KG",
      period: "Aug 2010 – Dez 2024",
      bullets: {
        de: [
          "Primärer IT-Support (Tier 1–3) für 200+ Mitarbeitende: Hardware, Software, Incident- & Problem-Management.",
          "Systemintegration und Optimierung der Warenwirtschaft; deutliche Reduktion von Lagerverlusten durch IT-gestützte Prozesse.",
          "Analyse & Redesign von Abläufen, Schulungen und Rollout neuer Tools — tiefes Endanwender- und Prozessverständnis über 14 Jahre."
        ],
        en: [
          "Primary IT support (Tier 1–3) for 200+ employees: hardware, software, incident & problem management.",
          "System integration and inventory optimization; significant reduction of warehouse losses through IT-driven processes.",
          "Analysis & redesign of workflows, training, and rollout of new tools — deep end-user and process understanding over 14 years."
        ]
      }
    }
  ],

  projects: [
    {
      name: "AuraTone AI",
      role: { de: "Sole Developer", en: "Sole Developer" },
      tech: ["React", "TypeScript", "Google Gemini", "Vertex AI", "SLSA L3"],
      description: {
        de: "KI-gestützte Audio-Mastering-Engine mit Google Gemini über Vertex AI für Echtzeit-Audioanalyse und Traktor-Pro-4-Bibliotheksverwaltung. Entwickelt auf Apple M1 Pro, inkl. SLSA-Level-3-Security-Workflow.",
        en: "AI-powered audio mastering engine using Google Gemini via Vertex AI for real-time audio analysis and Traktor Pro 4 library management. Built on Apple M1 Pro, including SLSA Level 3 security workflow."
      },
      github: "https://github.com/KKEEY92"
    },
    {
      name: "Claire V2",
      role: { de: "KI-Assistenzsystem", en: "AI Assistant System" },
      tech: ["RAG", "Multimodal AI", "Python", "TypeScript"],
      description: {
        de: "Multimodale Interaktion mit Retrieval-Augmented Generation (RAG) als Wissens- und Steuerungslayer.",
        en: "Multimodal interaction with Retrieval-Augmented Generation (RAG) as knowledge and control layer."
      },
      github: "https://github.com/KKEEY92"
    },
    {
      name: "Claire v2.5",
      role: { de: "Native Audio Lokal", en: "Native Audio Local" },
      tech: ["Native Audio", "Local AI", "Python", "Real-time Processing"],
      description: {
        de: "Weiterentwicklung von Claire mit nativem Audio-Processing — vollständig lokale KI-Verarbeitung ohne Cloud-Abhängigkeit.",
        en: "Evolution of Claire with native audio processing — fully local AI processing without cloud dependency."
      },
      github: "https://github.com/KKEEY92"
    }
  ],

  certifications: [
    { name: "Microsoft Azure Fundamentals", code: "AZ-900", status: "done" },
    { name: "Microsoft 365 Fundamentals", code: "MS-900", status: "done" },
    { name: "Microsoft Entra ID", code: "", status: "done" },
    { name: "Cisco Certified Support Technician", code: "CCST", status: "done" },
    { name: "ITIL 4 Foundation", code: "", status: "done" },
    { name: { de: "Umschulung KI-Engineer", en: "Retraining AI Engineer" }, code: "", status: "progress" }
  ],

  education: [
    {
      degree: { de: "Kaufmann im Einzelhandel", en: "Retail Business Administrator" },
      school: "BAUHAUS GmbH & Co. KG",
      period: "2010 – 2013",
      detail: {
        de: "Schwerpunkt digitale Warenwirtschaft & IT-gestützte Geschäftsprozesse.",
        en: "Focus on digital inventory management & IT-driven business processes."
      }
    }
  ],

  nav: {
    about: { de: "Über mich", en: "About" },
    skills: { de: "Skills", en: "Skills" },
    experience: { de: "Erfahrung", en: "Experience" },
    projects: { de: "Projekte", en: "Projects" },
    certs: { de: "Zertifizierungen", en: "Certifications" },
    contact: { de: "Kontakt", en: "Contact" }
  }
};
