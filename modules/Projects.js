import {ProjectFactory} from "./ProjectFactory.js";

const projects = [ProjectFactory('Default')];

function getProjects() {return projects;}
function getProject(projectName) {
  return projects.find((currentProject) => {
    return currentProject.getProjectName() === projectName;
  });
}
function addProject(projectName) {
  projects.push(ProjectFactory(projectName));
}
function removeProject(projectName) {
  let projectIndex = projects.findIndex((currentProject) => {
    return currentProject.getProjectName() === projectName;
  });
  if(projectIndex !== -1) {
    projects.splice(projectIndex, 1);
  }
}

export {getProjects, getProject, addProject, removeProject}