// script.js

// Temporary form behavior (will replace with Supabase later)
document.getElementById('signup-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  alert(`Signing up with:\nEmail/Phone: ${email}\nPassword: ${password}`);
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  alert(`Logging in with:\nEmail/Phone: ${email}\nPassword: ${password}`);
});
