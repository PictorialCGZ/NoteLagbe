// ✅ dashboard.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

// 🔐 Redirect if not logged in
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

// 🔓 Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

// 📁 Load files to dashboard
async function loadFiles() {
  const fileList = document.getElementById("file-list");
  if (!fileList) return;

  fileList.innerHTML = ""; // Clear existing content

  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to load files:", error.message);
    fileList.innerHTML = `<p class="text-red-500 font-medium text-center col-span-full">Oops! Failed to load your notes. Please check your connection or try again later.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    fileList.innerHTML = `<p class="text-gray-400 font-medium text-lg text-center col-span-full py-10">
                            Looks like there are no notes here yet! We're constantly adding new resources, so check back soon!
                          </p>`;
    return;
  }

  data.forEach((file) => {
    const card = document.createElement("a");
    card.href = file.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className =
      "bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-xl border border-gray-700 transition-all duration-300 card-hover-effect focus:ring-4 focus:ring-purple-500 focus:ring-opacity-60 outline-none block relative group overflow-hidden"; // Added group and overflow-hidden

    // Inner glowing border effect on hover
    const hoverBorder = document.createElement('div');
    hoverBorder.className = 'absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-600 transition-all duration-300 pointer-events-none';

    const title = document.createElement("h3");
    title.textContent = file.title;
    title.className = "text-white text-xl font-bold mb-3 truncate group-hover:text-purple-300 transition-colors duration-300 leading-tight";

    const linkText = document.createElement("p");
    linkText.className = "text-blue-400 flex items-center group-hover:text-blue-300 transition-colors duration-300";
    linkText.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500 group-hover:text-blue-300 transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
      </svg>
      Open Note
    `;

    card.appendChild(hoverBorder); // Add the hover border div
    card.appendChild(title);
    card.appendChild(linkText);
    fileList.appendChild(card);
  });
}

// ✅ Auto-run if on dashboard
if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}
