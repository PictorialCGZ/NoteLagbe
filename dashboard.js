// ✅ dashboard.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

// Redirect if not logged in
if (!localStorage.getItem("loggedInUser")) window.location.href = "index.html";

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

let filesData = [];

async function loadFiles() {
  const wrapper = document.getElementById("folder-list");
  wrapper.innerHTML = `<div class="text-center text-gray-400">Loading...</div>`;

  const { data, error } = await supabase
    .from("files") // ✅ Correct table
    .select("*")
    .order("created_at", { ascending: false }); // ✅ Use created_at for ordering

  if (error) {
    wrapper.innerHTML = `<p class='text-red-500 text-center'>Failed to load. Please try later.</p>`;
    console.error(error);
    return;
  }

  filesData = data;
  renderFiles(data);
}

function renderFiles(data) {
  const grouped = {};
  data.forEach((file) => {
    if (!grouped[file.category]) grouped[file.category] = [];
    grouped[file.category].push(file);
  });

  const wrapper = document.getElementById("folder-list");
  wrapper.innerHTML = "";

  for (const folder in grouped) {
    const section = document.createElement("section");
    section.innerHTML = `
      <details class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden fade-in" open>
        <summary class="cursor-pointer p-4 text-lg font-bold bg-gray-800 hover:bg-gray-700 transition">📁 ${folder}</summary>
        <div class="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          ${grouped[folder].map(file => `
            <a href="${file.url}" target="_blank" class="block bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition card-hover">
              <h3 class="text-white text-md font-semibold mb-2 truncate">📄 ${file.title}</h3>
              <p class="text-blue-400">Open Note</p>
            </a>
          `).join("")}
        </div>
      </details>
    `;
    wrapper.appendChild(section);
  }
}

// Search filter
document.getElementById("searchBar").addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filtered = filesData.filter(file => file.title.toLowerCase().includes(searchText));
  renderFiles(filtered);
});

if (window.location.pathname.includes("dashboard.html")) loadFiles();
