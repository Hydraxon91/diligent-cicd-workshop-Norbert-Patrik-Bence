import { AppError } from './app-error.js';

export function format(todo) {
  return `${todo.id} - [${todo.done ? 'x' : ' '}] ${todo.title}`;
}

export function formatList(todos) {
  return todos.map(format);
}

function nextId(todos) {
  const ids = todos.map((todo) => todo.id);
  if (ids.length === 0) {
    return 1;
  }
  const maxId = Math.max(...ids);
  return maxId + 1;
}

export function list(store) {
  return store.get();
}

export function add(store, params) {
  const [title] = params;
  const todos = store.get();
  const newTodo = {
    title,
    done: false,
    id: nextId(todos),
  };
  const toStore = [...todos, newTodo];
  store.set(toStore);
  return newTodo;
}

export function findById(store, params) {
  const [id] = params;
  const idIsNotNumber = isNaN(+id);

  if (idIsNotNumber) {
    throw new AppError('Id is not a number, please provide a number');
  }
  const todoList = store.get();

  const matchingTodoItem = todoList.find((todo) => todo.id === +id);
  if (!matchingTodoItem) {
    throw new AppError(`Todo with id: ${id}, is not found!`);
  }

  return matchingTodoItem;
}

export function findByTitle(store, title) {
  const todos = store.get();

  const foundTodo = todos.find(todo => todo.title === title);

  return foundTodo || null;
}

export function complete(store, id) {
  const todos = store.get();
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    throw new AppError(`Todo with id: ${id} is not found!`);
  }

  todo.done = true;
  store.set(todos);
  return todo;
}
