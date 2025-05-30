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

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeProfileModal = document.querySelector("#close-profile-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const placeAddBtn = document.querySelector(".profile__add-button");
const addPlaceModal = document.querySelector("#add-place-modal");
const closePlaceModal = document.querySelector("#close-place-modal");
const cardListEl = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
  addPlaceModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  // Clone the template element with all its content and store it in a cardElement
  const cardElement = cardTemplate.cloneNode(true);
  // Access the card Title and Image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  // Set the path to the image to the link field of the object
  cardImageEl.setAttribute("src", cardData.link);
  // Set the image alt text to the name field of the object
  cardImageEl.setAttribute("alt", cardTitleEl.textContent);
  // Set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // Return the ready HTML element with the filled-in data
  return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

closeProfileModal.addEventListener("click", () => {
  closePopup();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

placeAddBtn.addEventListener("click", () => {
  addPlaceModal.classList.add("modal_opened");
});

closePlaceModal.addEventListener("click", () => {
  closePopup();
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});
