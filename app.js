(() => {
  'use strict';
  document.querySelectorAll('video').forEach(player => {
    player.addEventListener('play', () => {
      document.querySelectorAll('video').forEach(other => {
        if (other !== player && !other.paused) other.pause();
      });
    });
  });
  const video = document.getElementById('grasp-video');
  const caption = document.getElementById('video-caption');
  const videos = {
    grid: { title: 'xArm7 与 XHand1 并行仿真抓取演示', caption: '100 个并行环境的 GUI 回放：791/1000 次成功；与下方固定评估记录分别统计。' },
    reference: { title: '固定参考轨迹自由接触回放', caption: '固定参考轨迹回放，未启用策略编辑；物体由接触动力学自由演化。' },
    hammer: { title: 'xArm7 与 XHand1 锤子抓取演示', caption: '锤子示例 · train-175 条目 · 此次可视化评估 5/10 次成功，录像保留连续试验。' },
    toothbrush: { title: 'xArm7 与 XHand1 未见牙刷抓取演示', caption: '未见牙刷示例 · unseen-100 条目 · 此次可视化评估 8/10 次成功。' }
  };
  document.querySelectorAll('[data-video]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.video;
      if (!videos[key] || button.getAttribute('aria-pressed') === 'true') return;
      const wasPlaying = !video.paused;
      video.pause();
      video.poster = `assets/grasp-${key}.jpg`;
      video.querySelector('source').src = `assets/grasp-${key}.mp4`;
      video.setAttribute('aria-label', videos[key].title);
      video.load();
      caption.textContent = videos[key].caption;
      document.querySelectorAll('[data-video]').forEach(tab => {
        const active = tab === button;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-pressed', String(active));
      });
      if (wasPlaying) video.play().catch(() => {});
    });
  });
  const copyButton = document.getElementById('copy-email');
  const copyStatus = document.getElementById('copy-status');
  let resetStatus;
  copyButton.addEventListener('click', async () => {
    clearTimeout(resetStatus);
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText('j413182054@163.com');
      copyStatus.textContent = '邮箱已复制。';
    } catch {
      copyStatus.textContent = '邮箱：j413182054@163.com，可选择文字复制，或点击邮箱打开邮件应用。';
    }
    resetStatus = setTimeout(() => { copyStatus.textContent = ''; }, 7000);
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
