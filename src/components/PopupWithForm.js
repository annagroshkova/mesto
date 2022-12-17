import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, _formSubmitHandler, _formValidator) {
    super(popupSelector);
    this._formSubmitHandler = _formSubmitHandler;
    this._formValidator = _formValidator;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('button[type="submit"]');
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
      this._submitButton.textContent = 'Сохранение...';
      this._formSubmitHandler(this._getInputValues())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._submitButton.textContent = 'Сохранить';
        });
    });
  }
  _getInputValues() {
    const formData = new FormData(this._form);
    const formProps = Object.fromEntries(formData);
    return formProps;
  }
  _setInputValues(formProps) {
    Object.keys(formProps).forEach(key => {
      const el = this._form.querySelector(`input[name="${key}"]`);
      if (el) {
        el.value = formProps[key];
      }
    });
  }
}
