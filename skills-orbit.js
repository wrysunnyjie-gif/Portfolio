(() => {
  const anchor = document.querySelector('.about-section');
  if (!anchor) return;
  const skills = [
    ['Visual','视觉执行','粒子 / 视效表现 / 演绎设计','UI · 手绘 · Spine',24,23,'#ff5377'],
    ['Collaboration','团队协同','多方沟通 / 交付节奏','协作沟通 · 规范交付',75,20,'#53e6e5'],
    ['Product Logic','产品逻辑','功能架构 / 用户路径','界面层级 · 交互理解',16,52,'#7198ff'],
    ['Implementation','执行制作','版本优化 / 资源统筹','Unity3D 基础 · 资源适配',79,49,'#ffb65b'],
    ['Planning','策划思维','叙事逻辑 / 体验流程','玩法理解 · 体验串联',22,83,'#d78aff'],
    ['Creativity','视觉创意','品牌 / UI / 空间视觉','AI 辅助创作 · 视觉探索',75,82,'#ffe377']
  ];
  const section = document.createElement('section');
  section.className = 'skills-universe';
  section.setAttribute('aria-labelledby','skills-heading');
  section.innerHTML = `<header><p class="eyebrow">MY CAPABILITIES / GAME UI DESIGNER</p><h2 id="skills-heading">让每一种能力，<span>连接创意。</span></h2><p class="skills-intro">从视觉表达，到体验逻辑，再到制作落地。</p></header><div class="skills-space"><img class="skills-art" src="assets/skills-orbit.webp" alt="蓝色发光核心与彩色技能轨道" loading="lazy"><div class="skills-particles" aria-hidden="true"></div><div class="skills-core"><strong>GAME UI</strong></div>${skills.map(([en,cn,desc,tools,x,y,color],i)=>`<article class="skill-node" style="--x:${x}%;--y:${y}%;--color:${color};--delay:${260+i*140}ms"><span class="skill-english">${en}</span><h3>${cn}</h3><p>${desc}</p><small>${tools}</small></article>`).join('')}</div><footer><span>视觉 × 逻辑 × 制作</span><button class="skills-replay" type="button">再次展开 <span aria-hidden="true">↗</span></button></footer>`;
  anchor.before(section);
  const space = section.querySelector('.skills-space');
  const nodes = [...section.querySelectorAll('.skill-node')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const particles = section.querySelector('.skills-particles');
  for (let i=0;i<32;i++) {
    const p = document.createElement('i');
    const angle = i * 2.39996;
    p.style.cssText = `--dx:${Math.cos(angle)*(100+i*6)}px;--dy:${Math.sin(angle)*(80+i*4)}px;--size:${2+i%4}px;--delay:${i*22}ms;--color:${skills[i%6][6]}`;
    particles.append(p);
  }
  function layout() {
    const r = space.getBoundingClientRect();
    nodes.forEach((node,i)=>{
      node.style.setProperty('--from-x',`${r.width*(.395-skills[i][4]/100)}px`);
      node.style.setProperty('--from-y',`${r.height*(.6-skills[i][5]/100)}px`);
    });
  }
  function reveal() {
    layout();
    section.classList.remove('skills-revealed');
    void section.offsetWidth;
    section.classList.add('skills-revealed');
  }
  section.querySelector('.skills-replay').addEventListener('click',reveal);
  new ResizeObserver(layout).observe(space);
  if (reduced.matches) reveal();
  else {
    const observer = new IntersectionObserver(entries=>{
      if (entries.some(e=>e.isIntersecting)) { reveal(); observer.disconnect(); }
    },{threshold:.15});
    observer.observe(section);
  }
})();
