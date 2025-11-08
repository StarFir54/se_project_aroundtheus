export default class Popup {
  constructor(popupSelector) {
    this._selector = document.querySelector(popupSelector);
  }

  open() {
    this._selector.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._selector.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // Close modal Via close button
    this._closeButton = this._selector.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    // Close modal via overlay click
    this._selector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
