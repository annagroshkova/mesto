import { CardObject } from '../utils/constants';

export class Card {
  constructor(
    templateSelector: string,
    private _card: CardObject,
    isMyOwn: boolean,
    private _handleCardClick: (card: CardObject) => any,
    private _handleCardDelete: (cardId: string, handleConfirm: () => any) => any,
  ) {
    this._cardElement = document
      .querySelector<HTMLTemplateElement>(templateSelector)!
      .content.querySelector('.element')!
      .cloneNode(true) as HTMLElement;

    this._cardImage = this._cardElement.querySelector('.element__image')!;
    this._cardImage.src = this._card.link;
    this._cardImage.alt = this._card.name;

    this._cardText = this._cardElement.querySelector('.element__text')!;
    this._cardText.textContent = this._card.name;

    this._cardLikes = this._cardElement.querySelector('.element__likes-amount')!;
    this._cardLikes.textContent = this._card.likes.length.toString()!;

    this._likeButton = this._cardElement.querySelector('.element__like-button')!;
    this._deleteButton = this._cardElement.querySelector('.element__trash-icon')!;

    if (!isMyOwn) {
      this._deleteButton!.remove()
    }

    this._setEventListeners();
  }

  private _cardElement: HTMLElement;
  private _cardImage: HTMLImageElement;
  private _cardLikes: HTMLElement;
  private _cardText: HTMLImageElement;
  private _likeButton: HTMLButtonElement;
  private _deleteButton?: HTMLButtonElement;

  getCard(): HTMLElement {
    return this._cardElement;
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener('click', () => {
        this._deleteCard();
      });
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._card);
    });
  }

  private _toggleLike(): void {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  private _deleteCard(): void {
    this._handleCardDelete(this._card._id, () => {
      this._cardElement.remove();
    });
  }
}
