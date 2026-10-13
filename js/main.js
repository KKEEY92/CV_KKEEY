/**
 * KKEEY Future Orchestrator Interface — main.js v3.5
 * CV_KKEEY (AI Engineering & Systems Portfolio)
 * Multilingual: DE / EN / FR / UK / PL
 */

const D = window.KK_DATA;
const LANGUAGES = ['de', 'en', 'fr', 'uk', 'pl'];
let lang = localStorage.getItem('kk_lang') || 'de';
if (!LANGUAGES.includes(lang)) lang = 'de';

let darkMode = localStorage.getItem('kk_dark') !== 'false';
let colorTheme = localStorage.getItem('kk_color') || 'orange';

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  render();
  initNav();
  initTyped();
  initReveal();
  initSkillBars();
  initBg();
});

function t(obj) {
  if (typeof obj === 'object' && obj !== null) {
    return obj[lang] || obj.de || obj.en || '';
  }
  return obj || '';
}

// ─── THEME ────────────────────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  document.documentElement.setAttribute('data-color-theme', colorTheme === 'orange' ? 'orange' : '');
  localStorage.setItem('kk_dark', darkMode);
  localStorage.setItem('kk_color', colorTheme);
  if (typeof updateBgLight === 'function') updateBgLight();
  const btn = document.getElementById('darkToggle');
  if (btn) btn.setAttribute('aria-label', darkMode ? t(D.i18n.darkBtnLight) : t(D.i18n.darkBtnDark));
  if (btn) {
    btn.innerHTML = darkMode
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
}

// ─── NAV ──────────────────────────────────────────────────────────────
function initNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      hamburger.textContent = open ? '✕' : '☰';
      hamburger.setAttribute('aria-expanded', open);
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) { links.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); hamburger.textContent='☰'; hamburger.focus(); }
  });
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) document.querySelectorAll('#navLinks a').forEach(a => { if(a.hash === '#' + entry.target.id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); }); });
  }, {rootMargin:'-20% 0px -60% 0px'});
  document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      if (hamburger) {
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  document.getElementById('darkToggle').addEventListener('click', () => {
    darkMode = !darkMode;
    applyTheme();
    updateBgLight();
  });

  const colorToggle = document.getElementById('colorToggle');
  if (colorToggle) {
    colorToggle.addEventListener('click', () => {
      colorTheme = colorTheme === 'purple' ? 'orange' : 'purple';
      applyTheme();
    });
  }

  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const idx = LANGUAGES.indexOf(lang);
      lang = LANGUAGES[(idx + 1) % LANGUAGES.length];
      localStorage.setItem('kk_lang', lang);
      render();
      restartTyped();
    });
  }
}

// ─── TYPED ────────────────────────────────────────────────────────────
let typedTimer, typedIdx = 0, typedDeleting = false, typedText = '';

function initTyped() {
  restartTyped();
  window.KK_MOTION.media.addEventListener('change', restartTyped);
  document.addEventListener('visibilitychange', () => { if (document.hidden) clearTimeout(typedTimer); else restartTyped(); });
}

function restartTyped() {
  clearTimeout(typedTimer);
  typedIdx = 0; typedDeleting = false; typedText = '';
  const el = document.getElementById('typedOutput');
  if (el) el.textContent = '';
  if (window.KK_MOTION.media.matches) {
    if (el) el.textContent = t(D.hero.roles)?.[0] || D.hero.roles.de[0];
    return;
  }
  typedTimer = setTimeout(nextChar, 400);
}

function nextChar() {
  if (document.hidden || window.KK_MOTION.media.matches) return;
  const roles = (D.hero.roles && D.hero.roles[lang]) || D.hero.roles.de || [];
  if (!roles.length) return;
  const target = roles[typedIdx % roles.length];
  const el = document.getElementById('typedOutput');
  if (!el) return;

  if (!typedDeleting) {
    if (typedText.length < target.length) {
      typedText = target.slice(0, typedText.length + 1);
      el.textContent = typedText;
      typedTimer = setTimeout(nextChar, 62);
    } else {
      typedTimer = setTimeout(() => { typedDeleting = true; nextChar(); }, 2600);
    }
  } else {
    if (typedText.length > 0) {
      typedText = typedText.slice(0, -1);
      el.textContent = typedText;
      typedTimer = setTimeout(nextChar, 26);
    } else {
      typedDeleting = false;
      typedIdx++;
      el.classList.add('glitch');
      typedTimer = setTimeout(() => { el.classList.remove('glitch'); nextChar(); }, 400);
    }
  }
}

// ─── RENDER ───────────────────────────────────────────────────────────
function render() {
  document.documentElement.lang = lang;
  applyTranslations();
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.textContent = lang.toUpperCase();
    langBtn.setAttribute('aria-label', `Sprache wechseln (DE, EN, FR, UK, PL) — Aktuell: ${lang.toUpperCase()}`);
    langBtn.setAttribute('title', `Sprache wechseln / Switch Language (DE, EN, FR, UK, PL)`);
  }

  // Nav links
  const navKeys = [
    D.i18n.navAbout,
    D.i18n.navProjects,
    D.i18n.navSkills,
    D.i18n.navCerts,
    D.i18n.navCareer,
    D.i18n.navContact,
  ];
  document.querySelectorAll('#navLinks a').forEach((a, i) => {
    if (navKeys[i]) a.textContent = t(navKeys[i]);
  });

  // Hero
  const heroGreeting = document.getElementById('heroGreeting');
  if (heroGreeting) heroGreeting.textContent = t(D.hero.greeting);
  const heroCta1 = document.getElementById('heroCta1');
  if (heroCta1) heroCta1.textContent = t(D.hero.cta1);
  const heroCta2 = document.getElementById('heroCta2');
  if (heroCta2) heroCta2.textContent = t(D.hero.cta2);
  const heroCta3Span = document.querySelector('#heroCta3 span');
  if (heroCta3Span) heroCta3Span.textContent = t(D.hero.cta3);
  const availText = document.getElementById('availableText');
  if (availText) availText.textContent = t(D.hero.available);

  // Trio
  const trioLabel = document.getElementById('trioLabel');
  if (trioLabel) trioLabel.textContent = t(D.i18n.trioLabel);
  const trioTitle = document.getElementById('trioTitle');
  if (trioTitle) trioTitle.textContent = t(D.i18n.trioTitle);
  const trioSub = document.getElementById('trioSub');
  if (trioSub) trioSub.textContent = t(D.i18n.trioSub);
  renderTrio();

  // Projects
  const projTitle = document.getElementById('projTitle');
  if (projTitle) projTitle.textContent = t(D.i18n.projTitle);
  const projSub = document.getElementById('projSub');
  if (projSub) projSub.textContent = t(D.i18n.projSub);
  renderProjects();

  // Skills
  const skillsTitle = document.getElementById('skillsTitle');
  if (skillsTitle) skillsTitle.textContent = t(D.i18n.skillsTitle);
  renderSkills();

  // Certifications
  const certLabel = document.getElementById('certLabel');
  if (certLabel) certLabel.textContent = t(D.i18n.certLabel);
  const certTitle = document.getElementById('certTitle');
  if (certTitle) certTitle.textContent = t(D.i18n.certTitle);
  renderCertifications();
  renderEducation();

  // Career
  const careerLabel = document.getElementById('careerLabel');
  if (careerLabel) careerLabel.textContent = t(D.i18n.careerLabel);
  const careerTitle = document.getElementById('careerTitle');
  if (careerTitle) careerTitle.textContent = t(D.i18n.careerTitle);
  renderTimeline();

  // Contact
  const contactLabel = document.getElementById('contactLabel');
  if (contactLabel) contactLabel.textContent = t(D.i18n.contactLabel);
  const contactTitle = document.getElementById('contactTitle');
  if (contactTitle) contactTitle.textContent = t(D.i18n.contactTitle);
  const contactDesc = document.getElementById('contactDesc');
  if (contactDesc) contactDesc.textContent = t(D.i18n.contactDesc);
  const formName = document.getElementById('formName');
  if (formName) formName.placeholder = t(D.i18n.namePH);
  const formEmail = document.getElementById('formEmail');
  if (formEmail) formEmail.placeholder = t(D.i18n.emailPH);
  const formMsg = document.getElementById('formMsg');
  if (formMsg) formMsg.placeholder = t(D.i18n.msgPH);
  const formSubmit = document.getElementById('formSubmit');
  if (formSubmit) formSubmit.textContent = t(D.i18n.submitLabel);
  const formSent = document.getElementById('formSent');
  if (formSent) formSent.textContent = t(D.i18n.sentMsg);

  // Footer crosslink + dark-toggle label follow the active language
  const cross = document.getElementById('footerCross');
  if (cross) cross.textContent = t(D.i18n.footerCross);
  const darkBtn = document.getElementById('darkToggle');
  if (darkBtn) darkBtn.setAttribute('aria-label', darkMode ? t(D.i18n.darkBtnLight) : t(D.i18n.darkBtnDark));

  initReveal();
  initSkillBars();
  ['formName', 'formEmail', 'formMsg'].forEach(id => { const field = document.getElementById(id); if(field) field.setAttribute('aria-label', field.placeholder); });
}

function renderTrio() {
  const c = document.getElementById('trioContainer');
  if (!c) return;
  c.innerHTML = D.trio.map(item => `
    <div class="glass-card trio-card reveal">
      <div class="card-accent"></div>
      <div class="trio-icon">${item.icon}</div>
      <h3 class="trio-label">${t(item.label)}</h3>
      <p class="trio-sub">${t(item.sub)}</p>
      <p class="trio-detail">${t(item.detail)}</p>
    </div>
  `).join('');
}

const STATUS_TYPE_LABELS = {
  released:      { de: 'Released', en: 'Released', fr: 'Publié', uk: 'Реліз', pl: 'Wydany' },
  implemented:   { de: 'Implemented', en: 'Implemented', fr: 'Implémenté', uk: 'Реалізовано', pl: 'Wdrożony' },
  prototype:     { de: 'Prototype', en: 'Prototype', fr: 'Prototype', uk: 'Прототип', pl: 'Prototyp' },
  experiment:    { de: 'Experiment', en: 'Experiment', fr: 'Expérience', uk: 'Експеримент', pl: 'Eksperyment' },
  documentation: { de: 'Öffentliche Dokumentation · Private Implementierung', en: 'Public Documentation · Proprietary Implementations', fr: 'Documentation Publique · Implémentations Privées', uk: 'Публічна документація · Приватна реалізація', pl: 'Publiczna Dokumentacja · Prywatna Implementacja' },
  demo:          { de: 'Demo', en: 'Demo', fr: 'Démo', uk: 'Демо', pl: 'Demo' },
};

function statusTagText(status) {
  if (!status || !status.type) return '';
  const label = t(STATUS_TYPE_LABELS[status.type]) || status.type;
  if (status.sourceVisibility === 'private') {
    return `● ${label} · Private Source · Public Evidence`;
  }
  return status.latestTag ? `● ${label} · Tag ${status.latestTag}` : `● ${label}`;
}

function renderProjects() {
  const c = document.getElementById('projContainer');
  if (!c) return;
  c.innerHTML = D.projects.map(p => {
    const rgb = p.colorRgb;
    const col = p.color;
    const tagText = p.tag || statusTagText(p.status);
    const noteEl = p.note
      ? `<p class="project-note">${t(p.note)}</p>`
      : '';
    const linksList = p.links || (p.linkLabel ? [{ href: p.link, label: p.linkLabel }] : []);
    const linksEl = linksList.length
      ? `<div class="project-links">${linksList.map(l =>
          l.href
            ? `<a href="${l.href}" target="_blank" rel="noopener" class="project-link" style="color:${col}">${t(l.label)}</a>`
            : `<span class="project-link" style="color:var(--kk-text-muted)">${t(l.label)}</span>`
        ).join('')}</div>`
      : '';
    return `
    <div class="glass-card project-card reveal" style="background:linear-gradient(135deg,rgba(${rgb},0.04) 0%,var(--kk-card));box-shadow:inset 0 1px 0 var(--kk-inset),0 8px 32px var(--kk-shadow)">
      <div>
        <div class="project-header">
          <h3 class="project-name">${p.name}</h3>
          <span class="project-tag" style="border:1px solid rgba(${rgb},0.45);color:${col};background:rgba(${rgb},0.07)">${tagText}</span>
        </div>
        <p class="project-sub">${t(p.sub)}</p>
      </div>
      <p class="project-desc">${t(p.desc)}</p>
      <div class="project-stack">
        ${p.stack.map(s => `<span style="background:rgba(${rgb},0.07);border:1px solid rgba(${rgb},0.18);color:rgba(${rgb},0.88)">${s}</span>`).join('')}
      </div>
      ${noteEl}
      ${linksEl}
    </div>`;
  }).join('');
}

function renderCertifications() {
  const c = document.getElementById('certContainer');
  if (!c) return;
  if (!D.certifications || D.certifications.length === 0) {
    c.innerHTML = `<p class="cert-empty reveal">${t(D.i18n.certEmpty)}</p>`;
    return;
  }
  c.innerHTML = D.certifications.map(cert => {
    const rgb = cert.colorRgb;
    const col = cert.color;
    return `
    <a href="${cert.link}" target="_blank" rel="noopener" class="glass-card cert-card reveal" style="background:linear-gradient(135deg,rgba(${rgb},0.04) 0%,var(--kk-card));box-shadow:inset 0 1px 0 var(--kk-inset),0 8px 32px var(--kk-shadow)">
      <div class="project-header">
        <h3 class="project-name">${cert.name}</h3>
        <span class="project-tag" style="border:1px solid rgba(${rgb},0.45);color:${col};background:rgba(${rgb},0.07)">${cert.tag}</span>
      </div>
      <p class="project-sub">${t(cert.sub)}</p>
      <p class="project-desc">${t(cert.desc)}</p>
    </a>`;
  }).join('');
}

function renderEducation() {
  const label = document.getElementById('eduLabel');
  const list = document.getElementById('eduList');
  const link = document.getElementById('eduLink');
  if (!label || !list || !link) return;
  label.textContent = t(D.education.label);
  list.innerHTML = D.education.items.map(item => `<li class="reveal">${t(item)}</li>`).join('');
  link.href = D.education.linkedinLink;
  link.textContent = t(D.education.linkedinLabel);
}

function renderSkills() {
  const c = document.getElementById('skillsContainer');
  if (!c) return;
  c.innerHTML = D.skillGroups.map((group, gi) => `
    <div class="glass-card skill-card reveal">
      <h3 class="skill-group-label">${t(group.label)}</h3>
      <div class="skill-items">
        ${group.skills.map((s) => `
          <div class="skill-header">
            <span class="skill-name">${s.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderTimeline() {
  const c = document.getElementById('timelineContainer');
  if (!c) return;
  c.innerHTML = D.timeline.map(tl => {
    const col = tl.color;
    const active = tl.active;
    const dotBg = active ? 'rgba(0,212,170,0.12)' : 'rgba(124,106,247,0.08)';
    const dotBorder = active ? '2px solid rgba(0,212,170,0.45)' : '2px solid rgba(124,106,247,0.3)';
    const innerBg = active ? '#00d4aa' : '#7c6af7';
    const innerAnim = active ? 'pulseDot 2.8s ease infinite' : 'none';
    const tagBg = active ? 'rgba(0,212,170,0.07)' : 'rgba(124,106,247,0.07)';
    const tagBorder = active ? '1px solid rgba(0,212,170,0.2)' : '1px solid rgba(124,106,247,0.2)';
    const tagColor = active ? 'rgba(0,212,170,0.88)' : 'rgba(124,106,247,0.88)';
    const company = typeof tl.company === 'object' ? t(tl.company) : tl.company;
    return `
    <div class="timeline-item reveal">
      <div class="timeline-dot-wrap" style="background:${dotBg};border:${dotBorder};box-shadow:${active ? '0 0 16px rgba(0,212,170,0.2)' : 'none'}">
        <div class="timeline-dot-inner" style="background:${innerBg};animation:${innerAnim}"></div>
      </div>
      <div class="timeline-content">
        <p class="timeline-period">${t(tl.period)}</p>
        <h3 class="timeline-role">${t(tl.role)}</h3>
        <p class="timeline-company" style="color:${col}">${company}</p>
        <p class="timeline-desc">${t(tl.desc)}</p>
        <div class="timeline-tags">
          ${tl.tags.map(tag => `<span style="background:${tagBg};border:${tagBorder};color:${tagColor}">${tag}</span>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
}

// ─── REVEAL & SKILL BARS ─────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

function initSkillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(f => { f.style.transform = `scaleX(${f.dataset.pct / 100})`; });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-card').forEach(el => obs.observe(el));
}

// ─── CONTACT FORM (Web3Forms) ────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('formSubmit');
    btn.textContent = t(D.i18n.sendingLabel);
    btn.disabled = true;
    const status = document.getElementById('formSent');
    status.style.display = 'block'; status.textContent = t(D.i18n.sendingLabel);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const data = new FormData(form);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, signal: controller.signal });
      const json = await res.json();
      if (res.ok && json.success) {
        status.textContent = t(D.i18n.sentMsg);
        document.getElementById('formSent').style.display = 'block';
        form.reset();
        btn.textContent = t(D.i18n.submitLabel);
      } else {
        status.textContent = t(D.i18n.sendErr);
        btn.textContent = t(D.i18n.submitLabel);
      }
    } catch (err) {
      status.textContent = t(D.i18n.sendErr);
      btn.textContent = t(D.i18n.submitLabel);
    }
    clearTimeout(timeout);
    btn.disabled = false;
  });
}

// ─── WEBGL BACKGROUND ────────────────────────────────────────────────
let gl, uTime, uRes, uIntensity, uLight, uC1, uC2;

function initBg() {
  const c = document.getElementById('kk-bg');
  if (!c) return;
  gl = c.getContext('webgl', {alpha: false, antialias: false, powerPreference: 'low-power'});
  if (!gl) return;

  const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}';
  const FS = [
    'precision mediump float;',
    'uniform float u_t,u_i,u_l;',
    'uniform vec3 u_c1,u_c2;',
    'uniform vec2 u_r;',
    'void main(){',
    '  vec2 uv=gl_FragCoord.xy/u_r;',
    '  vec2 p=uv*2.-1.;',
    '  p.x*=u_r.x/u_r.y;',
    '  float t=u_t*.2;',
    '  float w1=sin(p.x*2.5+t)*cos(p.y*1.8-t*.6);',
    '  float w2=cos(p.x*1.5-t*.4)*sin(p.y*2.2+t);',
    '  float w3=sin(length(p)*3.-t*1.2)*.5+.5;',
    '  float m1=w1*.5+.5,m2=w2*.5+.5;',
    '  vec3 dark=vec3(.027,.027,.059);',
    '  vec3 lite=vec3(.933,.933,.973);',
    '  vec3 base=mix(dark,lite,u_l);',
    '  vec3 pur=u_c1;',
    '  vec3 teal=u_c2;',
    '  float db=1.-u_l;',
    '  vec3 col=base;',
    '  col+=pur*m1*w3*(.28+.18*db)*u_i;',
    '  col+=teal*m2*w3*(.16+.1*db)*u_i;',
    '  col+=vec3(.08,.05,.22)*m1*m2*.35*u_i*db;',
    '  gl_FragColor=vec4(clamp(col,0.,1.),1.);',
    '}'
  ].join('\n');

  let ready = false, lastPaint = -1, scale = 1, elapsed = 0, frames = 0;
  const motion = window.KK_MOTION;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25) * scale;
    c.width = Math.round(innerWidth * dpr); c.height = Math.round(innerHeight * dpr);
    c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
    gl.viewport(0, 0, c.width, c.height);
    gl.uniform2f(uRes, c.width, c.height);
  }
  function setup() {
    ready = false;
    try {
      const shaders = [];
      const mk = (type, src) => {
        const shader = gl.createShader(type); gl.shaderSource(shader,src); gl.compileShader(shader);
        if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) { const error = gl.getShaderInfoLog(shader); gl.deleteShader(shader); throw new Error(error); }
        shaders.push(shader); return shader;
      };
      const prog = gl.createProgram();
      gl.attachShader(prog,mk(gl.VERTEX_SHADER,VS)); gl.attachShader(prog,mk(gl.FRAGMENT_SHADER,FS)); gl.linkProgram(prog);
      if(!gl.getProgramParameter(prog,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      shaders.forEach(shader => gl.deleteShader(shader)); gl.useProgram(prog);
      const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
      gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog,'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
      uTime=gl.getUniformLocation(prog,'u_t'); uRes=gl.getUniformLocation(prog,'u_r');
      uIntensity=gl.getUniformLocation(prog,'u_i'); uLight=gl.getUniformLocation(prog,'u_l');
      uC1=gl.getUniformLocation(prog,'u_c1'); uC2=gl.getUniformLocation(prog,'u_c2');
      gl.uniform1f(uIntensity,.32); ready=true; resize(); updateBgLight();
    } catch(error) { console.warn('Ambient shader fallback:',error.message); c.style.opacity='0'; }
  }
  setup();
  motion.add({ visible: () => ready && !gl.isContextLost(), draw(time,dt) {
    if(dt){elapsed+=dt;frames++;if(elapsed>2400){if(elapsed/frames>28 && scale>0.6){scale=.6;resize();}elapsed=0;frames=0;}}
    if(dt && time-lastPaint<1/30) return;
    lastPaint=time; gl.uniform1f(uTime,time); gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  }});
  window.addEventListener('resize',()=>{if(ready){resize();motion.refresh();}},{passive:true});
  c.addEventListener('webglcontextlost',e=>{e.preventDefault();ready=false;c.style.opacity='0';motion.refresh();});
  c.addEventListener('webglcontextrestored',()=>{c.style.opacity='';setup();motion.refresh();});
}

function updateBgLight() {
  if (!gl || gl.isContextLost() || !uLight) return;
  gl.uniform1f(uLight,darkMode?0:1);
  if(colorTheme==='orange'){gl.uniform3f(uC1,1,.478,0);gl.uniform3f(uC2,0,.898,1);}
  else{gl.uniform3f(uC1,.486,.416,.969);gl.uniform3f(uC2,0,.831,.667);}
  window.KK_MOTION?.refresh();
}


function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.getAttribute('data-i18n').split('.');
    let obj = D;
    for (let k of keys) {
      if (obj && obj[k]) obj = obj[k];
      else { obj = null; break; }
    }
    if (obj) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t(obj);
      } else {
        el.innerHTML = t(obj);
      }
    }
  });
}
