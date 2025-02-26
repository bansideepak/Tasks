const body = document.querySelector("body");
const sidebar = document.querySelector(".sidebar");
const toggle = document.querySelector(".toggle");
const searchBtn = document.querySelector(".search-box");
const modeSwitch = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".mode-text");

// Toggle Sidebar
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// Search Box Show/Hide
searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

// Toggle
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light Mode";
  } else {
    modeText.innerText = "Dark Mode";
  }
});

// Save Mode-Preference
const savedMode = localStorage.getItem("darkMode");
if (savedMode === "enabled") {
  body.classList.add("dark");
  modeText.innerText = "Light Mode";
}

modeSwitch.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", null);
  }
});

// Window Resize
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.add("close");
  } else {
    sidebar.classList.remove("close");
  }
});
