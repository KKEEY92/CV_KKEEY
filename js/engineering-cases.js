(() => {
  const root=document.getElementById('engineering');
  if(!root)return;
  const ids=['job-scout','claire-v2','auratone','contextnexus'];
  const data={"de":[{"name":"Job-Scout","index":"01 / CAREER OPERATIONS","title":"Dokumente mit klaren Freigabegrenzen.","summary":"Ein lokales Python/FastAPI-System für Karriere-Workflows. Der Engineering-Fokus: PDF-Validierung, explizite Fehlerzustände und nachvollziehbare Regressionstestlogik.","tags":["Python","FastAPI","PDF-Validierung","Regressionstestdesign"],"note":"Code vorhanden · Laufzeitprüfung offen","limit":"Der Review belegt PDF-Kontrolllogik und Testdesign. Ein erfolgreicher End-to-End-Export oder produktiver Betrieb wurde nicht verifiziert.","steps":[["Workflow","Dokumentiert","Die README beschreibt FastAPI, lokale Vault-Ablage und optionale LM-Studio-Anbindung. Diese Einordnung stammt aus Dokumentation; der Gesamtablauf wurde im Report nicht ausgeführt."],["Verifikationsstatus","Implementiert · nicht getestet","is_draft prüft den Verifikationsstatus von Nachweisen und Profilbestandteilen. Damit lässt sich fachlich erklären, warum ein Dokument Entwurfsstatus behalten muss."],["PDF-Fehlerschranken","Implementiert · nicht getestet","DocumentLayoutError und PdfEngineError machen Layout- und Engine-Probleme explizit. Ein erfolgreicher produktiver Export ist damit noch nicht belegt."],["Regressionen","Code geprüft · Testdesign","Testfälle behandeln fehlendes Chrome, Seitenüberlauf, Dokumentreihenfolge und das Verbot eines stillen ReportLab-Fallbacks bei Chrome-Fehlern. Mocks und synthetische PDFs; Testausführung offen."]],"evidence":"Code-Review v0.2 · 27.10.2026 · J1–J3. PDF-Kontrolllogik und Testdesign sind im Code festgestellt.","next":"Isolierte Tests, ein PDF-Golden-Sample und die Bindung des Ergebnisses an einen geprüften Commit.","publicLink":null},{"name":"Claire V2","index":"02 / REALTIME VOICE","title":"Streaming bis zur Sprachausgabe durchdenken.","summary":"Ein LiveKit-basierter Voice-Agent mit Stream-Filterlogik und zustandsabhängiger Prosodie. Im Mittelpunkt stehen Integrationsgrenzen und das Verhalten über Chunk-Grenzen hinweg.","tags":["Python","LiveKit","Streaming","Prosodie"],"note":"Claire V2 · V2.5 separat","limit":"Der Code-Review betrifft claire-v2. Die bestehende V2.5-Karte ist eine andere Variante. Providerkonfiguration und End-to-End-Verhalten bleiben zu prüfen.","steps":[["AgentSession","Implementiert · nicht getestet","agent.py integriert LiveKit Agent und AgentSession sowie Persona- und Memory-Module. Das belegt Integrationscode, keinen erfolgreichen Voice-Lauf."],["ThinkTagFilter","Implementiert · nicht getestet","Der Filter verarbeitet think-Blöcke über mehrere Chunks hinweg vor der Sprachausgabe. Diese Stelle zeigt eine konkrete Streaming-Randbedingung."],["Prosodie","Implementiert · nicht getestet","_prosody_for_energy bildet numerische Energie auf Sprechrate und Lautstärke ab. Grenzen und konkrete Ausgabewirkung sind separat zu testen."],["Providergrenzen","Offene Prüfung","Kommentare zu lokaler bzw. Cloud-STT/TTS und Silero sind widersprüchlich. Tatsächlich ausgeführte Providerzweige und Konfiguration müssen abgeglichen werden."]],"evidence":"Code-Review v0.2 · 27.10.2026 · C1–C3. Architektur-README ist dokumentarische Evidenz; kein Runtime-Beweis.","next":"Unitfähige Chunk-Split-Tests und Prosodiegrenzen; danach ein isolierter Voice-Test.","publicLink":["Öffentliche Architektur","https://github.com/KKEEY92/Claire-V2-Architecture"]},{"name":"AuraTone","index":"03 / LOCAL AUDIO ENGINEERING","title":"Audioverarbeitung über Prozessgrenzen.","summary":"Rust/Tauri orchestriert einen lokalen DSP-Sidecar und eine asynchrone Audio-Pipeline. Die Case Study macht Prozesssteuerung, Protokoll und Deduplizierung nachvollziehbar.","tags":["Rust","Tauri","Python DSP","SHA-256","Async Worker"],"note":"Implementiert · E2E offen","limit":"GPU-Beschleunigung und sichere Prozessbereinigung wurden nicht verifiziert. Aus der Architekturerklärung folgt kein gemessener Audio-Benchmark.","steps":[["Fingerprint","Implementiert · nicht getestet","pipeline.rs berechnet einen SHA-256-Dateifingerprint und fragt die Datenbank zur Hash-Deduplizierung ab."],["Async Worker","Implementiert · nicht getestet","Ein asynchroner Worker und PipelineStage modellieren Verarbeitungsschritte und binden die DSP-Analyse an."],["DSP-Sidecar","Implementiert · nicht getestet","dsp_supervisor.rs startet im Debug-Modus Python und außerhalb davon einen Sidecar. Methoden: analyze, master und tag."],["JSON & Timeout","Offene Prüfung","Code verarbeitet stdout/stderr, JSON-Antworten, Exit-Fehler und Timeouts. Ein Future-Timeout allein belegt kein Kill/Wait des Kindprozesses."]],"evidence":"Code-Review v0.2 · 27.10.2026 · A1–A3. Supervisor und Pipeline sind Codebelege; GPU-Messung wurde nicht durchgeführt.","next":"Dummy-Audio, fehlerhafte JSON-Zeilen, große stderr-Ausgaben, Timeout-Cleanup und parallele Jobs prüfen.","publicLink":["Öffentliche Architektur","https://github.com/KKEEY92/AuraTone-Architecture"]}],"en":[{"name":"Job-Scout","index":"01 / CAREER OPERATIONS","title":"Documents with explicit approval boundaries.","summary":"A local Python/FastAPI system for career workflows. The engineering focus: PDF validation, explicit error states and traceable regression test design.","tags":["Python","FastAPI","PDF validation","Regression test design"],"note":"Code implemented · runtime verification pending","limit":"The review establishes PDF control logic and test design. A successful end-to-end export or production operation has not been verified.","steps":[["Workflow","Documented","The README describes FastAPI, local vault storage and optional LM Studio integration. This is documentation evidence; the complete workflow was not executed in the review."],["Verification status","Implemented — not tested","Control logic checks the verification status of evidence and profile components. This explains when a document must remain a draft."],["PDF error boundaries","Implemented — not tested","Explicit layout and PDF-engine errors distinguish failures. Their implementation does not establish a successful production export."],["Regressions","Code reviewed — test design","Test cases cover missing Chrome, page overflow, document order and a prohibited silent ReportLab fallback after Chrome errors. Mocks and synthetic PDFs are used; test execution remains pending."]],"evidence":"Code Review v0.2 · J1–J3 · 27 October 2026. PDF control logic and regression test design were identified in source code.","next":"Isolated test execution, a PDF golden sample and results tied to the reviewed revision.","publicLink":null},{"name":"Claire V2","index":"02 / REALTIME VOICE","title":"Reasoning through streaming to speech output.","summary":"A LiveKit-based voice agent with stream filtering and state-dependent prosody. The focus is integration boundaries and behavior across chunk boundaries.","tags":["Python","LiveKit","Streaming","Prosody"],"note":"Claire V2 · V2.5 is a separate variant","limit":"This code review concerns claire-v2. The existing V2.5 showcase card describes a separate variant. Provider configuration and end-to-end voice behavior still require verification.","steps":[["AgentSession","Implemented — not tested","The agent integrates LiveKit Agent and AgentSession with persona and memory modules. This establishes integration code, not a successful voice session."],["ThinkTagFilter","Implemented — not tested","The filter handles think blocks across multiple chunks before speech output, addressing a concrete streaming edge case."],["Prosody","Implemented — not tested","Numeric energy is mapped to speech rate and volume. Boundaries and the effect on actual speech output require separate tests."],["Provider boundaries","Verification pending","Comments about local versus cloud STT/TTS and Silero are inconsistent. Executed provider branches and configuration must be reconciled."]],"evidence":"Code Review v0.2 · C1–C3 · 27 October 2026. The architecture README is documentation evidence, not runtime verification.","next":"Chunk-split unit tests and prosody-boundary tests, followed by an isolated voice test.","publicLink":["Public architecture","https://github.com/KKEEY92/Claire-V2-Architecture"]},{"name":"AuraTone","index":"03 / LOCAL AUDIO ENGINEERING","title":"Audio processing across process boundaries.","summary":"Rust/Tauri orchestrates a local DSP sidecar and an asynchronous audio pipeline. The case study explains process control, the protocol and hash-based deduplication.","tags":["Rust","Tauri","Python DSP","SHA-256","Async worker"],"note":"Implemented · end-to-end verification pending","limit":"The review did not verify GPU acceleration or safe child-process cleanup. No measured audio benchmark is implied by this architecture explanation.","steps":[["Fingerprint","Implemented — not tested","The pipeline computes a SHA-256 file fingerprint and queries the database for hash-based deduplication."],["Async worker","Implemented — not tested","An asynchronous worker and pipeline stages model processing steps and connect DSP analysis."],["DSP sidecar","Implemented — not tested","The supervisor launches Python in debug builds and a sidecar in non-debug builds. Its interface provides analyze, master and tag operations."],["JSON & timeout","Verification pending","Code handles stdout/stderr, JSON responses, exit errors and timeouts. A future timeout alone does not establish safe kill/wait of the child process."]],"evidence":"Code Review v0.2 · A1–A3 · 27 October 2026. The supervisor and pipeline are code evidence; GPU performance was not measured.","next":"Dummy audio, malformed JSON lines, large stderr output, timeout cleanup and parallel jobs.","publicLink":["Public architecture","https://github.com/KKEEY92/AuraTone-Architecture"]}]};
  // Existing case translations keep their explicitly marked English fallback.
  const contextCases={
  "de": {
    "name": "ContextNexus",
    "index": "04 / CONTEXT ARCHITECTURE",
    "title": "Kontext verbinden. Freigaben getrennt prüfen.",
    "summary": "ContextNexus ist eine eigenständige lokale Kontext- und Graph-Anwendung: Informationen werden als Knoten und Beziehungen sichtbar, damit Quellen, Zusammenhänge und Widersprüche prüfbar bleiben. Context Bridge M4 ist das Modul für die kontrollierte Übergabe versionierter Kontextpakete.",
    "tags": [
      "Lokale Graph-Anwendung",
      "Context Bridge M4",
      "Quellenprüfung",
      "Menschliche Freigabe"
    ],
    "note": "M4 auf Entwicklungsbranch · produktive Abnahme offen",
    "limit": "Agent OS beschreibt Zuständigkeiten und Governance. ContextNexus verwaltet Kontext. Die Bridge prüft Übergaben; sie synchronisiert nicht automatisch alle Anwendungen. Job-Scout bleibt eine separate Career-Ops-Anwendung.",
    "steps": [
      [
        "Kontext & Quelle",
        "Anwendung im Code",
        "Ausgewählte Quellen → Kontextknoten und Beziehungen → nachvollziehbare Prüfung. Eine aktuelle Einzelinformation kann einem früheren Ziel oder Beleg widersprechen. Die Anwendung macht solche Zusammenhänge untersuchbar; die Bewertung bleibt beim Menschen. Private Graphen und Originaldateien werden hier nicht veröffentlicht."
      ],
      [
        "Paket & Berechtigung",
        "M4 implementiert",
        "Ein versioniertes Paket bindet Snapshot und Quellen über Hashes. Eine Signatur prüft die Authentizität; zusätzlich braucht es eine unabhängige menschliche Freigabe, einen autorisierten Consumer und wirksamen Lesezugriff auf die Originaldateien. Eine gültige Signatur allein genügt nicht."
      ],
      [
        "Änderung & Nutzung",
        "Synthetisch geprüft",
        "Konflikte und Deltas werden geprüft; Checkpoints erlauben Wiederaufnahme. Verifiziert und tatsächlich genutzt sind getrennte Nachweise. Dokumentiert sind Build-/TypeScript-Prüfungen und 69 synthetische M4-Fälle auf dem committed Entwicklungsstand. Das ist kein produktiver Provider- oder E2E-Nachweis."
      ],
      [
        "Produkt & Runtime",
        "Anbindung separat offen",
        "Aria ist der Companion-Produktstrang mit Persona-Auswahl, Chat und eigenem Voice-Code. Claire bezeichnet separate Voice-/Runtime-Stränge; V2 und V2.5 bleiben verschiedene Varianten. Persona OS beschreibt die Persona-Modellierung. Ein gemeinsamer Produktbetrieb oder eine M4-Anbindung dieser Stränge ist nicht abgenommen."
      ]
    ],
    "evidence": "Quell- und Dokumentationsabgleich · 11.11.2026. M4 liegt auf Entwicklungsbranches. Ein berichteter unabhängiger Transport-Readback betrifft nur ein synthetisches Dateipaar; signierte Freigabe, Consumeraktivierung und vollständiger Nutzungszyklus bleiben offen. Die 85 Fälle eines separaten uncommitteten Overlays gehören nicht zu den 69 committed Fällen.",
    "next": "Exakte signierte Freigabe, Vertrauensanker und Berechtigungen unabhängig bestätigen; danach je Consumer Nutzung, spätere Aktualisierung und Wiederaufnahme nachweisen.",
    "publicLink": [
      "Rollen und Systemgrenzen",
      "agent-os.html#system-boundaries"
    ]
  },
  "en": {
    "name": "ContextNexus",
    "index": "04 / CONTEXT ARCHITECTURE",
    "title": "Connect context. Check approvals separately.",
    "summary": "ContextNexus is a separate local context and graph application: information becomes nodes and relationships so sources, connections and contradictions can be examined. Context Bridge M4 is its module for controlled handover of versioned context packages.",
    "tags": [
      "Local graph application",
      "Context Bridge M4",
      "Source verification",
      "Human approval"
    ],
    "note": "M4 on a development branch · production acceptance pending",
    "limit": "Agent OS describes responsibilities and governance. ContextNexus manages context. The Bridge verifies handovers; it does not automatically synchronize every application. Job-Scout remains a separate career-operations application.",
    "steps": [
      [
        "Context & source",
        "Application code",
        "Selected sources → context nodes and relationships → traceable review. A current item can contradict an earlier goal or piece of evidence. The application makes these connections examinable; a person assesses them. Private graphs and original files are not published here."
      ],
      [
        "Package & permission",
        "M4 implemented",
        "A versioned package binds a snapshot and sources through hashes. A signature checks authenticity; an independent human approval, an authorized consumer and effective read access to original files are also required. A valid signature alone is insufficient."
      ],
      [
        "Change & use",
        "Synthetic tests",
        "Conflicts and deltas are checked; checkpoints support recovery. Verification and actual use have separate receipts. Build/TypeScript checks and 69 synthetic M4 cases are documented for the committed development revision. This is not production-provider or end-to-end evidence."
      ],
      [
        "Product & runtime",
        "Integration pending separately",
        "Aria is the companion product strand with persona selection, chat and its own voice code. Claire names separate voice/runtime strands; V2 and V2.5 remain distinct variants. Persona OS describes persona modeling. Joint product operation or M4 integration of these strands has not been accepted."
      ]
    ],
    "evidence": "Source and documentation review · 11 Nov 2026. M4 is on development branches. A reported independent transport readback covers only a synthetic file pair; signed approval, consumer activation and the full use cycle remain pending. The 85 cases in a separate uncommitted overlay are not the 69 committed cases.",
    "next": "Independently confirm an exact signed approval, trust anchor and permissions; then demonstrate use, a later update and recovery for each consumer.",
    "publicLink": [
      "Roles and system boundaries",
      "agent-os.html#system-boundaries"
    ]
  },
  "fr": {
    "name": "ContextNexus",
    "index": "04 / ARCHITECTURE DU CONTEXTE",
    "title": "Relier le contexte. Vérifier les autorisations séparément.",
    "summary": "ContextNexus est une application locale distincte de contexte et de graphe : les informations deviennent des nœuds et des relations pour examiner sources, liens et contradictions. Context Bridge M4 est son module de transfert contrôlé de paquets de contexte versionnés.",
    "tags": [
      "Application de graphe locale",
      "Context Bridge M4",
      "Vérification des sources",
      "Autorisation humaine"
    ],
    "note": "M4 sur une branche de développement · validation en production ouverte",
    "limit": "Agent OS décrit responsabilités et gouvernance. ContextNexus gère le contexte. La Bridge vérifie les transferts ; elle ne synchronise pas automatiquement toutes les applications. Job-Scout reste une application distincte de gestion de carrière.",
    "steps": [
      [
        "Contexte et source",
        "Code applicatif",
        "Sources sélectionnées → nœuds et relations → examen traçable. Une information actuelle peut contredire un objectif ou une preuve antérieurs. L’application permet d’examiner ces liens ; une personne les évalue. Les graphes privés et les originaux ne sont pas publiés ici."
      ],
      [
        "Paquet et accès",
        "M4 implémenté",
        "Un paquet versionné lie instantané et sources par des empreintes. La signature vérifie l’authenticité ; il faut aussi une autorisation humaine indépendante, un consommateur autorisé et un accès effectif en lecture aux originaux. Une signature valide ne suffit pas."
      ],
      [
        "Évolution et utilisation",
        "Tests synthétiques",
        "Conflits et deltas sont vérifiés ; les points de contrôle permettent la reprise. Vérification et utilisation effective ont des preuves distinctes. Des contrôles de compilation/TypeScript et 69 cas M4 synthétiques sont documentés pour la révision de développement commitée. Ce n’est pas une preuve de fournisseur en production ou de bout en bout."
      ],
      [
        "Produit et runtime",
        "Intégration à valider séparément",
        "Aria est la branche produit compagnon avec choix de persona, chat et code vocal propre. Claire désigne des branches vocales/runtime distinctes ; V2 et V2.5 restent différentes. Persona OS décrit la modélisation des personas. L’exploitation commune ou leur intégration M4 n’est pas validée."
      ]
    ],
    "evidence": "Examen du code et de la documentation · 11.11.2026. M4 reste sur des branches de développement. Une relecture indépendante rapportée du transport porte uniquement sur deux fichiers synthétiques ; autorisation signée, activation et cycle d’utilisation complet restent ouverts. Les 85 cas d’un overlay séparé non commité ne sont pas les 69 cas commités.",
    "next": "Confirmer indépendamment autorisation signée exacte, ancre de confiance et accès ; démontrer ensuite utilisation, mise à jour ultérieure et reprise pour chaque consommateur.",
    "publicLink": [
      "Rôles et limites des systèmes",
      "agent-os.html#system-boundaries"
    ]
  },
  "uk": {
    "name": "ContextNexus",
    "index": "04 / АРХІТЕКТУРА КОНТЕКСТУ",
    "title": "Пов’язувати контекст. Окремо перевіряти дозволи.",
    "summary": "ContextNexus — окремий локальний застосунок контексту та графів: інформація стає вузлами й зв’язками для перевірки джерел, взаємозв’язків і суперечностей. Context Bridge M4 — його модуль контрольованого передавання версійованих пакетів контексту.",
    "tags": [
      "Локальний графовий застосунок",
      "Context Bridge M4",
      "Перевірка джерел",
      "Дозвіл людини"
    ],
    "note": "M4 у гілці розробки · приймання для продуктивної роботи відкрите",
    "limit": "Agent OS описує відповідальність і правила роботи. ContextNexus керує контекстом. Bridge перевіряє передавання; автоматичної синхронізації всіх застосунків немає. Job-Scout залишається окремим застосунком кар’єрних процесів.",
    "steps": [
      [
        "Контекст і джерело",
        "Код застосунку",
        "Обрані джерела → вузли й зв’язки → простежувана перевірка. Поточна інформація може суперечити попередній меті або доказу. Застосунок дозволяє досліджувати ці зв’язки; оцінку робить людина. Приватні графи й оригінали тут не публікуються."
      ],
      [
        "Пакет і доступ",
        "M4 реалізовано",
        "Версійований пакет пов’язує знімок і джерела хешами. Підпис перевіряє автентичність; також потрібні незалежний дозвіл людини, авторизований споживач і фактичний доступ до читання оригіналів. Самого дійсного підпису недостатньо."
      ],
      [
        "Зміни й використання",
        "Синтетичні тести",
        "Перевіряються конфлікти й дельти; контрольні точки підтримують відновлення. Перевірка та фактичне використання мають окремі докази. Для закоміченої версії розробки документовано перевірки збірки/TypeScript і 69 синтетичних тестів M4. Це не доказ продуктивної інтеграції провайдера чи наскрізної роботи."
      ],
      [
        "Продукт і середовище виконання",
        "Інтеграція потребує окремого приймання",
        "Aria — продуктовий напрям компаньйона з вибором персон, чатом і власним голосовим кодом. Claire позначає окремі голосові напрями; V2 та V2.5 — різні варіанти. Persona OS описує моделювання персон. Спільна продуктивна робота або їхня інтеграція M4 не прийняті."
      ]
    ],
    "evidence": "Перевірка коду й документації · 11.11.2026. M4 перебуває у гілках розробки. Повідомлене незалежне зворотне читання підтверджує лише передавання пари синтетичних файлів; підписаний дозвіл, активація споживачів і повний цикл використання залишаються відкритими. 85 тестів окремого незакоміченого доповнення — не ті самі 69 закомічених тестів.",
    "next": "Незалежно підтвердити точний підписаний дозвіл, якір довіри й права; потім для кожного споживача довести використання, пізніше оновлення та відновлення.",
    "publicLink": [
      "Ролі та межі систем",
      "agent-os.html#system-boundaries"
    ]
  },
  "pl": {
    "name": "ContextNexus",
    "index": "04 / ARCHITEKTURA KONTEKSTU",
    "title": "Łączyć kontekst. Oddzielnie sprawdzać zgody.",
    "summary": "ContextNexus to odrębna lokalna aplikacja kontekstu i grafów: informacje tworzą węzły i relacje, aby można było sprawdzać źródła, powiązania i sprzeczności. Context Bridge M4 jest jej modułem kontrolowanego przekazywania wersjonowanych pakietów kontekstu.",
    "tags": [
      "Lokalna aplikacja grafowa",
      "Context Bridge M4",
      "Weryfikacja źródeł",
      "Zgoda człowieka"
    ],
    "note": "M4 w gałęzi rozwojowej · odbiór produkcyjny otwarty",
    "limit": "Agent OS opisuje odpowiedzialność i zasady działania. ContextNexus zarządza kontekstem. Bridge weryfikuje przekazania; nie synchronizuje automatycznie wszystkich aplikacji. Job-Scout pozostaje odrębną aplikacją procesów kariery.",
    "steps": [
      [
        "Kontekst i źródło",
        "Kod aplikacji",
        "Wybrane źródła → węzły i relacje → weryfikowalny przegląd. Bieżąca informacja może przeczyć wcześniejszemu celowi lub dowodowi. Aplikacja pozwala badać te związki; ocenia je człowiek. Prywatne grafy i oryginały nie są tutaj publikowane."
      ],
      [
        "Pakiet i uprawnienia",
        "M4 zaimplementowane",
        "Wersjonowany pakiet wiąże migawkę i źródła skrótami. Podpis sprawdza autentyczność; potrzebne są również niezależna zgoda człowieka, autoryzowany odbiorca i skuteczny dostęp do odczytu oryginałów. Sam poprawny podpis nie wystarcza."
      ],
      [
        "Zmiana i wykorzystanie",
        "Testy syntetyczne",
        "Sprawdzane są konflikty i delty; punkty kontrolne umożliwiają wznowienie. Weryfikacja i faktyczne wykorzystanie mają oddzielne dowody. Dla zapisanej w commitach wersji rozwojowej udokumentowano kontrole kompilacji/TypeScript i 69 syntetycznych przypadków M4. Nie dowodzi to produkcyjnej integracji dostawcy ani działania od początku do końca."
      ],
      [
        "Produkt i runtime",
        "Integracja wymaga osobnego odbioru",
        "Aria to kierunek produktu towarzyszącego z wyborem person, czatem i własnym kodem głosowym. Claire oznacza odrębne kierunki głosowe/runtime; V2 i V2.5 pozostają różnymi wariantami. Persona OS opisuje modelowanie person. Wspólne działanie produkcyjne ani ich integracja M4 nie zostały odebrane."
      ]
    ],
    "evidence": "Przegląd kodu i dokumentacji · 11.11.2026. M4 pozostaje w gałęziach rozwojowych. Zgłoszony niezależny odczyt potwierdza transport tylko pary syntetycznych plików; podpisana zgoda, aktywacja odbiorców i pełny cykl wykorzystania pozostają otwarte. 85 przypadków osobnej niezacommitowanej nakładki nie jest tymi samymi 69 przypadkami zapisanymi w commitach.",
    "next": "Niezależnie potwierdzić dokładną podpisaną zgodę, kotwicę zaufania i dostęp; następnie wykazać wykorzystanie, późniejszą aktualizację i wznowienie u każdego odbiorcy.",
    "publicLink": [
      "Role i granice systemów",
      "agent-os.html#system-boundaries"
    ]
  }
};
  for (const l of ['fr','uk','pl']) data[l]=data.en.map(c=>({...c,contentLanguage:'en'}));
  for (const l of Object.keys(contextCases)) data[l].push(contextCases[l]);
  const ui={
    de:{label:'Engineering / Deep Dive',title:'Systeme verstehen. Entscheidungen nachvollziehen.',intro:'Vier Projekte. Konkrete technische Entscheidungen. Erkunde Architektur, Codebelege und offene Prüfungen.',choose:'Case Study auswählen',architecture:'Architekturschritte',evidence:'Was der Code-Review belegt',next:'Nächster technischer Nachweis',footer:'Code-Review v0.2 · 27.10.2026 · Laufzeitprüfung offen',teaserTitle:'Engineering aus der Praxis',teaserIntro:'Validierung, Streaming und Prozesssteuerung – drei technische Einblicke mit klaren Evidenzgrenzen.',open:'Case Study erkunden →',pending:'Technische Referenzen auf Anfrage.',fallback:'Diese Case Studies stehen auf Deutsch und Englisch zur Verfügung.'},
    en:{label:'Engineering / Deep dive',title:'Understand systems. Follow the decisions.',intro:'Four projects. Concrete technical decisions. Explore architecture, source-code evidence and verification still pending.',choose:'Choose a case study',architecture:'Architecture steps',evidence:'What the code review establishes',next:'Next technical evidence',footer:'Code Review v0.2 · 27 Oct 2026 · Runtime verification pending',teaserTitle:'Engineering in practice',teaserIntro:'Validation, streaming and process control — three technical perspectives with explicit evidence boundaries.',open:'Explore case study →',pending:'Technical references available on request.',fallback:'These case studies are available in German and English.'}
  };
  Object.assign(ui,{
  "fr": {
    "label": "Engineering / Analyse technique",
    "title": "Comprendre les systèmes et les décisions.",
    "intro": "Quatre projets. Architecture, preuves techniques et validations encore ouvertes.",
    "choose": "Choisir une étude de cas",
    "architecture": "Étapes de l’architecture",
    "evidence": "Ce que les sources établissent",
    "next": "Prochaine preuve technique",
    "footer": "Examen du code · validation en production ouverte",
    "teaserTitle": "Engineering en pratique",
    "teaserIntro": "Validation, streaming et gestion des processus : trois perspectives techniques et un lien vers l’architecture du contexte.",
    "open": "Explorer l’étude de cas →",
    "pending": "Références techniques sur demande.",
    "fallback": "Les trois études initiales restent disponibles en allemand et en anglais ; ContextNexus est traduit en français."
  },
  "uk": {
    "label": "Engineering / Технічний розбір",
    "title": "Розуміти системи й рішення.",
    "intro": "Чотири проєкти. Архітектура, технічні докази та відкриті перевірки.",
    "choose": "Обрати технічний приклад",
    "architecture": "Кроки архітектури",
    "evidence": "Що підтверджують джерела",
    "next": "Наступний технічний доказ",
    "footer": "Перевірка коду · продуктивне приймання відкрите",
    "teaserTitle": "Engineering на практиці",
    "teaserIntro": "Валідація, потокова обробка та керування процесами: три технічні приклади й посилання на архітектуру контексту.",
    "open": "Переглянути приклад →",
    "pending": "Технічні джерела за запитом.",
    "fallback": "Три початкові приклади доступні німецькою й англійською; ContextNexus перекладено українською."
  },
  "pl": {
    "label": "Engineering / Analiza techniczna",
    "title": "Rozumieć systemy i decyzje.",
    "intro": "Cztery projekty. Architektura, dowody techniczne i otwarte weryfikacje.",
    "choose": "Wybierz studium przypadku",
    "architecture": "Etapy architektury",
    "evidence": "Co potwierdzają źródła",
    "next": "Następny dowód techniczny",
    "footer": "Przegląd kodu · odbiór produkcyjny otwarty",
    "teaserTitle": "Engineering w praktyce",
    "teaserIntro": "Walidacja, streaming i sterowanie procesami: trzy perspektywy techniczne i odsyłacz do architektury kontekstu.",
    "open": "Poznaj studium przypadku →",
    "pending": "Referencje techniczne na życzenie.",
    "fallback": "Trzy pierwotne studia są dostępne po niemiecku i angielsku; ContextNexus jest przetłumaczony na polski."
  }
});
  for (const l of Object.keys(ui)) { ui[l].contextLink=contextCases[l].title; ui[l].contextSummary=contextCases[l].note; }
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let selected=0;
  const steps=[0,0,0,0];
  const language=()=>data[document.documentElement.lang]?document.documentElement.lang:'en';
  function selectFromHash(){const i=ids.findIndex(id=>location.hash===`#engineering-${id}`);if(i>=0)selected=i;}
  function sync(){
    root.querySelectorAll('[data-case-select]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.caseSelect)===selected)));
    root.querySelectorAll('[data-case-panel]').forEach((panel,i)=>{
      panel.hidden=i!==selected;
      if(i===3)return; // ContextNexus keeps native, non-exclusive disclosures.
      const c=data[language()][i];
      panel.querySelectorAll('details').forEach((d,j)=>{d.open=j===steps[i];d.querySelector('summary').setAttribute('aria-expanded',String(d.open));});
      panel.querySelector('[data-detail-title]').textContent=c.steps[steps[i]][0];
      panel.querySelector('[data-detail-text]').textContent=c.steps[steps[i]][2];
    });
  }
  function render(){
    const l=language(),t=ui[l],cases=data[l],compact=root.dataset.variant==='compact';
    root.lang=l;
    const langNote=['de','en'].includes(document.documentElement.lang)?'':`<p class="case-footer">${escape(t.fallback)}</p>`;
    let html=`<div class="container"><p class="section-label">${escape(t.label)}</p><h2 class="section-title" id="engineering-title">${escape(compact?t.teaserTitle:t.title)}</h2><p class="section-sub">${escape(compact?t.teaserIntro:t.intro)}</p>${langNote}`;
    if(compact){
      html+=`<div class="engineering-teasers">${cases.slice(0,3).map((c,i)=>`<article lang="${c.contentLanguage||l}" class="glass-card engineering-teaser"><p class="case-index">${escape(c.index)}</p><h3>${escape(c.name)}</h3><p>${escape(c.summary)}</p><p class="case-status">${escape(c.note)}</p><a lang="${l}" href="https://kkeey.dev/#engineering-${ids[i]}">${escape(t.open)}</a></article>`).join('')}</div><p class="engineering-context-link"><strong>ContextNexus · Context Bridge M4</strong><br>${escape(t.contextSummary)}<br><a href="https://kkeey.dev/#engineering-contextnexus">${escape(t.contextLink)} →</a></p>`;
    }else{
      html+=`<div class="case-tabs" role="group" aria-label="${escape(t.choose)}">${cases.map((c,i)=>`<button type="button" data-case-select="${i}" aria-controls="engineering-${ids[i]}" aria-pressed="${i===selected}">${String(i+1).padStart(2,'0')} / ${escape(c.name)}</button>`).join('')}</div>`;
      html+=cases.map((c,i)=>`<article lang="${c.contentLanguage||l}" class="glass-card case-panel" id="engineering-${ids[i]}" data-case-panel="${i}" aria-labelledby="engineering-heading-${ids[i]}"><div class="case-top"><div><p class="case-index">${escape(c.index)}</p><h3 id="engineering-heading-${ids[i]}">${escape(c.title)}</h3><p>${escape(c.summary)}</p><div class="case-tags">${c.tags.map(s=>`<span>${escape(s)}</span>`).join('')}</div></div><aside class="case-note"><strong>${escape(c.note)}</strong><p>${escape(c.limit)}</p></aside></div><p class="arch-label" lang="${l}">${escape(t.architecture)}</p><div class="arch-flow">${c.steps.map((s,j)=>`<details><summary data-step="${j}" data-case="${i}"><span>${String(j+1).padStart(2,'0')} / ${escape(s[1])}</span>${escape(s[0])}</summary><p class="arch-native">${escape(s[2])}</p></details>`).join('')}</div><div class="arch-detail" ${i===3?'hidden':''} aria-live="polite"><h4 data-detail-title></h4><p data-detail-text></p></div><div class="case-evidence"><div><h4 lang="${l}">${escape(t.evidence)}</h4><p>${escape(c.evidence)}</p>${c.publicLink?`<p><a href="${escape(c.publicLink[1])}" target="_blank" rel="noopener">${escape(c.publicLink[0])} →</a></p>`:`<p>${escape(t.pending)}</p>`}</div><div><h4 lang="${l}">${escape(t.next)}</h4><p>${escape(c.next)}</p></div></div><p class="case-footer" lang="${l}">${escape(i===3?contextCases[l].note:t.footer)}</p></article>`).join('');
    }
    root.innerHTML=html+'</div>';
    root.dataset.enhanced='true';
    if(!compact)sync();
  }
  root.addEventListener('click',e=>{
    const choose=e.target.closest('[data-case-select]');
    if(choose){selected=Number(choose.dataset.caseSelect);sync();return;}
    const step=e.target.closest('summary[data-step]');
    if(step&&Number(step.dataset.case)!==3){e.preventDefault();steps[Number(step.dataset.case)]=Number(step.dataset.step);sync();}
  });
  selectFromHash();render();
  let lastLanguage=document.documentElement.lang;
  new MutationObserver(()=>{if(document.documentElement.lang!==lastLanguage){lastLanguage=document.documentElement.lang;render();}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  window.addEventListener('hashchange',()=>{selectFromHash();if(root.dataset.variant!=='compact')sync();});
})();
