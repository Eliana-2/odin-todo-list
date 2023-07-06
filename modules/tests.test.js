import {test, expect} from "vitest";
import {TodoFactory} from "./TodoFactory.js";

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

TodoFactoryTests();