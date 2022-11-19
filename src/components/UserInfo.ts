import { UserProps } from '../utils/constants';

export class UserInfo {
  constructor(nameSelector: string, aboutSelector: string) {
    this._nameElement = document.querySelector(nameSelector)!;
    this._aboutElement = document.querySelector(aboutSelector)!;
  }

  private _nameElement: HTMLElement;
  private _aboutElement: HTMLElement;

  getUserInfo(): UserProps {
    const userProps = {
      name: this._nameElement.textContent!,
      about: this._aboutElement.textContent!,
    };
    return userProps;
  }

  setUserInfo(userProps: UserProps): void {
    this._nameElement.textContent = userProps.name;
    this._aboutElement.textContent = userProps.about;
  }
}
