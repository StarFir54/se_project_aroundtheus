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
      return _showInputError(formElement, inputElement, config);
    }
    _hideInputError(formElement, inputElement, config);
  }

  _setEventListeners(formElement, config) {
    const { inputSelector, submitButtonSelector } = config;
    const inputEls = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputEls.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        _checkInputValidity(formElement, inputElement, config);
        _toggleButtonState(inputEls, submitButton, config);
      });
    });
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
      disableButton(submitButton, { inactiveButtonClass });
      return;
    }
    enableButton(submitButton, { inactiveButtonClass });
  }

  enableValidation(config) {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    _setEventListeners(formElement, config);
  }
}
