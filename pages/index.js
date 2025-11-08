import {
  initialCards,
  profileEditButton,
  addCardButton,
  config,
} from "../components/constants.js";

//Import classes
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

//Create UserInfo Class Instance
//
//Still uncertain why we set the Name & Title/Description with a Class rather than
//how it was done before the refactor,
//
//Need to look into this concept more
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

//Create "Profile Modal" Class Instance
const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  submitProfileForm
);
//Set "Profile Modal" Event Listeners
profileModal.setEventListeners();

profileEditButton.addEventListener("click", () => {
  profileModal.open();

  const currentInfo = userInfo.getUserInfo();
  console.log(currentInfo);
  profileModal.setInputValues(currentInfo);
});

//Create the Profile Submission Form Handler
//This takes an Object as an Arg, then sets the User Info based on the Obj's values
//Then closes the Modal/Popup and resets Validation
function submitProfileForm(data) {
  userInfo.setUserInfo(data);

  profileModal.close();

  profileFormValidation.resetValidation();
}

//Create "Card" Section Class Instance using the Initally Provided Cards
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  document.querySelector(".cards__list")
);

//Render the Initally Provided Cards
cardList.renderItems();

//Create Individual Cards given an Object containing a Name and a Link value
function createCard(data) {
  const card = new Card(data, "#card-template", openPreviewModal);
  return card.getView();
}

//Create "Add Card" Modal Class Instance
const cardModal = new PopupWithForm("#add-card-modal", submitCardForm);
//Set "Add Card" Modal Event Listeners
cardModal.setEventListeners();

addCardButton.addEventListener("click", () => {
  cardModal.open();
});

//Create the Card Submission Form Handler
//This takes an Obj as an Arg, then creates a Card using the Obj's values
//Then closes the Modal/Popup and resets Validation
function submitCardForm(data) {
  const cardElement = createCard(data);
  cardList.addItem(cardElement);

  cardModal.close();

  cardFormValidation.resetValidation();
}

//Create "Preview Image" Modal Class Instance
const previewModal = new PopupWithImage("#preview-image-modal");
//Set "Preview Image" Modal Event Listeners
previewModal.setEventListeners();

//Create the Function to Handle opening the "Preview Image" Modal
//This takes an Obj as an Arg, then passes it to the Modal's open function
function openPreviewModal(data) {
  previewModal.open(data);
}

//Declare Form Constants used to enable Validation
const profileModalForm = profileModal.getForm();
const cardModalForm = cardModal.getForm();

//Create "Profile Modal" Validator Class Instance
const profileFormValidation = new FormValidator(config, profileModalForm);
profileFormValidation.enableValidation();

//Create "Card Modal" Validator Class Instance
const cardFormValidation = new FormValidator(config, cardModalForm);
cardFormValidation.enableValidation();
