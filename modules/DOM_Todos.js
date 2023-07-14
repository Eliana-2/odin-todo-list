const todoList = document.querySelector('.todos-list');

function setupMainContainer(headingText) {
  todoList.innerHTML = '';
  document.querySelector('.main-heading').textContent = headingText;
  document.querySelector('.todos-heading').textContent = 'To-Dos';
  document.querySelector('.todos-icon').setAttribute('src', '../icons/plus.svg');
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

function displayProjectTodos(project) {
  setupMainContainer(project.getProjectName());
  project.getTodos().forEach((todo) => {
    const todoElement = document.createElement('li');
    todoElement.classList.add('todo');

    makeDiv(todoElement, ['todo-check']);
    makeDiv(todoElement, ['todo-title'], todo.getTitle());
    makeDiv(todoElement, ['todo-date'], todo.getDueDate());
    makeIcon(todoElement, ['todo-icon', 'edit'], '../icons/square-edit-outline.svg');
    makeIcon(todoElement, ['todo-icon', 'delete'], '../icons/trash-can-outline.svg', project, todo, removeTodoElement);

    todoList.appendChild(todoElement);
  })
}

function removeTodoElement(project, todo) {
  project.removeTodo(todo);
  displayProjectTodos(project);
}

export {displayProjectTodos}