export function initLoginModal() {
  const loginBtn = document.querySelector('.login-btn');
  const modal = document.getElementById('loginModal');
  const backdrop = document.querySelector('.modal-backdrop');
  const closeBtns = document.querySelectorAll('.close-modal');

  if (!modal || !loginBtn) return;

  loginBtn.addEventListener('click', () => {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('show', 'show-registration');
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      modal.classList.remove('show', 'show-registration');
    });
  }
}