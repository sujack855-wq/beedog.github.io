(() => {
  'use strict';
  const zones = {
    lab: { code: '01 / WORK', eyebrow: 'IDEAS INTO PRACTICE', title: 'AI 实验室', description: '从真实业务问题出发，探索数据、规则与 AI 应用怎样一起工作。这里记录我的项目与实践。', links: [ ['portfolio.html', '项目作品集', 'AI 客服训练数据体系 · 电商运营实践'], ['blog-detail-agent-data.html', 'Agent 与数据的关系', '关于数据如何影响 Agent 能力的思考'] ] },
    log: { code: '02 / JOURNAL', eyebrow: 'THINKING OUT LOUD', title: '信号档案馆', description: '把探索途中的问题写下来。关于 AI、运营和那些值得反复琢磨的想法。', links: [ ['blog.html', '我的博客', 'AI 应用、行业观察与个人思考'], ['books.html', '阅读补给站', '最近在看的书与读书笔记'] ] },
    life: { code: '03 / OFFLINE', eyebrow: 'BEYOND THE SCREEN', title: '星际漫游', description: '屏幕之外，也有值得探索的世界。看看走过的地方，或者在这里停下来，玩一会儿。', links: [ ['travel.html', '我的旅行坐标', '在地图上，回看走过的地方'], ['game.html', '游戏补给舱', '给大脑放个小假'], ['guestbook.html', '留下一条信号', '去留言板留个足迹'] ] },
    about: { code: '04 / PROFILE', eyebrow: 'MEET THE EXPLORER', title: '驾驶员档案', description: '我是苏笔辉。做过电商运营，现在关注客服场景中的 AI 应用，也在持续学习如何把业务问题变成可执行的方案。', links: [ ['about.html', '认识 BeeDog', '我的经历、能力与兴趣'], ['now.html', '此刻在做什么', '当下的工作与探索方向'], ['contact.html', '建立联系', '聊聊 AI 应用、项目，或一个新想法'] ] }
  };
  const dialog = document.getElementById('zone-dialog');
  const safeRead = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const safeWrite = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  const savedVisits = safeRead('beedog_world_visited', []);
  const visited = new Set(Array.isArray(savedVisits) ? savedVisits.filter(k => k in zones) : []);
  function renderProgress() {
    document.getElementById('explored-count').textContent = visited.size;
    document.querySelectorAll('.progress-ticks i').forEach((tick, i) => tick.classList.toggle('visited', i < visited.size));
    document.querySelectorAll('.destination').forEach(el => el.classList.toggle('visited', visited.has(el.dataset.zone)));
  }
  let previousFocus;
  function openZone(key) {
    const zone = zones[key];
    if (!zone) return;
    document.getElementById('zone-code').textContent = zone.code;
    document.getElementById('zone-eyebrow').textContent = zone.eyebrow;
    document.getElementById('zone-title').textContent = zone.title;
    document.getElementById('zone-description').textContent = zone.description;
    const links = document.getElementById('zone-links');
    links.replaceChildren();
    zone.links.forEach(([href, title, description], index) => {
      const a = document.createElement('a'); a.href = href;
      const num = document.createElement('span'); num.className = 'link-num'; num.textContent = String(index + 1).padStart(2, '0');
      const content = document.createElement('span');
      const heading = document.createElement('strong'); heading.textContent = title;
      const desc = document.createElement('small'); desc.textContent = description;
      const arrow = document.createElement('span'); arrow.className = 'link-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
      content.append(heading, desc); a.append(num, content, arrow); links.append(a);
    });
    if (!dialog.open) { previousFocus = document.activeElement; dialog.showModal(); }
    document.body.style.overflow = 'hidden';
    visited.add(key); safeWrite('beedog_world_visited', [...visited]); renderProgress();
  }
  document.querySelectorAll('[data-zone]').forEach(el => el.addEventListener('click', () => openZone(el.dataset.zone)));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const box = dialog.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; previousFocus?.focus(); });
  document.addEventListener('keydown', e => { if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.target.isContentEditable) return; const key = Object.keys(zones)[Number(e.key) - 1]; if (key) { e.preventDefault(); openZone(key); } });
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let manualMotion = safeRead('beedog_motion_off', null);
  let motionOff = manualMotion === true || reduceMotion.matches;
  const motionButton = document.getElementById('motion-toggle');
  const universe = document.getElementById('universe');
  function renderMotion() { document.body.classList.toggle('motion-off', motionOff); motionButton.setAttribute('aria-pressed', String(motionOff)); document.getElementById('motion-label').textContent = motionOff ? '关闭' : '开启'; if (motionOff) { universe.style.removeProperty('--mx'); universe.style.removeProperty('--my'); } }
  motionButton.addEventListener('click', () => { manualMotion = !motionOff; motionOff = manualMotion; safeWrite('beedog_motion_off', manualMotion); renderMotion(); });
  reduceMotion.addEventListener('change', () => { motionOff = reduceMotion.matches || manualMotion === true; renderMotion(); });
  universe.addEventListener('pointermove', e => { if (motionOff || e.pointerType === 'touch' || dialog.open) return; universe.style.setProperty('--mx', `${(e.clientX / innerWidth - .5) * 12}px`); universe.style.setProperty('--my', `${(e.clientY / innerHeight - .5) * 8}px`); }, { passive: true });
  renderProgress(); renderMotion();
})();
