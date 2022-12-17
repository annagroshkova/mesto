export class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const user = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._profileAvatar.src,
      _id: this._id,
    };
    return user;
  }
  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._profileAvatar.src = avatar;
    this._id = _id;
  }
}
