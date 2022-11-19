export const initialCards = [
  {
    name: 'Стокгольм',
    link: require('../images/stockholm.jpg'),
  },
  {
    name: 'Мальмё',
    link: require('../images/malmo-4208473.jpg'),
  },
  {
    name: 'Гётеборг',
    link: require('../images/gothenburg.jpg'),
  },
  {
    name: 'Эресуннский мост',
    link: require('../images/oresund_bridge.jpg'),
  },
  {
    name: 'Лапландия',
    link: require('../images/lappland.jpg'),
  },
  {
    name: 'Остров Готланд',
    link: require('../images/gotland.jpg'),
  },
].reverse();

export const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
