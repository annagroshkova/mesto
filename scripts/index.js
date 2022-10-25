import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Стокгольм',
    link: 'images/stockholm.jpg',
  },
  {
    name: 'Мальмё',
    link: 'images/malmo-4208473.jpg',
  },
  {
    name: 'Гётеборг',
    link: 'images/gothenburg.jpg',
  },
  {
    name: 'Эресуннский мост',
    link: 'images/oresund_bridge.jpg',
  },
  {
    name: 'Лапландия',
    link: 'images/lappland.jpg',
  },
  {
    name: 'Остров Готланд',
    link: 'images/gotland.jpg',
  },
];

const elements = document.querySelector('.elements');

const popupOverlayList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
export const popupPreview = document.querySelector('.popup_image-preview');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const buttonClosePopupEdit = popupEdit.querySelector('.popup__close-button');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close-button');
const buttonClosePopupPreview = popupPreview.querySelector('.popup__close-button');

export const popupImage = popupPreview.querySelector('.popup__image');
export const popupUndertext = popupPreview.querySelector('.popup__undertext');

const formAddElement = document.querySelector('.popup__form_add');
const imageInput = document.querySelector('.popup__input_type_link');
const placeInput = document.querySelector('.popup__input_type_place');

const formEditElement = document.querySelector('.popup__form_edit');
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

initialCards.forEach(function (item) {
  const initialCard = new Card('#card-container', item.link, item.name);
  const initialCardElement = initialCard.getCard();
  elements.append(initialCardElement);
});

function addNewCard(evt) {
  evt.preventDefault();

  const newCard = new Card('#card-container', imageInput.value, placeInput.value);
  elements.prepend(newCard.getCard());

  closePopup(popupAdd);
}

function enableFormsValidation() {
  const formList = document.querySelectorAll('.popup__form');
  formList.forEach(formElement => {
    const form = new FormValidator(validationObject, formElement);
    form.enableValidation();
  });
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) {
      closePopup(popup);
    }
  }
}

function formEditSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEdit);
}

buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  imageInput.value = '';
  placeInput.value = '';
  openPopup(popupAdd);
});

buttonClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

buttonClosePopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

buttonClosePopupPreview.addEventListener('click', () => {
  closePopup(popupPreview);
});

popupOverlayList.forEach(popupOverlay => {
  popupOverlay.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popupOverlay);
    }
  });
});

formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', addNewCard);

enableFormsValidation();
