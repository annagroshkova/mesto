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

const userInfo = new UserInfo('.profile');

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
      items: cards,
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
  const newCard = new Card(templateSelector, card, handleCardClick, (id, handleConfirm) => {
    popupConfirm.open(() => {
      handleConfirm();

      // todo: api delete
    });
  });

  return newCard.getCard();
}

function addNewCard(formProps: Record<any, string>): void {
  cardsSection.addItem(
    createCard('#card-container', {
      _id: 'todo',
      name: formProps['place-name']!,
      link: formProps['image-link']!,
    } as CardObject),
  );
}

function handleCardClick(card: CardObject): void {
  popupPreview.open(card.name, card.link);
}

function formEditSubmitHandler(inputValues: Record<any, string>): void {
  userInfo.setUserInfo(inputValues as any);
}

buttonEdit.addEventListener('click', () => {
  popupEdit.open(userInfo.getUserInfo());
});

buttonAdd.addEventListener('click', () => {
  popupAdd.open({});
});
