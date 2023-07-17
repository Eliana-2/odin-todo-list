import './style.css';
import {addProject, getProjects} from "./modules/Projects.js"
import{displayProjects} from "./modules/DOM_Projects.js"

addProject('Project 1');

for(let i = 0; i < 10; i++) {
  getProjects()[0].addTodo('Clean', 'dust and vacuum', '2023-07-07', 'Medium', false, 'This is a basic note.');
}

getProjects()[0].addTodo('Clean clean clean', 'dust and vacuum', '2023-07-16', 'High', true, 'Hello there.')

displayProjects();