/* Global Tires — experiencia premium V2 sin librerias externas */
(() => {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ensureV2Styles = () => {
    if (document.querySelector('link[href="./premium-v2.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './premium-v2.css';
    document.head.appendChild(link);
  };

  const buildStory = () => {
    const hero = document.getElementById('gtHero');
    if (!hero || document.querySelector('.gt-cinematic-story')) return null;

    const section = document.createElement('section');
    section.className = 'gt-cinematic-story';
    section.setAttribute('aria-label', 'Experiencia Global Tires');
    section.innerHTML = `
      <div class="gt-story-sticky">
        <div class="gt-story-media" aria-hidden="true">
          <div class="gt-story-halo"></div>
          <div class="gt-story-ring"></div>
          <img class="gt-story-tire" src="assets/hero-tire.webp" alt="" decoding="async">
        </div>
        <div class="gt-story-copy">
          <div class="gt-story-kicker">Global Tires · Importación directa</div>
          <article class="gt-story-step is-active" data-step="0">
            <small>01 · Rendimiento</small>
            <h2>Diseñados para moverse</h2>
            <p>Neumáticos seleccionados para entregar agarre, estabilidad y confianza en cada trayecto.</p>
          </article>
          <article class="gt-story-step" data-step="1">
            <small>02 · Selección</small>
            <h2>La medida correcta importa</h2>
            <p>Auto, camioneta o carga. Encuentra rápidamente la medida adecuada y revisa las opciones disponibles.</p>
          </article>
          <article class="gt-story-step" data-step="2">
            <small>03 · Marcas</small>
            <h2>Importamos lo que vendemos</h2>
            <p>Grenlander, Haida y Tianfu, con catálogo directo y disponibilidad pensada para distribuidores.</p>
          </article>
          <article class="gt-story-step" data-step="3">
            <small>04 · Atención</small>
            <h2>Cotiza sin perder tiempo</h2>
            <p>Busca tu medida, revisa el catálogo y pasa directo a WhatsApp para cotizar.</p>
          </article>
        </div>
        <div class="gt-story-progress" aria-hidden="true">
          <span class="gt-story-dot is-active"></span>
          <span class="gt-story-dot"></span>
          <span class="gt-story-dot"></span>
          <span class="gt-story-dot"></span>
        </div>
        <div class="gt-story-scroll-label" aria-hidden="true">Desliza para descubrir</div>
      </div>`;

    hero.insertAdjacentElement('afterend', section);
    return section;
  };

  const onReady = () => {
    ensureV2Styles();
    document.documentElement.classList.add('gt-premium');

    const header = document.querySelector('.gt-header');
    const hero = document.getElementById('gtHero');
    const story = buildStory();

    const syncHeader = () => {
      if (!header) return;
      header.classList.toggle('gt-premium-scrolled', window.scrollY > 24);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    if (hero && !reduced) {
      let pointerRaf = 0;
      hero.addEventListener('pointermove', (e) => {
        if (pointerRaf) cancelAnimationFrame(pointerRaf);
        pointerRaf = requestAnimationFrame(() => {
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
      if (i < 4 && !section.classList.contains('gt-cinematic-story')) section.classList.add('gt-premium-reveal');
    });

    if (!reduced && story) {
      const tire = story.querySelector('.gt-story-tire');
      const halo = story.querySelector('.gt-story-halo');
      const steps = Array.from(story.querySelectorAll('.gt-story-step'));
      const dots = Array.from(story.querySelectorAll('.gt-story-dot'));
      let lastStep = -1;
      let raf = 0;

      const updateStory = () => {
        raf = 0;
        const rect = story.getBoundingClientRect();
        const travel = Math.max(1, story.offsetHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / travel));
        const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length));

        if (idx !== lastStep) {
          steps.forEach((el, i) => el.classList.toggle('is-active', i === idx));
          dots.forEach((el, i) => el.classList.toggle('is-active', i === idx));
          lastStep = idx;
        }

        if (tire) {
          const scale = 0.86 + progress * 0.34;
          const rotate = -8 + progress * 16;
          const x = -4 + progress * 8;
          tire.style.transform = `translate3d(${x}%,0,0) rotate(${rotate}deg) scale(${scale})`;
        }
        if (halo) {
          halo.style.transform = `scale(${0.72 + progress * 0.55})`;
          halo.style.opacity = String(0.46 + progress * 0.38);
        }
      };

      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(updateStory);
      };
      updateStory();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

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

    sections.slice(0, 4).forEach(section => {
      if (!section.classList.contains('gt-cinematic-story')) io.observe(section);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }
})();
