import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";

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
].reverse();

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard('#card-container', item.link, item.name);
    cardsSection.addItem(cardElement)
  }
}, '.elements')
cardsSection.renderItems()

const userInfo = new UserInfo('.profile__name-text', '.profile__description')

const formEditElement = document.forms['profile-form'];
const formAddElement = document.forms['card-form'];

const popupEdit = new PopupWithForm('.popup_edit', formEditSubmitHandler, new FormValidator(validationObject, formEditElement));
const popupAdd = new PopupWithForm('.popup_add', addNewCard, new FormValidator(validationObject, formAddElement));

const popupPreview = new PopupWithImage('.popup_image-preview');

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

function createCard(templateSelector, link, text) {
  const newCard = new Card(templateSelector, link, text, handleCardClick);
  return newCard.getCard();
}

function addNewCard(formProps) {
  cardsSection.addItem(createCard('#card-container', formProps['image-link'], formProps['place-name']));
}

function handleCardClick(text, link) {
  popupPreview.open(text,link);
}

function formEditSubmitHandler(inputValues) {
  userInfo.setUserInfo(inputValues)
}

buttonEdit.addEventListener('click', () => {
  popupEdit.open(userInfo.getUserInfo());
});

buttonAdd.addEventListener('click', () => {
  popupAdd.open({});
});




