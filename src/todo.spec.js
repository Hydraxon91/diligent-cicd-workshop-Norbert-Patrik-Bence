import { jest } from '@jest/globals';
import {
  add,
  findById,
  findByTitle,
  format,
  formatList,
  list,
  completeTodo,
  findByStatus,
} from './todo.js';
import { AppError } from './app-error.js';

function createMockStore(data) {
  return {
    get: jest.fn(() => data),
    set: jest.fn(),
  };
}

describe('format', () => {
  it('should format a not done todo', () => {
    const todo = { title: 'todo title', id: 1, done: false };
    const expected = '1 - [ ] todo title';

    const current = format(todo);

    expect(current).toStrictEqual(expected);
  });

  it('should format a done todo', () => {
    const todo = { title: 'todo title', id: 1, done: true };
    const expected = '1 - [x] todo title';

    const current = format(todo);

    expect(current).toStrictEqual(expected);
  });
});

describe('formatList', () => {
  it('should format a list of todos', () => {
    const todos = [
      { title: 'todo title', id: 1, done: true },
      { title: 'todo title 2', id: 2, done: false },
    ];
    const expected = ['1 - [x] todo title', '2 - [ ] todo title 2'];

    const current = formatList(todos);

    expect(current).toStrictEqual(expected);
  });

  it('should return an empty list if an empty list is given', () => {
    const todos = [];
    const expected = [];

    const current = formatList(todos);

    expect(current).toStrictEqual(expected);
  });
});

describe('list', () => {
  it('should list the todos', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true },
    ]);
    const expected = [
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true },
    ];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  });

  it('should return an empty list if nothing is stored', () => {
    const mockStore = createMockStore([]);
    const expected = [];

    const current = list(mockStore);

    expect(current).toStrictEqual(expected);
  });
});

describe('add', () => {
  it('should add a new todo to an empty store, with done as false and id as 1', () => {
    const params = ['New Todo'];
    const mockStore = createMockStore([]);
    const expected = {
      id: 1,
      done: false,
      title: 'New Todo',
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([expected]);
  });

  it('should append a new todo to the existing items', () => {
    const params = ['New Todo'];
    const stored = [{ id: 1, title: 'Todo 1', done: true }];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 2,
      done: false,
      title: 'New Todo',
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
  });

  it('should calculate the id by max id + 1, even with missing ids in sequence', () => {
    const params = ['New Todo'];
    const stored = [
      { id: 2, title: 'Todo 1', done: true },
      { id: 4, title: 'Todo 1', done: true },
    ];
    const mockStore = createMockStore(stored);
    const expected = {
      id: 5,
      done: false,
      title: 'New Todo',
    };

    const current = add(mockStore, params);

    expect(current).toStrictEqual(expected);
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([...stored, expected]);
  });
});

describe('findById', () => {
  it('should throw an error because the todo item is not found', () => {
    const params = ['2'];
    const [id] = params;
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: 'Read a book.',
      },
    ]);

    expect(() => findById(mockStore, params)).toThrow(AppError);
    expect(() => findById(mockStore, params)).toThrowError(
      `Todo with id: ${id}, is not found!`
    );
  });

  it('should return the todo item', () => {
    const params = ['1'];
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: 'Read a book.',
      },
    ]);

    const result = findById(mockStore, params);

    expect(result).toEqual({
      id: 1,
      done: false,
      title: 'Read a book.',
    });
  });
});

describe('findByTitle', () => {
  it('should find a todo by its title', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true },
    ]);

    const current = findByTitle(mockStore, 'Todo 1');
    const expected = { id: 1, title: 'Todo 1', done: false };

    expect(current).toStrictEqual(expected);
  });

  it('should return null when the todo does not exist', () => {
    const mockStore = createMockStore([
      { id: 1, title: 'Todo 1', done: false },
      { id: 2, title: 'Todo 2', done: true },
    ]);

    const current = findByTitle(mockStore, 'Todo 3');

    expect(current).toBeNull();
  });

  it('should return null for an empty store', () => {
    const mockStore = createMockStore([]);

    const current = findByTitle(mockStore, 'Todo 1');

    expect(current).toBeNull();
  });
});

describe('complete', () => {
  it('should mark a todo as complete when given a valid numeric ID', () => {
    const stored = [{ id: 1, title: 'Todo 1', done: false }];
    const mockStore = createMockStore(stored);

    const current = completeTodo(mockStore, 1);

    expect(current).toStrictEqual({ id: 1, title: 'Todo 1', done: true });
    expect(mockStore.set.mock.calls[0][0]).toStrictEqual([
      { id: 1, title: 'Todo 1', done: true },
    ]);
  });

  it('should return apperror if Id not found', () =>{
    const mockStore = createMockStore([]);
    const id = 1;

    expect(() => completeTodo(mockStore, id)).toThrow(AppError);
    expect(() => completeTodo(mockStore, id)).toThrowError(
      `Todo with id: ${id}, is not found!`
    );
  });
});

describe('find-by-status', () => {
  it('should pass with a done todos list', () => {
    const [params] = ['done'];
    const mockStore = createMockStore([
      {
        id: 1,
        done: true,
        title: 'Read a book.',
      },
      {
        id: 2,
        done: false,
        title: 'do the dishes.',
      },
    ]);

    const expected = [
      {
        id: 1,
        done: true,
        title: 'Read a book.',
      },
    ];
    const current = findByStatus(mockStore, params);

    expect(current).toStrictEqual(expected);
  });

  it('should return an empty list', () => {
    const [params] = ['done'];
    const mockStore = createMockStore([
      {
        id: 1,
        done: false,
        title: 'Read a book.',
      },
      {
        id: 2,
        done: false,
        title: 'do the dishes.',
      },
    ]);

    const expected = [];
    const current = findByStatus(mockStore, params);

    expect(current).toStrictEqual(expected);
  });
});
