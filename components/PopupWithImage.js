import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, formValidator) {
    super(popupSelector);
    this._formValidator = formValidator

    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupUndertext = this._popup.querySelector('.popup__undertext');
  }

  open(text,link) {
    this._popupImage.src = link;
    this._popupImage.alt = text;
    this._popupUndertext.textContent = text;
    super.open()
  }
}
