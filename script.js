import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://rsegoslplitkkrbarlxc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ Signup Function (for signup.html)
window.handleSignup = async function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const { data, error } = await supabase
    .from("authdata")
    .insert([{ username, password }]);

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful! You can now log in.");
    window.location.href = "index.html";
  }
};

// ✅ Login Function (triggered by event listener)
async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

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

// ✅ Attach login event listener if login page is open
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", handleLogin);
}

// ✅ Dashboard: Load file links
async function loadFiles() {
  const fileList = document.getElementById("file-list");
  if (!fileList) return;

  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to load files:", error.message);
    return;
  }

  data.forEach((file) => {
    const linkElem = document.createElement("a");
    linkElem.href = file.link;
    linkElem.textContent = `📄 ${file.title}`;
    linkElem.className = "block tex
