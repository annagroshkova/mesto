
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name-text');
let profileJob = document.querySelector('.profile__description');
let editButton = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

function openPopup() {
  popup.classList.add('popup_opened');

  nameInput.value=  profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);




