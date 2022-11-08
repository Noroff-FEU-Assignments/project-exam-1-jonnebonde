import { validateEmail } from "../js/utils/utilities.js";

// hamburger menu
const toggleButton = document.querySelector(".nav-hamburgermenu-icon");
const navMenu = document.querySelector(".nav-menu-container");
const navContainer = document.querySelector("nav");

toggleButton.addEventListener("keydown", (x) => {
  if (x.keyCode === 13) {
    toggleButton.classList.toggle("active");
    navMenu.classList.toggle("active");
  }
});

toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.addEventListener("click", function (e) {
  if (!navContainer.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

document.addEventListener("keyup", function (e) {
  if (!navContainer.contains(e.target)) {
    toggleButton.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// subscribe form
const subscribeForm = document.getElementById("subscribe-container");
const subscribeInput = document.getElementById("email-subscribe");
const subscribeError = document.querySelector(".input-subscribe-error");

function validateSubscribe(event) {
  event.preventDefault();
  const subscribeEmail = validateEmail(subscribeInput.value);

  if (subscribeEmail) {
    subscribeError.textContent = "Thanks for your subscription";
    subscribeError.style.color = "green";
    subscribeError.style.backgroundColor = "white";
    setTimeout(function () {
      subscribeError.textContent = "Subscribe to get the newest content first";
      subscribeError.style.color = "black";
      subscribeError.style.backgroundColor = "#FC7E46";
    }, 3000);
  } else {
    subscribeError.textContent = "Not a valid email";
    subscribeError.style.color = "red";
    subscribeError.style.backgroundColor = "white";
    setTimeout(function () {
      subscribeError.textContent = "Subscribe to get the newest content first";
      subscribeError.style.color = "#000000";
      subscribeError.style.backgroundColor = "#FC7E46";
    }, 3000);
  }
}

subscribeForm.addEventListener("submit", validateSubscribe);