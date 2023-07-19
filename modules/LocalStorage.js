import { getProjects, getProject, addProject} from "./Projects.js";

function saveTodos() {
  localStorage.clear();
  getProjects().forEach((project) => {
    const todoValuesArray = project.getTodos().map((todo) => {
      return [todo.getTitle(),
       todo.getDescription(),
       todo.getDueDate(),
       todo.getPriority(),
       todo.getIsComplete(),
       todo.getNotes()];
    })
    localStorage.setItem(project.getProjectName(), JSON.stringify(todoValuesArray));
  })
}

function readTodos() {
  if(localStorage.length > 0) {
    for(let i = 0; i < localStorage.length; i++) {
      addProject(localStorage.key(i));
      const project= getProject(localStorage.key(i));
      JSON.parse(localStorage.getItem(localStorage.key(i))).forEach((todoValues) => {
        project.addTodo(...todoValues);
      })
    }
  }
  else {
    addProject('Default');
    addProject('Project 1');
    console.log(getProjects());

    for(let i = 0; i < 10; i++) {
      getProjects()[0].addTodo('Clean', 'dust and vacuum', '2023-07-07', 'Medium', false, 'This is a basic note.');
    }

    getProjects()[1].addTodo('Clean clean clean', 'dust and vacuum', '2023-07-16', 'High', true, 'Hello there.')
  }
}

export {saveTodos, readTodos};