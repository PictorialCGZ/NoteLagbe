import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

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
