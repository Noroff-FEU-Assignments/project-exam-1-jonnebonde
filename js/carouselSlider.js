import { apiCall } from "../js/utils.js"
import { url, carouselContainer } from "../js/constants.js"


// API call //
const latestPostUrl = url + "&per_page=15"


async function apiCarousel() {

    try {
        const blogs = await apiCall(latestPostUrl)
        console.log(blogs)

        makePostCarouselSLiderHtml(blogs)

        /* blogpost carousel slider made with inspiration and i give credits to https://www.youtube.com/watch?v=yq4BeRtUHbk */

        document.addEventListener("click", (e) => {

            let carouselBtn;

            if (e.target.matches(".carousel-btn")) {
                carouselBtn = e.target;
            } else {
                carouselBtn = e.target.closest(".carousel-btn");
            }

            if (carouselBtn != null) {
                slideCarousel(carouselBtn, blogs)
            }

        });

    }
    catch {

    }
}

apiCarousel()


function slideCarousel(carouselBtn, blogs) {
    const blogCarouselIndex = parseInt(getComputedStyle(carouselContainer).getPropertyValue("--blog-carousel-index"));
    const blogsPerScreen = parseInt(getComputedStyle(carouselContainer).getPropertyValue("--blogs-per-screen"));
    const blogCount = blogs.length;
    console.log(blogCount)

    if (carouselBtn.classList.contains("previous-btn")) {
        if (blogCarouselIndex - 1 < 0) {
            carouselContainer.style.setProperty("--blog-carousel-index" - 1);
        } else {
            carouselContainer.style.setProperty("--blog-carousel-index", blogCarouselIndex - 1)
        }
    }

    if (carouselBtn.classList.contains("next-btn")) {
        if (blogCarouselIndex + 1 >= blogCount / blogsPerScreen) {
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
            <a href="*">
                <div class="carousel-post-title">
                    <h2>${blogPosts.title.rendered}</h2>
                </div>
                    <div class="carousel-img-container" style="background-image: url(${blogPosts._embedded["wp:featuredmedia"][0].source_url})">
                </div>
                <div class="carousel-readmore-background"></div>
                <span class="carousel-readmore">Read more</span>
                <div class="carousel-post-text">
                    <span><strong>Author:</strong> ${blogPosts._embedded.author[0].name}</span>
                    <span><strong>Posted:</strong> ${date}</span>
                </div>
            </a>
        </div>
        `
    })
}

