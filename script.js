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
    const card = document.createElement("a");
    card.href = file.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className =
      "bg-gray-800 rounded-lg p-5 shadow-md hover:shadow-lg transition flex flex-col justify-between";

    // Title
    const title = document.createElement("h3");
    title.textContent = file.title;
    title.className = "text-white text-lg font-semibold mb-2 truncate";

    // Link icon & subtitle
    const linkInfo = document.createElement("div");
    linkInfo.className = "flex items-center text-blue-400 hover:text-blue-600 font-medium";

    // External link icon SVG (small)
    const linkIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    linkIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    linkIcon.setAttribute("fill", "none");
    linkIcon.setAttribute("viewBox", "0 0 24 24");
    linkIcon.setAttribute("stroke", "currentColor");
    linkIcon.setAttribute("class", "w-5 h-5 mr-2");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "stroke-linecap",
      "round"
    );
    path.setAttribute(
      "stroke-linejoin",
      "round"
    );
    path.setAttribute(
      "stroke-width",
      "2"
    );
    path.setAttribute(
      "d",
      "M13.828 9l3.182-3.182a1 1 0 00-1.415-1.415L12.414 7.586m-2.121 2.121L7.586 12.414a1 1 0 001.415 1.415L11 13.828"
    );

    linkIcon.appendChild(path);
    linkInfo.appendChild(linkIcon);

    const linkText = document.createElement("span");
    linkText.textContent = "Open Note";
    linkInfo.appendChild(linkText);

    card.appendChild(title);
    card.appendChild(linkInfo);

    fileList.appendChild(card);
  });
}
