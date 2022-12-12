import { CardObject } from '../utils/constants';

class Api {
  constructor(
    private options: {
      baseUrl: string;
      headers: any;
    },
  ) {
    // тело конструктора
  }

  getInitialCards(): Promise<CardObject[]> {
    return fetch(`${this.options.baseUrl}/cards`, {
      headers: this.options.headers,
    }).then(res => res.json());
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '5d6a4a95-3b77-4e4c-9a74-5ef0cb01a629',
    'Content-Type': 'application/json',
  },
});
