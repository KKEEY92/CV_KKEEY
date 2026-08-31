/**
 * KKEEY Portfolio — Inhaltsdatei v3.5
 * Hier alle Texte, Projekte, Skills und Timeline pflegen.
 * Multilingual: DE / EN / FR / UK / PL
 * E-Mails: kuck_kevin@icloud.com · Kkeey_IT@iCloud.com
 */
window.KK_DATA = {

  // ─── HERO ───────────────────────────────────────────────────────────
  hero: {
    name: 'Kevin Kuck',
    greeting: {
      de: 'Hallo, ich bin',
      en: "Hi, I'm",
      fr: 'Bonjour, je suis',
      uk: 'Привіт, я',
      pl: 'Cześć, jestem',
    },
    tagline: 'IT · AI · AUDIO · 15+ JAHRE PRAXIS',
    roles: {
      de: [
        'AI Systems Engineer',
        'Voice AI & Automation Specialist',
        'Local-First & RAG Architekturen',
        'DJ & Audio Systems Engineer',
        'KMU Prozess-Automatisierer',
      ],
      en: [
        'AI Systems Engineer',
        'Voice AI & Automation Specialist',
        'Local-First & RAG Architectures',
        'DJ & Audio Systems Engineer',
        'SME Automation Specialist',
      ],
      fr: [
        'Ingénieur Systèmes IA',
        'Spécialiste Voice AI & Automatisation',
        'Architectures Local-First & RAG',
        'DJ & Ingénieur Systèmes Audio',
        'Automatisation des Processus PME',
      ],
      uk: [
        'AI Systems Engineer',
        'Спеціаліст із Voice AI та автоматизації',
        'Архітектури Local-First & RAG',
        'DJ & Інженер аудіосистем',
        'Автоматизація процесів для бізнесу',
      ],
      pl: [
        'AI Systems Engineer',
        'Specjalista ds. Voice AI i Automatyzacji',
        'Architektury Local-First & RAG',
        'DJ & Inżynier Systemów Audio',
        'Automatyzacja Procesów dla MŚP',
      ],
    },
    cta1: {
      de: 'Projekte ansehen',
      en: 'View Projects',
      fr: 'Voir les projets',
      uk: 'Переглянути проєкти',
      pl: 'Zobacz projekty',
    },
    cta2: {
      de: 'Kontakt aufnehmen',
      en: 'Get in touch',
      fr: 'Me contacter',
      uk: 'Зв\'yazatysya',
      pl: 'Skontaktuj się',
    },
    cta3: {
      de: 'Bewerbungsmappe (PDF)',
      en: 'Application Portfolio (PDF)',
      fr: 'Dossier de candidature (PDF)',
      uk: 'Резюме / Портфоліо (PDF)',
      pl: 'Dokumenty aplikacyjne (PDF)',
    },
    available: {
      de: 'Verfügbar ab sofort',
      en: 'Available now',
      fr: 'Disponible immédiatement',
      uk: 'Доступний зараз',
      pl: 'Dostępny od zaraz',
    },
  },

  projects: [
    {
      id: 'claire-v25-native-audio',
      repo: 'KKEEY92/claire-v2.5-native-audio',
      status: { type: 'implemented', codeVersion: '2.5.0', latestTag: 'v2.5.0', sourceVisibility: 'private', publicBinaryRelease: false },
      name: 'Claire V2.5 Native Audio',
      color: '#00d4aa',
      colorRgb: '0,212,170',
      sub: {
        de: 'Local-First Voice Agent · Native Audio · getrennt von Claire V2',
        en: 'Local-first voice agent · Native audio · separate from Claire V2',
        fr: 'Agent vocal local-first · Audio natif · distinct de Claire V2',
        uk: 'Local-first голосовий агент · Native Audio · окремо від Claire V2',
        pl: 'Lokalny agent głosowy · Native Audio · osobno od Claire V2',
      },
      desc: {
        de: 'Eigenständiges lokales Native-Audio-Projekt — nicht die Cloud/Docker-Linie Claire V2. Full-Duplex Voice auf LiveKit 2.x, Hybrid-LLM (Gemini ⇄ LM Studio), EmotionEngine v2, Silero VAD, Drive-RAG. Die Implementierung ist privat. Öffentlich bleiben Architektur und Nachweise.',
        en: 'A separate local native-audio project — not the Claire V2 cloud/Docker line. Full-duplex voice on LiveKit 2.x, hybrid LLM (Gemini ⇄ LM Studio), EmotionEngine v2, Silero VAD, Drive RAG. Implementation is private. Architecture and evidence stay public.',
        fr: 'Projet local native-audio distinct — pas la ligne cloud/Docker Claire V2. Voix full-duplex LiveKit 2.x, LLM hybride, EmotionEngine v2. Code privé, architecture publique.',
        uk: 'Окремий локальний native-audio проєкт — не хмарна/Docker-лінія Claire V2. Код приватний, архітектура публічна.',
        pl: 'Osobny lokalny projekt native-audio — nie linia cloud/Docker Claire V2. Kod prywatny, architektura publiczna.',
      },
      stack: ['Python 3.13', 'LiveKit Agents 2.x', 'Gemini 2.5 Flash', 'LM Studio (Local LLM)', 'Silero VAD', 'Google Drive RAG', 'React / Vite'],
      note: {
        de: 'Zwei getrennte Codebasen: claire-v2 (privat, Container) und claire-v2.5-native-audio (privat, local-first). Öffentliche Fläche ist die Architektur, nicht der Source.',
        en: 'Two separate codebases: claire-v2 (private, container) and claire-v2.5-native-audio (private, local-first). The public surface is architecture, not source.',
        fr: 'Deux bases distinctes : claire-v2 (privée, conteneur) et claire-v2.5-native-audio (privée, local-first).',
        uk: 'Дві окремі бази: claire-v2 (приватна, контейнер) та claire-v2.5-native-audio (приватна, local-first).',
        pl: 'Dwie osobne bazy: claire-v2 (prywatna, kontener) i claire-v2.5-native-audio (prywatna, local-first).',
      },
      links: [
        { href: 'https://github.com/KKEEY92/Claire-V2-Architecture#claire-v2-vs-claire-v25', label: { de: 'V2 vs V2.5 →', en: 'V2 vs V2.5 →', fr: 'V2 vs V2.5 →', uk: 'V2 vs V2.5 →', pl: 'V2 vs V2.5 →' } },
        { href: 'https://github.com/KKEEY92/Claire-V2-Architecture', label: { de: 'Architektur →', en: 'Architecture →', fr: 'Architecture →', uk: 'Архітектура →', pl: 'Architektura →' } },
      ],
    },
  ],
};
