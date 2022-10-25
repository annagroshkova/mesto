export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._formElement = formElement
  }

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._obj.submitButtonSelector);

    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._toggleButtonState();

    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._inputCheck(inputEl)
      });
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonSubmit.classList.add(this._obj.inactiveButtonClass);
      this._buttonSubmit.setAttribute('disabled', 'true');
    } else {
      this._buttonSubmit.classList.remove(this._obj.inactiveButtonClass);
      this._buttonSubmit.removeAttribute('disabled');
    }
  }

  _showInputError(inputEl, errorMessage) {
    this._errorEl = this._formElement.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._obj.inputErrorClass);
    this._errorEl.textContent = errorMessage;
    this._errorEl.classList.add(this._obj.errorClass);
  }

  _hideInputError(inputEl) {
    this._errorEl = this._formElement.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._obj.inputErrorClass);
    this._errorEl.textContent = '';
    this._errorEl.classList.remove(this._obj.errorClass);
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

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    })
  }
}






