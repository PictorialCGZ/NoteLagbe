import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Supabase setup
const supabase = createClient(
  "https://rsegoslplitkkrbarlxc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

// 🔐 Auth Guard
if (window.location.pathname.includes("dashboard.html") && !localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

// 🚪 Logout function
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}
window.logout = logout;

// 📁 Load note files
async function loadFiles() {
  const fileList = document.getElementById("file-list");
  if (!fileList) return;

  fileList.innerHTML = "";

  const { data, error } = await supabase
    .from("filelinks")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("❌ Failed to fetch notes:", error.message);
    fileList.innerHTML = `<p class="text-red-500 col-span-full text-center">Failed to load notes. Please try again later.</p>`;
    return;
  }

  if (!data || data.length === 0) {
    fileList.innerHTML = `<p class="text-gray-400 col-span-full text-center">No notes found. Check back later!</p>`;
    return;
  }

  data.forEach((file) => {
    const card = document.createElement("a");
    card.href = file.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.className =
      "bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-600 outline-none flex flex-col gap-3";

    const title = document.createElement("h3");
    title.textContent = file.title;
    title.title = file.title;
    title.className = "text-white text-lg font-semibold break-words";

    const linkBox = document.createElement("div");
    linkBox.className = "flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium";

    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("fill", "none");
    icon.setAttribute("stroke", "currentColor");
    icon.setAttribute("class", "w-5 h-5");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("d", "M13 5l7 7-7 7M5 5h8a4 4 0 014 4v0");
    icon.appendChild(path);

    const linkText = document.createElement("span");
    linkText.textContent = "Open Note";

    linkBox.appendChild(icon);
    linkBox.appendChild(linkText);

    card.appendChild(title);
    card.appendChild(linkBox);

    fileList.appendChild(card);
  });
}

// 📦 Initialize if on dashboard
if (window.location.pathname.includes("dashboard.html")) {
  loadFiles();
}
