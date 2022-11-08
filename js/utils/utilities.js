import { carouselContainer } from "../constants/constants.js";

// Apicall no response header info
export async function apiCallPost(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

// Apicall with response header info
export async function apiCall(url) {
  const response = await fetch(url);
  const result = await response.json();
  const totalPages = response.headers.get("X-WP-TotalPages");
  return [result, totalPages];
}

// regex for checking email
export function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

// Checking length of input against required length
export function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  }
}

// Carousel function  
export function slideCarousel(carouselBtn, slider) {

  const blogCarouselIndex = parseInt(getComputedStyle(carouselContainer).getPropertyValue("--blog-carousel-index"));
  const blogsPerScreen = parseInt(getComputedStyle(carouselContainer).getPropertyValue("--blogs-per-screen"));
  const blogCount = slider.length + 1;

  if (carouselBtn.classList.contains("previous-btn")) {
    if (blogCarouselIndex - 1 < 0) {
      carouselContainer.style.setProperty("--blog-carousel-index" - 1);
    } else {
      carouselContainer.style.setProperty("--blog-carousel-index", blogCarouselIndex - 1);
    }
  }

  if (carouselBtn.classList.contains("next-btn")) {
    if (blogCarouselIndex + 1 >= blogCount / blogsPerScreen) {
      carouselContainer.style.setProperty("--blog-carousel-index", 0);
    } else {
      carouselContainer.style.setProperty("--blog-carousel-index", blogCarouselIndex + 1);
    }
  }
}

// Refresh page
export function resetPage() {
  setTimeout(function () {
    window.location.reload(true);
  }, 3000);
}

// Change date format
export function newDateFormat(e) {
  let date = new Date(e).toLocaleDateString("utc", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return date;
}

// Modal function
export function modal(event) {

  const modal = document.querySelector(".modal");
  const modalImage = document.querySelector(".modal img");
  const elem = event.target;

  if (elem.src) {
    modalImage.src = elem.src;
    modalImage.alt = elem.alt;
    modal.showModal();
  }

  document.addEventListener("click", (e) => {
    if (e.target.matches(".modal") || e.target.matches(".modal-close-btn")) {
      modal.close();
    }
  });

  document.addEventListener("keypress", (e) => {
    if (e.target.matches(".modal") || e.target.matches(".modal-close-btn")) {
      modal.close();
    }
  });
}