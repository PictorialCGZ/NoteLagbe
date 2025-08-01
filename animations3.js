// animations.js

window.addEventListener("DOMContentLoaded", () => {
  gsap.from("header", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "power2.out"
  });

  gsap.from(".card", {
    duration: 1.2,
    y: 50,
    opacity: 0,
    stagger: 0.3,
    delay: 0.5,
    ease: "power3.out"
  });

  gsap.to("body", {
    backgroundPosition: "200% center",
    duration: 15,
    repeat: -1,
    ease: "none"
  });
});
