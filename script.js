// ✅ Full working login + file loading script

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://rsegoslplitkkrbarlxc.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

//
// 🔐 SIGNUP
//
async function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  const { data, error } = await supabase.from("authdata").insert([
    { username, password },
  ]);

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Signup successful!");
    window.location.href = "index.html";
  }
}

//
// 🔓 LOGIN
//
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
    alert("Invalid username or password");
  } else {
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  }
}

//
// 📂 DASHBOARD: Load Files
//
async function loadFiles() {
  const username = localStorage.getItem("loggedInUser");

  if (!username) {
    document.body.innerHTML =
      "<p class='text-center text-red-600 font-bold mt-10'>You must log in first.</p>";
    return;
  }

  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to load files:", error);
    return;
  }

  const fileList = document.getElementById("file-list");
  if (!fileList) return;

  fileList.innerHTML = "";

  data.forEach((file) => {
    const link = document.createElement("a");
    link.href = file.link;
    link.textContent = `📄 ${file.title}`;
    link.className = "block text-blue-600 underline hover:text-blue-800";
    link.target = "_blank";
    fileList.appendChild(link);
  });
}

if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}
