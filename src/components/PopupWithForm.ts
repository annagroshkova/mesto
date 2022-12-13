import { Popup } from './Popup';
import { FormValidator } from './FormValidator';

export class PopupWithForm extends Popup {
  constructor(
    popupSelector: string,
    private _formSubmitHandler: (formProps: Record<any, string>) => any,
    private _formValidator: FormValidator,
  ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form')!;
  }

  private _form: HTMLFormElement;

  override open(formProps: Record<any, any>): void {
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
      this._formSubmitHandler(this._getInputValues());
      this.close();
    });
  }

  _getInputValues(): Record<any, string> {
    const formData = new FormData(this._form);
    const formProps = Object.fromEntries(formData as any);
    return formProps;
  }

  _setInputValues(formProps: Record<any, string>): void {
    Object.keys(formProps).forEach(key => {
      const el = this._form.querySelector<HTMLInputElement>(`input[name="${key}"]`)
      if (el) {
        el.value = formProps[key]!;
      }
    });
  }
}
