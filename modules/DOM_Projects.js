import {getProjects, addProject, removeProject} from "./Projects.js";
import { displayProjectTodos, updateProjectSelect, clearProjectSelect, resetTodos, setActiveTab, displayActiveTodos, displayActiveTodosNoAnimation} from "./DOM_Todos.js";
import {clearFormErrors, isValid } from "./FormValidation.js";
import {saveTodos} from './LocalStorage.js';

let formType = 'Add';
let formCurrentProject = '';

function makeIcon(src, classes) {
  const icon = document.createElement('img');
  icon.setAttribute('src', src);
  icon.classList.add(...classes);
  return icon;
}

function makeTextContainer(classes, text) {
  const textContainer = document.createElement('div');
  textContainer.classList.add(...classes);
  textContainer.textContent = text;
  return textContainer;
}

function makeButton(classes, eventListener) {
  const button = document.createElement('button');
  button.classList.add(...classes);
  button.addEventListener('click', (e) => {
    eventListener();
    e.stopPropagation();
  });
  return button;
}

function makeIconButton(src, iconClasses, buttonClasses, eventListener) {
  const button = makeButton(buttonClasses, eventListener);
  const buttonIcon = makeIcon(src, iconClasses)
  button.appendChild(buttonIcon);
  return button;
}

function showEditProjectForm(project) {
  formType = 'Edit';
  formCurrentProject = project;
  showProjectForm();
}

function showAddProjectForm() {
  formType = 'Add';
  formCurrentProject = '';
  showProjectForm();
}

function displayProjects() {
  const projectsTabs = document.querySelector('.projects-tabs');
  projectsTabs.innerHTML = '';
  clearProjectSelect();

  getProjects().forEach((project) => {
    const tab = makeButton(['tab'], () => displayProjectTodos(project));

    const tabIcon = makeIcon('../icons/text-box-check-outline.svg', ['tab-icon']);
    tab.appendChild(tabIcon);

    const tabText = makeTextContainer(['tab-text'], project.getProjectName());
    tab.appendChild(tabText);

    const editButton = makeIconButton('../icons/file-edit-outline.svg', ['tab-icon', 'edit'], ['edit-button'], () => {showEditProjectForm(project)});
    tab.appendChild(editButton);

    const deleteButton = makeIconButton('../icons/trash-can-outline.svg', ['tab-icon', 'delete'], ['delete-button'], () => {removeProjectNav(project.getProjectName());});
    tab.appendChild(deleteButton);
 
    projectsTabs.appendChild(tab);
    updateProjectSelect(project);
  });

  const addProjectButton = makeButton(['tab', 'new-project'], showAddProjectForm);

  const tabIcon = makeIcon('../icons/plus.svg', ['tab-icon']);
  addProjectButton.appendChild(tabIcon);

  const tabText = makeTextContainer(['tab-text'], 'Add New Project');
  addProjectButton.appendChild(tabText);


  projectsTabs.appendChild(addProjectButton);
}

function showProjectForm() {
  document.querySelector('.project-form .form-heading').textContent = `${formType} Project`;
  document.querySelector('.project-form .form-input').value = (formType === 'Edit') ? formCurrentProject.getProjectName() : '';
  document.querySelector('.project-form .submit').textContent = `${formType}`;
  document.querySelector('.project-dialog').showModal();
}

function hideProjectForm() {
  clearFormErrors(document.querySelectorAll('.project-form .form-input'));
  document.querySelector('.project-dialog').close();
  displayProjects();
  displayActiveTodosNoAnimation();
}

function removeProjectNav(projectName) {
  removeProject(projectName);
  resetTodos(projectName);
  displayProjects(getProjects());
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