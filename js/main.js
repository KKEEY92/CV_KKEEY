let state = {
  lang: localStorage.getItem('kk_portfolio_lang') || 'de',
  darkMode: localStorage.getItem('kk_portfolio_dark') !== 'false',
  showBgPanel: false,
  bgMode: 'fluid',
  bgIntensity: 1.0,
  navScrolled: false
};

const DYNAMIC_TEXTS = {
  de: {
    heroCta1: "Projekte ansehen",
    heroCta2: "Kontakt aufnehmen",
    trioLabel: "Differenziator",
    trioTitle: "Das seltene Dreierpaket",
    trioSub: "Drei Domänen. Eine Person. Diese Kombination gibt es kaum.",
    projTitle: "Projekte & Showcase",
    projSub: "Gebaut. Deployed. Öffentlich.",
    skillsTitle: "Skills & Kompetenzprofil",
    careerLabel: "Karriere",
    careerTitle: "Beruflicher Werdegang",
    contactLabel: "Kontakt",
    contactTitle: "Lass uns sprechen.",
    contactDesc: "Offen für Festanstellungen, Freelance-Projekte und Kollaborationen. Remote · Hybrid · DE & EN.",
    namePH: "Dein Name",
    emailPH: "Deine E-Mail",
    msgPH: "Deine Nachricht...",
    submitLabel: "Nachricht senden →"
  },
  en: {
    heroCta1: "View Projects",
    heroCta2: "Get in touch",
    trioLabel: "Differentiator",
    trioTitle: "The Rare Trio",
    trioSub: "Three domains. One person. Almost no one has this combination.",
    projTitle: "Projects & Showcase",
    projSub: "Built. Deployed. Public.",
    skillsTitle: "Skills & Expertise",
    careerLabel: "Career",
    careerTitle: "Career Story",
    contactLabel: "Contact",
    contactTitle: "Let's talk.",
    contactDesc: "Open for full-time roles, freelance projects, and collaborations. Remote · Hybrid · DE & EN.",
    namePH: "Your name",
    emailPH: "Your email",
    msgPH: "Your message...",
    submitLabel: "Send message →"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  renderApp();
  initCanvasBg();
});

function initUI() {
  document.getElementById('darkToggleBtn').addEventListener('click', () => {
    state.darkMode = !state.darkMode;
    localStorage.setItem('kk_portfolio_dark', state.darkMode);
    renderApp();
  });

  document.getElementById('langToggleBtn').addEventListener('click', () => {
    state.lang = state.lang === 'de' ? 'en' : 'de';
    localStorage.setItem('kk_portfolio_lang', state.lang);
    renderApp();
    initTyped();
  });

  window.addEventListener('scroll', () => {
    const sc = window.scrollY > 60;
    if (sc !== state.navScrolled) {
      state.navScrolled = sc;
      const nav = document.getElementById('main-nav');
      if (sc) {
        nav.style.background = state.darkMode ? 'rgba(7,7,15,0.92)' : 'rgba(238,238,248,0.94)';
        nav.style.borderBottom = `1px solid ${state.darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,30,0.1)'}`;
      } else {
        nav.style.background = 'transparent';
        nav.style.borderBottom = '1px solid transparent';
      }
    }
  });

  initTyped();
}

function renderApp() {
  // Theme
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
  document.body.style.background = state.darkMode ? '#07070f' : '#eeeef8';
  document.body.style.color = state.darkMode ? '#bdbdda' : '#3a3a5c';

  const darkIcon = document.querySelector('.dark-icon');
  const lightIcon = document.querySelector('.light-icon');
  if (darkIcon && lightIcon) {
    darkIcon.style.display = state.darkMode ? 'inline' : 'none';
    lightIcon.style.display = state.darkMode ? 'none' : 'inline';
  }

  document.getElementById('lang-btn-text').textContent = state.lang === 'de' ? 'EN' : 'DE';

  // I18N
  const texts = DYNAMIC_TEXTS[state.lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[key]) el.textContent = texts[key];
    else if (CV_DATA.hero[key] && CV_DATA.hero[key][state.lang]) el.textContent = CV_DATA.hero[key][state.lang];
  });

  // Render Trio
  const trio = state.lang === 'de' ? [
    ['⚙️','Operationale Tiefe','15 J. Inventory & Supply Chain · BAUHAUS','Systemdenken aus dem echten Handelsbetrieb. Ich weiß wie operative KMU wirklich funktionieren — nicht aus Büchern, sondern aus 15 Jahren täglicher Praxis.'],
    ['🤖','AI Agent Architekt','Python · TypeScript · Gemini · ComfyUI','Baut und deployt eigenständige AI-Agentensysteme. Claire V2.5, AuraTone, Sortier-Pipelines.'],
    ['🎚️','Audio & DJ Engineering','10 Jahre · 5.000+ Tracks','Tiefe Domainkenntnis in Audio-DSP, harmonischem Mixen und Musikanalyse. Fundament für AuraTone.'],
  ] : [
    ['⚙️','Operational Depth','15 Yrs Inventory & Supply Chain · BAUHAUS','Systems thinking from real-world operations. I know how SMEs actually function — not from theory, but 15 years of hands-on practice.'],
    ['🤖','AI Agent Architect','Python · TypeScript · Gemini · ComfyUI','Builds and deploys autonomous AI agent systems. Claire V2.5, AuraTone, sorting pipelines.'],
    ['🎚️','Audio & DJ Engineering','10 Years · 5,000+ Tracks','Deep domain knowledge in audio DSP, harmonic mixing, and music analysis. The foundation of AuraTone.'],
  ];

  let trioHtml = '';
  trio.forEach(([icon,label,sub,detail]) => {
    trioHtml += `
      <div style="background:var(--kk-card);border:1px solid var(--kk-border);border-radius:20px;padding:38px 30px;position:relative;overflow:hidden;transition:all 0.35s ease;cursor:default;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:inset 0 1px 0 var(--kk-inset),0 8px 32px var(--kk-shadow)">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#7c6af7,#00d4aa)"></div>
        <div style="font-size:40px;margin-bottom:22px;line-height:1">${icon}</div>
        <h3 style="font-size:19px;font-weight:700;color:var(--kk-text-bright);margin-bottom:9px;letter-spacing:-0.4px">${label}</h3>
        <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#7c6af7;margin-bottom:18px;line-height:1.75;opacity:0.88;word-break:break-word">${sub}</p>
        <p style="font-size:14px;color:var(--kk-text-dim);line-height:1.6">${detail}</p>
      </div>`;
  });
  document.getElementById('trio-container-injection').innerHTML = trioHtml;

  // Render Projects
  let projectsHtml = '';
  CV_DATA.projects.forEach(p => {
    const techTags = p.tech.map(t => `<span style="display:inline-block;padding:4px 10px;background:rgba(255,255,255,0.04);border:1px solid var(--kk-border);border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--kk-text-muted)">${t}</span>`).join('');
    projectsHtml += `
      <div style="background:var(--kk-card);border:1px solid var(--kk-border);border-radius:20px;padding:40px;transition:all 0.35s ease;backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:inset 0 1px 0 var(--kk-inset),0 8px 32px var(--kk-shadow)">
        <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#00d4aa;letter-spacing:1px;margin-bottom:12px">${p.role[state.lang]}</p>
        <h3 style="font-size:24px;font-weight:700;color:var(--kk-text-bright);margin-bottom:16px;letter-spacing:-0.5px">${p.name}</h3>
        <p style="font-size:15px;color:var(--kk-text-dim);line-height:1.7;margin-bottom:24px">${p.description[state.lang]}</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px">${techTags}</div>
        <a href="${p.github}" target="_blank" style="display:inline-flex;align-items:center;gap:8px;color:#7c6af7;text-decoration:none;font-weight:600;font-size:14px;transition:color 0.2s">
          ${state.lang === 'de' ? 'GitHub ansehen →' : 'View on GitHub →'}
        </a>
      </div>`;
  });
  document.getElementById('projects-container-injection').innerHTML = projectsHtml;

  // Render Nav
  const navItems = state.lang === 'de'
    ? [['#about','Über mich'],['#projects','Projekte'],['#skills','Skills'],['#career','Karriere'],['#contact','Kontakt']]
    : [['#about','About'],['#projects','Projects'],['#skills','Skills'],['#career','Career'],['#contact','Contact']];

  let navHtml = navItems.map(([h,l]) => `<a href="${h}" style="color:var(--kk-text);text-decoration:none;font-size:14px;font-weight:500;transition:color 0.2s">${l}</a>`).join('');
  document.getElementById('nav-links-desktop').innerHTML = navHtml;

  // Input placeholders
  document.getElementById('form-name').placeholder = texts.namePH;
  document.getElementById('form-email').placeholder = texts.emailPH;
  document.getElementById('form-msg').placeholder = texts.msgPH;
}

function initTyped() {
  if (window.typedInstance) window.typedInstance.destroy();
  const el = document.getElementById('typed-text');
  if (el && typeof Typed !== 'undefined') {
    window.typedInstance = new Typed(el, {
      strings: CV_DATA.hero.roles[state.lang],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: false
    });
  }
}

// Background Canvas Logic (Fallback to simple styling if not supported)
let bgGl, bgRaf, bgTime = 0;
function initCanvasBg() {
  const canvas = document.getElementById('kk-bg');
  if (!canvas) return;
  const gl = canvas.getContext('webgl');
  if (!gl) {
    canvas.style.display = 'none'; // Fallback
    return;
  }
  // Setup simple dark background for now as fallback while we port the shader
  canvas.style.background = 'radial-gradient(circle at center, #1a1a2e 0%, #07070f 100%)';
}
// Basic form submission handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const msg = document.getElementById('form-msg').value;

      const s = encodeURIComponent('Portfolio Kontakt: ' + name);
      const b = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
      window.open('mailto:kuck_kevin@icloud.com?subject=' + s + '&body=' + b);

      const sentMsg = document.getElementById('form-sent-msg');
      if (sentMsg) {
        sentMsg.style.display = 'block';
        sentMsg.textContent = state.lang === 'de' ? '✓ E-Mail-Client geöffnet — bis bald.' : '✓ Email client opened — talk soon.';
      }
    });
  }
});

// Very basic fallback shader approach since we stripped the full WebGL implementation for stability.
// Let's add a basic canvas effect fallback.
function initCanvasFallback() {
    const canvas = document.getElementById('kk-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = state.darkMode ? 'rgba(124,106,247,0.1)' : 'rgba(124,106,247,0.05)';

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    initCanvasFallback();
});
