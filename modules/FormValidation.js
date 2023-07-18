import {getProject} from './Projects';

function showError(input, message) {
  const inputErrorMessage = input.nextElementSibling;
  inputErrorMessage.textContent = message;
  input.classList.add('form-input_error');
}

function clearError(input) {
  const inputErrorMessage = input.nextElementSibling;
  inputErrorMessage.textContent = '';
  input.classList.remove('form-input_error');
}

function clearFormErrors(inputs) {
  inputs.forEach((input) => {
    clearError(input);
  })
}

function validateInput(input) {
  clearError(input);
  if(input.id === 'project-title' && getProject(input.value.trim()) !== undefined) {
    showError(input, 'Project already exists');
  }
  else if(input.validity.valueMissing) {
    showError(input, 'Required Field');
  }
  else {return true;}
  return false;
}

function isValid(inputs) {
  let valid = true;
  inputs.forEach((input) => {
    if(!validateInput(input)) {valid = false}
  });
  return valid;
}

export {validateInput, isValid, clearFormErrors};