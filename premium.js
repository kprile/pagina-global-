/* Global Tires — microinteracciones premium sin librerias externas */
(() => {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onReady = () => {
    document.documentElement.classList.add('gt-premium');

    const header = document.querySelector('.gt-header');
    const hero = document.getElementById('gtHero');

    const syncHeader = () => {
      if (!header) return;
      header.classList.toggle('gt-premium-scrolled', window.scrollY > 24);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    if (hero && !reduced) {
      let raf = 0;
      hero.addEventListener('pointermove', (e) => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = hero.getBoundingClientRect();
          const x = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
          const y = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
          hero.style.setProperty('--gt-spot-x', x.toFixed(1) + '%');
          hero.style.setProperty('--gt-spot-y', y.toFixed(1) + '%');
        });
      }, { passive: true });
    }

    const sections = Array.from(document.querySelectorAll('main > section'));
    sections.forEach((section, i) => {
      if (i < 4) section.classList.add('gt-premium-reveal');
    });

    if (reduced || !('IntersectionObserver' in window)) {
      sections.forEach(section => section.classList.add('gt-premium-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('gt-premium-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    sections.slice(0, 4).forEach(section => io.observe(section));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }
})();
