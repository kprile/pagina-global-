/* Global Tires — experiencia cyber-performance sin librerias externas */
(() => {
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ensureV2Styles = () => {
    if (document.querySelector('link[href="./premium-v2.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './premium-v2.css';
    document.head.appendChild(link);
  };

  const buildHud = (hero) => {
    if (!hero || hero.querySelector('.gt-cyber-hud')) return;
    const hud = document.createElement('div');
    hud.className = 'gt-cyber-hud';
    hud.setAttribute('aria-hidden','true');
    hud.innerHTML = `
      <span class="gt-hud-corner a"></span><span class="gt-hud-corner b"></span>
      <span class="gt-hud-label one">GT / IMPORT DIVISION</span>
      <span class="gt-hud-label two">LIVE STOCK // CHILE</span>
      <span class="gt-hud-label three">AUTO / SUV / CARGA</span>
      <span class="gt-hud-line"></span>`;
    hero.appendChild(hud);
  };

  const rewriteHero = () => {
    const copy = document.getElementById('gtHeroCopy');
    if (!copy) return;
    const h1 = copy.querySelector('h1');
    const p = copy.querySelector('p');
    const kicker = copy.querySelector('div > div:first-child');
    if (h1) h1.textContent = 'Tracción sin concesiones';
    if (p) p.innerHTML = 'Neumáticos para <strong style="color:#f5f3ee">auto, SUV y carga</strong>. Importación directa, stock real y atención mayorista en Chile.';
    if (kicker) kicker.textContent = 'GLOBAL TIRES // PERFORMANCE DIVISION';
  };

  const buildStory = () => {
    const hero = document.getElementById('gtHero');
    if (!hero || document.querySelector('.gt-cinematic-story')) return document.querySelector('.gt-cinematic-story');
    const section = document.createElement('section');
    section.className = 'gt-cinematic-story';
    section.setAttribute('aria-label', 'Experiencia Global Tires');
    section.innerHTML = `
      <div class="gt-story-sticky">
        <div class="gt-story-media" aria-hidden="true">
          <div class="gt-story-halo"></div><div class="gt-story-ring"></div>
          <img class="gt-story-tire" src="assets/hero-tire.webp" alt="" decoding="async">
        </div>
        <div class="gt-story-copy">
          <div class="gt-story-kicker">GT // PERFORMANCE SYSTEM</div>
          <article class="gt-story-step is-active" data-step="0">
            <small>01 // GRIP CONTROL</small><h2>Potencia al suelo</h2>
            <p>Selección enfocada en agarre, estabilidad y respuesta. Menos discurso. Más contacto con el camino.</p>
          </article>
          <article class="gt-story-step" data-step="1">
            <small>02 // FITMENT</small><h2>La medida manda</h2>
            <p>Encuentra rápido la configuración correcta para auto, camioneta, SUV o carga y pasa directo a cotización.</p>
          </article>
          <article class="gt-story-step" data-step="2">
            <small>03 // DIRECT IMPORT</small><h2>Stock sin intermediarios</h2>
            <p>Grenlander, Haida y Tianfu importados directamente para distribución y venta mayorista en Chile.</p>
          </article>
          <article class="gt-story-step" data-step="3">
            <small>04 // FAST QUOTE</small><h2>Cotiza. Cierra. Rueda.</h2>
            <p>Catálogo, medidas y contacto directo por WhatsApp en una experiencia pensada para moverse rápido.</p>
          </article>
        </div>
        <div class="gt-story-progress" aria-hidden="true"><span class="gt-story-dot is-active"></span><span class="gt-story-dot"></span><span class="gt-story-dot"></span><span class="gt-story-dot"></span></div>
        <div class="gt-story-scroll-label" aria-hidden="true">Scroll // engage</div>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
    return section;
  };

  const onReady = () => {
    ensureV2Styles();
    document.documentElement.classList.add('gt-premium');
    const header = document.querySelector('.gt-header');
    const hero = document.getElementById('gtHero');
    rewriteHero();
    buildHud(hero);
    const story = buildStory();

    const syncHeader = () => { if (header) header.classList.toggle('gt-premium-scrolled', window.scrollY > 24); };
    syncHeader(); window.addEventListener('scroll', syncHeader, { passive:true });

    if (hero && !reduced) {
      let pointerRaf = 0;
      hero.addEventListener('pointermove', e => {
        if (pointerRaf) cancelAnimationFrame(pointerRaf);
        pointerRaf = requestAnimationFrame(() => {
          const r = hero.getBoundingClientRect();
          const x = Math.max(0, Math.min(100, ((e.clientX-r.left)/r.width)*100));
          const y = Math.max(0, Math.min(100, ((e.clientY-r.top)/r.height)*100));
          hero.style.setProperty('--gt-spot-x', x.toFixed(1)+'%');
          hero.style.setProperty('--gt-spot-y', y.toFixed(1)+'%');
        });
      }, { passive:true });
    }

    const sections = Array.from(document.querySelectorAll('main > section'));
    sections.forEach((section,i)=>{ if(i<4 && !section.classList.contains('gt-cinematic-story')) section.classList.add('gt-premium-reveal'); });

    if (!reduced && story) {
      const tire = story.querySelector('.gt-story-tire');
      const halo = story.querySelector('.gt-story-halo');
      const ring = story.querySelector('.gt-story-ring');
      const steps = Array.from(story.querySelectorAll('.gt-story-step'));
      const dots = Array.from(story.querySelectorAll('.gt-story-dot'));
      let lastStep=-1, raf=0;
      const updateStory = () => {
        raf=0;
        const rect=story.getBoundingClientRect();
        const travel=Math.max(1,story.offsetHeight-window.innerHeight);
        const progress=Math.max(0,Math.min(1,-rect.top/travel));
        const idx=Math.min(steps.length-1,Math.floor(progress*steps.length));
        if(idx!==lastStep){steps.forEach((el,i)=>el.classList.toggle('is-active',i===idx));dots.forEach((el,i)=>el.classList.toggle('is-active',i===idx));lastStep=idx;}
        if(tire){const scale=.82+progress*.48;const rotate=-13+progress*26;const x=-6+progress*12;tire.style.transform=`translate3d(${x}%,0,0) rotate(${rotate}deg) scale(${scale})`;}
        if(halo){halo.style.transform=`scale(${.68+progress*.72})`;halo.style.opacity=String(.48+progress*.4);}
        if(ring){ring.style.transform=`rotate(${progress*90}deg) scale(${.92+progress*.08})`;}
      };
      const onScroll=()=>{if(!raf)raf=requestAnimationFrame(updateStory);};
      updateStory();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll,{passive:true});
    }

    if (reduced || !('IntersectionObserver' in window)) { sections.forEach(s=>s.classList.add('gt-premium-in')); return; }
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('gt-premium-in');io.unobserve(entry.target);}}),{rootMargin:'0px 0px -10% 0px',threshold:.08});
    sections.slice(0,4).forEach(s=>{if(!s.classList.contains('gt-cinematic-story'))io.observe(s);});
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady,{once:true});else onReady();
})();
