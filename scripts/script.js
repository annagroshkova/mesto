const elements = document.querySelector('.elements');
const cardContainer = document.querySelector('#card-container').content;

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

const formAddElement = document.querySelector('.popup__form_add');
const imageInput = document.querySelector('.popup__input_type_link');
const placeInput = document.querySelector('.popup__input_type_place');

const formEditElement = document.querySelector('.popup__form_edit');
const profileName = document.querySelector('.profile__name-text');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const inputs = document.querySelectorAll('.popup__input');

initialCards.forEach(function(item) {
  const initialCard = createCard(item.link, item.name);
  elements.append(initialCard);
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

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like-button_active');
  });

  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.element').remove();
  });

  imagePreview.addEventListener('click', () => {

    popupImage.src = link;
    popupImage.alt = text;
    popupUndertext.textContent = text;

    openPopup(popupPreview);
  });

  return card;
}

 function addNewCard (evt) {
   evt.preventDefault();

   const newCard = createCard(imageInput.value, placeInput.value);
   elements.prepend(newCard);

   closePopup(popupAdd);
 }

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);

}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
  inputs.forEach((item) => {
    item.value = ''
  })
}

function closePopupEscape (evt) {
  if (evt.key === 'Escape') {
   const popup = document.querySelector('.popup_opened');
   if(popup) {
     closePopup(popup)
   }
  }
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupEdit);
}


buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

buttonAdd.addEventListener('click', () => {
openPopup(popupAdd)
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

popupOverlayList.forEach((popupOverlay) => {
  popupOverlay.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popupOverlay);
    }
  });
});

formEditElement.addEventListener('submit', formEditSubmitHandler);
formAddElement.addEventListener('submit', addNewCard);





