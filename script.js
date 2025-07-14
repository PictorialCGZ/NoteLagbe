// ✅ Updated Supabase credentials and login/signup logic

const SUPABASE_URL = "https://rsegoslplitkkrbarlxc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Signup logic
async function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const { data, error } = await client.from("authdata").insert([
    { username, password }
  ]);

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful!");
    window.location.href = "index.html";
  }
}

// Login logic
async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const { data, error } = await client
    .from("authdata")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  if (error || !data || data.length === 0) {
    alert("Invalid username or password");
  } else {
    window.location.href = "dashboard.html";
  }
}
