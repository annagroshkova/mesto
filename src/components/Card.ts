export class Card {
  constructor(
    templateSelector: string,
    private _link: string,
    private _text: string,
    private _handleCardClick: (text: string, link: string) => any,
  ) {
    this._cardElement = document
      .querySelector<HTMLTemplateElement>(templateSelector)!
      .content.querySelector('.element')!
      .cloneNode(true) as HTMLElement;

    this._cardImage = this._cardElement.querySelector('.element__image')!;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;

    this._cardText = this._cardElement.querySelector('.element__text')!;
    this._cardText.textContent = this._text;

    this._likeButton = this._cardElement.querySelector('.element__like-button')!;
    this._deleteButton = this._cardElement.querySelector('.element__trash-icon')!;

    this._setEventListeners();
  }

  private _cardElement: HTMLElement;
  private _cardImage: HTMLImageElement;
  private _cardText: HTMLImageElement;
  private _likeButton: HTMLButtonElement;
  private _deleteButton: HTMLButtonElement;

  getCard(): HTMLElement {
    return this._cardElement;
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._text, this._link);
    });
  }

  private _toggleLike(): void {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  private _deleteCard(): void {
    this._cardElement.remove();
  }
}
