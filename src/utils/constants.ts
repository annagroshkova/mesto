export interface ValidationOptions {
  formSelector: string;
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export interface LikeObject {
  about: string;
  avatar: string;
  cohort: string;
  name: string;
  _id: string;
}

export interface UserObject {
  about: string;
  avatar: string;
  cohort?: string;
  name: string;
  _id: string;
}

export interface CardObject {
  createdAt: string;
  likes: LikeObject[];
  link: string;
  name: string;
  owner: UserObject;
  _id: string;
}

export const validationObject: ValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const buttonEdit = document.querySelector<HTMLButtonElement>('.profile__edit-button')!;
export const buttonAdd = document.querySelector<HTMLButtonElement>('.profile__add-button')!;
