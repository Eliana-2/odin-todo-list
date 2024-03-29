import {test, expect, expectTypeOf} from "vitest";
import {TodoFactory} from "./TodoFactory.js";
import {ProjectFactory} from "./ProjectFactory.js";
import {getProjects, addProject, removeProject} from "./Projects.js";

function TodoFactoryTests() {
  test('TodoFactory: Get title', () => {
    expect(TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '').getTitle()).toBe('Clean');
  })
  test('TodoFactory: Get description', () => {
    expect(TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '').getDescription()).toBe('dust and vacuum');
  })
  test('TodoFactory: Get due date', () => {
    expect(TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '').getDueDate()).toBe('7/7/2023');
  })
  test('TodoFactory: Get priority', () => {
    expect(TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '').getPriority()).toBe(1);
  })
  test('TodoFactory: Get is complete', () => {
    expect(TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '').getIsComplete()).toBe(false);
  })
  test('TodoFactory: Get notes', () => {
    expect(TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '').getNotes()).toBe('');
  })
  test('TodoFactory: Set title', () => {
    const myTodo = TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    myTodo.setTitle('Clean room');
    expect(myTodo.getTitle()).toBe('Clean room');
  })
  test('TodoFactory: Set description', () => {
    const myTodo = TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    myTodo.setDescription('dust or vacuum');
    expect(myTodo.getDescription()).toBe('dust or vacuum');
  })
  test('TodoFactory: Set due date', () => {
    const myTodo = TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    myTodo.setDueDate('7/8/2023');
    expect(myTodo.getDueDate()).toBe('7/8/2023');
  })
  test('TodoFactory: Set priority', () => {
    const myTodo = TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    myTodo.setPriority(2);
    expect(myTodo.getPriority()).toBe(2);
  })
  test('TodoFactory: Set is complete', () => {
    const myTodo = TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    myTodo.setIsComplete(true);
    expect(myTodo.getIsComplete()).toBe(true);
  })
  test('TodoFactory: Set notes', () => {
    const myTodo = TodoFactory('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    myTodo.setNotes('do it');
    expect(myTodo.getNotes()).toBe('do it');
  })
}

function ProjectFactoryTests() {
  test('ProjectFactory: Get todos', () => {
    expect(ProjectFactory('Project 1').getTodos()).toHaveLength(0) && 
    expectTypeOf(ProjectFactory('Project 1').getTodos()).toBeArray();
  });
  test('ProjectFactory: Get project name', () => {
    expect(ProjectFactory('Project 1').getProjectName()).toBe('Project 1');
  });
  test('ProjectFactory: Set project name', () => {
    const myProject = ProjectFactory('Project 1');
    myProject.setProjectName('Project 2');
    expect(myProject.getProjectName()).toBe('Project 2');
  });
  test('ProjectFactory: Add todo', () => {
    const myProject = ProjectFactory('Project 1');
    myProject.addTodo('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    expect(myProject.getTodos().findIndex((currentTodo) => {
      return currentTodo.getTitle() === 'Clean' && currentTodo.getDescription() === 'dust and vacuum' &&
      currentTodo.getDueDate() === '7/7/2023' && currentTodo.getPriority() === 1 &&
      currentTodo.getIsComplete() === false && currentTodo.getNotes() === '';
    })).not.toBe(-1);
  })
  test('ProjectFactory: Remove todo', () => {
    const myProject = ProjectFactory('Project 1');
    myProject.addTodo('Clean', 'dust and vacuum', '7/7/2023', 1, false, '');
    myProject.addTodo('Clean 2', 'dust and vacuum', '7/7/2023', 1, false, '');
    myProject.removeTodo(0);
    expect(myProject.getTodos()[0].getTitle()).toBe('Clean 2');
  })
}

function ProjectsTests() {
  test('Projects: get projects', () => {
    expect(getProjects()[0].getProjectName()).toBe('Default');
  });
  test('Projects: add project', () => {
    addProject('Project 2');
    expect(getProjects().findIndex((currentProject) => {
      return currentProject.getProjectName() === 'Project 2'
    })).not.toBe(-1);
  });
  test('Projects: remove project', () => {
    removeProject('Project 2');
    expect(getProjects().findIndex((currentProject) => {
      return currentProject.getProjectName() === 'Project 2'
    })).toBe(-1);
  })
}

TodoFactoryTests();
ProjectFactoryTests();
ProjectsTests();