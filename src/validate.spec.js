import { AppError } from './app-error';
import {
  validateAddParams,
  validateFindByIdParam,
  validateFindByTitleParam,
  validateStatusParam,
  validateAddLabelParams
} from './validate';

describe('validateAddParams', () => {
  it('should pass and return with the original params with single string', () => {
    const params = ['Todo'];
    const expected = ['Todo'];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  });

  it('should pass and return with the original params with single string separated with spaces', () => {
    const params = ['Todo Item'];
    const expected = ['Todo Item'];

    const current = validateAddParams(params);

    expect(current).toStrictEqual(expected);
  });

  it('should throw when multiple strings given', () => {
    const params = ['Todo Item', 'Other string'];

    expect(() => validateAddParams(params)).toThrow(
      'Give a title as the only parameter in parenthesis.'
    );
  });

  it('should throw when no params given.', () => {
    const params = [];

    expect(() => validateAddParams(params)).toThrow(
      'Give a title as the only parameter in parenthesis.'
    );
  });

  it('should throw when the param is not a string', () => {
    const params = [5];

    expect(() => validateAddParams(params)).toThrow(
      'The title must be a non zero length string.'
    );
  });

  it('should throw when the param is a zero length string', () => {
    const params = [''];

    expect(() => validateAddParams(params)).toThrow(
      'The title must be a non zero length string.'
    );
  });
});

describe('validateFindByIdParam', () => {
  it('should pass and return the original params with a valid number', () => {
    const params = ['123'];
    const expected = ['123'];

    const validated = validateFindByIdParam(params);

    expect(validated).toStrictEqual(expected);
  });

  it('should throw an error when the param is not a number', () => {
    const params = ['abc'];

    expect(() => validateFindByIdParam(params)).toThrow(AppError);
    expect(() => validateFindByIdParam(params)).toThrow(
      'Id is not a number, please provide a number'
    );
  });

  it('should throw an error when no params are given', () => {
    const params = [];

    expect(() => validateFindByIdParam(params)).toThrow(AppError);
    expect(() => validateFindByIdParam(params)).toThrow(
      'Id is not a number, please provide a number'
    );
  });
});

describe('validateFindByTitleParam', () => {
  it('should pass and return the original params with a valid title', () => {
    const params = ['Feed the cats'];
    const expected = ['Feed the cats'];

    const validated = validateFindByTitleParam(params);

    expect(validated).toStrictEqual(expected);
  });

  it('should throw an error when the title is too short', () => {
    const params = ['To'];

    expect(() => validateFindByTitleParam(params)).toThrow(AppError);
    expect(() => validateFindByTitleParam(params)).toThrow(
      'The title should be string and at least 3 character long!'
    );
  });

  it('should throw an error when no params are given', () => {
    const params = [];

    expect(() => validateFindByTitleParam(params)).toThrow(AppError);
    expect(() => validateFindByTitleParam(params)).toThrow(
      'The title should be string and at least 3 character long!'
    );
  });

  it('should throw an error when the param is not a string', () => {
    const params = [123];

    expect(() => validateFindByTitleParam(params)).toThrow(AppError);
    expect(() => validateFindByTitleParam(params)).toThrow(
      'The title should be string and at least 3 character long!'
    );
  });
});

describe('validateStatusParam', () => {
  it('should pass and return the original params with a valid status', () => {
    const params = ['done'];
    const expected = 'done';

    const validated = validateStatusParam(params);

    expect(validated).toStrictEqual(expected);
  });

  it('should throw an error if try with another status which not exist', () => {
    const params = ['pending'];

    expect(() => validateStatusParam(params)).toThrow(AppError);
    expect(() => validateStatusParam(params)).toThrow(
      "Status have to be 'done' or 'not-done' string!"
    );
  });

  it('should throw an error when no params are given', () => {
    const params = [];

    expect(() => validateStatusParam(params)).toThrow(AppError);
    expect(() => validateStatusParam(params)).toThrow(
      "Status have to be 'done' or 'not-done' string!"
    );
  });
});

describe('validateAddLabelParams', () => {
  it('should pass with valid id and label', () => {
    const params = ['1', 'urgent'];
    const expected = [1, 'urgent'];

    const current = validateAddLabelParams(params);

    expect(current).toStrictEqual(expected);
  });

  it('should throw an error when no params are provided', () => {
    const params = [];

    expect(() => validateAddLabelParams(params)).toThrow(AppError);
    expect(() => validateAddLabelParams(params)).toThrow(
      'Give two parameters: todo ID and label.'
    );
  });

  it('should throw an error when only one param is provided', () => {
    const params = ['1'];

    expect(() => validateAddLabelParams(params)).toThrow(AppError);
    expect(() => validateAddLabelParams(params)).toThrow(
      'Give two parameters: todo ID and label.'
    );
  });

  it('should throw an error when id is not a number', () => {
    const params = ['abc', 'urgent'];

    expect(() => validateAddLabelParams(params)).toThrow(AppError);
    expect(() => validateAddLabelParams(params)).toThrow(
      'The ID must be a numeric value.'
    );
  });

  it('should throw an error when label is not a string', () => {
    const params = ['1', 123];

    expect(() => validateAddLabelParams(params)).toThrow(AppError);
    expect(() => validateAddLabelParams(params)).toThrow(
      'Label must be a non-empty string.'
    );
  });

  it('should throw an error when label is an empty string', () => {
    const params = ['1', ''];

    expect(() => validateAddLabelParams(params)).toThrow(AppError);
    expect(() => validateAddLabelParams(params)).toThrow(
      'Label must be a non-empty string.'
    );
  });
});
