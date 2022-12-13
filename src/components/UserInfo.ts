import { UserObject } from '../utils/constants';

export class UserInfo {
  constructor(profileSelector: string) {
    this._profileElement = document.querySelector(profileSelector)!;
    this._nameElement = this._profileElement.querySelector('.profile__name-text')!;
    this._aboutElement = this._profileElement.querySelector('.profile__description')!;
    this._profileAvatar = this._profileElement.querySelector('.profile__avatar')!;
  }

  private _profileElement: HTMLElement;
  private _profileAvatar: HTMLImageElement;
  private _nameElement: HTMLElement;
  private _aboutElement: HTMLElement;
  private _id?: string;

  getUserInfo(): UserObject {
    const user: UserObject = {
      name: this._nameElement.textContent!,
      about: this._aboutElement.textContent!,
      avatar: this._profileAvatar.src,
      _id: this._id!,
    };
    return user;
  }

  setUserInfo(user: UserObject): void {
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;
    if (user.avatar) {
      this._profileAvatar.src = user.avatar;
    }
    if (user._id) {
      this._id = user._id;
    }
  }
}
