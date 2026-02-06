/* SCRIPT THEME */
const $html = document.querySelector("html");
const themeToggle = document.getElementById("theme-toggle");

function toggleTheme() {
  $html.classList.toggle("light-mode");
  updateLocalStorage();
  updateIcons();
  updateStarsVisibility();
  updateBackground();
}

function updateLocalStorage() {
  localStorage.setItem(
    "themePreference",
    $html.classList.contains("light-mode") ? "light" : "dark"
  );
}

function loadThemePreference() {
  const themePreference = localStorage.getItem("themePreference");
  if (themePreference === "light") {
    $html.classList.add("light-mode");
  }
}

loadThemePreference();

function updateIcons() {
  const moonIcon = document.querySelector(".fa-moon");
  const sunIcon = document.querySelector(".fa-sun");

  if ($html.classList.contains("light-mode")) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "inline";
  } else {
    moonIcon.style.display = "inline";
    sunIcon.style.display = "none";
  }
}

updateIcons();
updateStarsVisibility();
updateBackground();

function updateStarsVisibility() {
  const stars1 = document.getElementById("stars1");
  const stars2 = document.getElementById("stars2");
  const stars3 = document.getElementById("stars3");

  if ($html.classList.contains("light-mode")) {
    stars1.style.display = "none";
    stars2.style.display = "none";
    stars3.style.display = "none";
  } else {
    stars1.style.display = "block";
    stars2.style.display = "block";
    stars3.style.display = "block";
  }
}

function updateBackground() {
  const root = document.documentElement;

  if ($html.classList.contains("light-mode")) {
    root.style.setProperty('--bg-image', 'url("./images/cloud.svg")');
  } else {
    root.style.setProperty('--bg-image', 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)');
  }
}

themeToggle.addEventListener("click", toggleTheme);
