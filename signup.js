// signup.js  – final working copy
const SUPABASE_URL  = "https://rsegoslplitkkrbarlxc.supabase.co";
const SUPABASE_KEY  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzZWdvc2xwbGl0a2tyYmFybHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTI2NjUsImV4cCI6MjA2ODA2ODY2NX0.Fi7-CD0M2DHKSNmwDkQxfHeP8xpGCBDc5bgLWBAbGns";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill in both fields.");
    return;
  }

  // insert row
  const { error } = await db.from("authdata").insert([{ username, password }]);

  if (error) {
    console.error(error);
    alert("Signup failed:\n" + error.message);
  } else {
    alert("Signup successful!");
    window.location.href = "index.html"; // go to login
  }
}
