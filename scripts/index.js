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
  ".modal__preview-image_description"
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
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.addEventListener("click", () => {
    previewImage.setAttribute("src", cardData.link);
    previewImage.setAttribute("alt", cardTitleEl.textContent);
    previewText.textContent = cardData.name;
    openModal(previewImageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardTitleEl.textContent);
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
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
  renderCard({ name, link }, cardListEl);
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

closeProfileModal.addEventListener("click", () => {
  closePopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* ------------------------------- Card Events ------------------------------ */

placeAddBtn.addEventListener("click", () => {
  openModal(addPlaceModal);
});

closePlaceModal.addEventListener("click", () => {
  closePopup(addPlaceModal);
});

addPlaceForm.addEventListener("submit", handleAddCardSubmit);

/* ------------------------------ Image Events ------------------------------ */

closePreviewModal.addEventListener("click", () => {
  closePopup(previewImageModal);
});

/* -------------------------------------------------------------------------- */
/*                           Rendering Initial Cards                          */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});
