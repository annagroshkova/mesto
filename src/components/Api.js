export class Api {
  constructor(_options) {
    this._options = _options;
  }
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  patchUserInfo(user) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  patchAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  postNewCard(name, link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
  likeCard(cardId, liked) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: liked ? 'PUT' : 'DELETE',
      headers: this._options.headers,
    }).then(res => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)));
  }
}
