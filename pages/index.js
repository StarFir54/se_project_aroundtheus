import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Profile Objects ---------------------------- */
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeProfileModal = document.querySelector("#close-profile-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

/* ------------------------------ Card Objects ------------------------------ */
const placeTitle = document.querySelector(".card__title");
const cardDescription = document.querySelector(".card__description");
const cardTitleInput = document.querySelector("#card-title-input");
const cardURLInput = document.querySelector("#card-URL-input");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const placeAddBtn = document.querySelector(".profile__add-button");
const addPlaceModal = document.querySelector("#add-card-modal");
const addPlaceForm = addPlaceModal.querySelector(".modal__form");
const closePlaceModal = document.querySelector("#close-place-modal");

/* ------------------------------- Image Modal ------------------------------ */

const previewImageModal = document.querySelector("#preview-image-modal");
const closePreviewModal = previewImageModal.querySelector(
  "#close-preview-modal"
);
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewText = previewImageModal.querySelector(
  ".modal__preview-description"
);

/* ------------------------- Card List and Template ------------------------- */
const cardListEl = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// When the user presses the 'Escape' key, close the modal
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function renderCard(card, wrapper) {
  wrapper.prepend(card);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardURLInput.value;
  const card = new Card({ name, link }, "#card-template");
  renderCard(card.getView(), cardListEl);
  addPlaceForm.reset();
  closePopup(addPlaceModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Profile Events ----------------------------- */

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* ------------------------------- Card Events ------------------------------ */

placeAddBtn.addEventListener("click", () => {
  openModal(addPlaceModal);
});

addPlaceForm.addEventListener("submit", handleAddCardSubmit);

/* -------------------------------------------------------------------------- */
/*                           Rendering Initial Cards                          */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template");
  console.log(card);
  renderCard(card.getView(), cardListEl);
});

// When the user clicks anywhere outside of the modal, close it
const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                           Adding Form Validation                           */
/* -------------------------------------------------------------------------- */

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  config,
  document.querySelector("#profile-edit-modal")
);
const addFormValidator = new FormValidator(
  config,
  document.querySelector("#add-card-modal")
);
editFormValidator.enableValidation(config, profileEditForm);
addFormValidator.enableValidation(config, addPlaceForm);
