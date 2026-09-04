(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const lerp = (a, b, t) => a + (b - a) * t;

  function build() {
    const hero = document.getElementById('gtHero');
    if (!hero) return setTimeout(build, 120);

    /* La experiencia también está incluida dentro de la plantilla principal.
       Antes este archivo abandonaba al encontrarla y, por eso, nunca instalaba
       el controlador de scroll: las cuatro escenas quedaban congeladas en la 1. */
    let xp = document.querySelector('.gt-xp');
    if (!xp) {
      xp = document.createElement('section');
      xp.className = 'gt-xp';
      xp.innerHTML = `<div class="gt-xp-sticky">
        <div class="gt-xp-grid"></div>
        <div class="gt-xp-copy">
          <div class="gt-xp-kicker">Global Tires · Chile</div>
          <h1 class="gt-xp-title">Tracción<span>en movimiento</span></h1>
          <p class="gt-xp-lead">Neumáticos reales, importación directa y una experiencia construida alrededor del producto.</p>
        </div>
        <div class="gt-xp-stage">
          <div class="gt-xp-ring"></div>
          <div class="gt-xp-fingers">
            <i class="gt-xp-finger f1"></i><i class="gt-xp-finger f2"></i><i class="gt-xp-finger f3"></i><i class="gt-xp-finger f4"></i><i class="gt-xp-finger f5"></i><i class="gt-xp-finger f6"></i>
          </div>
          <img class="gt-xp-tire" src="assets/models/rd224-1.webp" alt="Neumático Tianfu RD224" decoding="async">
        </div>
        <div class="gt-xp-progress"><i class="on"></i><i></i><i></i><i></i></div>
        <div class="gt-xp-scene-label"><small>01 · Entrada</small><strong>Neumático<br>protagonista</strong></div>
        <div class="gt-xp-scroll">Scroll para avanzar</div>
        <div class="gt-xp-exit"></div>
      </div>`;
      hero.before(xp);
    }

    if (xp.dataset.motionReady === 'true') return;
    xp.dataset.motionReady = 'true';

    let tire = xp.querySelector('.gt-xp-tire');
    let fingers = [...xp.querySelectorAll('.gt-xp-finger')];
    let ring = xp.querySelector('.gt-xp-ring');
    let copy = xp.querySelector('.gt-xp-copy');
    let label = xp.querySelector('.gt-xp-scene-label');
    let dots = [...xp.querySelectorAll('.gt-xp-progress i')];
    let exit = xp.querySelector('.gt-xp-exit');
    if (!tire || !ring || !copy || !label || !exit || dots.length !== 4) return;
    tire.src = 'assets/models/rd224-hero-transparent.webp';
    tire.alt = 'Neumático Tianfu RD224 de perfil';

    const stages = [
      ['01 · Entrada', 'Neumático<br>protagonista'],
      ['02 · Ingeniería', 'Dentro de la<br>estructura'],
      ['03 · Aplicación', 'Auto · SUV<br>Camioneta · Carga'],
      ['04 · Salida', 'Encuentra<br>tu medida']
    ];

    const wiredDots = new WeakSet();
    const prepareDots = () => dots.forEach((dot, index) => {
      if (wiredDots.has(dot)) return;
      wiredDots.add(dot);
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Ir a escena ${index + 1}`);
      const go = () => {
        const top = xp.getBoundingClientRect().top + scrollY;
        const travel = Math.max(1, xp.offsetHeight - innerHeight);
        scrollTo({ top: top + travel * (index / 3), behavior: reduced ? 'auto' : 'smooth' });
      };
      dot.addEventListener('click', go);
      dot.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          go();
        }
      });
    });
    prepareDots();

    if (reduced) return;

    let raf = 0;
    let last = -1;
    function update() {
      raf = 0;
      /* El runtime puede reemplazar la sección al cargar productos o filtros.
         Volvemos a obtener los nodos visibles para no animar referencias viejas. */
      const liveXp = document.querySelector('.gt-xp');
      if (!liveXp) return;
      const liveTire = liveXp.querySelector('.gt-xp-tire');
      const liveDots = [...liveXp.querySelectorAll('.gt-xp-progress i')];
      if (liveXp !== xp || !xp.isConnected || liveTire !== tire || liveDots[0] !== dots[0]) {
        xp = liveXp;
        xp.dataset.motionReady = 'true';
        tire = liveTire;
        fingers = [...xp.querySelectorAll('.gt-xp-finger')];
        ring = xp.querySelector('.gt-xp-ring');
        copy = xp.querySelector('.gt-xp-copy');
        label = xp.querySelector('.gt-xp-scene-label');
        dots = liveDots;
        exit = xp.querySelector('.gt-xp-exit');
        last = -1;
        if (tire) {
          tire.src = 'assets/models/rd224-hero-transparent.webp';
          tire.alt = 'Neumático Tianfu RD224 de perfil';
        }
        prepareDots();
      }
      if (!tire || !ring || !copy || !label || !exit || dots.length !== 4) return;
      const rect = xp.getBoundingClientRect();
      const travel = Math.max(1, xp.offsetHeight - innerHeight);
      const p = clamp(-rect.top / travel);
      const idx = Math.min(3, Math.floor(p * 4));

      if (idx !== last) {
        last = idx;
        dots.forEach((dot, i) => {
          dot.classList.toggle('on', i === idx);
          dot.setAttribute('aria-current', i === idx ? 'step' : 'false');
        });
        label.innerHTML = `<small>${stages[idx][0]}</small><strong>${stages[idx][1]}</strong>`;
      }

      const enter = clamp(p / .24);
      const tunnel = clamp((p - .16) / .46);
      const close = clamp((p - .54) / .28);
      const finish = clamp((p - .84) / .16);

      let scale = lerp(.64, .84, enter);
      scale = lerp(scale, 1.02, tunnel);
      scale = lerp(scale, 1.10, close);
      scale = lerp(scale, 1.02, finish);

      const y = lerp(80, 24, enter) + lerp(0, -38, tunnel) - finish * 72;
      const x = lerp(-18, 12, tunnel) + Math.sin(p * Math.PI * 2) * 5;
      const rot = lerp(-9, 0, enter) + lerp(0, 8, tunnel) - lerp(0, 5, close);
      const z = lerp(-110, 30, enter) + lerp(0, 100, tunnel) + lerp(0, 45, close);

      tire.style.transform = `translate3d(${x}px,${y}px,${z}px) rotate(${rot}deg) scale(${scale})`;
      tire.style.opacity = String(1 - finish);
      tire.style.filter = `contrast(1.04) brightness(.88) saturate(.92) drop-shadow(0 ${lerp(18, 34, close)}px ${lerp(24, 44, close)}px rgba(245,179,1,.18))`;

      fingers.forEach((finger, i) => {
        const side = i < 3 ? -1 : 1;
        const spread = side * lerp(8, 58 + (i % 3) * 12, tunnel);
        const lift = (i % 3 - 1) * lerp(0, 12, tunnel);
        const depth = (i === 2 || i === 3) ? -30 : 55;
        finger.style.translate = `${spread}px ${lift}px ${lerp(-12, depth, tunnel)}px`;
        finger.style.opacity = String(lerp(.28, .62, tunnel) * (1 - finish));
      });

      ring.style.transform = `rotate(${p * 160}deg) scale(${lerp(.82, 1.14, close)})`;
      ring.style.opacity = String(lerp(.35, .85, tunnel) * (1 - finish * .5));
      copy.style.opacity = String(1 - clamp((p - .26) / .30));
      copy.style.transform = `translateY(calc(-50% - ${p * 24}px))`;
      exit.style.opacity = String(finish);
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    update();
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', build, { once: true });
  else build();
})();
