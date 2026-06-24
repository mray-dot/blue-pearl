function bpPlaySelectedVideo(videoUrl, titleText, subtitleText) {
  const videoPlayer = document.getElementById('bpMasterVideoElement');
  const playIconSvg = document.getElementById('bpMasterPlayIcon');
  const textOverlay = document.getElementById('bpPlayerTextOverlay');
  const headerTop = document.getElementById('bpDynamicHeaderTop');
  const headerBottom = document.getElementById('bpDynamicHeaderBottom');

  if (!videoPlayer || !playIconSvg) return;

  if (headerTop) headerTop.innerText = titleText;
  if (headerBottom) headerBottom.innerHTML = subtitleText + ` <span class="bp-cyan-glow-text">Rs. 99</span>`;

  videoPlayer.src = videoUrl;
  textOverlay?.classList.add('bp-dimmed-hud');

  videoPlayer.play().then(() => {
    playIconSvg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
  }).catch(err => console.log('Auto playback engine hold:', err));
}

function bpToggleMasterPlayback() {
  const videoPlayer = document.getElementById('bpMasterVideoElement');
  const playIconSvg = document.getElementById('bpMasterPlayIcon');
  const textOverlay = document.getElementById('bpPlayerTextOverlay');

  if (!videoPlayer || !playIconSvg) return;

  if (videoPlayer.paused) {
    videoPlayer.play();
    playIconSvg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    textOverlay?.classList.add('bp-dimmed-hud');
  } else {
    videoPlayer.pause();
    playIconSvg.innerHTML = '<path d="M8 5v14l11-7z"/>';
    textOverlay?.classList.remove('bp-dimmed-hud');
  }
}

function initWebinarVideoHandlers() {
  const videoPlayer = document.getElementById('bpMasterVideoElement');
  const playIcon = document.getElementById('bpMasterPlayIcon');
  const overlay = document.getElementById('bpPlayerTextOverlay');

  if (!videoPlayer || !playIcon) return;

  videoPlayer.addEventListener('ended', () => {
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    overlay?.classList.remove('bp-dimmed-hud');
  });

  window.bpPlaySelectedVideo = bpPlaySelectedVideo;
  window.bpToggleMasterPlayback = bpToggleMasterPlayback;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWebinarVideoHandlers);
} else {
  initWebinarVideoHandlers();
}
