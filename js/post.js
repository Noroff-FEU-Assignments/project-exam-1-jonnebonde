import { apiCallPost, checkLength, resetPage } from "../js/utils/utilities.js";
import { postCommentsContainer, postContainer, url, postUrl, commentsUrl, nameValid, nameInput, nameError, messageError, messageInput, messageValid, hiddenInput } from "../js/constants/constants.js";
import { singlePostHtml, noCommentsHtml, commentsHtml } from "../js/Components/renderHTML.js";
import { errorMessage } from "../js/Components/displayMessage.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("post");

const commentsDataUrl = commentsUrl + "?post=" + postId;
const singlePostUrl = url + postUrl + postId + "&_embed";

// add loader and remove loader
async function fetchPost(post) {
  try {
    const apiPost = await apiCallPost(post);
    singlePostHtml(apiPost);
  } catch (error) {
    postContainer.innerHTML = errorMessage("Something went wrong getting this post!!");
  }
}
fetchPost(singlePostUrl);


// get comments related to post
async function fetchComments() {
  try {
    const postComments = await apiCallPost(commentsDataUrl);

    if (postComments.length === 0) {
      noCommentsHtml()
    } else {
      commentsHtml(postComments);
    }

  } catch (error) {
    postCommentsContainer.innerHTML = errorMessage("Something went wrong fetching the comments");
  }
}
fetchComments();


// postcomment form validation
const formSuccess = document.querySelector(".form_success");
const form = document.getElementById("submitComment");
let successMessage = false;

function validateCommentsInputs(event) {
  event.preventDefault();

  const name = checkLength(nameInput.value, 1);
  const message = checkLength(messageInput.value, 4);
  const hidden = checkLength(hiddenInput.value, 1);

  if (name) {
    nameError.style.visibility = "hidden";
    nameValid.style.color = "#EEEEEE";
    nameValid.style.backgroundColor = "#00540A";
  } else {
    nameError.style.visibility = "visible";
    nameValid.style.color = "black";
  }
  if (message) {
    messageError.style.visibility = "hidden";
    messageValid.style.color = "#EEEEEE";
    messageValid.style.backgroundColor = "#00540A";
  } else {
    messageError.style.visibility = "visible";
    messageValid.style.color = "black";
  }
  if (hidden) {
    return;
  }
  if (name && message) {
    successMessage = true;
    submitComment();
  }
}

form.addEventListener("submit", validateCommentsInputs);

async function submitComment() {

  const data = JSON.stringify({
    post: postId,
    author_name: nameInput.value,
    author_email: "noen@noen.noen",
    content: messageInput.value,
  });

  // from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch 
  // and https://www.tetchi.ca/how-to-post-comments-using-the-wordpress-rest-api
  // and https://www.youtube.com/watch?v=e_thybKPKHc for the authorization;
  // and https://code-boxx.com/javascript-fetch-auth/
  fetch(commentsUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Basic " + btoa("none" + ":" + "JBvm 9acY HWaW Intw CkkU e7Fe"),
    },
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        formSubmitError()
      } else {
        formSubmitSuccesfull();
      }
    })
    .catch(error => console.error("error", error));
}

function formSubmitSuccesfull() {
  formSuccess.style.display = "block";
  formSuccess.innerHTML = `<div>Thank you ${nameInput.value} for youre comment</div>`;
  resetPage();
}

function formSubmitError() {
  formSuccess.style.display = "block";
  formSuccess.innerHTML = `<div>Oooopps!!! ${nameInput.value}, something went wrong posting your comment</div>`;
  resetPage();
}