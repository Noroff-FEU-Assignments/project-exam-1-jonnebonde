import {apiCall} from "../js/utils.js"
import {url, carouselContainer} from "../js/constants.js"


// API call //


/* 
async function apiCarousel(){

    try{
        const blogs = await apiCall(url)
        console.log(blogs)

        const parser = new DOMParser();

        function extractImagesFromBlogPosts(htmlstring) {
            const doc = parser.parseFromString(htmlstring, "text/html");
            return doc.querySelectorAll("img")
        }

        const imgs = extractImagesFromBlogPosts(blogs[0].content.rendered)

        console.log(imgs)

        carouselContainer.innerHTML = `
        <img class="featured-image" src="${blogs[0]._embedded["wp:featuredmedia"][0].source_url}">
        <img src="${imgs[0].img}">
        `


    }
    catch{

    }
}

apiCarousel() */