export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");

    /* ------------------------------ Like Buttons ------------------------------ */
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    /* ----------------------------- Delete Buttons ----------------------------- */
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    /* --------------------------- Preview Card Image --------------------------- */
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  /* ----------------------------- Handling Events ---------------------------- */
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

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
    this._setEventListeners();
    //Return the Card
    return this._cardElement;
  }
}
