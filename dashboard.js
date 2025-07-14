// dashboard.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

// 🔐 Redirect if not logged in
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

// 🚪 Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

// 📁 Load notes dynamically
async function loadFiles() {
  const container = document.getElementById("file-list");
  if (!container) return;
  container.innerHTML = "";

  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error loading files:", error.message);
    container.innerHTML = `<p class='text-red-500'>Failed to load notes. Try again later.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = `<p class='text-gray-400 col-span-full text-center'>No notes uploaded yet. Please check back later.</p>`;
    return;
  }

  data.forEach((file) => {
    const card = document.createElement("a");
    card.href = file.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className =
      "bg-gray-800 p-6 rounded-xl shadow hover:shadow-2xl transition-colors hover:bg-gray-700 flex flex-col justify-between";

    const title = document.createElement("h3");
    title.textContent = file.title;
    title.className = "text-white font-semibold text-lg mb-4 truncate";

    const footer = document.createElement("div");
    footer.className = "text-blue-400 font-medium flex items-center";

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("fill", "none");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("stroke", "currentColor");
    icon.classList.add("w-5", "h-5", "mr-2");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "M14 3h7v7m0 0L10 21l-7-7 11-11z");
    icon.appendChild(path);

    footer.appendChild(icon);
    footer.appendChild(document.createTextNode("Open Note"));

    card.appendChild(title);
    card.appendChild(footer);

    container.appendChild(card);
  });
}

// 🚀 Load on page ready
window.addEventListener("DOMContentLoaded", loadFiles);
