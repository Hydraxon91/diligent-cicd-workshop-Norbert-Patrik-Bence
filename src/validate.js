import { AppError } from "./app-error.js";

export function validateAddParams(params) {
  if (params.length !== 1) {
    throw new AppError("Give a title as the only parameter in parenthesis.");
  }
  const [title] = params;
  if (typeof title !== "string" || title?.length === 0) {
    throw new AppError("The title must be a non zero length string.");
  }
  return params;
}

export function validateFindByIdParam(params) {
  const [id] = params;
  const idIsNotNumber = isNaN(+id);

  if (idIsNotNumber) {
    throw new AppError("Id is not a number, please provide a number");
  }

  return params;
}

export function validateFindByTitleParam(params) {
  const [title] = params;

  if (typeof title !== "string" || title.length < 3) {
    throw new AppError(
      "The title should be string and at least 3 character long!"
    );
  }

  return params;
}

export function validateStatusParam(params) {
  const [statusParam] = params;
  const validSearchStrings = ["done", "not-done"];
  if (
    typeof statusParam !== "string" ||
    !validSearchStrings.includes(statusParam)
  ) {
    throw new AppError("Status have to be 'done' or 'not-done' string!");
  }

  return statusParam;
}

export function validateAddLabelParams(params) {
  if (params.length !== 2) {
    throw new AppError(
      "Give two parameters: todo ID and label."
    );
  }

  const [id, label] = params;

  if (isNaN(+id)) {
    throw new AppError("The ID must be a numeric value.");
  }

  if (typeof label !== "string" || label.length === 0) {
    throw new AppError("Label must be a non-empty string.");
  }

  return [parseInt(id, 10), label];
}

export function validateCompleteTodoParam(params) {
  if (!Array.isArray(params)) {
    throw new AppError('Parameters must be passed as an array.');
  }

  const [id] = params;

  if (params.length !== 1) {
    throw new AppError('Give a numeric id as the only parameter in parenthesis.');
  }

  validateFindByIdParam([id]); // Pass id as an array for validation

  return params;
}

export function validateEditTitleParams(params) {
  if (params.length !== 2) {
    throw new AppError('Give a numeric id and a title in parenthesis as the params.');
  }
  const [id, newTitle] = params;

  // Reusing the validateFindByIdParam and validateAddParams functions
  validateFindByIdParam([id]);
  validateAddParams([newTitle]);
  
  return params;
}

export function validateDeleteTodoParams(params) {
  if (params.length !== 1) {
    throw new AppError('Give a numeric id as the only parameter in parenthesis.');
  }

  const [id] = params;
  
  validateFindByIdParam([id]);

  return params;
}
