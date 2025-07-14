// ✅ script.js — handles login, signup, file loading

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://rsegoslplitkkrbarlxc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ Signup Function
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

// ✅ Login Function
window.handleLogin = async function (event) {
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
    // ✅ Store login info (optional)
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  }
};

// ✅ Load Files in Dashboard
async function loadFiles() {
  const fileList = document.getElementById("file-list");
  if (!fileList) return; // Only run on dashboard.html

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

// ✅ Auto-load files if on dashboard.html
if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}


if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}
