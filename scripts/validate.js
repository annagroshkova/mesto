enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
})

function enableValidation(obj) {
  console.log('you suck!')
  const formEl = document.querySelector(obj.formSelector);
  const inputList = Array.from(formEl.querySelectorAll(obj.formSelector));
  const buttonSubmit = formEl.querySelector(obj.submitButtonSelector);
  const formList = Array.from(document.querySelectorAll(obj.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
  })

  function showInputError(form, input, errorMessage) {
    console.log('still suck')
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.add(obj.inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(obj.errorClass);
  }

  function hideInputError(form, input) {
    console.log('still suck')
    const error = form.querySelector(`.${input.id}-error`);
    input.classList.remove(obj.inputErrorClass);
    error.textContent = '';
    error.classList.remove(obj.errorClass);
  }

  function setEventListeners(form) {
    console.log('still suck')
    toggleButtonState(inputList, buttonSubmit);

    inputList.forEach((input) => {
      input.addEventListener('input', function () {
        checkInputValidity(form, input);
        toggleButtonState(inputList, buttonSubmit);
      });
    });
  }

  const checkInputValidity = (form, input) => {
    if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage);
    } else {
      hideInputError(form, input);
    }
  }

  function hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  function toggleButtonState(inputList, buttonSubmit) {
    if (hasInvalidInput(inputList)) {
      buttonSubmit.classList.add(obj.inactiveButtonClass);
    } else {
      buttonSubmit.classList.remove(obj.inactiveButtonClass);
    }
  }

  setEventListeners(obj.formSelector)
}










