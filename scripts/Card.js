import { openPopup, popupImage, popupPreview, popupUndertext } from './index.js';

export class Card {
  constructor(templateSelector, link, text) {
    this._templateSelector = templateSelector;
    this._link = link;
    this._text = text;

    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;

    this._cardText = this._cardElement.querySelector('.element__text');
    this._cardText.textContent = this._text;

    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._deleteButton = this._cardElement.querySelector('.element__trash-icon');
    this._imagePreview = this._cardElement.querySelector('.element__image');

    this._setEventListeners();
  }

  getCard() {
    return this._cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });

    this._imagePreview.addEventListener('click', () => {
      this._showImagePreview();
    });
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._deleteButton.closest('.element').remove();
  }

  _showImagePreview() {
    popupImage.src = this._link;
    popupImage.alt = this._text;
    popupUndertext.textContent = this._text;
    openPopup(popupPreview);
  }
}
