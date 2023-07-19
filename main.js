import './style.css';
import{displayProjects} from "./modules/DOM_Projects.js"
import {validateInput} from './modules/FormValidation.js';
import {readTodos} from './modules/LocalStorage.js';
import {setActiveTab, displayActiveTodos} from './modules/DOM_Todos';

const inputs = document.querySelectorAll('input, select');
inputs.forEach((input) => {
  input.addEventListener('input', () => {
    validateInput(input);
  })
});
readTodos();
setActiveTab('Today');
displayActiveTodos();
displayProjects();