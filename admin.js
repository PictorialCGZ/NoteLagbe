// ✅ admin.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("upload-form").addEventListener("submit", handleUpload);
  loadFiles();
});

async function handleUpload(e) {
  e.preventDefault();
  const title = document.getElementById("file-title").value.trim();
  const link = document.getElementById("file-link").value.trim();
  const folder = document.getElementById("file-folder").value.trim();
  if (!title || !link || !folder) return alert("All fields are required.");

  const { error } = await supabase.from("filelinks").insert([{ title, link, folder }]);
  if (error) return alert("Upload failed: " + error.message);
  e.target.reset();
  loadFiles();
  alert("Note uploaded!");
}

async function deleteFile(id) {
  if (!confirm("Delete this note?")) return;
  const { error } = await supabase.from("filelinks").delete().eq("id", id);
  if (error) alert("Delete failed: " + error.message);
  else loadFiles();
}
window.deleteFile = deleteFile;

async function loadFiles() {
  const wrap = document.getElementById("file-list");
  wrap.innerHTML = "";
  const { data, error } = await supabase.from("filelinks").select("*").order("id", { ascending: false });
  if (error) return console.error(error.message);

  data.forEach(({ id, title, link, folder }) => {
    const div = document.createElement("div");
    div.className = "bg-gray-800 border border-gray-700 rounded-xl p-4";
    div.innerHTML = `
      <p class="text-sm text-gray-400 mb-1">📁 ${folder}</p>
      <a href="${link}" target="_blank" class="text-blue-400 font-semibold block mb-3 truncate">📄 ${title}</a>
      <button onclick="deleteFile(${id})" class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm">Delete</button>
    `;
    wrap.appendChild(div);
  });
}
