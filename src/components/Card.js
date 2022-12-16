export class Card {
  constructor(
    templateSelector,
    _card,
    _myId,
    _handleCardClick,
    _handleCardDelete,
    _handleCardLike,
  ) {
    this._card = _card;
    this._myId = _myId;
    this._handleCardClick = _handleCardClick;
    this._handleCardDelete = _handleCardDelete;
    this._handleCardLike = _handleCardLike;
    this._cardElement = document
      .querySelector(templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardImage.src = this._card.link;
    this._cardImage.alt = this._card.name;
    this._cardText = this._cardElement.querySelector('.element__text');
    this._cardText.textContent = this._card.name;
    this._cardLikes = this._cardElement.querySelector('.element__likes-amount');
    this._cardLikes.textContent = this._card.likes.length.toString();
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._deleteButton = this._cardElement.querySelector('.element__trash-icon');
    if (_card.likes.some(like => like._id === _myId)) {
      this._likeButton.classList.add('element__like-button_active');
    }
    if (_myId !== _card.owner._id) {
      this._deleteButton.remove();
    }
    this._setEventListeners();
  }
  getCard() {
    return this._cardElement;
  }
  _setEventListeners() {
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
  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
    const likedNow = this._card.likes.some(like => like._id === this._myId);
    this._handleCardLike(!likedNow, likes => {
      this._card.likes = likes;
      this._cardLikes.textContent = likes.length.toString();
    });
  }
  _deleteCard() {
    this._handleCardDelete(() => {
      this._cardElement.remove();
    });
  }
}
