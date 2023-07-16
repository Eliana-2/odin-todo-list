import {getProject, getProjects} from './Projects.js';

const todoList = document.querySelector('.todos-list');
let formType = 'Add';
let formCurrentProjectName = '';
let formCurrentTodo = '';
let activeTab = '';


function setupMainContainer(headingText, iconSrc, isProject) {
  activeTab = headingText;
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

function makeDiv(parent, classesToAdd, textContent='') {
  const div = document.createElement('div');  
  div.classList.add(...classesToAdd);
  div.textContent = textContent;
  parent.appendChild(div);
}

function makeIcon(parent, classesToAdd, src, project, todo, eventListener) {
  const icon = document.createElement('img');
  icon.setAttribute('src', src);
  icon.classList.add(...classesToAdd);
  icon.addEventListener('click', () => {
    eventListener(project, todo);
  })
  parent.appendChild(icon);
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
  document.querySelector('.cover').style.visibility = 'visible';
  document.querySelector('.todo-form').style.visibility = 'visible';
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
  document.querySelector('.todo-form').style.visibility = 'hidden';
  displayActiveTodos();
  document.querySelector('.cover').style.visibility = 'hidden';
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

  makeDiv(todoElement, ['todo-check']);
  makeDiv(todoElement, ['todo-title'], todo.getTitle());
  makeDiv(todoElement, ['todo-date'], formatDate(todo.getDueDate()));
  makeIcon(todoElement, ['todo-icon', 'edit'], '../icons/square-edit-outline.svg', project, todo, editTodoElement);
  makeIcon(todoElement, ['todo-icon', 'delete'], '../icons/trash-can-outline.svg', project, todo, removeTodoElement);

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

function updateProjectSelect(project)
{
  const projectSelect = document.querySelector('#todo-project');
  const option = document.createElement('option');
  option.value = project.getProjectName();
  option.text = project.getProjectName();
  projectSelect.appendChild(option);

}

function removeTodoElement(project, todo) {
  project.removeTodo(todo);
  displayProjectTodos(project);
}

function submitTodoForm() {
  const todoParameters = [document.querySelector('#todo-title').value, 
  document.querySelector('#todo-description').value, 
  document.querySelector('#todo-date').value,
  document.querySelector('#todo-priority').value,
  false,
  document.querySelector('#todo-notes').value];
  if(formType === 'Add') {
    const project = getProject(document.querySelector('#todo-project').value);
    project.addTodo(...todoParameters);
  }
  else {
    formCurrentTodo.editTodo(...todoParameters);
  }
  hideTodoForm();
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

export {displayProjectTodos, updateProjectSelect, resetTodos}