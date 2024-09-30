import {
  list,
  formatList,
  format,
  add,
  complete,
  findById,
  findByTitle,
  findByStatus,
  deleteTodo,
} from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import {
  validateAddParams,
  validateFindByIdParam,
  validateFindByTitleParam,
  validateStatusParam,
  validateDeleteTodoParams,
} from './validate.js';

export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  switch (command) {
    case 'list':
      const todos = list(todoStore);
      display([...formatList(todos), `You have ${todos.length} todos.`]);
      break;

    case 'add':
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(['New Todo added:', format(added)]);
      break;

    case 'find-by-id':
      const validatedIdParams = validateFindByIdParam(params);
      const matchingTodoItem = findById(todoStore, validatedIdParams);
      display(['Find by id: ', format(matchingTodoItem)]);
      break;

    case 'find-by-title':
      const validatedFindParams = validateFindByTitleParam(params);
      const [searchTitle] = validatedFindParams;
      const foundTodo = findByTitle(todoStore, searchTitle);
      if (foundTodo) {
        display(['Todo found:', format(foundTodo)]);
      } else {
        display(['No todo found with that title.']);
      }
      break;

    case 'complete':
      const [idParam] = params;
      const id = Number(idParam);
      if (isNaN(id)) {
        throw new AppError('The ID must be a numeric value.');
      }
      const completed = complete(todoStore, id);
      display(['Todo completed:', format(completed)]);
      break;

    case 'find-by-status':
      const validatedStatusParam = validateStatusParam(params);
      const todosList = findByStatus(todoStore, validatedStatusParam);
      console.log(todosList);
      break;
    
    case 'delete':
      const validatedDeleteParams = validateDeleteTodoParams(params);
      deleteTodo(todoStore, validatedDeleteParams);
      display(['Deletion completed']);
      break;

    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
