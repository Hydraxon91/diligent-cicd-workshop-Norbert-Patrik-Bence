import { list, formatList, format, add, complete } from './todo.js';
import { display } from './display.js';
import { AppError } from './app-error.js';
import { validateAddParams } from './validate.js';

export function createApp(todoStore, args) {
  const [, , command, ...params] = args;

  switch (command) {
    case "list":
      const todos = list(todoStore);
      display([...formatList(todos), `You have ${todos.length} todos.`]);
      break;

    case "add":
      const validated = validateAddParams(params);
      const added = add(todoStore, validated);
      display(["New Todo added:", format(added)]);
      break;

    case "find":
      const validatedFindParams = validateFindParams(params);
      const [searchTitle] = validatedFindParams;
      const foundTodo = findByTitle(todoStore, searchTitle);
      if (foundTodo) {
        display(["Todo found:", format(foundTodo)]);
      } else {
        display(["No todo found with that title."]);
      }
      break;
    case 'complete':
      const [idParam] = params;
      const id = Number(idParam);
      if (isNaN(id)) {
        throw new AppError('The ID must be a numeric value.');
      }
      const completed = complete(todoStore, id)
      display(['Todo completed:', format(completed)]);
      break;
    default:
      throw new AppError(`Unknown command: ${command}`);
  }
}
