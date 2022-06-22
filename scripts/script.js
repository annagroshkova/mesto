
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');

function openPopup() {
  popup.classList.add('popup_opened');
  console.log('huy');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);



