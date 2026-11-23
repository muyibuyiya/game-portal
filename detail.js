/* HALFVERSE 游戏详情页渲染器 */
(function () {
  const $ = (id) => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let key = (params.get('g') || 'cscards').toLowerCase();
  const games = window.GAMES || {};
  if (!games[key]) key = 'cscards';           // 未知参数回退
  const g = games[key];

  const ids = Object.keys(games);
  const curIdx = ids.indexOf(key);
  const prev = games[ids[(curIdx - 1 + ids.length) % ids.length]];
  const next = games[ids[(curIdx + 1) % ids.length]];

  const isWip = g.status === 'wip';

  // ---- 标题与 meta ----
  $('docTitle').textContent = `${g.name} ${g.en} · HALFVERSE 游戏详情`;
  $('metaDesc').content = `${g.name}（${g.en}）— ${g.type}。${g.tagline}`;
  $('crumbNow').textContent = g.name;
  $('detailStatus').textContent = isWip ? 'WIP' : 'ONLINE';

  // ---- Hero ----
  const ds = $('dStatus');
  ds.innerHTML = `<span class="dot-live"></span> ${g.statusText}`;
  if (isWip) ds.classList.add('wip');
  $('dNo').textContent = `NO.${g.no}`;
  $('dTitle').innerHTML = `${g.name}<small id="dEn">${g.en}</small>`;
  $('dTagline').textContent = g.tagline;
  $('dTags').innerHTML = g.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Hero 艺术装置配色
  $('heroSection').style.setProperty('--card-a', g.accentA);
  $('heroSection').style.setProperty('--card-b', g.accentB);
  $('dGlyph').textContent = g.glyph;

  // 按钮
  let actions = '';
  if (g.url) {
    actions += `<a class="jelly-btn jelly-primary" href="${g.url}" target="_blank" rel="noopener noreferrer"><span class="btn-gloss"></span><span class="btn-label">进入游玩</span><span class="btn-arrow" aria-hidden="true">↗</span></a>`;
    if (g.altUrl) actions += `<a class="jelly-btn jelly-ghost" href="${g.altUrl}" target="_blank" rel="noopener noreferrer"><span class="btn-gloss"></span><span class="btn-label">备用地址</span></a>`;
  } else {
    actions += `<span class="jelly-btn jelly-ghost wip-cta"><span class="btn-gloss"></span><span class="btn-label">开发中 · 敬请期待</span></span>`;
  }
  actions += `<a class="jelly-btn jelly-support" href="https://space.bilibili.com/351545906?spm_id_from=333.1007.0.0" target="_blank" rel="noopener noreferrer"><span class="btn-gloss"></span><span class="btn-label">支持 Sunset Studio</span><span class="btn-arrow" aria-hidden="true">↗</span></a>`;
  $('dActions').innerHTML = actions;

  // ---- 信息条 ----
  $('fType').textContent = g.type;
  $('fPlatform').textContent = g.platform;
  $('fDev').textContent = g.developer;
  $('fVersion').textContent = g.version + (g.versionDate !== '—' ? ` · ${g.versionDate}` : '');

  // ---- 侧栏 ----
  $('aName').textContent = g.name;
  $('aEn').textContent = g.en;
  $('aType').textContent = g.type;
  $('aStatus').textContent = g.statusText;
  $('aVersion').textContent = g.version;
  $('aDomain').textContent = g.domain;
  const cta = $('aCta');
  if (g.url) { cta.href = g.url; cta.target = '_blank'; cta.rel = 'noopener noreferrer'; }
  else { cta.classList.add('wip-cta'); cta.removeAttribute('href'); }

  // ---- 截图画廊 ----
  const gallery = $('dGallery');
  if (g.screenshots && g.screenshots.length) {
    gallery.classList.remove('gallery-empty');
    gallery.innerHTML = g.screenshots.map((s, i) => `
      <button class="shot-item ${s.span === 'wide' ? 'wide' : ''}" data-shot="${i}" aria-label="放大查看：${s.cap}">
        <span class="shot-frame"><img src="${s.src}" alt="${g.name}截图：${s.cap}" loading="lazy"></span>
        <span class="shot-cap"><span>${s.cap}</span><span class="shot-zoom">点击放大 ⤢</span></span>
      </button>`).join('');
  } else {
    gallery.classList.add('gallery-empty');
    gallery.innerHTML = `<div class="shot-placeholder"><div><b>暂无实机截图</b>本作仍在开发中<br>画面尚未公开，敬请期待</div></div>`;
  }

  // ---- 详细介绍 ----
  $('dIntro').innerHTML = g.intro.map(p => `<p>${p}</p>`).join('');

  // ---- 玩法亮点 ----
  $('dFeatures').innerHTML = g.features.map((f, i) => `
    <article class="feature-card">
      <span class="feature-num">${String(i + 1).padStart(2, '0')} / FEATURE</span>
      <h3>${f.t}</h3>
      <p>${f.d}</p>
    </article>`).join('');

  // ---- 版本时间线 ----
  const tl = $('dTimeline');
  if (g.changelog && g.changelog.length) {
    tl.innerHTML = g.changelog.map(v => `
      <article class="tl-item ${v.current ? 'current' : ''}">
        <div class="tl-head">
          <span class="tl-ver">${v.v}</span>
          <span class="tl-date">${v.date}</span>
          ${v.tag ? `<span class="tl-tag">${v.tag}</span>` : ''}
          ${v.current ? '<span class="tl-tag">CURRENT</span>' : ''}
        </div>
        <ul class="tl-items">${v.items.map(it => `<li>${it}</li>`).join('')}</ul>
      </article>`).join('');
  } else {
    tl.innerHTML = `<div class="timeline-empty">尚未发布版本 · 本作仍在开发中</div>`;
  }
  $('dNote').textContent = g.note || '';

  // ---- 上一款 / 下一款 ----
  $('navPrev').href = `game.html?g=${prev.id}`;
  $('navNext').href = `game.html?g=${next.id}`;
  $('navPrevTitle').textContent = prev.name;
  $('navNextTitle').textContent = next.name;

  // ---- 移除加载提示 ----
  const note = $('nojsNote');
  if (note) note.remove();

  // ---- 时钟 ----
  (function () {
    const el = $('sysclock');
    const tick = () => {
      const d = new Date(), p = n => String(n).padStart(2, '0');
      el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    };
    tick(); setInterval(tick, 1000);
  })();

  // ---- 入场动画（仅在 observer 可用时启用；带兜底确保内容终会显示）----
  (function () {
    const items = document.querySelectorAll('.detail-hero,.fact-strip,.shot-item,.intro-text,.intro-aside,.feature-card,.tl-item,.game-nav-item');
    document.body.classList.add('anim-ready');
    if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(i => io.observe(i));
    // 兜底：3 秒后强制显示全部（防止 observer 在异常环境下不触发导致内容空白）
    setTimeout(() => items.forEach(i => i.classList.add('in')), 3000);
  })();

  // ---- 灯箱 ----
  (function () {
    const lb = $('lightbox'), img = $('lbImg'), cap = $('lbCap');
    const shots = g.screenshots || [];
    let idx = 0;
    const show = (i) => {
      if (!shots.length) return;
      idx = (i + shots.length) % shots.length;
      img.src = shots[idx].src;
      img.alt = `${g.name}截图：${shots[idx].cap}`;
      cap.textContent = shots[idx].cap;
    };
    const open = (i) => { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; };
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; };

    document.querySelectorAll('[data-shot]').forEach(btn => {
      btn.addEventListener('click', () => open(Number(btn.dataset.shot)));
    });
    $('lbClose').addEventListener('click', close);
    $('lbPrev').addEventListener('click', () => show(idx - 1));
    $('lbNext').addEventListener('click', () => show(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  })();
})();
