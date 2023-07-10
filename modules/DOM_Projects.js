import {getProjects, removeProject} from "./Projects.js";

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
    navElement.appendChild(navText);

    const editIcon = document.createElement('img');
    editIcon.setAttribute('src', '../icons/file-edit-outline.svg');
    editIcon.classList.add('nav-icon', 'edit');
    editIcon.addEventListener('click', (e) => {
      showProjectForm('Edit');
    })
    navElement.appendChild(editIcon);

    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', '../icons/trash-can-outline.svg');
    deleteIcon.classList.add('nav-icon', 'delete');
    deleteIcon.addEventListener('click', (e) => {
     removeProjectNav(e.target.parentNode.textContent);
    })
    navElement.appendChild(deleteIcon);

    projectsNav.appendChild(navElement);
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
    showProjectForm('Add');
  })
  projectsNav.appendChild(addNewProject);
}

function showProjectForm(formType) {
  document.querySelector('.cover').style.visibility = 'visible';
  document.querySelector('.project-form .form-heading').textContent = `${formType} Project`;
  document.querySelector('.project-form').style.visibility = 'visible';
}

function removeProjectNav(projectName) {
  removeProject(projectName);
  displayProjects(getProjects());
}

export {displayProjects}