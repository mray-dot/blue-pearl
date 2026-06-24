/**
 * Navigation Module
 * Handles sticky navigation and scroll behavior
 */

export function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const heroEl = document.getElementById('hero');
  
  if (nav && heroEl) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(e => nav.classList.toggle('scrolled', !e.isIntersecting));
    });
    navObserver.observe(heroEl);
  }
}
