let currentLang = localStorage.getItem('lang') || 'de';

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'de' ? 'en' : 'de';
      localStorage.setItem('lang', currentLang);
      applyLanguage(currentLang);
    });
  }
});

function applyLanguage(lang) {
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'de' ? 'EN' : 'DE';

  document.querySelectorAll('[data-de]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll('[data-de-html]').forEach(el => {
    el.innerHTML = lang === 'de' ? el.dataset.deHtml : el.dataset.enHtml;
  });

  if (window.typedInstance) {
    window.typedInstance.destroy();
    initTyped(lang);
  }

  renderSkills(lang);
  renderExperience(lang);
  renderProjects(lang);
  renderCerts(lang);
  renderStrengths(lang);
}

function initTyped(lang) {
  const el = document.getElementById('typed-output');
  if (!el || typeof Typed === 'undefined') return;
  window.typedInstance = new Typed('#typed-output', {
    strings: CV_DATA.hero.roles[lang],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

function renderSkills(lang) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = CV_DATA.skills.map(group => `
    <div class="skill-group reveal">
      <h3 class="skill-group-title">${group.category[lang]}</h3>
      ${group.items.map(item => `
        <div class="skill-item">
          <div class="skill-header">
            <span class="skill-name">${item.name}</span>
            <span class="skill-pct">${item.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-fill" data-level="${item.level}"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');

  const langSection = document.createElement('div');
  langSection.className = 'skill-group reveal';
  langSection.innerHTML = `
    <h3 class="skill-group-title">${lang === 'de' ? 'Sprachen' : 'Languages'}</h3>
    ${CV_DATA.languages.map(l => `
      <div class="lang-item">
        <div class="lang-header">
          <span class="lang-name">${l.name}</span>
          <span class="lang-level">${l.level[lang]}</span>
        </div>
        <div class="skill-bar">
          <div class="skill-fill" data-level="${l.percent}"></div>
        </div>
      </div>
    `).join('')}
  `;
  container.appendChild(langSection);

  initScrollReveal();
  initSkillBars();
}

function renderExperience(lang) {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = CV_DATA.experience.map(exp => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-period">${exp.period}</div>
      <div class="timeline-title">${exp.title[lang]}</div>
      ${exp.subtitle ? `<div class="timeline-subtitle">${exp.subtitle[lang]}</div>` : ''}
      <div class="timeline-org">${exp.org}</div>
      <ul class="timeline-bullets">
        ${exp.bullets[lang].map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  const eduTitle = document.createElement('div');
  eduTitle.className = 'section-heading';
  eduTitle.style.cssText = 'font-size:1.4rem;margin:48px 0 24px';
  eduTitle.textContent = lang === 'de' ? 'Ausbildung' : 'Education';
  container.appendChild(eduTitle);

  CV_DATA.education.forEach(edu => {
    const item = document.createElement('div');
    item.className = 'timeline-item reveal';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-period">${edu.period}</div>
      <div class="timeline-title">${edu.degree[lang]}</div>
      <div class="timeline-org">${edu.school}</div>
      <ul class="timeline-bullets"><li>${edu.detail[lang]}</li></ul>
    `;
    container.appendChild(item);
  });

  initScrollReveal();
}

function renderProjects(lang) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = CV_DATA.projects.map(p => `
    <div class="project-card reveal">
      <div class="project-name">${p.name}</div>
      <div class="project-role">${p.role[lang]}</div>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
      </div>
      <p class="project-desc">${p.description[lang]}</p>
      <a href="${p.github}" target="_blank" rel="noopener" class="project-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        GitHub
      </a>
    </div>
  `).join('');

  initScrollReveal();
}

function renderCerts(lang) {
  const container = document.getElementById('certs-container');
  if (!container) return;

  container.innerHTML = CV_DATA.certifications.map(c => {
    const name = typeof c.name === 'object' ? c.name[lang] : c.name;
    const statusText = c.status === 'progress'
      ? (lang === 'de' ? 'In Bearbeitung' : 'In Progress')
      : (lang === 'de' ? 'Abgeschlossen' : 'Completed');
    const icon = c.code || '✓';
    return `
      <div class="cert-card reveal">
        <div class="cert-icon">${icon}</div>
        <div class="cert-info">
          <div class="cert-name">${name}</div>
          <div class="cert-status ${c.status}">${statusText}</div>
        </div>
      </div>
    `;
  }).join('');

  initScrollReveal();
}

function renderStrengths(lang) {
  const container = document.getElementById('strengths-container');
  if (!container) return;

  container.innerHTML = CV_DATA.strengths[lang].map(s => `
    <div class="strength-item reveal">
      <span class="strength-dot"></span>
      ${s}
    </div>
  `).join('');

  initScrollReveal();
}

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.level + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-group').forEach(group => observer.observe(group));
}
