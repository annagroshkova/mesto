export class Popup {
  constructor(popupSelector: string) {
    this._popup = document.querySelector(popupSelector)!;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeBtn = this._popup.querySelector('.popup__close-button')!;

    this.setEventListeners();
  }

  protected _popup: HTMLElement;
  private _closeBtn: HTMLButtonElement;

  open(..._args: any[]): void {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(): void {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners(): void {
    this._closeBtn.addEventListener('click', () => this.close());

    this._popup.addEventListener('click', evt => {
      if ((evt.target as HTMLElement).classList.contains('popup')) {
        this.close();
      }
    });
  }

  private _handleEscClose(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
