document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  sections.forEach((sec, i) => {
    sec.classList.add("opacity-0");
    setTimeout(() => {
      sec.classList.add("fade-in");
      sec.classList.remove("opacity-0");
    }, i * 150);
  });
});
