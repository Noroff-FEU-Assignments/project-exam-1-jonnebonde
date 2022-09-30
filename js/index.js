
// hamburger menu 

const toggleButton = document.querySelector(".nav-hamburgermenu-icon");
const navMenu = document.querySelector(".nav-menu-container");
const navContainer = document.querySelector("nav");

toggleButton.addEventListener("click", () => {
    toggleButton.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.addEventListener("click", function (e) {
    if (!navContainer.contains(e.target)) {
        navMenu.classList.remove("active")
    }
});

