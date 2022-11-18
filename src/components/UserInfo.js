export class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const userProps = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return userProps;
  }

  setUserInfo(userProps) {
    this._nameElement.textContent = userProps.name;
    this._aboutElement.textContent = userProps.about;
  }
}
