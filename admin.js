/* import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const link = document.getElementById("link").value.trim();

  if (!title || !link) {
    alert("Please enter both title and link.");
    return;
  }

  const { error } = await supabase.from("filelinks").insert([{ title, link }]);

  if (error) {
    alert("Upload failed: " + error.message);
  } else {
    alert("Note uploaded successfully!");
    document.getElementById("title").value = "";
    document.getElementById("link").value = "";
  }
});
*/

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

// ---------- Upload new file ----------
async function handleUpload(e) {
  e.preventDefault();
  const title = document.getElementById("file-title").value.trim();
  const link  = document.getElementById("file-link").value.trim();
  if (!title || !link) return alert("Both fields are required.");

  const { error } = await supabase.from("filelinks").insert([{ title, link }]);
  if (error) {
    alert("Upload failed: " + error.message);
  } else {
    e.target.reset();
    loadFiles();            // refresh list
    alert("File uploaded!");
  }
}

// ---------- Delete a file ----------
async function deleteFile(id) {
  if (!confirm("Delete this file permanently?")) return;
  const { error } = await supabase.from("filelinks").delete().eq("id", id);
  if (error) {
    alert("Delete failed: " + error.message);
  } else {
    loadFiles();            // refresh list
  }
}
window.deleteFile = deleteFile;   // expose to onclick

// ---------- Render file list ----------
async function loadFiles() {
  const wrap = document.getElementById("file-list");
  wrap.innerHTML = "";            // clear existing
  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) return console.error(error.message);

  data.forEach(({ id, title, link }) => {
    const card = document.createElement("div");
    card.className =
      "bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-xl p-5 flex flex-col justify-between";
    card.innerHTML = `
      <a href="${link}" target="_blank" class="text-blue-400 font-medium underline truncate mb-4">
        📄 ${title}
      </a>
      <button onclick="deleteFile(${id})"
              class="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded transition">
        Delete
      </button>
    `;
    wrap.appendChild(card);
  });
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("upload-form").addEventListener("submit", handleUpload);
  loadFiles();
});

// ---------- Shared logout ----------
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;
