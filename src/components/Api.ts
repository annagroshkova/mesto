import { CardObject, UserObject } from '../utils/constants';

class Api {
  constructor(
    private _options: {
      baseUrl: string;
      headers: any;
    },
  ) {}

  getInitialCards(): Promise<CardObject[]> {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  getUserInfo(): Promise<UserObject> {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  patchUserInfo(user: UserObject): Promise<UserObject> {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  patchAvatar(avatar: string): Promise<void> {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar,
      })
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  postNewCard(name: string, link: string): Promise<CardObject> {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name, link
      })
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }

  deleteCard(cardId: string): Promise<void> {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '5d6a4a95-3b77-4e4c-9a74-5ef0cb01a629',
    'Content-Type': 'application/json',
  },
});
