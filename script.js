/* HALFVERSE — 交互脚本（无依赖） */

// 系统时钟
(function clock() {
  const el = document.getElementById('sysclock');
  if (!el) return;
  const tick = () => {
    const d = new Date();
    const p = n => String(n).padStart(2, '0');
    el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);
})();

// 数字滚动（统计数字）
(function counters() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let cur = 0;
      const step = () => {
        el.textContent = cur;
        if (cur < target) { cur++; setTimeout(step, 70); }
      };
      step();
      io.unobserve(el);
    });
  }, { threshold: 0.6 });
  nums.forEach(n => { n.textContent = '0'; io.observe(n); });
})();

// 卡片入场动画
(function reveal() {
  const items = document.querySelectorAll('.game-card, .wip-card, .about-glass');
  document.body.classList.add('anim-ready');
  if (!('IntersectionObserver' in window)) {
    items.forEach(i => i.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(i => io.observe(i));
  // 兜底：3 秒后强制显示，防止 observer 异常时内容空白
  setTimeout(() => items.forEach(i => i.classList.add('in')), 3000);
})();

// 整卡点击 → 游戏详情页（内部链接除外）
(function cardLinks() {
  document.querySelectorAll('.clickable[data-detail]').forEach(card => {
    card.addEventListener('click', (e) => {
      // 点到卡片内部的真实链接时，交给链接本身处理
      if (e.target.closest('a')) return;
      location.href = `game.html?g=${card.dataset.detail}`;
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        location.href = `game.html?g=${card.dataset.detail}`;
      }
    });
  });
})();

// 跟随鼠标的镜头光晕（仅在精确指针设备上）
(function cursorFlare() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const flare = document.createElement('div');
  flare.style.cssText = [
    'position:fixed', 'width:520px', 'height:520px', 'border-radius:50%',
    'pointer-events:none', 'z-index:1', 'mix-blend-mode:screen', 'transition:opacity .4s',
    'background:radial-gradient(circle,rgba(255,255,255,.28),rgba(95,201,248,.12) 35%,transparent 62%)'
  ].join(';');
  flare.style.opacity = '0';
  document.body.appendChild(flare);
  let x = -300, y = -300, tx = -300, ty = -300;
  window.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY; flare.style.opacity = '1';
  });
  window.addEventListener('mouseout', () => { flare.style.opacity = '0'; });
  (function loop() {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    flare.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
    requestAnimationFrame(loop);
  })();
})();
