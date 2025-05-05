// Common DOM elements
const messageEl = document.getElementById('message');
const logoutBtn = document.getElementById('logout');

// Handle login form
if (document.getElementById('loginForm')) {
  const form = document.getElementById('loginForm');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        showMessage(data.message || 'Login successful', 'success');
        setTimeout(() => window.location.href = '/', 1500);
      } else {
        showMessage(data.error || 'Login failed', 'error');
      }
    } catch (error) {
      showMessage('Network error. Please try again.', 'error');
      console.error('Login error:', error);
    }
  });
}

// Handle signup form (similar to login)

// Check auth status on home page
if (messageEl) {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  
  if (token && username) {
    messageEl.textContent = `Welcome back, ${username}!`;
    messageEl.style.color = 'green';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    
    // Verify token with backend
    verifyToken(token);
  }
}

// Logout functionality
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  });
}

// Helper functions
function showMessage(text, type) {
  if (!messageEl) return;
  
  messageEl.textContent = text;
  messageEl.style.color = type === 'error' ? 'red' : 'green';
}

async function verifyToken(token) {
  try {
    const response = await fetch('/api/user', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      throw new Error('Token verification failed');
    }
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  }
}