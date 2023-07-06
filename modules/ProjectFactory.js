import {TodoFactory} from "./TodoFactory.js"

function ProjectFactory() {
  const todos = [];
  function getTodos() {
    return todos;
  }
  function addTodo(title, description, dueDate, priority, isComplete, notes) {
    todos.push(TodoFactory(title, description, dueDate, priority, isComplete, notes));
  };
  function removeTodo(todoIndex) {
    todos.splice(todoIndex, 1);
  }

  return {getTodos, addTodo, removeTodo};
}

export{ProjectFactory}