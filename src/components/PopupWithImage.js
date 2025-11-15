import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = this._selector.querySelector(".modal__preview-description"); //Finds the Description for the Preview image
    this._image = this._selector.querySelector(".modal__preview-image"); //Finds the Preview Image element
  }

  open(data) {
    //Set the src, alt, and description text for the modal
    //
    //Technically data._link an data._name are declared as private on the card, but
    //I'm uncertain if I should declare these values on the card as Private or Public
    //since we use them here, but nowhere else outside of the Card Class
    this._image.src = data._link;
    this._image.alt = data._name;
    this._caption.textContent = data._name;
    super.open();
  }
}
