import { apiCall, apiCallPost } from "../js/utils/utilities.js";
import { url, categoriesUrl, postsEmbed, blogContainer, categoryToggle, categoryList, categoryContainer, categoryListClose, dateToggle, dateContainer, dateList, dateListClose, loadBtn, backToTopBtn, categoryTitle, sortedByTitle } from "../js/constants/constants.js";
import { makePostHtml, buildCategoriesMenu } from "../js/Components/renderHTML.js";
import { errorMessage } from "../js/Components/displayMessage.js";


// API call for posts and load more //
const embeddedPostUrl = url + postsEmbed;
let pageNumber = 1;
let sort = "";
let postPageUrl = embeddedPostUrl + "&page=" + pageNumber + sort;

async function fetchBlogs(posts) {
  try {
    const apiData = await apiCall(posts);
    console.log(apiData)
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
function sortPostsByCategory(event) {
  const categoryId = event.target.value;
  const categoryText = event.target.innerText;
  pageNumber = 1;
  categoryTitle.innerText = "Category: ";


  if (categoryId >= 1) {
    sort = "&categories=" + categoryId;
    postPageUrl = embeddedPostUrl + "&page=" + pageNumber + sort;
    blogContainer.innerHTML = "";
    categoryTitle.innerText = categoryTitle.innerText + " " + categoryText;
    sortedByTitle.innerText = "Sorted by: Newest";
    fetchBlogs(postPageUrl);
  }
  else {
    sort = "";
    postPageUrl = embeddedPostUrl + "&page=" + pageNumber + sort;
    blogContainer.innerHTML = "";
    categoryTitle.innerText = "Category: All";
    sortedByTitle.innerText = "Sorted by: Newest";
    fetchBlogs(postPageUrl);
  }
}

categoryToggle.addEventListener("click", () => {
  categoryList.classList.toggle("active");
});

categoryListClose.forEach(function (categoryMenu) {
  categoryMenu.onclick = function (category) {
    if (category.target.value < 0) {
      categoryList.classList.remove("active");
    }
    else {
      sortPostsByCategory(category)
      categoryList.classList.remove("active");
    } 
  }
});

categoryListClose.forEach(function (categoryMenu) {
  categoryMenu.addEventListener("keydown", (category) => {
    if (category.keyCode === 13) {
      sortPostsByCategory(category)
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
  let sortedbyText = event.target.innerText;
  sortedByTitle.innerText = "Sorted by: ";
  pageNumber = 1;
  if (sortByDate === 99) {
    postPageUrl = embeddedPostUrl + sort + "&order=desc&page=" + pageNumber;
    sortedByTitle.innerText = "Sorted by: " + sortedbyText;
    blogContainer.innerHTML = "";
    fetchBlogs(postPageUrl);
  } else {
    postPageUrl = embeddedPostUrl + sort + "&order=asc&page=" + pageNumber;
    sortedByTitle.innerText = "Sorted by: " + sortedbyText;
    blogContainer.innerHTML = "";
    fetchBlogs(postPageUrl);
  }
}

dateToggle.addEventListener("click", () => {
  dateList.classList.toggle("active");
});

dateListClose.forEach(function (dateMenu) {
  dateMenu.onclick = function (date) {
    if (!date.target.value) {
      dateList.classList.remove("active");
    } else {
      sortByDate(date);
      dateList.classList.remove("active");
    }
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
  postPageUrl = embeddedPostUrl + "&page=" + pageNumber + sort;
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
function goToTop() {
  document.body.scrollIntoView({
    behavior: "smooth",
  });
}

backToTopBtn.addEventListener("click", goToTop);