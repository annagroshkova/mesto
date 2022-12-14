import { Popup } from './Popup';
import { FormValidator } from './FormValidator';

export class PopupWithForm<FORM_OBJECT> extends Popup {
  constructor(
    popupSelector: string,
    private _formSubmitHandler: (obj: FORM_OBJECT) => Promise<void>,
    private _formValidator: FormValidator,
  ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form')!;
    this._submitButton = this._popup.querySelector('button[type="submit"]')!;
  }

  private _form: HTMLFormElement;
  private _submitButton: HTMLButtonElement;

  override open(formProps: Record<any, any>): void {
    this._submitButton.textContent = 'Сохранить';
    super.open();

    this._setInputValues(formProps);

    this._formValidator.resetValidation();
  }

  override close(): void {
    super.close();
    this._form.reset();
  }

  override setEventListeners(): void {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();

      this._submitButton.textContent = 'Сохранение...';

      this._formSubmitHandler(this._getInputValues()).then(() => {
        this.close();
      });
    });
  }

  _getInputValues(): FORM_OBJECT {
    const formData = new FormData(this._form);
    const formProps = Object.fromEntries(formData as any);
    return formProps as FORM_OBJECT;
  }

  _setInputValues(formProps: Record<any, string>): void {
    Object.keys(formProps).forEach(key => {
      const el = this._form.querySelector<HTMLInputElement>(`input[name="${key}"]`);
      if (el) {
        el.value = formProps[key]!;
      }
    });
  }
}
