import { apiCallPost, slideCarousel } from "../utils/utilities.js";
import { url, postsEmbed, carouselContainer } from "../constants/constants.js";
import { makePostCarouselSLiderHtml, makePopularPostsHtml } from "../Components/renderHTML.js";
import { errorMessage } from "../Components/displayMessage.js";

// API call //
const sliderPostsUrl = url + postsEmbed + "&per_page=10";
const popularPostsUrl = url + postsEmbed + "&per_page=100";

async function fetchApi() {
  try {
    const apiData = await apiCallPost(sliderPostsUrl);
    makePostCarouselSLiderHtml(apiData);

    document.addEventListener("click", (e) => {
      let carouselBtn;
      if (e.target.matches(".carousel-btn")) {
        carouselBtn = e.target;
      } else {
        carouselBtn = e.target.closest(".carousel-btn");
      }
      if (carouselBtn != null) {
        slideCarousel(carouselBtn, apiData);
      }
    });

    const popularPosts = await apiCallPost(popularPostsUrl);
    makePopularPostsHtml(popularPosts);

  }
  catch (error) {
    console.log(error);
    carouselContainer.innerHTML = errorMessage("Sorry, Something went wrong getting posts");
  }
}
fetchApi();