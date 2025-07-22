import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

async function loadFiles() {
  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    document.getElementById("folder-list").innerHTML = `<p class='text-red-500'>Failed to load.</p>`;
    return;
  }

  const grouped = {};
  data.forEach((file) => {
    if (!grouped[file.folder]) grouped[file.folder] = [];
    grouped[file.folder].push(file);
  });

  const wrapper = document.getElementById("folder-list");
  wrapper.innerHTML = "";

  for (const folder in grouped) {
    const section = document.createElement("section");
    section.innerHTML = `
      <details class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden" open>
        <summary class="cursor-pointer p-4 text-lg font-bold bg-gray-800">📁 ${folder}</summary>
        <div class="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          ${grouped[folder].map(file => `
            <a href="${file.link}" target="_blank" class="block bg-gray-800 rounded-xl p-4 shadow hover:shadow-lg transition">
              <h3 class="text-white text-md font-semibold mb-2">📄 ${file.title}</h3>
              <p class="text-blue-400">Open Note</p>
            </a>
          `).join("")}
        </div>
      </details>
    `;
    wrapper.appendChild(section);
  }
}

if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
} 
