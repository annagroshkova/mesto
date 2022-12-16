import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupUndertext = this._popup.querySelector('.popup__undertext');
  }
  open(text, link) {
    this._popupImage.src = link;
    this._popupImage.alt = text;
    this._popupUndertext.textContent = text;
    super.open();
  }
}
