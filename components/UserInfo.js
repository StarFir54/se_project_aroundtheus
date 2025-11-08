export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._name = document.querySelector(nameSelector); //Find the Profile Name
    this._title = document.querySelector(descriptionSelector); //Find the Profile Title/Description
  }

  getUserInfo() {
    //Creates an Object containing the Name and Description/Title
    const userData = {
      name: this._name.textContent,
      description: this._title.textContent,
    };
    return userData;
  }

  setUserInfo(data) {
    //Sets the Name and Description/Title for a given Object
    this._name.textContent = data.name;
    this._title.textContent = data.description;
  }
}
