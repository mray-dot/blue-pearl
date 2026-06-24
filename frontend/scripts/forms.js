/**
 * Forms Module
 * Handles form submission events
 */

export function initFormHandlers() {
  // Create Webinar Form
  const createWebinarForm = document.getElementById('createWebinar');
  if (createWebinarForm) {
    createWebinarForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Webinar saved (demo).');
    });
  }

  // Register Form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thanks — registration received (demo).');
    });
  }
}
