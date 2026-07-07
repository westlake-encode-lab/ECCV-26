const root = document.documentElement;
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const sections = [...document.querySelectorAll("main section[id]")];

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
  }
  try {
    localStorage.setItem("eccv26-theme", theme);
  } catch {
    /* localStorage can be unavailable in restricted browser contexts. */
  }
}

try {
  const storedTheme = localStorage.getItem("eccv26-theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    setTheme(storedTheme);
  }
} catch {
  setTheme("light");
}

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-34% 0px -58% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
