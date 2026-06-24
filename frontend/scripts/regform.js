export function initRegForm() {
  const modal = document.getElementById('loginModal');
  const regForm = document.getElementById('registrationForm');
  const triggerRegister = document.getElementById('triggerRegister');
  const triggerLogin = document.getElementById('triggerLogin');
  const closeRegisterBtn = document.querySelector('.close-register-btn');

  const API_BASE = 'http://127.0.0.1:8000/api/auth';

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

  // Toggle views
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
    closeRegisterBtn.addEventListener('click', () => modal.classList.remove('show-registration'));
  }

  // LOGIN
  const loginBtn = document.querySelector('#emailPanel .submit-btn');
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
          modal.classList.remove('show', 'show-registration');
          // Optional: Change login button
          document.querySelector('.login-btn').textContent = 'Dashboard';
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

  // REGISTRATION
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
        // email: document.getElementById('emailInput').value.trim() || document.getElementById('regName').value + "@test.com", // fallback
        email: document.getElementById('regEmail').value.trim(), 
        // password: document.getElementById('passInput').value
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
}