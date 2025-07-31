import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

// Redirect if not logged in
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

async function loadFiles() {
  const wrapper = document.getElementById("folder-list");
  wrapper.innerHTML = `<div class="text-center text-gray-400">Loading...</div>`;

  const { data, error } = await supabase
    .from("filelinks")
    .select("title, link, folder")
    .order("id", { ascending: false });

  if (error || !data) {
    wrapper.innerHTML = `<div class="text-red-500 text-center mt-4">Failed to load. Please try later.</div>`;
    console.error("Supabase error:", error);
    return;
  }

  // Group by folder
  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.folder]) grouped[item.folder] = [];
    grouped[item.folder].push(item);
  });

  // Render folders
  wrapper.innerHTML = Object.entries(grouped).map(([folder, items]) => `
    <div class="bg-white rounded-lg shadow p-4 mb-4">
      <h2 class="text-lg font-semibold mb-2 text-indigo-600">${folder}</h2>
      <ul class="list-disc list-inside space-y-1">
        ${items.map(file => `
          <li><a href="${file.link}" target="_blank" class="text-blue-600 hover:underline">${file.title}</a></li>
        `).join("")}
      </ul>
    </div>
  `).join("");
}

// Run on load
document.addEventListener("DOMContentLoaded", loadFiles);

// Search functionality
document.getElementById("searchInput").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const folders = document.querySelectorAll("#folder-list > div");
  folders.forEach(folder => {
    const text = folder.textContent.toLowerCase();
    folder.style.display = text.includes(term) ? "block" : "none";
  });
});
