function displayProjects(projects) {
  const projectsNav = document.querySelector('.projects-nav');
  const newProject = document.querySelector('.new-project');
  projects.forEach((project) => {
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
    navElement.appendChild(editIcon);

    const deleteIcon = document.createElement('img');
    deleteIcon.setAttribute('src', '../icons/trash-can-outline.svg');
    deleteIcon.classList.add('nav-icon', 'delete');
    navElement.appendChild(deleteIcon);

    projectsNav.insertBefore(navElement, newProject);
  });
}

export {displayProjects}