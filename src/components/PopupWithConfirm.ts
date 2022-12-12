import { Popup } from './Popup';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector: string) {
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector('.popup__confirm-button')!;
    this._setEventListeners();
  }

  private _buttonConfirm: HTMLButtonElement;
  private _handleConfirm!: () => any;

  override open(handleConfirm: () => any) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  private _setEventListeners(): void {
    this._buttonConfirm.addEventListener('click', () => {
      this._handleConfirm();
      this.close();
    });
  }
}
