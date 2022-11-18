import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler, formValidator) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._formValidator = formValidator;
  }

  open(formProps) {
    super.open();

    this._setInputValues(formProps);

    this._formValidator.resetValidation();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    const formProps = Object.fromEntries(formData);
    return formProps;
  }

  _setInputValues(formProps) {
    Object.keys(formProps).forEach(key => {
      this._form.querySelector(`input[name="${key}"]`).value = formProps[key];
    });
  }
}
