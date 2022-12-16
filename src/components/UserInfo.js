export class UserInfo {
  constructor(profileSelector, _handleAvatarEditClick) {
    this._handleAvatarEditClick = _handleAvatarEditClick;
    this._profileElement = document.querySelector(profileSelector);
    this._nameElement = this._profileElement.querySelector('.profile__name-text');
    this._aboutElement = this._profileElement.querySelector('.profile__description');
    this._profileAvatar = this._profileElement.querySelector('.profile__avatar');
    this._editAvatarBtn = this._profileElement.querySelector('.profile__avatar-edit-button');
    this._setEventListeners();
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
  setUserInfo(user) {
    this._nameElement.textContent = user.name;
    this._aboutElement.textContent = user.about;
    if (user.avatar) {
      this._profileAvatar.src = user.avatar;
    }
    if (user._id) {
      this._id = user._id;
    }
  }
  setAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }
  _setEventListeners() {
    this._editAvatarBtn.addEventListener('click', () => {
      this._handleAvatarEditClick(this._profileAvatar.src);
    });
  }
}
