import { AppError } from './app-error.js';

export function validateAddParams(params) {
  if (params.length !== 1) {
    throw new AppError('Give a title as the only parameter in parenthesis.');
  }
  const [title] = params;
  if (typeof title !== 'string' || title?.length === 0) {
    throw new AppError('The title must be a non zero length string.');
  }
  return params;
}

export function validateFindByIdParam(params) {
  const [id] = params;
  const idIsNotNumber = isNaN(+id);

  if (idIsNotNumber) {
    throw new AppError('Id is not a number, please provide a number');
  }

  return params;
}

export function validateFindByTitleParam(params) {
  const [title] = params;

  if (typeof title !== 'string' || title.length < 3) {
    throw new AppError(
      'The title should be string and at least 3 charachter long!'
    );
  }

  return params;
}

export function validateStatusParam(params) {
  const [statusParam] = params;
  const validSearchStrings = ['done', 'not-done'];
  if (
    typeof statusParam !== 'string' ||
    !validSearchStrings.includes(statusParam)
  ) {
    throw new AppError("Status have to be 'done' or 'not-done' string!");
  }

  return statusParam;
}

export function validateDeleteTodoParams(params) {
  if (params.length !== 1) {
    throw new AppError('Give a numeric id as the only parameter in parenthesis.');
  }

  const [id] = params;
  
  validateFindByIdParam([id]);

  return params;
}