import { popularPostsContainer, carouselContainer, sliderLoader, blogsLoader, blogContainer, postContainer, postPageTitle, postCommentsContainer } from "../constants/constants.js";
import { newDateFormat, modal } from "../utils/utilities.js";

// making html for carousel 
export function makePostCarouselSLiderHtml(blogPosts) {

  // blogpost carousel slider made with inspiration from and i give credits to https://www.youtube.com/watch?v=yq4BeRtUHbk
  for (let i = 0; i < blogPosts.length; i++) {
    if (i === 10) {
      break;
    }
    const date = newDateFormat(blogPosts[i].date);

    carouselContainer.innerHTML += `
      <div class="carousel-post">
          <a  class="flex-col" href="post.html?post=${blogPosts[i].id}">
              <div class="carousel-post-title">
                  <h2>${blogPosts[i].title.rendered}</h2>
              </div>
                  <div class="carousel-img-container" style="background-image: url(${blogPosts[i]._embedded["wp:featuredmedia"][0].source_url})" aria-label="${blogPosts[i]._embedded["wp:featuredmedia"][0].alt_text}">
              </div>
              <div class="carousel-readmore-background"></div>
              <span class="carousel-readmore flex-justify-center-col-center">Read more</span>
              <div class="carousel-post-text flex-col">
                  <span><strong>Author:</strong> ${blogPosts[i]._embedded.author[0].name}</span>
                  <span><strong>Posted:</strong> ${date}</span>
                  <span><strong>Category:</strong> ${blogPosts[i]._embedded["wp:term"][0][0].name}</span>
              </div>
          </a>
      </div>
      `;

    sliderLoader.style.display = "none";
  }

  let seeAllPostsContainer = document.createElement("div");
  seeAllPostsContainer.classList.add("carousel-see_all_posts-container");
  carouselContainer.appendChild(seeAllPostsContainer);

  const seeAllPosts = document.querySelector(".carousel-see_all_posts-container");

  let seeAllPostsButton = document.createElement("a");
  seeAllPostsButton.setAttribute("href", "blog.html");
  seeAllPostsButton.classList.add("flex-col-center");
  seeAllPostsButton.innerHTML = "See all Posts";
  seeAllPosts.appendChild(seeAllPostsButton);
};

// makes html for popular posts
export function makePopularPostsHtml(popularPosts) {

  const filter = popularPosts.filter(function (x) {
    if (x._embedded.replies !== undefined) {
      return true;
    }
  });

  const mostComments = filter.sort(function (x, y) {
    return y._embedded.replies[0].length - x._embedded.replies[0].length;
  });

  for (let i = 0; i < mostComments.length; i++) {

    let popular = mostComments[i];
    if (i === 4) {
      break;
    };

    const date = newDateFormat(popular.date);

    popularPostsContainer.innerHTML += `
        <div class="popular-posts">
            <a class="flex-col" href="post.html?post=${popular.id}">
                <div class="popular-post-title">
                    <h2>${popular.title.rendered}</h2>
                </div>
                  <div class="popular-img-container flex-justify-center-col" style="background-image: url(${popular._embedded["wp:featuredmedia"][0].source_url})" aria-label="${popular._embedded["wp:featuredmedia"][0].alt_text}">
                      <span id="popular-readmore">Read More</span>
                  </div>
                <div class="popular-post-text flex-col">
                    <span><strong>Author:</strong> ${popular._embedded.author[0].name}</span>
                    <span><strong>Date:</strong> ${date}</span>
                    <span><strong>Category:</strong> ${popular._embedded["wp:term"][0][0].name}</span>
                </div>
            </a>
        </div>
        `;
  }
}

// makes html for posts
export function makePostHtml(postData) {

  postData.forEach(function (posts) {

    const date = newDateFormat(posts.date);

    blogsLoader.forEach(function (loader) {
      loader.style.display = "none";
    })
    blogContainer.innerHTML +=
      `<div class="blog-post-container flex-col">
                <div tabindex="-1" class="blog-post-title">
                    <a tabindex="-1" href="post.html?post=${posts.id}"><h2>${posts.title.rendered}</h2></a>
                </div>
                <a tabindex="-1" href="post.html?post=${posts.id}"><div class="blog-blogs-image-container" style="background-image: url(${posts._embedded["wp:featuredmedia"][0].source_url})" aria-label="${posts._embedded["wp:featuredmedia"][0].alt_text}"></div></a>
                <div class="blog-post-text-container flex-col">
                    <span><strong>Author:</strong> ${posts._embedded.author[0].name}</span>
                    <span><strong>Posted:</strong> ${date}</span>
                    <div class="blog-post-category-container flex"> 
                      <span><strong>Category: </strong></span>
                      <a id="blog-post-slug-cta" tabindex="-1" href="blog.html?category=${posts._embedded["wp:term"][0][0].id}">${posts._embedded["wp:term"][0][0].name}</a>
                    </div>
                </div>
                    <a class="blog-post-cta" href="post.html?post=${posts.id}">Read more</a>
            </div>`;
  })
}

// make html for single post
export function singlePostHtml(apiPost) {
  const date = newDateFormat(apiPost[0].date);
  postPageTitle.innerHTML = `3D-Printing For All | ${apiPost[0].title.rendered}`;

  postContainer.innerHTML = `
      <div class="post-content-cointainer flex-col-center">
        <div class="post-title-container">
          <h1>${apiPost[0].title.rendered}</h1>
          <span>Author: ${apiPost[0]._embedded.author[0].name}, Posted:${date}</span>
        </div> 
        <div class="post-content-rendered flex-col-center">${apiPost[0].content.rendered}</div>
      </div>`;

  const image = document.querySelectorAll("img");

  image.forEach(function (x) {
    x.setAttribute("tabindex", 0)
    x.onclick = function (e) {
      modal(e);
    }
  });

  image.forEach(function (k) {
    k.addEventListener("keydown", (k) => {
      if (k.keyCode === 13) {
        modal(k)
      }
    });
  });
}

export function noCommentsHtml() {
  postCommentsContainer.innerHTML = `
  <div class="post-comment-content">
    <span>No comments here yet, wanna be the first?</span>
  </div>`;
}

export function commentsHtml(comments) {
  postCommentsContainer.innerHTML = "";
  comments.forEach(function (c) {

    const date = new Date(c.date).toLocaleDateString("utc", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });

    postCommentsContainer.innerHTML += `
      <div class="post-comment-content flex-col">
        <div class="post-comment-header flex-col">
          <span><strong>${c.author_name}</strong></span>
          <span id="comment-date">${date}</span>
        </div>
        <div class="post-comment-rendered">${c.content.rendered}</div>
      </div>`;
  })
}

// Create category list dynamically from api result
export function buildCategoriesMenu(data) {
  const categories = document.querySelector(".category-list");

  categories.length = 0;

  let categoryList = document.createElement("li");
  categoryList.setAttribute("value", "0");
  categoryList.setAttribute("tabindex", 0);
  categoryList.appendChild(document.createTextNode("All"));
  categories.appendChild(categoryList);

  const filterCategories = data.filter(function (x) {
    if (x.id !== 1) {
      return true;
    }
  });

  for (let i = 0; i < filterCategories.length; i++) {
    const categoryDynamicList = document.createElement("li");
    categoryDynamicList.setAttribute("value", filterCategories[i].id);
    categoryDynamicList.setAttribute("tabindex", 0);
    categoryDynamicList.appendChild(document.createTextNode(filterCategories[i].name));
    categories.appendChild(categoryDynamicList);
  }
}