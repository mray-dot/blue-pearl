/**
 * Blue Pearl Custom Video Player Module
 */
export function initVideoPlayer() {
  const container = document.querySelector('.video-container');
  if (!container) return; // Defensive check to avoid null runtime errors

  const video = container.querySelector('.main-video');
  const playBtn = container.querySelector('.play-btn');
  const stopBtn = container.querySelector('.stop-btn');
  const volumeBtn = container.querySelector('.volume-btn');
  const volumeSlider = container.querySelector('.volume-slider');

  // Verify all essential controls exist before attaching listeners
  if (!video || !playBtn || !stopBtn || !volumeBtn || !volumeSlider) return;

  // Toggle Play / Pause
  function togglePlay() {
    if (video.paused) {
      video.play();
      playBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'; // Changes icon to Pause
      playBtn.setAttribute('title', 'Pause');
    } else {
      video.pause();
      playBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'; // Changes icon back to Play
      playBtn.setAttribute('title', 'Play');
    }
  }

  playBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay); // Allows clicking directly on the video to play/pause

  // Stop Video
  stopBtn.addEventListener('click', () => {
    video.pause();
    video.currentTime = 0; // Rewind to the beginning
    playBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    playBtn.setAttribute('title', 'Play');
  });

  // Volume Slider Control
  volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    video.muted = (e.target.value == 0);
    updateVolumeIcon();
  });

  // Mute / Unmute Button Click
  volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    volumeSlider.value = video.muted ? 0 : video.volume;
    updateVolumeIcon();
  });

  function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
      volumeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'; // Mute icon
    } else {
      volumeBtn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>'; // Active volume icon
    }
  }
}