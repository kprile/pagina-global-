/* Global Tires V3 — reemplazo estructural visual sin tocar catálogo/runtime */
(() => {
  const V = '20260828-v3';
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function loadCss(){
    if (document.getElementById('gt-v3-css')) return;
    const l=document.createElement('link');
    l.id='gt-v3-css'; l.rel='stylesheet'; l.href='./premium-v3.css?v='+V;
    document.head.appendChild(l);
  }

  function validHref(a){
    if(!a) return '';
    const h=a.getAttribute('href')||'';
    return /^https?:\/\//i.test(h) ? h : '';
  }

  function syncLinks(){
    const source=document.querySelector('.gt-wa') || document.querySelector('#gtHero .gt-cta');
    const href=validHref(source);
    if(!href) return;
    document.querySelectorAll('[data-gt3-wa]').forEach(a=>a.href=href);
  }

  function buildHero(){
    const old=document.getElementById('gtHero');
    if(!old || document.querySelector('.gt-v3-hero')) return false;

    const hero=document.createElement('section');
    hero.className='gt-v3-hero';
    hero.setAttribute('aria-label','Global Tires Performance');
    hero.innerHTML=`
      <div class="gt-v3-scan" aria-hidden="true"></div>
      <div class="gt-v3-inner">
        <div class="gt-v3-copy">
          <div class="gt-v3-eyebrow">Global Tires // Import Division</div>
          <h1 class="gt-v3-title">Tracción<span>sin concesiones</span></h1>
          <p class="gt-v3-lead">Neumáticos para auto, SUV, camioneta y carga. Importación directa, stock real y atención mayorista diseñada para moverse rápido.</p>
          <div class="gt-v3-actions">
            <a class="gt-v3-primary" data-gt3-wa href="#catalogo">Cotizar ahora</a>
            <a class="gt-v3-secondary" href="#catalogo">Explorar catálogo ↓</a>
          </div>
        </div>
        <div class="gt-v3-visual" aria-hidden="true">
          <div class="gt-v3-glow"></div>
          <div class="gt-v3-orbit"></div>
          <img class="gt-v3-tire" src="assets/hero-tire.webp" alt="" fetchpriority="high" decoding="async">
          <div class="gt-v3-spec a"><small>GT // CONTROL</small><b>GRIP 01</b></div>
          <div class="gt-v3-spec b"><small>CHILE // STOCK</small><b>LIVE</b></div>
        </div>
        <div class="gt-v3-index">01</div>
      </div>`;

    const data=document.createElement('section');
    data.className='gt-v3-databar';
    data.innerHTML=`<div class="gt-v3-data-inner">
      <div class="gt-v3-data-item"><strong>Auto / SUV</strong><span>Configuraciones urbanas</span></div>
      <div class="gt-v3-data-item"><strong>Carga</strong><span>Trabajo y comercial</span></div>
      <div class="gt-v3-data-item"><strong>Importación</strong><span>Directa a Chile</span></div>
      <div class="gt-v3-data-item"><strong>WhatsApp</strong><span>Cotización inmediata</span></div>
    </div>`;

    const story=document.createElement('section');
    story.className='gt-v3-story';
    story.innerHTML=`<div class="gt-v3-story-sticky">
      <div class="gt-v3-story-media" aria-hidden="true">
        <div class="gt-v3-story-ring"></div>
        <img class="gt-v3-story-tire" src="assets/hero-tire.webp" alt="" decoding="async">
      </div>
      <div class="gt-v3-story-copy">
        <article class="gt-v3-step is-active"><small>01 // CONTACT PATCH</small><h2>Potencia<br>al suelo</h2><p>Una selección construida alrededor de agarre, estabilidad y respuesta. El neumático deja de ser una tarjeta: pasa a ser el producto protagonista.</p></article>
        <article class="gt-v3-step"><small>02 // FITMENT SYSTEM</small><h2>La medida<br>manda</h2><p>Busca por medida y filtra por marca o uso. Menos pasos entre el cliente y el neumático correcto.</p></article>
        <article class="gt-v3-step"><small>03 // DIRECT IMPORT</small><h2>Stock sin<br>intermediarios</h2><p>Grenlander, Haida y Tianfu dentro de una operación enfocada en distribución y venta mayorista.</p></article>
        <article class="gt-v3-step"><small>04 // FAST QUOTE</small><h2>Cotiza.<br>Cierra. Rueda.</h2><p>Del catálogo al WhatsApp en segundos. Una experiencia comercial rápida, directa y visual.</p></article>
      </div>
      <div class="gt-v3-story-progress" aria-hidden="true"><i class="is-active"></i><i></i><i></i><i></i></div>
    </div>`;

    old.before(hero);
    hero.after(data,story);
    document.documentElement.classList.add('gt-v3');
    syncLinks();

    hero.querySelector('.gt-v3-secondary').addEventListener('click',e=>{
      e.preventDefault(); const c=document.getElementById('catalogo');
      if(c) c.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    });

    if(!reduced){
      const tire=hero.querySelector('.gt-v3-tire');
      hero.addEventListener('pointermove',e=>{
        const r=hero.getBoundingClientRect();
        const nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
        tire.style.setProperty('--gt3-tire-x',(nx*18).toFixed(1)+'px');
        tire.style.setProperty('--gt3-tire-y',(ny*14).toFixed(1)+'px');
        tire.style.setProperty('--gt3-tire-r',(-4+nx*5).toFixed(2)+'deg');
        tire.style.setProperty('--gt3-tire-s',(1.02+Math.abs(nx)*.018).toFixed(3));
      },{passive:true});
    }

    initStory(story);
    return true;
  }

  function initStory(story){
    if(reduced || !story) return;
    const tire=story.querySelector('.gt-v3-story-tire');
    const ring=story.querySelector('.gt-v3-story-ring');
    const steps=[...story.querySelectorAll('.gt-v3-step')];
    const dots=[...story.querySelectorAll('.gt-v3-story-progress i')];
    let last=-1,raf=0;
    function update(){
      raf=0;
      const rect=story.getBoundingClientRect();
      const travel=Math.max(1,story.offsetHeight-innerHeight);
      const p=Math.max(0,Math.min(1,-rect.top/travel));
      const idx=Math.min(steps.length-1,Math.floor(p*steps.length));
      if(idx!==last){steps.forEach((s,i)=>s.classList.toggle('is-active',i===idx));dots.forEach((d,i)=>d.classList.toggle('is-active',i===idx));last=idx;}
      if(tire){const s=.78+p*.55,r=-16+p*32,x=-7+p*14;tire.style.transform=`translate3d(${x}%,0,0) rotate(${r}deg) scale(${s})`;}
      if(ring) ring.style.transform=`rotate(${p*130}deg) scale(${.9+p*.12})`;
    }
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    update(); addEventListener('scroll',onScroll,{passive:true}); addEventListener('resize',onScroll,{passive:true});
  }

  function boot(){
    loadCss();
    if(buildHero()) return;
    let tries=0;
    const timer=setInterval(()=>{tries++; if(buildHero()||tries>30)clearInterval(timer)},100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  setTimeout(syncLinks,500); setTimeout(syncLinks,1500);
})();
