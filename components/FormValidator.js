export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._config;
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._config;
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }
    this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableButton() {
    const { inactiveButtonClass } = this._config;
    this._submitButton.classList.add(inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    const { inactiveButtonClass } = this._config;
    this._submitButton.classList.remove(inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    const { submitButton, inactiveButtonClass } = this._config;
    if (this._hasInvalidInput(this._inputEls)) {
      this.disableButton(submitButton, { inactiveButtonClass });
      return;
    }
    this.enableButton(submitButton, { inactiveButtonClass });
  }

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._config;

    this._inputEls = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    this._submitButton = this._formElement.querySelector(submitButtonSelector);

    this._inputEls.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._formElement.reset();
    this._toggleButtonState();
  }
}
