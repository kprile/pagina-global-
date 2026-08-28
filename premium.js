/* Global Tires V3.2 — estructura + motion 2026 sin cambiar identidad de color */
(() => {
  const V = '20260828-v32';
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function loadCss(){
    if (!document.getElementById('gt-v3-css')) {
      const l=document.createElement('link');
      l.id='gt-v3-css'; l.rel='stylesheet'; l.href='./premium-v3.css?v='+V;
      document.head.appendChild(l);
    }
    if (!document.getElementById('gt-motion-css')) {
      const l=document.createElement('link');
      l.id='gt-motion-css'; l.rel='stylesheet'; l.href='./premium-motion.css?v='+V;
      document.head.appendChild(l);
    }
    if (!document.getElementById('gt-v31-fixes')) {
      const s=document.createElement('style');
      s.id='gt-v31-fixes';
      s.textContent=`
        .gt-v3-story-media{overflow:visible!important;min-width:0!important;}
        .gt-v3-story-tire{width:min(45vw,610px)!important;height:min(66vh,650px)!important;object-fit:contain!important;object-position:center!important;transform-origin:center center!important;filter:drop-shadow(0 42px 60px rgba(0,0,0,.52)) contrast(1.04)!important;}
        .gt-v3-story-ring{width:min(41vw,610px)!important;max-width:610px!important;}
        .gt-v3-story-progress{z-index:12!important;right:clamp(6px,1vw,18px)!important;padding:12px 10px!important;background:rgba(20,21,23,.48)!important;border:1px solid rgba(255,255,255,.06)!important;backdrop-filter:blur(10px)!important;}
        .gt-v3-story-progress i{cursor:pointer!important;width:4px!important;}
        .gt-v3-story-progress i.is-active{height:74px!important;}
        @media(max-width:980px){.gt-v3-story-tire{width:min(82vw,500px)!important;height:42vh!important}.gt-v3-story-ring{width:min(72vw,470px)!important}.gt-v3-story-progress{right:8px!important}}
      `;
      document.head.appendChild(s);
    }
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
    story.className='gt-v3-story is-autoplay';
    story.innerHTML=`<div class="gt-v3-story-sticky">
      <div class="gt-v3-story-media" aria-hidden="true">
        <div class="gt-v3-story-ring"></div>
        <img class="gt-v3-story-tire" src="assets/models/rd224-1.webp" alt="" decoding="async">
      </div>
      <div class="gt-v3-story-copy">
        <article class="gt-v3-step is-active"><small>01 // CONTACT PATCH</small><h2>Potencia<br>al suelo</h2><p>Una selección construida alrededor de agarre, estabilidad y respuesta. El neumático deja de ser una tarjeta: pasa a ser el producto protagonista.</p></article>
        <article class="gt-v3-step"><small>02 // FITMENT SYSTEM</small><h2>La medida<br>manda</h2><p>Busca por medida y filtra por marca o uso. Menos pasos entre el cliente y el neumático correcto.</p></article>
        <article class="gt-v3-step"><small>03 // DIRECT IMPORT</small><h2>Stock sin<br>intermediarios</h2><p>Grenlander, Haida y Tianfu dentro de una operación enfocada en distribución y venta mayorista.</p></article>
        <article class="gt-v3-step"><small>04 // FAST QUOTE</small><h2>Cotiza.<br>Cierra. Rueda.</h2><p>Del catálogo al WhatsApp en segundos. Una experiencia comercial rápida, directa y visual.</p></article>
      </div>
      <div class="gt-v3-story-progress" aria-label="Escenas"><i class="is-active" data-slide="0"></i><i data-slide="1"></i><i data-slide="2"></i><i data-slide="3"></i></div>
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
    setupMotion(hero,story,data);
    return true;
  }

  function initStory(story){
    if(!story) return;
    const tire=story.querySelector('.gt-v3-story-tire');
    const ring=story.querySelector('.gt-v3-story-ring');
    const steps=[...story.querySelectorAll('.gt-v3-step')];
    const dots=[...story.querySelectorAll('.gt-v3-story-progress i')];
    let current=0,raf=0,autoTimer=0,visible=false,userScrolling=false,scrollTimer=0;

    const show=(idx,fromAuto=false)=>{
      current=(idx+steps.length)%steps.length;
      steps.forEach((s,i)=>s.classList.toggle('is-active',i===current));
      dots.forEach((d,i)=>d.classList.toggle('is-active',i===current));
      if(tire && !reduced){
        const poses=[[-4,-8,.88],[-1,3,.96],[4,-5,1.04],[0,6,.92]];
        const [r,x,s]=poses[current];
        tire.style.transform=`translate3d(${x}%,0,0) rotate(${r}deg) scale(${s})`;
      }
      if(ring && !reduced) ring.style.transform=`rotate(${current*38}deg) scale(${.94+current*.02})`;
      if(fromAuto){story.classList.remove('is-autoplay');void story.offsetWidth;story.classList.add('is-autoplay');}
    };

    const restartAuto=()=>{
      clearInterval(autoTimer);
      if(reduced) return;
      autoTimer=setInterval(()=>{if(visible && !userScrolling)show(current+1,true)},4200);
    };

    dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restartAuto();}));

    const updateFromScroll=()=>{
      raf=0;
      const rect=story.getBoundingClientRect();
      const travel=Math.max(1,story.offsetHeight-innerHeight);
      const p=Math.max(0,Math.min(.9999,-rect.top/travel));
      if(rect.top<=0 && rect.bottom>=innerHeight){
        const idx=Math.min(steps.length-1,Math.floor(p*steps.length));
        if(idx!==current) show(idx);
      }
    };

    const onScroll=()=>{
      userScrolling=true;
      clearTimeout(scrollTimer);
      scrollTimer=setTimeout(()=>{userScrolling=false},650);
      if(!raf)raf=requestAnimationFrame(updateFromScroll);
    };

    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting||false},{threshold:.35});
      io.observe(story);
    }else visible=true;

    show(0);restartAuto();
    if(!reduced){addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});}
  }

  function setupMotion(hero,story,data){
    if(document.querySelector('.gt-motion-progress')) return;

    const progress=document.createElement('div');
    progress.className='gt-motion-progress'; progress.innerHTML='<i></i>';
    document.body.appendChild(progress);
    const bar=progress.firstElementChild;

    const pointer=document.createElement('div'); pointer.className='gt-pointer-light'; document.body.appendChild(pointer);
    if(!reduced && matchMedia('(pointer:fine)').matches){
      addEventListener('pointermove',e=>{pointer.style.transform=`translate3d(${e.clientX-140}px,${e.clientY-140}px,0)`},{passive:true});
    }

    const title=hero.querySelector('.gt-v3-title');
    if(title){title.innerHTML='<span class="gt-word"><span>Tracción</span></span><span class="gt-word"><span>sin concesiones</span></span>';}

    const revealTargets=[...hero.querySelectorAll('.gt-v3-eyebrow,.gt-v3-lead,.gt-v3-actions'),...data.querySelectorAll('.gt-v3-data-item')];
    revealTargets.forEach(el=>el.classList.add('gt-reveal-mask'));
    if('IntersectionObserver' in window){
      const io=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting){x.target.classList.add('is-visible');io.unobserve(x.target)}}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
      revealTargets.forEach(el=>io.observe(el));
    }else revealTargets.forEach(el=>el.classList.add('is-visible'));

    const marquee=document.createElement('section');
    marquee.className='gt-motion-marquee';
    const items=['GRENlander','HAIDA','TIANFU','AUTO','SUV','CARGA','IMPORTACIÓN DIRECTA','STOCK REAL'];
    marquee.innerHTML='<div class="gt-motion-track">'+[...items,...items].map(x=>`<span>${x}</span>`).join('')+'</div>';
    story.after(marquee);

    document.querySelectorAll('.gt-v3-primary,.gt-v3-secondary,.gt-cta-header').forEach(btn=>{
      btn.classList.add('gt-magnetic');
      if(reduced || !matchMedia('(pointer:fine)').matches) return;
      btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.16;const y=(e.clientY-r.top-r.height/2)*.18;btn.style.transform=`translate3d(${x}px,${y}px,0)`});
      btn.addEventListener('pointerleave',()=>btn.style.transform='');
    });

    const visual=hero.querySelector('.gt-v3-visual');
    if(visual && !reduced && matchMedia('(pointer:fine)').matches){
      visual.classList.add('is-reactive');
      visual.addEventListener('pointermove',e=>{const r=visual.getBoundingClientRect();const nx=(e.clientX-r.left)/r.width-.5;const ny=(e.clientY-r.top)/r.height-.5;visual.style.setProperty('--rx',(nx*7).toFixed(2)+'deg');visual.style.setProperty('--ry',(-ny*7).toFixed(2)+'deg')},{passive:true});
      visual.addEventListener('pointerleave',()=>{visual.style.setProperty('--rx','0deg');visual.style.setProperty('--ry','0deg')});
    }

    const bindTilt=el=>{
      if(reduced || !matchMedia('(pointer:fine)').matches || el.dataset.gtTilt) return;
      el.dataset.gtTilt='1';
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const nx=(e.clientX-r.left)/r.width-.5;const ny=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--tilt-y',(nx*7).toFixed(2)+'deg');el.style.setProperty('--tilt-x',(-ny*5).toFixed(2)+'deg');el.classList.add('gt-tilt')},{passive:true});
      el.addEventListener('pointerleave',()=>{el.classList.remove('gt-tilt');el.style.removeProperty('--tilt-x');el.style.removeProperty('--tilt-y')});
    };
    const scanCards=()=>document.querySelectorAll('.gt-card,.gt-brand').forEach(bindTilt);
    scanCards(); setInterval(scanCards,1200);

    let raf=0;
    const updateProgress=()=>{raf=0;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);bar.style.transform=`scaleX(${Math.max(0,Math.min(1,scrollY/max))})`;};
    addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(updateProgress)},{passive:true});
    addEventListener('resize',()=>{if(!raf)raf=requestAnimationFrame(updateProgress)},{passive:true});
    updateProgress();
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
