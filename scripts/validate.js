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

    toggleButtonState(inputList, buttonSubmit);

    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', function () {
        checkInputValidity(formEl, inputEl);
        toggleButtonState(inputList, buttonSubmit);
      });
    });
  })

  function toggleButtonState(inputList, buttonSubmit) {
    if (hasInvalidInput(inputList)) {
      buttonSubmit.classList.add(obj.inactiveButtonClass);
    } else {
      buttonSubmit.classList.remove(obj.inactiveButtonClass);
    }
  }

  function showInputError(formEl, inputEl, errorMessage) {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(obj.inputErrorClass);
    errorEl.textContent = errorMessage;
    errorEl.classList.add(obj.errorClass);
  }

  function hideInputError(formEl, inputEl) {
    const errorEl = formEl.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(obj.inputErrorClass);
    errorEl.textContent = '';
    errorEl.classList.remove(obj.errorClass);
  }

  function checkInputValidity(formEl, inputEl) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
      hideInputError(formEl, inputEl);
    }
  }

  function hasInvalidInput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    })
  }
}










