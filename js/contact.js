import { resetPage, checkLength, validateEmail } from "../js/utils/utilities.js";
import { contactFormUrl, hiddenInput, nameValid, nameError, nameInput, subjectError, subjectInput, subjectValid, emailError, emailInput, emailValid, messageError, messageInput, messageValid } from "../js/constants/constants.js";

const formSuccess = document.querySelector(".contact-form-success");
const form = document.getElementById("contactForm");
let successMessage = false;

function validateInputs(event) {
  event.preventDefault();

  const name = checkLength(nameInput.value, 4);
  const email = validateEmail(emailInput.value);
  const subject = checkLength(subjectInput.value, 14);
  const message = checkLength(messageInput.value, 24);
  const hidden = checkLength(hiddenInput.value, 1);

  if (name) {
    nameError.style.visibility = "hidden";
    nameValid.style.color = "#EEEEEE";
    nameValid.style.backgroundColor = "#00540A"
  } else {
    nameError.style.visibility = "visible";
  }
  if (subject) {
    subjectError.style.visibility = "hidden";
    subjectValid.style.color = "#EEEEEE";
    subjectValid.style.backgroundColor = "#00540A"
  } else {
    subjectError.style.visibility = "visible";
  }
  if (email) {
    emailError.style.visibility = "hidden";
    emailValid.style.color = "#EEEEEE";
    emailValid.style.backgroundColor = "#00540A"
  } else {
    emailError.style.visibility = "visible";
  }
  if (message) {
    messageError.style.visibility = "hidden";
    messageValid.style.color = "#EEEEEE";
    messageValid.style.backgroundColor = "#00540A"
  } else {
    messageError.style.visibility = "visible";
  }
  if (hidden) {
    return;
  }
  if (name && subject && email && message) {
    successMessage = true;

    let contactData = new FormData();
    contactData.append("your-name", nameInput.value);
    contactData.append("your-email", emailInput.value);
    contactData.append("your-subject", subjectInput.value);
    contactData.append("your-message", messageInput.value);

    fetch(contactFormUrl, {
      method: "post",
      body: contactData,
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
}

form.addEventListener("submit", validateInputs);

function formSubmitSuccesfull() {
  formSuccess.style.display = "block";
  formSuccess.innerHTML = `
      <div class="flex-col">
        <span>Thank u ${nameInput.value}</span>
        <span>We will contact u within 24 hours</span>
        <span>on ${emailInput.value}</span>
      </div>`;
  resetPage();
}

function formSubmitError() {
  formSuccess.style.display = "block";
  formSuccess.innerHTML = `<div>Sorry, But something went wrong sending youre form</div>`;
  resetPage();
}