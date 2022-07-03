const initialCards = [
  {
    name: 'Стокгольм',
    link: 'images/stockholm.jpg'
  },
  {
    name: 'Мальмё',
    link: 'images/malmo-4208473.jpg'
  },
  {
    name: 'Гётеборг',
    link: 'images/gothenburg.jpg'
  },
  {
    name: 'Эресуннский мост',
    link: 'images/oresund_bridge.jpg'
  },
  {
    name: 'Лапландия',
    link: 'images/lappland.jpg'
  },
  {
    name: 'Остров Готланд',
    link: 'images/gotland.jpg'
  }
];

const elements = document.querySelector('.elements');
const cardContainer = document.querySelector('#card-container').content;

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.popup__form_edit');
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

initialCards.forEach(function(item) {

  const card = cardContainer.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardText = card.querySelector('.element__text');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardText.textContent = item.name;

  elements.append(card);
});


function openPopupEdit() {
  popupEdit.classList.add('popup_opened');

  nameInput.value=  profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
formEditElement.addEventListener('submit', formEditSubmitHandler);

document.querySelectorAll('.popup__close-button').forEach(function(closeButton) {
  closeButton.addEventListener('click', closePopup);
});




