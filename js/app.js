document.addEventListener("DOMContentLoaded", function () {
  App();
});

function App() {
  switchMode();
  loadLightMode();
  changeLanguage(currentLanguage);
}

/* --- Cambio de Tema (Modo oscuro y claro) --- */

function switchMode() {
  const themeSwitches = document.querySelectorAll('.theme-switch');
  const logoImage = document.querySelector(".logo img");

  themeSwitches.forEach(switchElement => {
    switchElement.addEventListener('click', () => {
      /* Intercambiar clase */
      document.body.classList.toggle("light");

      /* Guardar en LocalStorage */
      const isLightMode = document.body.classList.contains('light');
      sessionStorage.setItem('lightMode', isLightMode);

      /* Cambiar iconos */
      if (document.body.classList.contains("light")) {
        switchElement.classList.remove("bxs-sun");
        switchElement.classList.add("bxs-moon");
        logoImage.src = "./img/logo-black.svg";
      } else {
        switchElement.classList.remove("bxs-moon");
        switchElement.classList.add("bxs-sun");
        logoImage.src = "./img/logo-white.svg";
      }
    });
  });
}

function loadLightMode() {
  const isLightMode = sessionStorage.getItem('lightMode') === 'true';
  if (isLightMode) {
    document.body.classList.add('light');
    const logoImage = document.querySelector(".logo img");
    logoImage.src = "./img/logo-black.svg";
  }
}
/* --- Idiomas --- */

let currentLanguage = sessionStorage.getItem('language') || 'en';

function changeLanguage(language) {
  currentLanguage = language;
  // Guardar el lenguaje en localStorage
  sessionStorage.setItem('language', language);
  // Cargar JSON
  fetch(`/public/languages/${language}.json`)
    .then(response => response.json())
    .then(data => {
      applyTranslations(data);
    })
    .catch(error => console.error("Error al cargar el JSON:", error))
}
document.getElementById('btn-es').addEventListener('click', () => changeLanguage('es'));
document.getElementById('btn-en').addEventListener('click', () => changeLanguage('en'));

function applyTranslations(data) {
  const elementsToTranslate = document.querySelectorAll('[data-section][data-value]');

  elementsToTranslate.forEach(element => {
    const section = element.getAttribute('data-section');
    const value = element.getAttribute('data-value');
    
    if (data[section] && data[section][value]) {
      element.textContent = data[section][value];
    }
  });
}

/* --- Sidebar --- */

const sidebarToggle = document.querySelector('.nav-content-mobile');
const sidebar = document.querySelector('.sidebar');
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
    toggleIcons();
  });
});

function toggleIcons() {
  menuIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
}
sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  toggleIcons();
});
function closeSidebar() {
  sidebar.classList.remove('active');
}
window.addEventListener('resize', () => {
  if (window.innerWidth > 560) {
    closeSidebar();
  }
});