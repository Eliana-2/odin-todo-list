import './style.css';
import {addProject, getProjects} from "./modules/Projects.js"
import{displayProjects} from "./modules/DOM_Projects.js"

addProject('Project 1');

for(let i = 0; i < 10; i++) {
  getProjects()[0].addTodo('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
}

getProjects()[0].addTodo('Clean clean clean', 'dust and vacuum', '7/7/2023', 1, false, '')

displayProjects();