async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const res = await fetch('https://rsegoslplitkkrbarlxc.supabase.co/rest/v1/authdata?username=eq.' + username + '&password=eq.' + password, {
    headers: {
      apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }
  });

  const data = await res.json();
  if (data.length > 0) {
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid login!');
  }
}