export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorMessageEl = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorMessageEl = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  _checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      return this._showInputError(formElement, inputElement, config);
    }
    this._hideInputError(formElement, inputElement, config);
  }

  _hasInvalidInput(inputEls) {
    return inputEls.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableButton(submitButton, { inactiveButtonClass }) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  }

  _enableButton(submitButton, { inactiveButtonClass }) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(submitButton, { inactiveButtonClass });
      return;
    }
    this._enableButton(submitButton, { inactiveButtonClass });
  }

  _setEventListeners(formElement, config) {
    const { inputSelector, submitButtonSelector } = config;
    const inputEls = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputEls.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(inputEls, submitButton, config);
      });
    });
  }

  enableValidation(config, formElement) {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(formElement, config);
  }
}
