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

const elementsContainer = document.querySelector('.elements');

const popupOverlayList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPreview = document.querySelector('.popup_image-preview');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const buttonClosePopupEdit = popupEdit.querySelector('.popup__close-button');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close-button');
const buttonClosePopupPreview = popupPreview.querySelector('.popup__close-button');

const popupImage = popupPreview.querySelector('.popup__image');
const popupUndertext = popupPreview.querySelector('.popup__undertext');

const formAddElement = document.forms['card-form'];
const imageInput = document.querySelector('.popup__input_type_link');
const placeInput = document.querySelector('.popup__input_type_place');

const formEditElement = document.forms['profile-form'];
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

const formValidators = {};

function enableFormsValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

initialCards.forEach(function (item) {
  const initialCard = createCard('#card-container', item.link, item.name);
  elementsContainer.append(initialCard);
});

function createCard(templateSelector, link, text) {
  const newCard = new Card(templateSelector, link, text, handleCardClick);
  return newCard.getCard();
}

function addNewCard(evt) {
  evt.preventDefault();

  elementsContainer.prepend(createCard('#card-container', imageInput.value, placeInput.value));

  evt.target.reset();

  closePopup(popupAdd);
}

function handleCardClick(text, link) {
  popupImage.src = link;
  popupImage.alt = text;
  popupUndertext.textContent = text;
  openPopup(popupPreview);
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
  formValidators['profile-form'].resetValidation();
  openPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
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

enableFormsValidation(validationObject);
