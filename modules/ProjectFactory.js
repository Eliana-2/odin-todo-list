import {TodoFactory} from "./TodoFactory.js"

function ProjectFactory(projectName) {
  const todos = [];
  function getProjectName() {return projectName;}
  function getTodos() {
    return todos;
  }
  function setProjectName(newProjectName) {projectName = newProjectName}
  function addTodo(title, description, dueDate, priority, isComplete, notes) {
    todos.push(TodoFactory(title, description, dueDate, priority, isComplete, notes));
  }
  function removeTodo(todoIndex) {
    todos.splice(todoIndex, 1);
  }

  return {getProjectName, getTodos, setProjectName, addTodo, removeTodo};
}

export{ProjectFactory}