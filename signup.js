async function signup() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const res = await fetch('https://rsegoslplitkkrbarlxc.supabase.co/rest/v1/authdata', {
    method: 'POST',
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert('Signup successful! Redirecting to login...');
    window.location.href = 'index.html';
  } else {
    alert('Signup failed!');
  }
}