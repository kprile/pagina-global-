(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp=(n,a=0,b=1)=>Math.max(a,Math.min(b,n));
  const lerp=(a,b,t)=>a+(b-a)*t;
  function build(){
    if(document.querySelector('.gt-xp')) return;
    const hero=document.getElementById('gtHero');
    if(!hero) return setTimeout(build,120);
    const xp=document.createElement('section');
    xp.className='gt-xp';
    xp.innerHTML=`<div class="gt-xp-sticky">
      <div class="gt-xp-grid"></div>
      <div class="gt-xp-copy">
        <div class="gt-xp-kicker">Global Tires · Chile</div>
        <h1 class="gt-xp-title">Tracción<span>en movimiento</span></h1>
        <p class="gt-xp-lead">Una experiencia de profundidad construida alrededor de lo que importa: neumáticos reales, importación directa y una llegada limpia al catálogo.</p>
      </div>
      <div class="gt-xp-stage">
        <div class="gt-xp-ring"></div>
        <div class="gt-xp-fingers">
          <i class="gt-xp-finger f1"></i><i class="gt-xp-finger f2"></i><i class="gt-xp-finger f3"></i><i class="gt-xp-finger f4"></i><i class="gt-xp-finger f5"></i><i class="gt-xp-finger f6"></i>
        </div>
        <img class="gt-xp-tire" src="assets/models/rd224-1.webp" alt="Neumático Global Tires" decoding="async">
      </div>
      <div class="gt-xp-progress"><i class="on"></i><i></i><i></i><i></i></div>
      <div class="gt-xp-scene-label"><small>01 · Entrada</small><strong>Neumático<br>protagonista</strong></div>
      <div class="gt-xp-scroll">Scroll para avanzar</div>
      <div class="gt-xp-exit"></div>
    </div>`;
    hero.before(xp);
    if(reduced) return;
    const tire=xp.querySelector('.gt-xp-tire');
    const fingers=[...xp.querySelectorAll('.gt-xp-finger')];
    const ring=xp.querySelector('.gt-xp-ring');
    const copy=xp.querySelector('.gt-xp-copy');
    const label=xp.querySelector('.gt-xp-scene-label');
    const dots=[...xp.querySelectorAll('.gt-xp-progress i')];
    const exit=xp.querySelector('.gt-xp-exit');
    const stages=[
      ['01 · Entrada','Neumático<br>protagonista'],
      ['02 · Profundidad','Cruza<br>la estructura'],
      ['03 · Aplicación','Auto · SUV<br>Camioneta · Carga'],
      ['04 · Salida','Explora<br>el catálogo']
    ];
    let raf=0,last=-1;
    function update(){
      raf=0;
      const r=xp.getBoundingClientRect();
      const travel=Math.max(1,xp.offsetHeight-innerHeight);
      const p=clamp(-r.top/travel);
      const idx=Math.min(3,Math.floor(p*4));
      if(idx!==last){
        last=idx; dots.forEach((d,i)=>d.classList.toggle('on',i===idx));
        label.innerHTML=`<small>${stages[idx][0]}</small><strong>${stages[idx][1]}</strong>`;
      }
      const approach=clamp(p/.58);
      const pass=clamp((p-.18)/.45);
      const depart=clamp((p-.68)/.32);
      const scale=lerp(.42,1.18,approach)*(1-depart*.26);
      const y=lerp(120,-10,approach)+depart*-90;
      const x=Math.sin(p*Math.PI*1.3)*24;
      const rot=lerp(-14,10,pass)-depart*8;
      tire.style.transform=`translate3d(${x}px,${y}px,${lerp(-120,160,approach)}px) rotate(${rot}deg) scale(${scale})`;
      tire.style.filter=`drop-shadow(0 ${lerp(20,55,approach)}px ${lerp(30,65,approach)}px rgba(0,0,0,.62)) blur(${depart*1.8}px)`;
      const spread=lerp(0,1,pass);
      fingers.forEach((f,i)=>{
        const side=i<3?-1:1;
        const dist=Math.abs(2.5-i);
        const move=side*(18+dist*22)*spread;
        const z=lerp(0,120-(dist*18),pass);
        f.style.translate=`${move}px 0 ${z}px`;
        f.style.opacity=String(lerp(.45,1,pass)*(1-depart*.72));
      });
      ring.style.transform=`rotate(${p*145}deg) scale(${lerp(.82,1.08,approach)})`;
      copy.style.opacity=String(1-clamp((p-.18)/.28));
      copy.style.transform=`translateY(calc(-50% - ${p*55}px))`;
      exit.style.background=`linear-gradient(to bottom,transparent 58%,rgba(236,234,230,${depart*.92}))`;
      xp.querySelector('.gt-xp-sticky').style.opacity=String(1-depart*.5);
    }
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    addEventListener('scroll',onScroll,{passive:true});
    addEventListener('resize',onScroll,{passive:true});
    update();
  }
  if(document.readyState==='loading') addEventListener('DOMContentLoaded',build,{once:true}); else build();
})();
