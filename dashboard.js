import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase credentials
const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns"
);

// 🔒 Protect dashboard
if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

// 🔓 Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

// 📁 Load notes
async function loadFiles() {
  const fileList = document.getElementById("file-list");
  if (!fileList) return;

  fileList.innerHTML = "";

  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    fileList.innerHTML = `<p class="text-red-500 col-span-full">Failed to load notes. Try again later.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    fileList.innerHTML = `<p class="text-gray-400 col-span-full text-center">No notes uploaded yet. Check back soon!</p>`;
    return;
  }

  data.forEach((file) => {
    const card = document.createElement("a");
    card.href = file.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className =
      "bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition flex flex-col justify-between focus:outline-none focus:ring-4 focus:ring-orange-500";

    const title = document.createElement("h3");
    title.textContent = file.title;
    title.className = "text-sky-400 text-xl font-bold mb-4 truncate";

    const linkInfo = document.createElement("div");
    linkInfo.className = "flex items-center text-orange-400 font-medium";

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icon.setAttribute("fill", "none");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("class", "w-5 h-5 mr-2");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "M14 3h7v7m0 0L10 21l-7-7L21 3z");
    icon.appendChild(path);

    const label = document.createElement("span");
    label.textContent = "Open Note";

    linkInfo.appendChild(icon);
    linkInfo.appendChild(label);

    card.appendChild(title);
    card.appendChild(linkInfo);
    fileList.appendChild(card);
  });
}

if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}
