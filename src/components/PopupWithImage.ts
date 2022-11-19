import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  constructor(popupSelector: string) {
    super(popupSelector);

    this._popupImage = this._popup.querySelector('.popup__image')!;
    this._popupUndertext = this._popup.querySelector('.popup__undertext')!;
  }

  private _popupImage: HTMLImageElement;
  private _popupUndertext: HTMLElement;

  override open(text: string, link: string): void {
    this._popupImage.src = link;
    this._popupImage.alt = text;
    this._popupUndertext.textContent = text;
    super.open();
  }
}
