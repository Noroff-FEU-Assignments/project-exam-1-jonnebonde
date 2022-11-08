// urls
export const url = "https://www.jonnekrosby.site/project-exam1/wp-json/wp/v2/";
export const postsEmbed = "posts?_embed";
export const postUrl = "posts?include=";
export const commentsUrl = url + "comments/";
export const contactFormUrl = "https://jonnekrosby.site/project-exam1/wp-json/contact-form-7/v1/contact-forms/190/feedback";
export const categoriesUrl = url + "categories?_embed"

// containers for HTML and loaders
export const carouselContainer = document.querySelector(".blog-post-carousel-container");
export const sliderLoader = document.querySelector(".loaderslider");
export const blogContainer = document.querySelector(".blog-blogs-container");
export const blogsLoader = document.querySelectorAll(".loaderPosts");

export const postContainer = document.querySelector(".post-content-container");
export const postCommentsContainer = document.querySelector(".post-comments-container");
export const postPageTitle = document.querySelector("title");
export const popularPostsContainer = document.querySelector(".index-most_popular-posts-container");

// Container for sorting category, date and loadmore button
export const categoryToggle = document.getElementById("category");
export const categoryList = document.querySelector(".category-list");
export const categoryContainer = document.querySelector(".blog-category-container");

export const dateToggle = document.getElementById("date");
export const dateList = document.querySelector(".date-list");
export const dateListClose = document.querySelectorAll(".date-list li");
export const dateContainer = document.querySelector(".blog-date-container");

export const loadBtn = document.getElementById("load-more-btn");

// Form validation
export const hiddenInput = document.getElementById("hidden");

export const nameValid = document.querySelector(".name");
export const nameInput = document.getElementById("name");
export const nameError = document.getElementById("nameError");

export const messageValid = document.querySelector(".message");
export const messageInput = document.getElementById("message");
export const messageError = document.getElementById("messageError");

export const subjectValid = document.querySelector(".subject");
export const subjectInput = document.getElementById("subject");
export const subjectError = document.getElementById("subjectError");

export const emailValid = document.querySelector(".email");
export const emailInput = document.getElementById("email");
export const emailError = document.getElementById("emailError");
