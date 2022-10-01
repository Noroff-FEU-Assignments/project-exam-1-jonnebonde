import {apiCall} from "../js/utils.js"
import {url, carouselContainer} from "../js/constants.js"


// API call //



async function apiCarousel(){

    try{
        const blogs = await apiCall(url)
        console.log(blogs)

        const date = new Date(blogs[1].date).toLocaleDateString("utc", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });

        console.log(date)

        carouselContainer.innerHTML = `
        <span>Author: ${blogs[1]._embedded.author[0].name} Posted: ${date}</span>
        <h1>${blogs[1].title.rendered}</h1>
        <img src="${blogs[1]._embedded["wp:featuredmedia"][0].source_url}">
        <div>${blogs[1].content.rendered}</div>
        
        `


    }
    catch{

    }
}

apiCarousel()