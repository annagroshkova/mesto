export class FormValidator {
  constructor(_obj, _formElement) {
    this._obj = _obj;
    this._formElement = _formElement;
    this.enableValidation();
  }
  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._obj.submitButtonSelector);
    this._setEventListeners();
    this._toggleButtonState();
  }
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputEl => {
      this._hideInputError(inputEl);
    });
  }
  _setEventListeners() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._inputList.forEach(inputEl => {
      inputEl.addEventListener('input', () => {
        this._inputCheck(inputEl);
      });
    });
  }
  _toggleButtonState() {
    this._inputList.forEach(inputEl => {
      if (this._hasInvalidInput(inputEl) || inputEl.value === '') {
        this._buttonSubmit.classList.add(this._obj.inactiveButtonClass);
        this._buttonSubmit.setAttribute('disabled', 'true');
      } else {
        this._buttonSubmit.classList.remove(this._obj.inactiveButtonClass);
        this._buttonSubmit.removeAttribute('disabled');
      }
    });
  }
  _showInputError(inputEl, errorMessage) {
    const errorEl = this._formElement.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._obj.inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._obj.errorClass);
  }
  _hideInputError(inputEl) {
    const errorEl = this._formElement.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._obj.inputErrorClass);
    errorEl.textContent = '';
    errorEl.classList.remove(this._obj.errorClass);
  }
  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }
  _inputCheck(inputEl) {
    this._checkInputValidity(inputEl);
    this._toggleButtonState();
  }
  _hasInvalidInput(inputEl) {
    return !inputEl.validity.valid;
  }
}
