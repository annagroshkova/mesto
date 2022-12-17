// @ts-check

export class Api {
  /**
   * @param {{ baseUrl: string; headers: HeadersInit}} _options
   */
  constructor(_options) {
    this._options = _options;
  }

  /**
   * @param res {Response}
   * @returns {Promise<any>}
   */
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  /**
   * @param url {string}
   * @param options {RequestInit}
   * @returns {Promise<any>}
   */
  _request(url, options = {}) {
    return fetch(`${this._options.baseUrl}/${url}`, {
      headers: this._options.headers,
      ...options,
    }).then(this._checkResponse);
  }

  /**
   * @returns {Promise<any>}
   */
  getInitialCards() {
    return this._request(`cards`);
  }

  /**
   * @returns {Promise<any>}
   */
  getUserInfo() {
    return this._request(`users/me`);
  }

  /**
   * @param {{ name: string; about: string; }} user
   * @returns {Promise<any>}
   */
  patchUserInfo(user) {
    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    });
  }

  /**
   * @param {string} avatar
   * @returns {Promise<any>}
   */
  patchAvatar(avatar) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar,
      }),
    });
  }

  /**
   * @param {string} name
   * @param {string} link
   * @returns {Promise<any>}
   */
  postNewCard(name, link) {
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  /**
   * @param {string} cardId
   * @returns {Promise<any>}
   */
  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  /**
   * @param {string} cardId
   * @param {string} liked
   * @returns {Promise<any>}
   */
  likeCard(cardId, liked) {
    return this._request(`cards/${cardId}/likes`, {
      method: liked ? 'PUT' : 'DELETE',
    });
  }
}
