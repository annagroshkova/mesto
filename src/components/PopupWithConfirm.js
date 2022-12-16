import { Popup } from './Popup';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirm = this._popup.querySelector('.popup__confirm-button');
    this._setEventListeners();
  }
  open(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }
  _setEventListeners() {
    this._buttonConfirm.addEventListener('click', () => {
      this._handleConfirm();
      this.close();
    });
  }
}
