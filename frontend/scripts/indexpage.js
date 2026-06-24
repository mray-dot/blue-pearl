/**
 * DEPRECATED - This file has been refactored into modular components
 * 
 * The functionality from this file has been organized into separate modules:
 * - modal.js → Login modal and tab switching
 * - navigation.js → Sticky navigation on scroll
 * - animations.js → Reveal on scroll animations
 * - forms.js → Form submission handlers
 * 
 * Use: <script type="module" src="../scripts/main.js"></script> in HTML pages
 * 
 * Original code below is kept for reference only. DO NOT USE.
 */

const loginBtn = document.querySelector('.login-btn');
      const loginModal = document.getElementById('loginModal');
      const closeModal = document.querySelector('.close-modal');
      const tabs = document.querySelectorAll('.login-tab');
      const panels = document.querySelectorAll('.tab-panel');
      const backdrop = document.querySelector('.modal-backdrop');

      function openLogin() {
        loginModal.classList.add('show');
        loginModal.setAttribute('aria-hidden', 'false');
      }

      function closeLogin() {
        loginModal.classList.remove('show');
        loginModal.setAttribute('aria-hidden', 'true');
      }

      function switchTab(targetId) {
        tabs.forEach(tab => {
          const isActive = tab.dataset.target === targetId;
          tab.classList.toggle('active', isActive);
          tab.setAttribute('aria-selected', String(isActive));
        });
        panels.forEach(panel => {
          const isTarget = panel.id === targetId;
          panel.classList.toggle('active', isTarget);
          panel.setAttribute('aria-hidden', String(!isTarget));
        });
      }

      loginBtn.addEventListener('click', openLogin);
      closeModal.addEventListener('click', closeLogin);
      backdrop.addEventListener('click', closeLogin);
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && loginModal.classList.contains('show')) {
          closeLogin();
        }
      });

      tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.target));
      });

      // Sticky nav
      const nav = document.querySelector('.site-nav');
      const heroEl = document.getElementById('hero');
      if (nav && heroEl) {
        const navObserver = new IntersectionObserver(entries => {
          entries.forEach(e => nav.classList.toggle('scrolled', !e.isIntersecting));
        });
        navObserver.observe(heroEl);
      }

      // Reveal on scroll
      const reveals = document.querySelectorAll('.reveal');
      const ro = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, {threshold: 0.12});
      reveals.forEach(r => ro.observe(r));

      // Simple webinar handlers (demo only)
      document.getElementById('createWebinar')?.addEventListener('submit', e => {
        e.preventDefault();
        alert('Webinar saved (demo).');
      });
      document.getElementById('registerForm')?.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thanks — registration received (demo).');
      });