import {apiCall} from "../js/utils.js"
import {url, carouselContainer} from "../js/constants.js"





// API call //

const sliderUrl = url + "&per_page=20";


async function apiCarousel(){

    try{
        const blogs = await apiCall(sliderUrl)
        console.log(blogs)

        makePostCarouselSLiderHtml(blogs)

        /* blogpost carousel slider made with inspiration and i give credits to https://www.youtube.com/watch?v=yq4BeRtUHbk */

        document.addEventListener("click", (e) => {

            let carouselBtn;

            if(e.target.matches(".carousel-btn")) {
                carouselBtn = e.target;
            } else {
                carouselBtn = e.target.closest(".carousel-btn");
            }

            if(carouselBtn != null) {
                slideCarousel(carouselBtn, blogs)
            }


        });


    }
    catch{

    }
}

apiCarousel()


function slideCarousel(carouselBtn, blogs) {
    const blogCarouselIndex = parseInt(getComputedStyle(carouselContainer).getPropertyValue("--blog-carousel-index"));
    const blogsPerScreen = parseInt(getComputedStyle(carouselContainer).getPropertyValue("--blogs-per-screen"));
    const blogCount = blogs.length;
    console.log(blogCount)

    if(carouselBtn.classList.contains("previous-btn")) {
        if(blogCarouselIndex - 1 < 0) {
            
            carouselContainer.style.setProperty("--blog-carousel-index" - 1);
            
        } else {
            
            carouselContainer.style.setProperty("--blog-carousel-index", blogCarouselIndex - 1)
        }
    }

    if(carouselBtn.classList.contains("next-btn")) {
        if(blogCarouselIndex + 1 >=  blogCount / blogsPerScreen) {
            
            carouselContainer.style.setProperty("--blog-carousel-index", 0);
        } else {
            
            carouselContainer.style.setProperty("--blog-carousel-index", blogCarouselIndex + 1)
        }
    }


}



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

