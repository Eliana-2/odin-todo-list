const todoList = document.querySelector('.todos-list');
let formType = 'Add';
let formCurrentProject = '';


function setupMainContainer(headingText) {
  todoList.innerHTML = '';
  document.querySelector('.main-heading').textContent = headingText;
  document.querySelector('.todos-heading').textContent = 'To-Dos';
  document.querySelector('.todos-icon').setAttribute('src', '../icons/plus.svg');
  document.querySelector('.todos-icon').addEventListener('click', addTodoElement);

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
    document.querySelector('#todo-title').value = todo.getTitle();
    document.querySelector('#todo-description').value = todo.getDescription();
    document.querySelector('#todo-date').value = todo.getDueDate();
    document.querySelector('#todo-priority').value = todo.getPriority();
    document.querySelector('#todo-notes').value = todo.getNotes();
  }
  document.querySelector('.todo-form .submit').textContent = `${formType}`;
  document.querySelector('.cover').style.visibility = 'visible';
  document.querySelector('.todo-form').style.visibility = 'visible';
}

function hideTodoForm() {
  document.querySelector('.todo-form').style.visibility = 'hidden';
  document.querySelector('.cover').style.visibility = 'hidden';
}

function addTodoElement() {
  formType = 'Add';
  showTodoForm();
}

function editTodoElement(project, todo) {
  formType = 'Edit';
  formCurrentProject = project;
  showTodoForm(todo);
}

function formatDate(dueDate) {
  const yearMonthDay = dueDate.split('-');
  return yearMonthDay[1] + '/' + yearMonthDay[2] + '/' + yearMonthDay[0];
}

function displayProjectTodos(project) {
  setupMainContainer(project.getProjectName());
  project.getTodos().forEach((todo) => {
    const todoElement = document.createElement('li');
    todoElement.classList.add('todo');

    makeDiv(todoElement, ['todo-check']);
    makeDiv(todoElement, ['todo-title'], todo.getTitle());
    makeDiv(todoElement, ['todo-date'], formatDate(todo.getDueDate()));
    makeIcon(todoElement, ['todo-icon', 'edit'], '../icons/square-edit-outline.svg', project, todo, editTodoElement);
    makeIcon(todoElement, ['todo-icon', 'delete'], '../icons/trash-can-outline.svg', project, todo, removeTodoElement);

    todoList.appendChild(todoElement);
  })
}

function removeTodoElement(project, todo) {
  project.removeTodo(todo);
  displayProjectTodos(project);
}

export {displayProjectTodos}