export function initRegForm() {
  // === DOM ELEMENTS ===
  const modal = document.getElementById('loginModal');
  const regForm = document.getElementById('registrationForm');
  const triggerRegister = document.getElementById('triggerRegister');
  const triggerLogin = document.getElementById('triggerLogin');
  const closeRegisterBtn = document.querySelector('.close-register-btn');
  const loginBtn = document.querySelector('#emailPanel .submit-btn');

  // === CONFIGURATION ===
  const API_BASE = 'http://127.0.0.1:8000/api/auth';

  // === COOKIE HELPER ===
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  // === MODAL TOGGLE VIEWS ===
  if (triggerRegister) {
    triggerRegister.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show-registration');
    });
  }
  if (triggerLogin) {
    triggerLogin.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('show-registration');
    });
  }
  if (closeRegisterBtn) {
    closeRegisterBtn.addEventListener('click', () => {
      modal.classList.remove('show-registration');
    });
  }

  // === USER LOGIN PROCESS ===
  if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.getElementById('emailInput').value.trim();
      const password = document.getElementById('passInput').value;

      if (!email || !password) {
        alert('Email and password are required');
        return;
      }

      loginBtn.disabled = true;
      loginBtn.textContent = 'Signing in...';

      try {
        const res = await fetch(`${API_BASE}/login/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
          },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            alert(`✅ Welcome back, ${data.full_name}!`);
  
            // 1. Update the button to say "Profile" and swap its click behavior
            updateLoginUI(true, data.full_name);
            
            // 2. Clear all possible visibility classes from the modal container
            if (modal) {
              modal.classList.remove('show', 'show-registration', 'active', 'open');
              // Optional fallback: If your CSS uses display property instead of classes
              modal.style.display = 'none'; 
  }
        } else {
          alert(`❌ ${data.error || 'Login failed'}`);
        }
      } catch (err) {
        alert('❌ Cannot connect to server');
      } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign in';
      }
    });
  }

  // === USER REGISTRATION PROCESS ===
  if (regForm) {
    regForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        name: document.getElementById('regName').value.trim(),
        gender: document.getElementById('regGender').value,
        occupation: document.getElementById('regOccupation').value,
        experience: document.getElementById('regExp').value,
        dob: document.getElementById('regDob').value,
        country_code: document.getElementById('regCountryCode').value,
        phone: document.getElementById('regPhone').value.trim(),
        country: document.getElementById('regCountry').value,
        state: document.getElementById('regState').value,
        zip: document.getElementById('regZip').value.trim(),
        email: document.getElementById('regEmail').value.trim(), 
        password: document.getElementById('regPassword').value
      };

      const submitBtn = regForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account...';

      try {
        const res = await fetch(`${API_BASE}/register/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
          alert('✅ Registration successful! You can now login.');
          modal.classList.remove('show-registration');
          regForm.reset();
        } else {
          alert(`❌ ${data.error || 'Registration failed'}`);
        }
      } catch (err) {
        alert('❌ Server connection error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  // ==========================================
  // UI HELPER FUNCTIONS & INTERACTION LOGIC
  // ==========================================

  function updateLoginUI(isLoggedIn, fullName = '') {
    const mainNavBtn = document.querySelector('.login-btn');
    if (!mainNavBtn) return;

    if (isLoggedIn) {
      mainNavBtn.textContent = 'Profile';
      mainNavBtn.classList.add('profile-btn');
      
      // Overwrite click to safely handle profile state only
      mainNavBtn.onclick = function(e) {
        e.preventDefault();
        toggleProfileDropdown(e);
      };
    } else {
      mainNavBtn.textContent = 'Login';
      mainNavBtn.classList.remove('profile-btn');
      
      // Restore click path back to login form behavior when logged out
      mainNavBtn.onclick = function(e) {
        e.preventDefault();
        if (modal) modal.classList.add('show');
      };
    }
  }

  // Create Profile Dropdown
  function createProfileDropdown() {
    let dropdown = document.getElementById('profileDropdown');
    if (dropdown) return dropdown;

    dropdown = document.createElement('div');
    dropdown.id = 'profileDropdown';
    dropdown.className = 'profile-dropdown';
    dropdown.innerHTML = `
      <a href="#" class="dropdown-item">👤 View Profile</a>
      <a href="#" class="dropdown-item">⚙️ Control Panel</a>
      <a href="#" class="dropdown-item">❤️ Wish Lists</a>
      <a href="#" class="dropdown-item">🛒 Your Shopping Cart</a>
      <hr>
      <a href="#" id="signout-btn" class="dropdown-item">🚪 Sign Out</a>
    `;

    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
      navActions.appendChild(dropdown);
    }
    return dropdown;
  }

  function toggleProfileDropdown(e) {
    const dropdown = createProfileDropdown();
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }

  // Global Outside Click Detector (Close Dropdown & Sign Out Action)
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('profileDropdown');
    
    // Auto-close if user clicks outside of dropdown container and toggle button
    if (dropdown && !e.target.closest('.profile-btn') && !e.target.closest('#profileDropdown')) {
      dropdown.style.display = 'none';
    }

    // Capture Sign Out click event
    if (e.target.id === 'signout-btn') {
      e.preventDefault();
      updateLoginUI(false);
      alert('👋 You have been signed out successfully.');
      if (dropdown) dropdown.style.display = 'none';
    }
  });
}