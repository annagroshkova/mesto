
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let editButton = document.querySelector('.profile__edit-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()

 // Находим поля формы в DOM
  let nameInput = document.querySelector('.popup__input_name');// Воспользуйтесь инструментом .querySelector()
  let jobInput = document.querySelector('.popup__input_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
  function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    nameInput.textContent = nameInput.value;
    jobInput.textContent = jobInput.value;// Получите значение полей jobInput и nameInput из свойства value

   let profileName = document.querySelector('.profile__name-text');
   let profileJob = document.querySelector('.profile__description');// Выберите элементы, куда должны быть вставлены значения полей

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;// Вставьте новые значения с помощью textContent

    console.log(nameInput.value);

    closePopup();
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



