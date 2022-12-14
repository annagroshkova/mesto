import { CardObject, UserObject } from '../utils/constants';

export class Card {
  constructor(
    templateSelector: string,
    private _card: CardObject,
    private _myId: string,
    private _handleCardClick: () => any,
    private _handleCardDelete: (handleConfirm: () => any) => any,
    private _handleCardLike: (liked: boolean, handleLikes: (likes: UserObject[]) => any) => any,
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
    this._cardLikes.textContent = this._card.likes.length.toString();

    this._likeButton = this._cardElement.querySelector('.element__like-button')!;
    this._deleteButton = this._cardElement.querySelector('.element__trash-icon')!;

    if (_card.likes.some(like => like._id === _myId)) {
      this._likeButton.classList.add('element__like-button_active');
    }

    if (_myId === _card.owner._id) {
      this._deleteButton!.remove();
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
      this._handleCardClick();
    });
  }

  private _toggleLike(): void {
    this._likeButton.classList.toggle('element__like-button_active');
    const likedNow = this._card.likes.some(like => like._id === this._myId);

    this._handleCardLike(!likedNow, likes => {
      this._card.likes = likes;
      this._cardLikes.textContent = likes.length.toString();
    });
  }

  private _deleteCard(): void {
    this._handleCardDelete(() => {
      this._cardElement.remove();
    });
  }
}
