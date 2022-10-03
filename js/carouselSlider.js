import {apiCall} from "../js/utils.js"
import {url, carouselContainer} from "../js/constants.js"





// API call //

const sliderUrl = url + "&per_page=14";


async function apiCarousel(){

    try{
        const blogs = await apiCall(sliderUrl)
        console.log(blogs)

        makePostCarouselSLiderHtml(blogs)

    }
    catch{

    }
}

apiCarousel()

/* blogpost carousel slider */

const carouselContainers = [...document.querySelectorAll(".index-post-container")];
const nextSlideButton = [...document.querySelectorAll(".next-btn")];
const previousSlideButton = [...document.querySelectorAll(".previous-btn")];


carouselContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nextSlideButton[i].addEventListener("click", () => {
        item.scrollLeft += containerWidth;
    })

    previousSlideButton[i].addEventListener("click", () => {
        item.scrollLeft -= containerWidth;
    })
})


/* making html */

function makePostCarouselSLiderHtml(blogs) {

    blogs.forEach(function (blogPosts) {

        const date = new Date(blogPosts.date).toLocaleDateString("utc", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });


     
        carouselContainer.innerHTML += `

        <div class="carousel-post">
            <div class="carousel-post-text">
            <span>${blogPosts.title.rendered}</span>
            <span>Author: ${blogPosts._embedded.author[0].name}</span>
            <span>Posted: ${date}</span>
            <a href="*">read more</a>
            </div>
            <div>
            <img src="${blogPosts._embedded["wp:featuredmedia"][0].source_url}">
            </div>
        `
    })
}

