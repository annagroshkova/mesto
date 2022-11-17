import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import {PopupWithImage} from "./PopupWithImage.js";
import {PopupWithForm} from "./PopupWithForm.js";

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

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const elementsContainer = document.querySelector('.elements');
const formEditElement = document.forms['profile-form'];
const formAddElement = document.forms['card-form'];

const popupEdit = new PopupWithForm('.popup_edit', formEditSubmitHandler, new FormValidator(validationObject, formEditElement));
const popupAdd = new PopupWithForm('.popup_add', addNewCard, new FormValidator(validationObject, formAddElement));

const popupPreview = new PopupWithImage('.popup_image-preview');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__description');


initialCards.forEach(function (item) {
  const initialCard = createCard('#card-container', item.link, item.name);
  elementsContainer.append(initialCard);
});

function createCard(templateSelector, link, text) {
  const newCard = new Card(templateSelector, link, text, handleCardClick);
  return newCard.getCard();
}

function addNewCard(formProps) {
  elementsContainer.prepend(createCard('#card-container', formProps['image-link'], formProps['place-name']));
}

function handleCardClick(text, link) {
  popupPreview.open(text,link);
}

function formEditSubmitHandler(inputValues) {

  profileName.textContent = inputValues.name;
  profileJob.textContent = inputValues.about;
}

buttonEdit.addEventListener('click', () => {
  popupEdit.open({
    name: profileName.textContent,
    about: profileJob.textContent,
  });
});

buttonAdd.addEventListener('click', () => {
  popupAdd.open({});
});




