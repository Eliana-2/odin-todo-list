import {makeIcon, makeTextContainer, /*makeButton,*/ makeIconButton} from "./DOM_Elements.js";
import {getProject, getProjects} from './Projects.js';
import {clearFormErrors, isValid} from './FormValidation.js';
import {saveTodos} from './LocalStorage.js';

const todoList = document.querySelector('.todos-list');
let formType = 'Add';
let formCurrentProjectName = '';
let formCurrentTodo = '';
let activeTab = '';
let hasAnimation = true;

function setActiveTab(tabName) {
  activeTab = tabName;
  const navTexts = document.querySelectorAll('.tab-text');
  navTexts.forEach((navText) => {
    if(navText.textContent === tabName) {
      navText.parentNode.classList.add('tab_highlight');
    }
    else {
      navText.parentNode.classList.remove('tab_highlight');
    }
  })
}

function setupMainContainer(headingText, iconSrc, isProject) {
  setActiveTab(headingText);
  todoList.innerHTML = '';
  document.querySelector('.main-heading').textContent = headingText;
  document.querySelector('.main-icon').src = iconSrc;
  document.querySelector('.todos-heading').textContent = 'To-Dos';
  document.querySelector('.todos-icon').setAttribute('src', '../icons/plus.svg');
  document.querySelector('.todos-icon').addEventListener('click', () => {
    const projectName = (isProject) ? headingText : '';
    addTodoElement(projectName);
  });
}

function showTodoForm(todo='') {
  document.querySelector('.todo-form .form-heading').textContent = `${formType} To-Do`;
  if(formType === 'Edit') {
    disableFormSelect(formCurrentProjectName);
    document.querySelector('#todo-title').value = todo.getTitle();
    document.querySelector('#todo-description').value = todo.getDescription();
    document.querySelector('#todo-date').value = todo.getDueDate();
    document.querySelector('#todo-priority').value = todo.getPriority();
    document.querySelector('#todo-notes').value = todo.getNotes();
  }
  else {
    const inputs = document.querySelectorAll('.todo-form .form-input');
    inputs.forEach((input) => {
      input.value = '';
    })
    enableFormSelect();
  }
  document.querySelector('#todo-project').value = formCurrentProjectName;
  document.querySelector('.todo-form .submit').textContent = `${formType}`;
  document.querySelector('.todo-dialog').showModal();
}

function disableFormSelect(selectValue) {
  const selectOptions = document.querySelectorAll('#todo-project option');
  selectOptions.forEach((option) => {
    option.hidden = (option.value === selectValue) ? false : true;
  })
}

function enableFormSelect() {
  const selectOptions = document.querySelectorAll('#todo-project option');
  selectOptions.forEach((option) => {
    option.hidden = false;
  })
}

function hideTodoForm() {
  clearFormErrors(document.querySelectorAll('.todo-form select, .todo-form input'));
  document.querySelector('.todo-dialog').close();
  displayActiveTodosNoAnimation();
}

function checkTodoElement(todo, button) {
  todo.setIsComplete(!todo.getIsComplete());
  button.firstElementChild.src = (todo.getIsComplete()) ? '../icons/check-circle-outline.svg' : '../icons/circle-outline.svg';
  button.ariaLabel = (todo.getIsComplete()) ? 'Mark incomplete' : 'Mark complete';
}

function addTodoElement(projectName) {
  formType = 'Add';
  formCurrentProjectName = projectName;
  showTodoForm();
}

function editTodoElement(project, todo) {
  formType = 'Edit';
  formCurrentProjectName = project.getProjectName();
  formCurrentTodo = todo;
  showTodoForm(todo);
}

function formatDate(dueDate) {
  const yearMonthDay = dueDate.split('-');
  return yearMonthDay[1] + '/' + yearMonthDay[2] + '/' + yearMonthDay[0];
}

function displayTodo(todo, project) {
  const todoElement = document.createElement('li');
  todoElement.classList.add('todo');
  if(hasAnimation) {todoElement.classList.add('todo_animation')};

  const checkIconSrc = (todo.getIsComplete() === false) ? '../icons/circle-outline.svg' : '../icons/check-circle-outline.svg';
  const checkIconClass = (todo.getPriority() === 'High') ? 'check_high' :
  (todo.getPriority() === 'Medium') ? 'check_medium' : 'check_low';
  const checkButtonLabel = (todo.getIsComplete() === false) ? 'Mark complete' : 'Mark incomplete';
  const checkButton = makeIconButton(checkIconSrc, ['todo-icon', 'check', checkIconClass], ['todo-button'], checkButtonLabel, () => {checkTodoElement(todo, checkButton);});
  todoElement.appendChild(checkButton);

  const todoTitle = makeTextContainer(['todo-title'], todo.getTitle());
  todoElement.appendChild(todoTitle);

  const todoDate = makeTextContainer(['todo-date'], formatDate(todo.getDueDate()));
  todoElement.appendChild(todoDate);

  const editButton = makeIconButton('../icons/square-edit-outline.svg', ['todo-icon', 'edit'], ['todo-button'], 'Edit to-do', () => {editTodoElement(project, todo);});
  todoElement.appendChild(editButton);

  const deleteButton = makeIconButton('../icons/trash-can-outline.svg', ['todo-icon', 'delete'], ['todo-button'], 'Delete todo', () => {removeTodoElement(project, todo);});
  todoElement.appendChild(deleteButton);

  todoList.appendChild(todoElement);
}

function displayProjectTodos(project) {
  setupMainContainer(project.getProjectName(), '../icons/text-box-check-outline.svg',true);
  project.getTodos().forEach((todo) => {
    displayTodo(todo, project);
  })
}

function formatCurrentDate() {
  const date = new Date();
  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let year = date.getFullYear();
  return year + '-' + month + '-' + day;
}

function isUpcoming(dueDate) {
  const dueDateDay = dueDate.split('-')[2];
  const dueDateMonth = dueDate.split('-')[1];
  const dueDateYear = dueDate.split('-')[0];
  const dueDateObj = new Date(`${dueDateYear}, ${dueDateMonth}, ${dueDateDay}`);
  const MILLISECONDS_IN_WEEK = 604800000;
  const currentDate = new Date();
  const currentDateStart = new Date(currentDate.getFullYear() + ',' + (currentDate.getMonth() + 1) + ',' + currentDate.getDate());
  return dueDateObj.valueOf() - currentDateStart.valueOf() >= 0 && dueDateObj.valueOf() - currentDateStart.valueOf() <= MILLISECONDS_IN_WEEK;
}

function displayTodayTodos() {
  setupMainContainer('Today', '../icons/calendar-today.svg', false);
  getProjects().forEach((project) => {
    project.getTodos().filter(todo => todo.getDueDate() === formatCurrentDate()).forEach((todo) => {
      displayTodo(todo, project);
    })
  })
}

function displayUpcomingTodos() {
  setupMainContainer('Upcoming', '../icons/calendar-week.svg', false);
  getProjects().forEach((project) => {
    project.getTodos().filter(todo => isUpcoming(todo.getDueDate())).forEach((todo) => {
      displayTodo(todo, project);
    });
  })
}

function displayImportantTodos() {
  setupMainContainer('Important', '../icons/calendar-star.svg', false);
  getProjects().forEach((project) => {
    project.getTodos().filter(todo => todo.getPriority() === 'High').forEach((todo) => {
      displayTodo(todo,project);
    });
  })
}

function displayActiveTodos() {
  switch(activeTab) {
    case 'Today':
      displayTodayTodos();
      break;
    case 'Upcoming':
      displayUpcomingTodos();
      break;
    case 'Important':
      displayImportantTodos();
      break;
    default:
      displayProjectTodos(getProject(activeTab));
  }
}

function displayActiveTodosNoAnimation() {
  hasAnimation = false;
  displayActiveTodos();
  hasAnimation = true;
}

function updateProjectSelect(project)
{
  const projectSelect = document.querySelector('#todo-project');
  const option = document.createElement('option');
  option.value = project.getProjectName();
  option.text = project.getProjectName();
  projectSelect.appendChild(option);
}

function clearProjectSelect() {
  let options = document.querySelector('#todo-project').children;
  for(let i = options.length -1; i > 0; i--) {
    options[i].remove();
  }
  options = document.querySelector('#todo-project').children;
}

function removeTodoElement(project, todo) {
  project.removeTodo(todo);
  displayActiveTodosNoAnimation();
  saveTodos();
}

function submitTodoForm() {
  let isComplete = (formType === 'Add') ? false : formCurrentTodo.getIsComplete();
  if(isValid(document.querySelectorAll('.todo-form select, .todo-form input'))) {
    const todoParameters = [document.querySelector('#todo-title').value, 
    document.querySelector('#todo-description').value, 
    document.querySelector('#todo-date').value,
    document.querySelector('#todo-priority').value,
    isComplete,
    document.querySelector('#todo-notes').value];
  if(formType === 'Add') {
    const project = getProject(document.querySelector('#todo-project').value);
    project.addTodo(...todoParameters);
  }
  else {
    formCurrentTodo.editTodo(...todoParameters);
  }
  hideTodoForm();
  saveTodos();
  }
}

function resetTodos(projectName) {
  if(projectName === activeTab) {
    displayImportantTodos();
  }
}

document.querySelector('.todo-form .cancel').addEventListener('click', hideTodoForm);
document.querySelector('.todo-form .submit').addEventListener('click', submitTodoForm);

document.querySelector('#today').addEventListener('click', displayTodayTodos);
document.querySelector('#upcoming').addEventListener('click', displayUpcomingTodos);
document.querySelector('#important').addEventListener('click', displayImportantTodos);

export {displayProjectTodos, updateProjectSelect, clearProjectSelect, resetTodos, setActiveTab, displayActiveTodos, displayActiveTodosNoAnimation}