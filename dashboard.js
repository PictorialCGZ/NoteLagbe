import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplittkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

async function loadFiles() {
  const wrapper = document.getElementById("folder-list");
  const searchInput = document.getElementById("searchInput");
  wrapper.innerHTML = `<div class="text-gray-500 text-center mt-6">Loading...</div>`;

  const { data, error } = await supabase
    .from("filelinks")
    .select("id, title, link, folder")
    .order("id", { ascending: false });

  console.log("Supabase fetch:", { data, error });

  if (error || !data) {
    const msg = error?.message || "No data returned";
    wrapper.innerHTML = `
      <div class="text-red-500 text-center mt-6">
        Failed to load file list. <br>
        <small>${msg}</small>
      </div>`;
    return;
  }

  window.filesData = data;
  render(data);
  if (searchInput) searchInput.addEventListener("input", e => render(filter(e.target.value)));
}

function render(items) {
  const grouped = items.reduce((acc, f) => {
    acc[f.folder] = acc[f.folder] || [];
    acc[f.folder].push(f);
    return acc;
  }, {});
  const html = Object.entries(grouped).map(([folder, list]) => `
    <div class="bg-white p-4 rounded shadow-md">
      <h3 class="text-indigo-700 font-medium mb-2">${folder}</h3>
      ${list.map(f => `<a href="${f.link}" target="_blank" class="block text-blue-600 hover:underline">${f.title}</a>`).join("")}
    </div>
  `).join("");
  document.getElementById("folder-list").innerHTML = html;
}

function filter(term) {
  return window.filesData.filter(f =>
    f.title.toLowerCase().includes(term.toLowerCase()) ||
    f.folder.toLowerCase().includes(term.toLowerCase())
  );
}

document.addEventListener("DOMContentLoaded", loadFiles);
