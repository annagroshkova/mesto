import { PopupWithForm } from '../components/PopupWithForm';
import { Api } from '../components/Api';
import { buttonAdd, buttonEdit, validationObject } from '../utils/constants';
import { FormValidator } from '../components/FormValidator';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import './index.css';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '5d6a4a95-3b77-4e4c-9a74-5ef0cb01a629',
    'Content-Type': 'application/json',
  },
});

const formAvatarEditElement = document.forms['avatar-form'];

const popupAvatar = new PopupWithForm(
  '.popup_edit-avatar',
  form => {
    const { avatar } = form;
    userInfo.setAvatar(avatar);
    return api.patchAvatar(avatar);
  },
  new FormValidator(validationObject, formAvatarEditElement),
);

const userInfo = new UserInfo('.profile', avatar => {
  popupAvatar.open({
    avatar,
  });
});

const formEditElement = document.forms['profile-form'];
const formAddElement = document.forms['card-form'];

const popupEdit = new PopupWithForm(
  '.popup_edit',
  formEditSubmitHandler,
  new FormValidator(validationObject, formEditElement),
);
const popupAdd = new PopupWithForm(
  '.popup_add',
  addNewCard,
  new FormValidator(validationObject, formAddElement),
);
const popupPreview = new PopupWithImage('.popup_image-preview');
const popupConfirm = new PopupWithConfirm('.popup__confirm');

let cardsSection;
api.getUserInfo().then(user => {
  userInfo.setUserInfo(user);
})
  .then(() => api.getInitialCards())
  .then(cards => {
    cardsSection = new Section(
      {
        items: cards.reverse(),
        renderer: card => {
          const cardElement = createCard('#card-container', card);
          cardsSection.addItem(cardElement);
        },
      },
      '.elements',
    );
    cardsSection.renderItems();
  }).catch((err) => {
    console.log(err);
  });

function createCard(templateSelector, card) {
  const newCard = new Card(
    templateSelector,
    card,
    userInfo.getUserInfo()._id,
    () => {
      popupPreview.open(card.name, card.link);
    },
    handleConfirm => {
      popupConfirm.open(() => {
        handleConfirm();
        void api.deleteCard(card._id);
      });
    },
    (liked, handleLikes) => {
      api.likeCard(card._id, liked).then(card => {
        handleLikes(card.likes);
      });
    },
  );
  return newCard.getCard();
}

function addNewCard(form) {
  return api.postNewCard(form['place-name'], form['image-link']).then(card => {
    cardsSection.addItem(createCard('#card-container', card));
  });
}

function formEditSubmitHandler(form) {
  return api.patchUserInfo(form).then(user => {
    userInfo.setUserInfo(user);
  });
}

buttonEdit.addEventListener('click', () => {
  popupEdit.open(userInfo.getUserInfo());
});

buttonAdd.addEventListener('click', () => {
  popupAdd.open({});
});
