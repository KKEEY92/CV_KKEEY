const D = window.KK_DATA;
let lang = localStorage.getItem('kk_lang') || 'de';
let darkMode = localStorage.getItem('kk_dark') !== 'false';

document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  render();
  initNav();
  initTyped();
  initReveal();
  initSkillBars();
  initBg();
});

function t(obj) { return typeof obj === 'object' ? (obj[lang] || obj.de || '') : obj; }

// ─── THEME ────────────────────────────────────────────────────────────
function applyTheme() {
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  localStorage.setItem('kk_dark', darkMode);
  const btn = document.getElementById('darkToggle');
  if (btn) btn.setAttribute('aria-label', darkMode ? t(D.i18n.darkBtnLight) : t(D.i18n.darkBtnDark));
  if (btn) btn.innerHTML = darkMode
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
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
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      if (hamburger) { hamburger.textContent = '☰'; hamburger.setAttribute('aria-expanded', 'false'); }
    });
  });

  document.getElementById('darkToggle').addEventListener('click', () => {
    darkMode = !darkMode;
    applyTheme();
    updateBgLight();
  });

  document.getElementById('langToggle').addEventListener('click', () => {
    lang = lang === 'de' ? 'en' : 'de';
    localStorage.setItem('kk_lang', lang);
    render();
    restartTyped();
  });
}

// ─── TYPED ────────────────────────────────────────────────────────────
let typedTimer, typedIdx = 0, typedDeleting = false, typedText = '';

function initTyped() {
  typedTimer = setTimeout(nextChar, 900);
}

function restartTyped() {
  clearTimeout(typedTimer);
  typedIdx = 0; typedDeleting = false; typedText = '';
  document.getElementById('typedOutput').textContent = '';
  typedTimer = setTimeout(nextChar, 400);
}

function nextChar() {
  const roles = D.hero.roles[lang];
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
  document.getElementById('langToggle').textContent = lang === 'de' ? 'EN' : 'DE';

  // Nav links
  const navLabels = lang === 'de'
    ? ['Über mich','Projekte','Skills','Zertifikate','Karriere','Kontakt']
    : ['About','Projects','Skills','Certifications','Career','Contact'];
  document.querySelectorAll('#navLinks a').forEach((a, i) => { if (navLabels[i]) a.textContent = navLabels[i]; });

  // Hero
  document.getElementById('heroGreeting').textContent = t(D.hero.greeting);
  document.getElementById('heroCta1').textContent = t(D.hero.cta1);
  document.getElementById('heroCta2').textContent = t(D.hero.cta2);
  document.querySelector('#heroCta3 span').textContent = t(D.hero.cta3);
  document.getElementById('availableText').textContent = t(D.hero.available);

  // Trio
  document.getElementById('trioLabel').textContent = t(D.i18n.trioLabel);
  document.getElementById('trioTitle').textContent = t(D.i18n.trioTitle);
  document.getElementById('trioSub').textContent = t(D.i18n.trioSub);
  renderTrio();

  // Projects
  document.getElementById('projTitle').textContent = t(D.i18n.projTitle);
  document.getElementById('projSub').textContent = t(D.i18n.projSub);
  renderProjects();

  // Skills
  document.getElementById('skillsTitle').textContent = t(D.i18n.skillsTitle);
  renderSkills();

  // Certifications
  document.getElementById('certLabel').textContent = t(D.i18n.certLabel);
  document.getElementById('certTitle').textContent = t(D.i18n.certTitle);
  renderCertifications();
  renderEducation();

  // Career
  document.getElementById('careerLabel').textContent = t(D.i18n.careerLabel);
  document.getElementById('careerTitle').textContent = t(D.i18n.careerTitle);
  renderTimeline();

  // Contact
  document.getElementById('contactLabel').textContent = t(D.i18n.contactLabel);
  document.getElementById('contactTitle').textContent = t(D.i18n.contactTitle);
  document.getElementById('contactDesc').textContent = t(D.i18n.contactDesc);
  document.getElementById('formName').placeholder = t(D.i18n.namePH);
  document.getElementById('formEmail').placeholder = t(D.i18n.emailPH);
  document.getElementById('formMsg').placeholder = t(D.i18n.msgPH);
  document.getElementById('formSubmit').textContent = t(D.i18n.submitLabel);
  document.getElementById('formSent').textContent = t(D.i18n.sentMsg);

  // Footer crosslink + dark-toggle label follow the active language
  const cross = document.getElementById('footerCross');
  if (cross) cross.textContent = t(D.i18n.footerCross);
  const darkBtn = document.getElementById('darkToggle');
  if (darkBtn) darkBtn.setAttribute('aria-label', darkMode ? t(D.i18n.darkBtnLight) : t(D.i18n.darkBtnDark));

  initReveal();
  initSkillBars();
}

function renderTrio() {
  const c = document.getElementById('trioContainer');
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

function renderProjects() {
  const c = document.getElementById('projContainer');
  c.innerHTML = D.projects.map(p => {
    const rgb = p.colorRgb;
    const col = p.color;
    const linkEl = p.link
      ? `<a href="${p.link}" target="_blank" rel="noopener" class="project-link" style="color:${col}">${t(p.linkLabel)}</a>`
      : `<span class="project-link" style="color:var(--kk-text-muted)">${t(p.linkLabel)}</span>`;
    return `
    <div class="glass-card project-card reveal" style="background:linear-gradient(135deg,rgba(${rgb},0.04) 0%,var(--kk-card));box-shadow:inset 0 1px 0 var(--kk-inset),0 8px 32px var(--kk-shadow)">
      <div>
        <div class="project-header">
          <h3 class="project-name">${p.name}</h3>
          <span class="project-tag" style="border:1px solid rgba(${rgb},0.45);color:${col};background:rgba(${rgb},0.07)">${p.tag}</span>
        </div>
        <p class="project-sub">${t(p.sub)}</p>
      </div>
      <p class="project-desc">${t(p.desc)}</p>
      <div class="project-stack">
        ${p.stack.map(s => `<span style="background:rgba(${rgb},0.07);border:1px solid rgba(${rgb},0.18);color:rgba(${rgb},0.88)">${s}</span>`).join('')}
      </div>
      ${linkEl}
    </div>`;
  }).join('');
}

function renderSkills() {
  const c = document.getElementById('skillsContainer');
  c.innerHTML = D.skillGroups.map((group, gi) => `
    <div class="glass-card skill-card reveal">
      <h3 class="skill-group-label">${t(group.label)}</h3>
      <div class="skill-items">
        ${group.skills.map((s, si) => `
          <div>
            <div class="skill-header">
              <span class="skill-name">${s.name}</span>
              <span class="skill-pct">${s.pct}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-fill" data-pct="${s.pct}" style="transition-delay:${(gi * 0.1 + si * 0.08).toFixed(2)}s"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderCertifications() {
  const c = document.getElementById('certContainer');
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

function renderTimeline() {
  const c = document.getElementById('timelineContainer');
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
// Sendet echte E-Mails via Web3Forms → kuck_kevin@icloud.com
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('formSubmit');
    btn.textContent = t(D.i18n.sendingLabel);
    btn.disabled = true;
    try {
      const data = new FormData(form);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        document.getElementById('formSent').style.display = 'block';
        form.reset();
        btn.textContent = t(D.i18n.submitLabel);
      } else {
        btn.textContent = t(D.i18n.sendErr);
      }
    } catch (err) {
      btn.textContent = t(D.i18n.sendErr);
    }
    btn.disabled = false;
  });
}

// ─── WEBGL BACKGROUND ────────────────────────────────────────────────
let gl, uTime, uRes, uIntensity, uLight, rafId;

function initBg() {
  const c = document.getElementById('kk-bg');
  if (!c) return;
  const W = window.innerWidth, H = window.innerHeight;
  c.width = W; c.height = H;
  c.style.width = W + 'px'; c.style.height = H + 'px';

  gl = c.getContext('webgl');
  if (!gl) return;

  const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}';
  const FS = [
    'precision mediump float;',
    'uniform float u_t,u_i,u_l;',
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
    '  vec3 pur=vec3(.486,.416,.969);',
    '  vec3 teal=vec3(0.,.831,.667);',
    '  float db=1.-u_l;',
    '  vec3 col=base;',
    '  col+=pur*m1*w3*(.28+.18*db)*u_i;',
    '  col+=teal*m2*w3*(.16+.1*db)*u_i;',
    '  col+=vec3(.08,.05,.22)*m1*m2*.35*u_i*db;',
    '  gl_FragColor=vec4(clamp(col,0.,1.),1.);',
    '}'
  ].join('\n');

  const mk = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, mk(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  uTime = gl.getUniformLocation(prog, 'u_t');
  uRes = gl.getUniformLocation(prog, 'u_r');
  uIntensity = gl.getUniformLocation(prog, 'u_i');
  uLight = gl.getUniformLocation(prog, 'u_l');

  gl.uniform2f(uRes, W, H);
  gl.uniform1f(uIntensity, 1.0);
  gl.uniform1f(uLight, darkMode ? 0.0 : 1.0);

  let t0 = null;
  const loop = ts => {
    if (!gl) return;
    if (!t0) t0 = ts;
    gl.uniform1f(uTime, (ts - t0) * 0.001);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);

  window.addEventListener('resize', () => {
    const W2 = window.innerWidth, H2 = window.innerHeight;
    c.style.width = W2 + 'px'; c.style.height = H2 + 'px';
    if (gl && uRes) gl.uniform2f(uRes, W2, H2);
  }, { passive: true });
}

function updateBgLight() {
  if (gl && uLight !== null) gl.uniform1f(uLight, darkMode ? 0.0 : 1.0);
}
