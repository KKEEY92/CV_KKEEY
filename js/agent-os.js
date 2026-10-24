/* Uses the portfolio's render, language, navigation, theme and motion controls. */
(() => {
  'use strict';
  const content = window.KK_AGENT_OS;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const text = key => t(content.copy[key]);
  const diagram = document.getElementById('os-diagram');
  let selected = 0;
  let lastWidth = 0;
  const icons = [
    '<circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3M4 12l-2 2 2 2m16-4 2 2-2 2"/>',
    '<rect x="3" y="3" width="18" height="6" rx="2"/><path d="M12 9v5M5 18v-4h14v4M2 18h6v4H2zm14 0h6v4h-6z"/>',
    '<path d="M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6zM8 12l3 3 5-6"/>',
    '<path d="M4 4h12v16H4zM7 8h6M7 12h3"/><rect x="13" y="12" width="9" height="9" rx="2"/><path d="M15 12v-2a2.5 2.5 0 0 1 5 0v2"/>',
    '<path d="M5 3h11l4 4v14H5zM15 3v5h5M8 14l3 3 5-6"/>',
    '<ellipse cx="6" cy="5" rx="4" ry="2"/><path d="M2 5v13c0 3 8 3 8 0V5m4 0h8m-4-3 4 3-4 3M14 19h8m-4-3 4 3-4 3"/>'
  ];
  const svgIcon = index => `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[index]}</svg>`;

  function selectDepartment(index) {
    selected = index;
    const department = content.departments[index];
    document.querySelectorAll('.os-department').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.department) === selected)));
    document.getElementById('os-roster-title').textContent = department.name;
    document.getElementById('os-roster-sub').textContent = t(department.sub);
    document.getElementById('os-agent-list').innerHTML = department.agents.map(agent => `<li>${escape(t(agent))}</li>`).join('');
  }

  function renderDiagram() {
    const focused = document.activeElement?.dataset.department;
    const width = Math.round(diagram.clientWidth);
    if (!width) return;
    lastWidth = width;
    const mobile = width <= 600;
    const wide = width >= 1000;
    const gap = 12;
    const padding = mobile ? 16 : 24;
    const inner = width - padding * 2;
    let y = 30;
    let markup = '';
    let previous = [];
    const path = d => `<path class="os-wire" d="${d}"/><path class="os-flow" d="${d}"/>`;
    function layer(key, nodes, columns, height, type = '') {
      markup += `<text class="os-layer-label" x="${padding}" y="${y}">${escape(text(key))}</text>`;
      y += 18;
      const nodeWidth = (inner - gap * (columns - 1)) / columns;
      const centers = [];
      const layerTop = y;
      const rows = Math.ceil(nodes.length / columns);
      const bottom = y + rows * (height + gap) - gap;
      nodes.forEach((node, index) => {
        const row = Math.floor(index / columns);
        const count = Math.min(columns, nodes.length - row * columns);
        const x = padding + (inner - count * (nodeWidth + gap) + gap) / 2 + (index % columns) * (nodeWidth + gap);
        const top = y + row * (height + gap);
        centers.push({x:x + nodeWidth/2, top, bottom:top + height});
        const title = escape(node.name);
        const subtitle = node.sub ? `<span class="os-node-sub">${escape(node.sub)}</span>` : '';
        const body = type === 'department'
          ? `<button xmlns="http://www.w3.org/1999/xhtml" type="button" class="os-node os-department" data-department="${index}" aria-pressed="${index === selected}" aria-controls="os-roster"><span class="os-node-title">${title}</span><span class="os-node-arrow" aria-hidden="true">↗</span>${subtitle}</button>`
          : `<div xmlns="http://www.w3.org/1999/xhtml" class="os-node ${type ? 'os-node-' + type : ''}"><span class="os-node-title">${title}</span>${subtitle}</div>`;
        markup += `<foreignObject x="${x}" y="${top}" width="${nodeWidth}" height="${height}">${body}</foreignObject>`;
      });
      if (previous.length) {
        // Shared bus for each layer. On mobile the bus runs beside the stacked cards.
        const busY = layerTop - 40;
        const busX = mobile ? 7 : width / 2;
        const starts = previous.map(point => mobile ? {x:padding, y:(point.top+point.bottom)/2} : {x:point.x,y:point.bottom});
        const ends = centers.map(point => mobile ? {x:padding, y:(point.top+point.bottom)/2} : {x:point.x,y:point.top});
        let wires = '';
        if (mobile) {
          wires += path(`M${busX} ${starts[0].y}V${ends[ends.length-1].y}`);
          starts.concat(ends).forEach(point => {wires += path(`M${busX} ${point.y}H${point.x}`);});
        } else {
          const busTop = Math.max(...previous.map(point => point.bottom)) + 14;
          starts.forEach(point => {wires += path(`M${point.x} ${point.y}V${busTop}H${busX}`);});
          wires += path(`M${busX} ${busTop}V${busY}`);
          ends.forEach(point => {wires += path(`M${busX} ${busY}H${point.x}V${point.y}`);});
        }
        // Wires behind foreignObjects, so bus routes cannot obscure labels.
        markup = wires + markup;
      }
      previous = centers;
      y = bottom + 62;
    }
    layer('human', [{name:'Kevin Kuck',sub:text('humanSub')}], 1, 76, 'human');
    layer('leadership', [
      {name:'Master Chief',sub:text('orchestration')},
      {name:'System Governance Lead',sub:text('governance')},
      {name:'Reflection',sub:text('reflection')}
    ],mobile ? 1 : 3, 80);
    layer('departments',content.departments.map(department => ({name:department.name,sub:t(department.sub)})),wide ? 7 : mobile ? 1 : 3,wide ? 106 : 84,'department');
    // Place the selected roster immediately beneath departments, including on touch screens.
    const rosterHeight = mobile ? 420 : wide ? 170 : 260;
    const department = content.departments[selected];
    markup += `<foreignObject x="${padding}" y="${y-30}" width="${inner}" height="${rosterHeight}"><div xmlns="http://www.w3.org/1999/xhtml" class="os-roster" id="os-roster" role="region" aria-labelledby="os-roster-title"><div><p class="os-kicker">${escape(text('roster'))}</p><h3 id="os-roster-title">${escape(department.name)}</h3><p id="os-roster-sub">${escape(t(department.sub))}</p></div><ul id="os-agent-list">${department.agents.map(agent => `<li>${escape(t(agent))}</li>`).join('')}</ul></div></foreignObject>`;
    y += rosterHeight;
    layer('workbench',[
      {name:'Codex CLI',sub:text('coding')},
      {name:'LM Studio',sub:text('local')},
      {name:'Claude / ChatGPT',sub:text('assistants')}
    ],mobile ? 1 : 3,76);
    layer('systems',[
      {name:'GitHub'},{name:'Cloudflare'},{name:'Google Workspace'},{name:'Microsoft 365'},
      {name:'Linear'},{name:'Notion'},{name:'Obsidian Vault',sub:text('readonly')},{name:'macOS launchd'}
    ],mobile ? 2 : 4,66,'system');
    diagram.innerHTML = `<svg class="os-diagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${y-36}" width="${width}" height="${y-36}" role="group" aria-labelledby="os-diagram-title os-diagram-description"><title id="os-diagram-title">KKEEY Agent OS</title><desc id="os-diagram-description">${escape(text('architectureSub'))} ${escape(text('hint'))}</desc>${markup}</svg>`;
    diagram.querySelectorAll('.os-department').forEach(button => {
      const index = Number(button.dataset.department);
      button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') selectDepartment(index); });
      button.addEventListener('focus', () => selectDepartment(index));
      button.addEventListener('click', () => selectDepartment(index));
    });
    if (focused !== undefined) diagram.querySelector(`[data-department="${focused}"]`)?.focus({preventScroll:true});
  }

  function renderShowcase() {
    document.querySelectorAll('[data-os]').forEach(element => {element.textContent = text(element.dataset.os);});
    document.title = 'KKEEY Agent OS — ' + text('architectureTitle') + ' · Kevin Kuck';
    document.querySelector('meta[name="description"]').content = text('subtitle');
    document.querySelector('meta[property="og:description"]').content = text('subtitle');
    document.querySelector('meta[property="og:locale"]').content = {de:'de_DE',en:'en_GB',fr:'fr_FR',uk:'uk_UA',pl:'pl_PL'}[lang];
    for (const [id,key] of [['langToggle','language'],['colorToggle','palette'],['motionToggle','motion'],['hamburger','menu']]) {
      document.getElementById(id).setAttribute('aria-label',text(key)+(id==='langToggle' ? ` (${lang.toUpperCase()}; DE, EN, FR, UK, PL)` : ''));
    }
    document.getElementById('langToggle').title = text('language') + ' (DE, EN, FR, UK, PL)';
    document.getElementById('os-principles').innerHTML = content.principles.map((principle,index) => `<article class="glass-card os-principle">${svgIcon(index)}<h3>${escape(t(principle.title))}</h3><p>${escape(t(principle.text))}</p></article>`).join('');
    document.getElementById('os-cases').innerHTML = content.cases.map(study => `<article class="os-case"><p class="os-kicker">${escape(t(study.date))}</p><h3>${escape(t(study.title))}</h3><dl>${['problem','action','result'].map(key => `<div class="os-case-${key}"><dt>${escape(text(key))}</dt><dd>${escape(t(study[key]))}</dd></div>`).join('')}</dl></article>`).join('');
    renderDiagram();
    selectDepartment(selected);
  }

  // Keep one source of truth for theme/language persistence and navigation behavior.
  const renderPortfolio = window.render;
  window.render = function () { renderPortfolio(); renderShowcase(); };
  const syncMotion = () => document.documentElement.classList.toggle('os-motion-paused',window.KK_MOTION.media.matches);
  window.KK_MOTION.media.addEventListener('change',syncMotion);
  document.addEventListener('DOMContentLoaded', () => {
    syncMotion();
    new ResizeObserver(entries => {
      const width = Math.round(entries[0].contentRect.width);
      if (width !== lastWidth) renderDiagram();
    }).observe(diagram);
    document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('os-tab-hidden',document.hidden));
  });
})();
