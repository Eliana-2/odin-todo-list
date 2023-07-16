import {getProjects, addProject, removeProject} from "./Projects.js";
import { displayProjectTodos, updateProjectSelect, resetTodos} from "./DOM_Todos.js";

let formType = 'Add';
let formCurrentProject = '';

function displayProjects() {
  const projectsNav = document.querySelector('.projects-nav');
  projectsNav.innerHTML = '';

  getProjects().forEach((project) => {
    const navElement = document.createElement('li');
    navElement.classList.add('nav-element');

    const navIcon = document.createElement('img');
    navIcon.setAttribute('src', '../icons/text-box-check-outline.svg');
    navIcon.classList.add('nav-icon');
    navElement.appendChild(navIcon);

    const navText = document.createElement('div');
    navText.classList.add('nav-text');
    navText.textContent = project.getProjectName();
    navText.addEventListener('click', () => {
      displayProjectTodos(project);
    });
    navElement.appendChild(navText);
  

    const editIcon = document.createElement('img');
    editIcon.setAttribute('src', '../icons/file-edit-outline.svg');
    editIcon.classList.add('nav-icon', 'edit');
    editIcon.addEventListener('click', (e) => {
      formType = 'Edit';
      formCurrentProject = project;
      showProjectForm();
    })
    navElement.appendChild(editIcon);

    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', '../icons/trash-can-outline.svg');
    deleteIcon.classList.add('nav-icon', 'delete');
    deleteIcon.addEventListener('click', (e) => {
     removeProjectNav(project.getProjectName());
    })
    navElement.appendChild(deleteIcon);

    projectsNav.appendChild(navElement);
    updateProjectSelect(project);
  });

  const addNewProject = document.createElement('li');
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
  document.querySelector('.project-form').style.visibility = 'hidden';
  displayProjects();
  document.querySelector('.cover').style.visibility = 'hidden';
}

function removeProjectNav(projectName) {
  removeProject(projectName);
  resetTodos(projectName);
  displayProjects(getProjects());
}

function submitProjectForm() {
  const newProjectName = document.querySelector('#project-title').value;
  if(formType === 'Add') {
    addProject(newProjectName);
  }
  else {
    formCurrentProject.setProjectName(newProjectName);
  }
  hideProjectForm();
}

document.querySelector('.project-form .cancel').addEventListener('click', hideProjectForm);
document.querySelector('.project-form .submit').addEventListener('click', submitProjectForm)

export {displayProjects}