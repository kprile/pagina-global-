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
        <p class="gt-xp-lead">Neumáticos reales, importación directa y una experiencia construida alrededor del producto.</p>
      </div>
      <div class="gt-xp-stage">
        <div class="gt-xp-ring"></div>
        <div class="gt-xp-fingers">
          <i class="gt-xp-finger f1"></i><i class="gt-xp-finger f2"></i><i class="gt-xp-finger f3"></i><i class="gt-xp-finger f4"></i><i class="gt-xp-finger f5"></i><i class="gt-xp-finger f6"></i>
        </div>
        <img class="gt-xp-tire" src="assets/models/rd224-ny-profile.webp" alt="Neumático Tianfu RD224" decoding="async">
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
      ['02 · Profundidad','Entre la<br>estructura'],
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
        last=idx;
        dots.forEach((d,i)=>d.classList.toggle('on',i===idx));
        label.innerHTML=`<small>${stages[idx][0]}</small><strong>${stages[idx][1]}</strong>`;
      }

      const enter=clamp(p/.26);
      const tunnel=clamp((p-.18)/.48);
      const close=clamp((p-.56)/.30);
      const finish=clamp((p-.88)/.12);

      let scale=lerp(.34,.82,enter);
      scale=lerp(scale,1.18,tunnel);
      scale=lerp(scale,1.46,close);
      scale=lerp(scale,1.30,finish);

      const y=lerp(105,35,enter) + lerp(0,-55,tunnel) + lerp(0,-28,close) - finish*70;
      const x=lerp(-28,18,tunnel) + Math.sin(p*Math.PI*2)*10;
      const rot=lerp(-12,3,enter)+lerp(0,12,tunnel)-lerp(0,7,close);
      const z=lerp(-180,40,enter)+lerp(0,170,tunnel)+lerp(0,90,close);

      tire.style.transform=`translate3d(${x}px,${y}px,${z}px) rotate(${rot}deg) scale(${scale})`;
      tire.style.opacity=String(1-finish*.22);
      tire.style.filter=`drop-shadow(0 ${lerp(22,54,close)}px ${lerp(30,70,close)}px rgba(0,0,0,.68))`;

      fingers.forEach((f,i)=>{
        const left=i<3;
        const fromCenter=Math.abs(2.5-i);
        const side=left?-1:1;
        const spread=side*lerp(0,42+fromCenter*20,tunnel);
        const lift=(i%2?1:-1)*lerp(0,18,tunnel);
        const depth=(i===2||i===3)?-45:95;
        f.style.translate=`${spread}px ${lift}px ${lerp(-20,depth,tunnel)}px`;
        f.style.opacity=String(lerp(.78,1,tunnel)*(1-finish*.42));
      });

      ring.style.transform=`rotate(${p*160}deg) scale(${lerp(.82,1.14,close)})`;
      ring.style.opacity=String(lerp(.35,.85,tunnel)*(1-finish*.5));
      copy.style.opacity=String(1-clamp((p-.16)/.24));
      copy.style.transform=`translateY(calc(-50% - ${p*40}px))`;
      exit.style.opacity=String(finish);
    }

    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    addEventListener('scroll',onScroll,{passive:true});
    addEventListener('resize',onScroll,{passive:true});
    update();
  }

  if(document.readyState==='loading') addEventListener('DOMContentLoaded',build,{once:true}); else build();
})();
