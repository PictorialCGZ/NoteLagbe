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

  fileList.innerHTML = "";

  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to load files:", error.message);
    fileList.innerHTML = `<p class="text-red-500">Failed to load notes. Please try again later.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    fileList.innerHTML = `<p class="text-gray-400 col-span-full text-center">No notes available yet. Check back soon!</p>`;
    return;
  }

  data.forEach((file) => {
    const card = document.createElement("a");
    card.href = file.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className =
      "bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition focus:ring-2 ring-blue-500";

    const title = document.createElement("h3");
    title.textContent = file.title;
    title.className = "text-white text-xl font-semibold mb-2 break-words";

    const linkText = document.createElement("p");
    linkText.textContent = "📄 Open Note";
    linkText.className = "text-blue-400";

    card.appendChild(title);
    card.appendChild(linkText);
    fileList.appendChild(card);
  });
}

// ✅ Auto-run if on dashboard
if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}
