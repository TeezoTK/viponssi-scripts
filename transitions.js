// ════════════════════════════════════════════
// VIPONSSI — SIGNATURE TRANSITION SYSTEM v6
// ════════════════════════════════════════════
(function () {

  function getDestKey(href) {
    if (!href) return 'other';
    if (href.includes('portfolio')) return 'portfolio';
    if (href.includes('looks'))     return 'looks';
    if (href.includes('contact'))   return 'contact';
    if (href.includes('about'))     return 'about';
    if (href.includes('home') || href === '/') return 'home';
    return 'other';
  }

  function getCurrentKey() {
    const p = window.location.pathname;
    if (p.includes('portfolio')) return 'portfolio';
    if (p.includes('looks'))     return 'looks';
    if (p.includes('contact'))   return 'contact';
    if (p.includes('about'))     return 'about';
    if (p.includes('home') || p === '/') return 'startup';
    return 'other';
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes vip-glitch-shift {
      0%, 100% { transform: translateX(0) skewX(0deg); }
      15%      { transform: translateX(-6px) skewX(-1.5deg); }
      30%      { transform: translateX(5px) skewX(1deg); }
      50%      { transform: translateX(-3px) skewX(-0.5deg); }
      70%      { transform: translateX(4px) skewX(1.2deg); }
      85%      { transform: translateX(-2px) skewX(-0.8deg); }
    }
    @keyframes vip-rgb-split {
      0%, 100% { text-shadow: none; filter: none; }
      20%      { text-shadow: -3px 0 rgba(255,0,0,0.6), 3px 0 rgba(0,200,255,0.6); filter: brightness(1.3); }
      50%      { text-shadow: -4px 0 rgba(255,0,0,0.7), 4px 0 rgba(0,200,255,0.7); filter: brightness(1.4) saturate(0.5); }
      80%      { text-shadow: 2px 0 rgba(255,0,0,0.4), -2px 0 rgba(0,200,255,0.4); }
    }
    @keyframes vip-polaroid-develop {
      0%   { filter: brightness(4) contrast(0.2) saturate(0); }
      40%  { filter: brightness(2) contrast(0.6) saturate(0.3); }
      100% { filter: brightness(1) contrast(1) saturate(1); }
    }
    @keyframes vip-sigil-glow-pulse {
      0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 1.5rem rgba(245,232,188,0.5)); }
      50%      { opacity: 1; filter: drop-shadow(0 0 3rem rgba(245,232,188,0.8)) drop-shadow(0 0 6rem rgba(245,232,188,0.3)); }
    }
    .vip-glitching { animation: vip-glitch-shift 0.4s ease-in-out !important; }
    .vip-rgb       { animation: vip-rgb-split 0.4s ease-in-out !important; }
    .vip-polaroid  { animation: vip-polaroid-develop 1.4s cubic-bezier(0.4,0,0.2,1) forwards; }
  `;
  document.head.appendChild(style);

  const currentKey = getCurrentKey();
  const isStartup  = currentKey === 'startup';
  const isOther    = currentKey === 'other';

  const blackCover = document.createElement('div');
  blackCover.id = 'vip-transition-cover';
  blackCover.style.cssText = `
    position:fixed;inset:0;
    z-index:${isStartup ? '-1' : '999985'};
    background:#000;
    opacity:${isStartup ? '0' : '1'};
    pointer-events:${isStartup ? 'none' : 'auto'};
    transition:opacity 0.5s ease;
  `;

  const glitchOverlay = document.createElement('div');
  glitchOverlay.style.cssText = `position:fixed;inset:0;z-index:999990;pointer-events:none;opacity:0;overflow:hidden;`;

  const rgbLayer = document.createElement('div');
  rgbLayer.style.cssText = `position:fixed;inset:0;z-index:999991;pointer-events:none;opacity:0;mix-blend-mode:screen;transition:opacity 0.08s ease,transform 0.06s ease;`;

  const exitBlack = document.createElement('div');
  exitBlack.style.cssText = `position:fixed;inset:0;z-index:999995;background:#000;pointer-events:none;opacity:0;transition:opacity 0.15s ease;`;

  const entryOverlay = document.createElement('div');
  entryOverlay.style.cssText = `position:fixed;inset:0;z-index:999986;pointer-events:none;overflow:hidden;`;

  document.body.appendChild(blackCover);
  document.body.appendChild(glitchOverlay);
  document.body.appendChild(rgbLayer);
  document.body.appendChild(exitBlack);
  document.body.appendChild(entryOverlay);

  function fireGlitchLines(count) {
    glitchOverlay.style.opacity = '1';
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const line = document.createElement('div');
        const top  = 5 + Math.random() * 88;
        const w    = 30 + Math.random() * 65;
        const left = Math.random() * (100 - w);
        line.style.cssText = `position:absolute;top:${top}%;left:${left}%;width:${w}%;height:${1+Math.random()*3}px;background:${Math.random()>0.5?'rgba(255,255,255,0.12)':'rgba(0,0,0,0.6)'};pointer-events:none;transition:opacity 0.1s ease;`;
        glitchOverlay.appendChild(line);
        setTimeout(() => {
          line.style.opacity = '0';
          setTimeout(() => { if (line.parentNode) line.parentNode.removeChild(line); }, 110);
        }, 40 + Math.random() * 100);
      }, i * 45);
    }
  }

  function fireScreenTear() {
    for (let i = 0; i < 2; i++) {
      const tear = document.createElement('div');
      tear.style.cssText = `position:absolute;top:${15+Math.random()*65}%;left:0;right:0;height:${2+Math.random()*5}px;background:rgba(255,255,255,0.05);transform:translateX(${(Math.random()-0.5)*22}px);pointer-events:none;transition:opacity 0.12s ease;`;
      glitchOverlay.appendChild(tear);
      setTimeout(() => {
        tear.style.opacity = '0';
        setTimeout(() => { if (tear.parentNode) tear.parentNode.removeChild(tear); }, 150);
      }, 110);
    }
  }

  function glitchPageElements() {
    const targets = document.querySelectorAll(
      'h1,h2,h3,.camera-home__menu-title-2,.camera-home__card-title-2,' +
      '.about-editorial__title,.portfolio-feature__title,' +
      '.looks-sequence__title,.contact-editorial__title,' +
      '.camera-home__brand-sigil'
    );
    targets.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('vip-glitching','vip-rgb');
        setTimeout(() => el.classList.remove('vip-glitching','vip-rgb'), 420);
      }, i * 30);
    });
  }

  function rgbFlash() {
    rgbLayer.style.background = `linear-gradient(90deg,rgba(255,0,0,0.04) 0%,transparent 50%,rgba(0,200,255,0.04) 100%)`;
    rgbLayer.style.opacity    = '1';
    rgbLayer.style.transform  = 'translateX(-4px)';
    setTimeout(() => { rgbLayer.style.transform = 'translateX(4px)'; }, 60);
    setTimeout(() => { rgbLayer.style.transform = 'translateX(-2px)'; }, 120);
    setTimeout(() => { rgbLayer.style.opacity = '0'; rgbLayer.style.transform = 'translateX(0)'; }, 180);
  }

  function exitTransition(href) {
    exitBlack.style.pointerEvents = 'auto';
    glitchPageElements();
    fireGlitchLines(4);
    rgbFlash();
    setTimeout(() => { fireScreenTear(); fireGlitchLines(3); }, 150);
    setTimeout(() => { glitchPageElements(); fireGlitchLines(6); rgbFlash(); fireScreenTear(); }, 280);
    setTimeout(() => {
      exitBlack.style.transition = 'opacity 0.12s ease';
      exitBlack.style.opacity    = '1';
    }, 420);
    setTimeout(() => {
      if (getDestKey(href) === 'home') {
        sessionStorage.setItem('vip-skip-to-menu', '1');
      }
      window.location.href = href.split('#')[0];
    }, 560);
  }

  function entryPortfolio() {
    const perfCount = 12;
    for (let i = 0; i < perfCount; i++) {
      const perf = document.createElement('div');
      perf.style.cssText = `position:absolute;top:0;bottom:0;left:${(i/perfCount)*100}%;width:1px;background:linear-gradient(180deg,transparent,rgba(255,189,113,0.15) 30%,rgba(255,189,113,0.3) 50%,rgba(255,189,113,0.15) 70%,transparent);opacity:0;transform:scaleY(0);transform-origin:top center;transition:opacity 0.3s ease,transform 0.4s cubic-bezier(0.34,1.2,0.64,1);`;
      entryOverlay.appendChild(perf);
    }
    const scanH = document.createElement('div');
    scanH.style.cssText = `position:absolute;top:0;bottom:0;left:-4px;width:3px;background:linear-gradient(180deg,transparent,rgba(255,189,113,0.3) 15%,rgba(255,189,113,0.9) 50%,rgba(255,189,113,0.3) 85%,transparent);box-shadow:0 0 12px 3px rgba(255,189,113,0.4);opacity:0;transition:left 0.85s cubic-bezier(0.4,0,0.2,1),opacity 0.2s ease;`;
    entryOverlay.appendChild(scanH);
    window.addEventListener('load', () => {
      setTimeout(() => {
        Array.from(entryOverlay.children).slice(0,-1).forEach((p,i) => {
          setTimeout(() => { p.style.opacity='1'; p.style.transform='scaleY(1)'; }, i*35);
        });
      }, 150);
      setTimeout(() => { scanH.style.opacity='1'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ scanH.style.left='104%'; })); }, 350);
      setTimeout(() => { blackCover.style.transition='opacity 0.5s ease'; blackCover.style.opacity='0'; blackCover.style.pointerEvents='none'; }, 400);
      setTimeout(() => { Array.from(entryOverlay.children).forEach(el=>{el.style.opacity='0';}); }, 900);
      setTimeout(() => { entryOverlay.innerHTML=''; exitBlack.style.pointerEvents='none'; }, 1300);
    });
  }

  function entryLooks() {
    const aperture = document.createElement('div');
    aperture.style.cssText = `position:absolute;top:50%;left:50%;width:100vmax;height:100vmax;transform:translate(-50%,-50%);pointer-events:none;`;
    const blades = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i/6)*360;
      const blade = document.createElement('div');
      blade.style.cssText = `position:absolute;top:50%;left:50%;width:55%;height:55%;transform-origin:0% 100%;transform:rotate(${angle}deg) translateY(0%) scaleY(0);background:linear-gradient(${angle+90}deg,#000,rgba(130,84,214,0.12) 60%,#000);opacity:0;transition:transform 0.7s cubic-bezier(0.34,1.1,0.64,1),opacity 0.3s ease;`;
      aperture.appendChild(blade);
      blades.push({ el: blade, angle });
    }
    const centreGlow = document.createElement('div');
    centreGlow.style.cssText = `position:absolute;top:50%;left:50%;width:0;height:0;border-radius:999px;background:radial-gradient(circle,rgba(211,160,255,0.5) 0%,rgba(130,84,214,0.25) 40%,transparent 70%);transform:translate(-50%,-50%);transition:width 0.8s ease,height 0.8s ease,opacity 0.5s ease;opacity:0;`;
    aperture.appendChild(centreGlow);
    const scanV = document.createElement('div');
    scanV.style.cssText = `position:absolute;top:0;bottom:0;left:-3px;width:2px;background:linear-gradient(180deg,transparent,rgba(211,160,255,0.3) 20%,rgba(211,160,255,0.9) 50%,rgba(211,160,255,0.3) 80%,transparent);box-shadow:0 0 10px 2px rgba(211,160,255,0.4);opacity:0;transition:left 0.9s cubic-bezier(0.4,0,0.2,1),opacity 0.2s ease;`;
    entryOverlay.appendChild(aperture);
    entryOverlay.appendChild(scanV);
    window.addEventListener('load', () => {
      setTimeout(() => {
        blades.forEach(({el,angle},i) => { setTimeout(() => { el.style.opacity='1'; el.style.transform=`rotate(${angle}deg) translateY(-50%) scaleY(1)`; }, i*60); });
        setTimeout(() => { centreGlow.style.opacity='1'; centreGlow.style.width='60vmax'; centreGlow.style.height='60vmax'; }, 200);
      }, 100);
      setTimeout(() => { blackCover.style.transition='opacity 0.6s ease'; blackCover.style.opacity='0'; blackCover.style.pointerEvents='none'; }, 300);
      setTimeout(() => { scanV.style.opacity='1'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ scanV.style.left='104%'; })); }, 600);
      setTimeout(() => { blades.forEach(b=>{b.el.style.opacity='0';}); centreGlow.style.opacity='0'; scanV.style.opacity='0'; }, 950);
      setTimeout(() => { entryOverlay.innerHTML=''; exitBlack.style.pointerEvents='none'; }, 1400);
    });
  }

  function entryContact() {
    const col = 'rgba(134,231,184,';
    const reticle = document.createElement('div');
    reticle.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);width:180px;height:180px;border:1px solid ${col}0.5);border-radius:999px;transition:transform 0.6s cubic-bezier(0.34,1.2,0.64,1),opacity 0.3s ease;opacity:0;`;
    const inner = document.createElement('div');
    inner.style.cssText = `position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);width:60px;height:60px;border:1px solid ${col}0.8);border-radius:999px;transition:transform 0.5s cubic-bezier(0.34,1.3,0.64,1) 0.15s,opacity 0.3s ease 0.15s;opacity:0;`;
    const lineH = document.createElement('div');
    lineH.style.cssText = `position:absolute;top:50%;left:50%;height:1px;width:0;transform:translate(-50%,-50%);background:linear-gradient(90deg,transparent,${col}0.6),${col}0.6),transparent);transition:width 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s,opacity 0.3s ease;opacity:0;`;
    const lineV = document.createElement('div');
    lineV.style.cssText = `position:absolute;top:50%;left:50%;width:1px;height:0;transform:translate(-50%,-50%);background:linear-gradient(180deg,transparent,${col}0.6),${col}0.6),transparent);transition:height 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s,opacity 0.3s ease;opacity:0;`;
    const locked = document.createElement('div');
    locked.style.cssText = `position:absolute;top:calc(50% + 105px);left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:0.5rem;letter-spacing:0.3rem;color:${col}0.7);text-transform:uppercase;opacity:0;transition:opacity 0.3s ease;`;
    locked.textContent = 'SIGNAL LOCKED';
    const scan = document.createElement('div');
    scan.style.cssText = `position:absolute;left:0;right:0;top:-2px;height:2px;background:linear-gradient(90deg,transparent,${col}0.3) 20%,${col}0.9) 50%,${col}0.3) 80%,transparent);box-shadow:0 0 10px 2px ${col}0.35);opacity:0;transition:top 0.85s cubic-bezier(0.4,0,0.2,1),opacity 0.2s ease;`;
    reticle.appendChild(inner); reticle.appendChild(lineH); reticle.appendChild(lineV);
    entryOverlay.appendChild(reticle); entryOverlay.appendChild(locked); entryOverlay.appendChild(scan);
    window.addEventListener('load', () => {
      setTimeout(() => { reticle.style.transform='translate(-50%,-50%) scale(1)'; reticle.style.opacity='1'; }, 150);
      setTimeout(() => { inner.style.transform='translate(-50%,-50%) scale(1)'; inner.style.opacity='1'; lineH.style.width='100vw'; lineH.style.opacity='1'; lineV.style.height='100vh'; lineV.style.opacity='1'; }, 300);
      setTimeout(() => { locked.style.opacity='1'; }, 650);
      setTimeout(() => { blackCover.style.transition='opacity 0.5s ease'; blackCover.style.opacity='0'; blackCover.style.pointerEvents='none'; }, 400);
      setTimeout(() => { scan.style.opacity='1'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ scan.style.top='103%'; })); }, 700);
      setTimeout(() => { reticle.style.opacity='0'; locked.style.opacity='0'; lineH.style.opacity='0'; lineV.style.opacity='0'; scan.style.opacity='0'; }, 1000);
      setTimeout(() => { entryOverlay.innerHTML=''; exitBlack.style.pointerEvents='none'; }, 1400);
    });
  }

  function entryAbout() {
    const whiteCover = document.createElement('div');
    whiteCover.style.cssText = `position:absolute;inset:0;background:#fff;opacity:1;transition:opacity 1.2s ease;`;
    const blueTint = document.createElement('div');
    blueTint.style.cssText = `position:absolute;inset:0;background:rgba(159,209,255,0.2);opacity:1;transition:opacity 1s ease 0.3s;mix-blend-mode:screen;`;
    const vignette = document.createElement('div');
    vignette.style.cssText = `position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 60%,rgba(0,0,0,0.5) 100%);opacity:0;transition:opacity 0.8s ease 0.4s;`;
    const scan = document.createElement('div');
    scan.style.cssText = `position:absolute;top:0;bottom:0;left:-3px;width:2px;background:linear-gradient(180deg,transparent,rgba(159,209,255,0.3) 20%,rgba(159,209,255,0.9) 50%,rgba(159,209,255,0.3) 80%,transparent);box-shadow:0 0 10px 2px rgba(159,209,255,0.4);opacity:0;transition:left 1s cubic-bezier(0.4,0,0.2,1),opacity 0.2s ease;`;
    entryOverlay.appendChild(whiteCover); entryOverlay.appendChild(blueTint);
    entryOverlay.appendChild(vignette); entryOverlay.appendChild(scan);
    const pageBody = document.querySelector('.about-editorial, section, body > div');
    if (pageBody) pageBody.classList.add('vip-polaroid');
    window.addEventListener('load', () => {
      setTimeout(() => { blackCover.style.transition='opacity 0.1s ease'; blackCover.style.opacity='0'; blackCover.style.pointerEvents='none'; }, 100);
      setTimeout(() => { whiteCover.style.opacity='0'; blueTint.style.opacity='0'; vignette.style.opacity='1'; }, 300);
      setTimeout(() => { scan.style.opacity='1'; requestAnimationFrame(()=>requestAnimationFrame(()=>{ scan.style.left='104%'; })); }, 700);
      setTimeout(() => { scan.style.opacity='0'; vignette.style.opacity='0'; }, 1000);
      setTimeout(() => { entryOverlay.innerHTML=''; exitBlack.style.pointerEvents='none'; if(pageBody) pageBody.classList.remove('vip-polaroid'); }, 1500);
    });
  }

  function entrySequence() {
    if (isStartup) {
      window.addEventListener('load', () => {
        blackCover.style.transition    = 'none';
        blackCover.style.opacity       = '0';
        blackCover.style.zIndex        = '-1';
        blackCover.style.pointerEvents = 'none';
        exitBlack.style.pointerEvents  = 'none';
      });
      return;
    }
    if (isOther) {
      window.addEventListener('load', () => {
        blackCover.style.transition    = 'none';
        blackCover.style.opacity       = '0';
        blackCover.style.pointerEvents = 'none';
        exitBlack.style.pointerEvents  = 'none';
      });
      return;
    }
    switch (currentKey) {
      case 'portfolio': entryPortfolio(); break;
      case 'looks':     entryLooks();     break;
      case 'contact':   entryContact();   break;
      case 'about':     entryAbout();     break;
    }
  }

  document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http')||href.startsWith('//')||href.startsWith('mailto')||href.startsWith('tel')||href==='#') return;
    e.preventDefault();
    exitTransition(href);
  });

  entrySequence();

})();
