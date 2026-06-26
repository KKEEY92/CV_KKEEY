document.addEventListener('DOMContentLoaded', () => {
  animateStatCounters();
});

function animateStatCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.count;
        const num = parseInt(target);

        if (isNaN(num)) {
          el.textContent = target;
          return;
        }

        let current = 0;
        const duration = 1500;
        const step = Math.ceil(num / (duration / 16));
        const suffix = target.includes('+') ? '+' : '';

        const timer = setInterval(() => {
          current += step;
          if (current >= num) {
            current = num;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 16);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}
