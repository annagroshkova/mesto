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
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popupPreview = document.querySelector('.popup_image-preview');
const popupImage = popupPreview.querySelector('.popup__image');
const popupUndertext = popupPreview.querySelector('.popup__undertext');
const formAddElement = document.querySelector('.popup__form_add');
const imageInput = document.querySelector('.popup__input_type_link');
const placeInput = document.querySelector('.popup__input_type_place');
const formEditElement = document.querySelector('.popup__form_edit');
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

initialCards.forEach(function(item) {
  createCard(item.link, item.name);
});

function createCard(link, text) {
  const card = cardContainer.querySelector('.element').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardText = card.querySelector('.element__text');
  const likeButton = card.querySelector('.element__like-button');
  const deleteButton = card.querySelector('.element__trash-icon');
  const imagePreview = card.querySelector('.element__image');

  cardImage.src = link;
  cardImage.alt = text;
  cardText.textContent = text;

  elements.append(card);

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.element').remove();
  });

  imagePreview.addEventListener('click', () => {
    popupPreview.classList.add('popup_opened');

    popupImage.src = link;
    popupImage.alt = text;
    popupUndertext.textContent = text;
  });
}

 function addNewCard (evt) {
   evt.preventDefault();

   createCard(imageInput.value, placeInput.value)

   closePopup();
 }


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


buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);
formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', addNewCard);
document.querySelectorAll('.popup__close-button').forEach(function(closeButton) {
  closeButton.addEventListener('click', closePopup);
});




