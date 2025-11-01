export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListerers() {
    /* ------------------------------ Like Buttons ------------------------------ */
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    /* ----------------------------- Delete Buttons ----------------------------- */
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    /* --------------------------- Preview Card Image --------------------------- */
    this._cardImageElement.addEventListener("click", this._handleImageClick);
  }

  /* ----------------------------- Handling Events ---------------------------- */
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /* _handleImageClick() {
    previewImage.setAttribute("src", cardData.link);
    previewImage.setAttribute("alt", cardTitleEl.textContent);
    previewText.textContent = cardData.name;
    openModal(previewImageModal);
  } */

  /* ---------------------------- Instantiating Card --------------------------- */
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //Get the card view
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.setAttribute("src", this._link);
    this._cardImageElement.setAttribute("alt", this._name);
    this._cardTitleElement.textContent = this._name;

    //Set Event Listeners
    this._setEventListerers();
    //Return the Card
    return this._cardElement;
  }
}
