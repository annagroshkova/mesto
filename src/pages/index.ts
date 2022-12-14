import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { Section } from '../components/Section';
import {
  buttonAdd,
  buttonEdit,
  CardObject,
  UserObject,
  validationObject,
} from '../utils/constants';
import './index.css';
import { api } from '../components/Api';
import { PopupWithConfirm } from '../components/PopupWithConfirm';

const formAvatarEditElement = document.forms['avatar-form' as any]!;

const popupAvatar = new PopupWithForm(
  '.popup_edit-avatar',
  (formProps: Record<any, string>) => {
    const { avatar } = formProps as { avatar: string };
    userInfo.setAvatar(avatar);
    api.patchAvatar(avatar);
  },
  new FormValidator(validationObject, formAvatarEditElement),
);

const userInfo = new UserInfo('.profile', avatar => {
  popupAvatar.open({
    avatar,
  });
});

const formEditElement = document.forms['profile-form' as any]!;
const formAddElement = document.forms['card-form' as any]!;

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

let cardsSection: Section;

api.getInitialCards().then(cards => {
  cardsSection = new Section(
    {
      items: cards.reverse(),
      renderer: (card: CardObject) => {
        const cardElement = createCard('#card-container', card);
        cardsSection.addItem(cardElement);
      },
    },
    '.elements',
  );
  cardsSection.renderItems();
});

api.getUserInfo().then(user => {
  userInfo.setUserInfo(user);
});

function createCard(templateSelector: string, card: CardObject): HTMLElement {
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

function addNewCard(formProps: Record<any, string>): void {
  const name = formProps['place-name']!;
  const link = formProps['image-link']!;

  api.postNewCard(name, link).then(card => {
    cardsSection.addItem(createCard('#card-container', card));
  });
}

function formEditSubmitHandler(inputValues: {}): void {
  api.patchUserInfo(inputValues as any as UserObject).then(user => {
    userInfo.setUserInfo(user);
  });
}

buttonEdit.addEventListener('click', () => {
  popupEdit.open(userInfo.getUserInfo());
});

buttonAdd.addEventListener('click', () => {
  popupAdd.open({});
});
