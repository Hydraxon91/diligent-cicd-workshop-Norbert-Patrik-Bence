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
  const todoList = store.get();

  const matchingTodoItem = todoList.find((todo) => todo.id === +id);

  if (!matchingTodoItem) {
    throw new AppError(`Todo with id: ${id}, is not found!`);
  }

  return matchingTodoItem;
}

export function findByTitle(store, title) {
  const todos = store.get();

  const foundTodo = todos.find((todo) => todo.title === title);

  return foundTodo || null;
}

export function complete(store, id) {
  const todos = store.get();
  const todo = todos.find((t) => t.id === id);

  todo.done = true;
  store.set(todos);
  return todo;
}

export function findByStatus(store, status) {
  const todos = store.get();
  const isDone = status === 'done';
  return todos.filter((todo) => todo.done === isDone);
}

export function editTodoTitle(store, params){
  const [id, newTitle] = params;
  const todos = store.get();
  const todoItem = todos.find(todo => todo.id === +id);
  
  if (!todoItem) {
    throw new AppError(`Todo with id: ${id}, is not found!`);
  }

   todoItem.title = newTitle;
   store.set(todos);
   return todoItem;
}

export function deleteTodo(store, id) {
  const todos = store.get();
  const todoIndex = todos.findIndex((t) => t.id === +id);
  
  if (todoIndex===-1) {
    throw new AppError(`Todo with id: ${id}, is not found!`);
  }

  todos.splice(todoIndex, 1);
  store.set(todos);
}
