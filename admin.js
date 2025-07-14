const SUPABASE_URL = "https://rsegoslplitkkrbarlxc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Use your full key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Set your own secret password here
const adminSecret = "notelagbeadmin123";

async function checkAdmin() {
  const passInput = document.getElementById("adminPass").value;
  if (passInput !== adminSecret) {
    alert("Wrong password!");
    return;
  }

  const { data, error } = await supabase.from("authdata").select("*");
  if (error) {
    alert("Failed to fetch user data");
    console.error(error);
    return;
  }

  document.getElementById("userList").classList.remove("hidden");

  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  data.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border p-2">${user.username}</td>
      <td class="border p-2">${user.password}</td>
    `;
    tbody.appendChild(row);
  });
}
