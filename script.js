import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

// ----- Login -----
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const { data, error } = await supabase
    .from("authdata")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  if (error || !data || data.length === 0) {
    alert("Invalid username or password.");
  } else {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  }
}

// ----- Signup -----
async function handleSignup(e) {
  e.preventDefault();

  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  const { error } = await supabase.from("authdata").insert([{ username, password }]);

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful!");
    window.location.href = "index.html";
  }
}

// Attach events
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginBtn")?.addEventListener("click", handleLogin);
  document.getElementById("signupBtn")?.addEventListener("click", handleSignup);
});
