(() => {
  'use strict';
  const videos = {
    conveyor: { title: '传送带抓取', description: '动态场景中的抓取与放置 · 实验演示' },
    objects: { title: '多物体抓取', description: '不同物体的抓取与放置 · PiperX 双臂' },
    cups: { title: '双臂叠杯', description: 'PI0.5 · 双臂协同操作' },
    cloth: { title: '衣物折叠', description: '柔性物体操作 · 实验演示' }
  };
  const hero = document.getElementById('hero-video');
  const toggle = document.getElementById('preview-toggle');
  const dialog = document.getElementById('video-dialog');
  const player = document.getElementById('demo-player');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let heroVisible = false;
  let lastTrigger = null;

  function loadPreview() {
    const source = hero.querySelector('source');
    if (!source.getAttribute('src')) {
      source.src = source.dataset.src;
      hero.load();
    }
  }
  function updatePreviewButton() {
    const playing = !hero.paused;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? '暂停片段预览' : '播放片段预览');
    toggle.firstElementChild.textContent = playing ? 'Ⅱ' : '▶';
    toggle.lastElementChild.textContent = playing ? '暂停预览' : '播放预览';
  }
  function syncPreview() {
    if (heroVisible && !userPaused && !reducedMotion.matches && !dialog.open && !document.hidden) {
      loadPreview();
      hero.play().catch(updatePreviewButton);
    } else {
      hero.pause();
    }
  }
  hero.addEventListener('play', updatePreviewButton);
  hero.addEventListener('pause', updatePreviewButton);
  hero.addEventListener('error', () => {
    toggle.lastElementChild.textContent = '预览暂不可用';
    toggle.disabled = true;
  });
  toggle.addEventListener('click', () => {
    if (hero.paused) {
      userPaused = false;
      loadPreview();
      hero.play().catch(updatePreviewButton);
    } else {
      userPaused = true;
      hero.pause();
    }
  });
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    syncPreview();
  }, { threshold: 0.15 }).observe(hero);
  document.addEventListener('visibilitychange', syncPreview);
  reducedMotion.addEventListener('change', syncPreview);

  document.querySelectorAll('[data-video]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.video;
      const video = videos[key];
      if (!video) return;
      lastTrigger = button;
      hero.pause();
      document.getElementById('video-title').textContent = video.title;
      document.getElementById('video-description').textContent = video.description;
      player.setAttribute('aria-label', video.title + '演示视频');
      player.poster = './images/' + key + '.webp';
      player.src = './videos/' + key + '.mp4';
      dialog.showModal();
      document.body.classList.add('modal-open');
      player.play().catch(() => {});
    });
  });
  document.getElementById('close-video').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    player.pause();
    player.removeAttribute('src');
    player.load();
    document.body.classList.remove('modal-open');
    lastTrigger?.focus({ preventScroll: true });
    syncPreview();
  });
  player.addEventListener('error', () => {
    document.getElementById('video-description').textContent = '视频暂时无法加载，请稍后重试。';
  });
  const links = [...document.querySelectorAll('.site-nav a')];
  const navObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) links.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  ['home', 'demos', 'projects', 'about'].forEach(id => navObserver.observe(document.getElementById(id)));
})();
