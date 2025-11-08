import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; //Function Passed in on Initializing
    this._form = this._selector.querySelector(".modal__form"); //Finds the form for a given Modal/Popup
    this._inputList = this._form.querySelectorAll(".modal__input"); //Creates an Array of all inputs on a given Modal/Popup
  }

  _getInputValues() {
    //Create an Object to store the Input Values
    const data = {};
    //Loop through the input Array to set the name/value pairs for every input
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    //Returns the Object containing the name/value pairs for all input elements
    return data;
  }

  setInputValues(data) {
    //Loops through the input Array to set the value/name pairings for all input elements
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    //Inherit parent eventListeners
    super.setEventListeners();
    //Add the specific submitHandler for Form Modals/Popups
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  getForm() {
    //Find the form used in a given Modal/Popup, used for Validation
    return this._form;
  }
}
