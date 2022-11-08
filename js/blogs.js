import { apiCall, apiCallPost } from "../js/utils/utilities.js";
import { url, categoriesUrl, postsEmbed, blogContainer, categoryToggle, categoryList, categoryContainer, dateToggle, dateListClose, dateContainer, dateList, loadBtn} from "../js/constants/constants.js";
import { makePostHtml, buildCategoriesMenu } from "../js/Components/renderHTML.js";
import { errorMessage } from "../js/Components/displayMessage.js";

const sortedByTitle = document.querySelector(".blog-category-container span")

console.log(sortedByTitle.innerText)

// API call for posts and load more //
let pageNumber = 1;
let sort = "";
let postPageUrl = url + postsEmbed + "&page=" + pageNumber + sort;

async function fetchBlogs(posts) {
  try {
    const apiData = await apiCall(posts);
    loadPosts(apiData);
  }
  catch (error) {
    console.log(error);
    blogContainer.innerHTML = errorMessage("Something went wrong fetching posts");
  }
}
fetchBlogs(postPageUrl);

// Fetch categories from api
async function fetchCategories(categories) {
  try {
    const categoriesData = await apiCallPost(categories);
    buildCategoriesMenu(categoriesData);
  }
  catch (error) {
    console.log(error);
    blogContainer.innerHTML = errorMessage("Something went wrong fetching categories");
  }
};
fetchCategories(categoriesUrl);

// sorting by category
function sortPosts(event) {
  let categoryId = event.target.value;
  let categoryText = event.target.innerText
  pageNumber = 1;
  sortedByTitle.innerText = "Category: "

  if (categoryId <= 0) {
    sort = "";
    postPageUrl = url + postsEmbed + "&page=" + pageNumber + sort;
    blogContainer.innerHTML = "";
    sortedByTitle.innerText = "Category: All"
    fetchBlogs(postPageUrl);
  } else {
    sort = "&categories=" + categoryId;
    postPageUrl = url + postsEmbed + "&page=" + pageNumber + sort;
    blogContainer.innerHTML = "";
    
    sortedByTitle.innerText = sortedByTitle.innerText + " " + categoryText;
    fetchBlogs(postPageUrl);
  }
}

categoryToggle.addEventListener("click", () => {
  categoryList.classList.toggle("active");
});

const categoryListClose = document.querySelectorAll(".category-list");
categoryListClose.forEach(function (categoryMenu) {
  categoryMenu.onclick = function (category) {
    sortPosts(category)
    categoryList.classList.remove("active");
  }
});

categoryListClose.forEach(function (categoryMenu) {
  categoryMenu.addEventListener("keydown", (category) => {
    if (category.keyCode === 13) {
      sortPosts(category)
      categoryList.classList.remove("active");
    }
  })
});

document.addEventListener("click", function (e) {
  if (!categoryContainer.contains(e.target)) {
    categoryList.classList.remove("active");
  }
});


// sorting by date
function sortByDate(event) {
  let sortByDate = event.target.value;
  pageNumber = 1;
  if (sortByDate === 99) {
    postPageUrl = url + postsEmbed + sort + "&order=desc&page=" + pageNumber;
    blogContainer.innerHTML = "";
    fetchBlogs(postPageUrl);
  } else {
    postPageUrl = url + postsEmbed + sort + "&order=asc&page=" + pageNumber;
    blogContainer.innerHTML = "";
    fetchBlogs(postPageUrl);
  }
}

dateToggle.addEventListener("click", () => {
  dateList.classList.toggle("active");
});

dateListClose.forEach(function (dateMenu) {
  dateMenu.onclick = function (date) {
    sortByDate(date);
    dateList.classList.remove("active");
  }
});

dateListClose.forEach(function (dateMenu) {
  dateMenu.addEventListener("keydown", (date) => {
    if (date.keyCode === 13) {
      sortByDate(date);
      dateList.classList.remove("active");
    }
  })
});

document.addEventListener("click", function (e) {
  if (!dateContainer.contains(e.target)) {
    dateList.classList.remove("active");
  }
});

// calls for making the html and checks page number against max number from api response header
function loadPosts(apiData) {
  let postData = apiData[0];
  makePostHtml(postData);
  checkPage(apiData);
}

// load more posts by changing url page parameter
function loadMore() {
  pageNumber++;
  postPageUrl = url + postsEmbed + "&page=" + pageNumber + sort;
  fetchBlogs(postPageUrl);
}

loadBtn.addEventListener("click", () => {
  loadMore()
});

// checks pagenumber against max pages in api response header and disable button if reached max pages
function checkPage(apiData) {
  let totalPages = apiData[1];
  if (pageNumber <= totalPages - 1) {
    loadBtn.style.display = "block";
  }
  else {
    loadBtn.style.display = "none";
  }
}

// back to top btn
// inspiration from frecodecamp.org
const backToTopBtn = document.getElementById("to-top-btn");

function goToTop() {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
}

backToTopBtn.addEventListener("click", goToTop);