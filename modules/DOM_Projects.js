import {getProjects, addProject, removeProject} from "./Projects.js";
import { displayProjectTodos, updateProjectSelect, clearProjectSelect, resetTodos, setActiveTab, displayActiveTodos} from "./DOM_Todos.js";
import {clearFormErrors, isValid } from "./FormValidation.js";
import {saveTodos} from './LocalStorage.js';

let formType = 'Add';
let formCurrentProject = '';

function displayProjects() {
  const projectsNav = document.querySelector('.projects-nav');
  projectsNav.innerHTML = '';
  clearProjectSelect();

  getProjects().forEach((project) => {
    const navElement = document.createElement('button');
    navElement.classList.add('nav-element');

    const navIcon = document.createElement('img');
    navIcon.setAttribute('src', '../icons/text-box-check-outline.svg');
    navIcon.classList.add('nav-icon');
    navElement.appendChild(navIcon);

    const navText = document.createElement('div');
    navText.classList.add('nav-text');
    navText.textContent = project.getProjectName();
    navElement.appendChild(navText);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', (e) => {
      formType = 'Edit';
      formCurrentProject = project;
      showProjectForm();
      e.stopPropagation();
    });

    const editIcon = document.createElement('img');
    editIcon.setAttribute('src', '../icons/file-edit-outline.svg');
    editIcon.classList.add('nav-icon', 'edit');
    editButton.appendChild(editIcon);
    navElement.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', (e) => {
      removeProjectNav(project.getProjectName());
      e.stopPropagation();
     });

    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', '../icons/trash-can-outline.svg');
    deleteIcon.classList.add('nav-icon', 'delete');
    deleteButton.appendChild(deleteIcon);
    navElement.appendChild(deleteButton);

    navElement.addEventListener('click', () => {
      displayProjectTodos(project);
    });
    projectsNav.appendChild(navElement);
    updateProjectSelect(project);
  });

  const addNewProject = document.createElement('button');
  addNewProject.classList.add('nav-element', 'new-project');

  const navIcon = document.createElement('img');
  navIcon.setAttribute('src', '../icons/plus.svg');
  navIcon.classList.add('nav-icon');
  addNewProject.appendChild(navIcon);

  const navText = document.createElement('div');
  navText.classList.add('nav-text');
  navText.textContent = 'Add New Project';
  addNewProject.appendChild(navText);
  
  addNewProject.addEventListener('click', (e) => {
    formType = 'Add';
    formCurrentProject = '';
    showProjectForm();
  });

  projectsNav.appendChild(addNewProject);
}

function showProjectForm() {
  document.querySelector('.project-form .form-heading').textContent = `${formType} Project`;
  document.querySelector('.project-form .form-input').value = (formType === 'Edit') ? formCurrentProject.getProjectName() : '';
  document.querySelector('.project-form .submit').textContent = `${formType}`;
  document.querySelector('.cover').style.visibility = 'visible';
  document.querySelector('.project-form').style.visibility = 'visible';
}

function hideProjectForm() {
  clearFormErrors(document.querySelectorAll('.project-form .form-input'));
  document.querySelector('.project-form').style.visibility = 'hidden';
  displayProjects();
  document.querySelector('.cover').style.visibility = 'hidden';
  displayActiveTodos();
}

function removeProjectNav(projectName) {
  removeProject(projectName);
  resetTodos(projectName);
  displayProjects(getProjects())
  displayActiveTodos();
  saveTodos();
}

function submitProjectForm() {
  if(isValid(document.querySelectorAll('.project-form .form-input'))) {
    const newProjectName = document.querySelector('#project-title').value;
    if(formType === 'Add') {
      addProject(newProjectName);
    }
    else {
      formCurrentProject.setProjectName(newProjectName);
    }
    setActiveTab(newProjectName);
    saveTodos();
    hideProjectForm();
  }
}

document.querySelector('.project-form .cancel').addEventListener('click', hideProjectForm);
document.querySelector('.project-form .submit').addEventListener('click', submitProjectForm)

export {displayProjects}