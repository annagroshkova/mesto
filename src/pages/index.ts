import { Card } from '../components/Card';
import { FormValidator } from '../components/FormValidator';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { UserInfo } from '../components/UserInfo';
import { Section } from '../components/Section';
import { buttonAdd, buttonEdit, validationObject } from '../utils/constants';
import './index.css';
import {api} from "../components/Api";

let cardsSection: Section

api.getInitialCards().then(cards => {
  cardsSection = new Section(
    {
      items: cards,
      renderer: item => {
        const cardElement = createCard('#card-container', item.link, item.name);
        cardsSection.addItem(cardElement);
      },
    },
    '.elements',
  );
  cardsSection.renderItems();
})


const userInfo = new UserInfo('.profile__name-text', '.profile__description');

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

function createCard(templateSelector: string, link: string, text: string): HTMLElement {
  const newCard = new Card(templateSelector, link, text, handleCardClick);
  return newCard.getCard();
}

function addNewCard(formProps: Record<any, string>): void {
  cardsSection.addItem(
    createCard('#card-container', formProps['image-link']!, formProps['place-name']!),
  );
}

function handleCardClick(text: string, link: string): void {
  popupPreview.open(text, link);
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
