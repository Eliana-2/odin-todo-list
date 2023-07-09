import './style.css';
import {getProjects, addProject} from "./modules/Projects.js"
import{displayProjects} from "./modules/DOM_Projects.js"


addProject('Project 1');
displayProjects(getProjects());