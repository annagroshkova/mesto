enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
})

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((formEl) => {
    const inputList = Array.from(formEl.querySelectorAll(obj.inputSelector));
    const buttonSubmit = formEl.querySelector(obj.submitButtonSelector);

    formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    toggleButtonState(obj, inputList, buttonSubmit);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', function () {
        checkInputValidity(obj, formEl, inputEl);
        toggleButtonState(obj, inputList, buttonSubmit);
      });
    });
  })
}

function toggleButtonState(obj, inputList, buttonSubmit) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(obj.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', true);
  } else {
    buttonSubmit.classList.remove(obj.inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled');
  }
}

function showInputError(obj, formEl, inputEl, errorMessage) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.add(obj.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(obj.errorClass);
}

function hideInputError(obj, formEl, inputEl) {
  const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
  inputEl.classList.remove(obj.inputErrorClass);
  errorEl.textContent = '';
  errorEl.classList.remove(obj.errorClass);
}

function checkInputValidity(obj, formEl, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(obj, formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(obj, formEl, inputEl);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  })
}










