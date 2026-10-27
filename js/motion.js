/** Shared scheduler: no background frames; explicit static repaint for reduced motion. */
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = localStorage.getItem('kk_motion') === 'paused';
  const media = new EventTarget();
  Object.defineProperty(media, 'matches', { get: () => preference.matches || paused });
  const toggle = document.getElementById('motionToggle');
  function updateToggle() { toggle.setAttribute('aria-pressed', String(paused)); toggle.textContent = paused ? '▶' : 'Ⅱ'; }
  updateToggle();
  toggle.addEventListener('click', () => { paused = !paused; localStorage.setItem('kk_motion', paused ? 'paused' : 'auto'); updateToggle(); media.dispatchEvent(new Event('change')); });
  preference.addEventListener('change', () => media.dispatchEvent(new Event('change')));
  const clients = new Set();
  let frame = 0, last = 0, time = 0;
  function loop(now) {
    frame = 0;
    if (document.hidden || media.matches) { refresh(); return; }
    const dt = last ? Math.min(now - last, 100) : 16.7;
    last = now; time += dt / 1000;
    for (const client of clients) if (client.visible()) client.draw(time, dt);
    schedule();
  }
  function schedule() {
    if (frame || document.hidden || media.matches || ![...clients].some(c => c.visible())) return;
    frame = requestAnimationFrame(loop);
  }
  function refresh() {
    cancelAnimationFrame(frame); frame = 0; last = 0;
    if (!document.hidden) for (const client of clients) if (client.visible()) client.draw(preference.matches ? 0 : time, 0);
    schedule();
  }
  document.addEventListener('visibilitychange', refresh);
  media.addEventListener('change', refresh);
  window.KK_MOTION = { media, refresh, add(client) { clients.add(client); refresh(); return () => { clients.delete(client); refresh(); }; } };
})();
