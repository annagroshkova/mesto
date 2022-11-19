import { ValidationOptions } from '../utils/constants';

export class FormValidator {
  constructor(private _obj: ValidationOptions, private _formElement: HTMLFormElement) {
    this.enableValidation();
  }

  private _inputList!: HTMLInputElement[];
  private _buttonSubmit!: HTMLButtonElement;

  enableValidation(): void {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._obj.inputSelector));
    this._buttonSubmit = this._formElement.querySelector(this._obj.submitButtonSelector)!;

    this._setEventListeners();

    this._toggleButtonState();
  }

  resetValidation(): void {
    this._toggleButtonState();
    this._inputList.forEach(inputEl => {
      this._hideInputError(inputEl);
    });
  }

  private _setEventListeners(): void {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._inputList.forEach(inputEl => {
      inputEl.addEventListener('input', () => {
        this._inputCheck(inputEl);
      });
    });
  }

  private _toggleButtonState(): void {
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

  _showInputError(inputEl: HTMLInputElement, errorMessage: string): void {
    const errorEl = this._formElement.querySelector(`.${inputEl.id}-error`)!;
    inputEl.classList.add(this._obj.inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(this._obj.errorClass);
  }

  _hideInputError(inputEl: HTMLInputElement): void {
    const errorEl = this._formElement.querySelector(`.${inputEl.id}-error`)!;
    inputEl.classList.remove(this._obj.inputErrorClass);
    errorEl.textContent = '';
    errorEl.classList.remove(this._obj.errorClass);
  }

  _checkInputValidity(inputEl: HTMLInputElement): void {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _inputCheck(inputEl: HTMLInputElement): void {
    this._checkInputValidity(inputEl);
    this._toggleButtonState();
  }

  private _hasInvalidInput(inputEl: HTMLInputElement): boolean {
    return !inputEl.validity.valid;
  }
}
