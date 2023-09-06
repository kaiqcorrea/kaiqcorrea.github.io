/* SCRIPT THEME */
const $html = document.querySelector("html");
const themeToggle = document.getElementById("theme-toggle");

function toggleTheme() {
  $html.classList.toggle("light-mode");
  updateLocalStorage();
  updateIcons();
  updateStarsVisibility();
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

themeToggle.addEventListener("click", toggleTheme);

/* SCRIPT DOWNLOAD VCARD */
let timeoutId;

function showToast() {
  const link = document.querySelector(".add");
  link.removeEventListener("click", showToast);

  const popup = document.querySelector(".popup");
  popup.classList.add("fade-in");
  popup.classList.add("dsp");

  clearToastTimeout();

  timeoutId = setTimeout(() => {
    hideToast();
    link.addEventListener("click", showToast);
  }, 8000);
}

function hideToast() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("fade-in");
  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.classList.remove("fade-out");
    popup.classList.remove("dsp");
  }, 800);
}

function closeToast() {
  clearToastTimeout();
  const popup = document.querySelector(".popup");
  popup.classList.remove("fade-in");
  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.classList.remove("fade-out");
    popup.classList.remove("dsp");
  }, 800);
}

function clearToastTimeout() {
  clearTimeout(timeoutId);
}

/* Google tag (gtag.js)  */
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-MFGYPJ17VK");
