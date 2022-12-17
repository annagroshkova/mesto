export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeBtn = this._popup.querySelector('.popup__close-button');
    this.setEventListeners();
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
