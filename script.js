/* import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

// 🔐 Login handler
async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("login-username")?.value.trim();
  const password = document.getElementById("login-password")?.value.trim();

  if (!username || !password) {
    alert("Please fill in both login fields.");
    return;
  }

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

// 📝 Signup handler
async function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById("signup-username")?.value.trim();
  const password = document.getElementById("signup-password")?.value.trim();

  if (!username || !password) {
    alert("Please fill in both signup fields.");
    return;
  }

  const { error } = await supabase.from("authdata").insert([{ username, password }]);

  if (error) {
    console.error(error);
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful!");
    window.location.href = "index.html";
  }
}

// 🔄 Attach handlers
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("loginBtn")?.addEventListener("click", handleLogin);
  document.getElementById("signupBtn")?.addEventListener("click", handleSignup);
});

// 🚫 Protect dashboard
if (
  window.location.pathname.includes("dashboard.html") &&
  !localStorage.getItem("loggedInUser")
) {
  window.location.href = "index.html";
}

// 🔓 Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

// 📁 Load files to dashboard
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
    linkElem.className = "block text-blue-600 underline hover:text-blue-800 mb-2";
    linkElem.target = "_blank";
    fileList.appendChild(linkElem);
  });
}
/


if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}

*/

// script.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

async function handleSignup() {
  const username = document.getElementById("signup-username")?.value.trim();
  const password = document.getElementById("signup-password")?.value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const { error } = await supabase.from("authdata").insert([{ username, password }]);

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful! Please log in.");
    window.location.reload();
  }
}

async function handleLogin() {
  const username = document.getElementById("login-username")?.value.trim();
  const password = document.getElementById("login-password")?.value.trim();

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const { data, error } = await supabase
    .from("authdata")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  if (error || !data || data.length === 0) {
    alert("Login failed: invalid credentials.");
  } else {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  }
}

// Attach event listeners
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signupBtn")?.addEventListener("click", handleSignup);
  document.getElementById("loginBtn")?.addEventListener("click", handleLogin);
});
