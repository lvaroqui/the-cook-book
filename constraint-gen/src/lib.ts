import { ObjectSchema, ValidationError } from 'joi';

interface Out<T extends string> {
  __typename: T;
  message: string;
  [key: string]: string;
}

function makeError<T extends string>(typename: T, error: ValidationError): Out<T> {
  const res = { __typename: typename, message: error.message } as Out<T>;

  error.details.forEach((e) => {
      res[e.path + 'ErrorMessage'] = e.message;
  });

  return res;
}

class In<T extends string, U> {
  constructor(typename: T, schema: ObjectSchema<U>) {
    this.__typename = typename;
    this.schema = schema;
  }

  __typename: T;
  schema: ObjectSchema<U>;
}

export function validate<T extends string, U>(value: unknown, input: In<T, U>): Out<T> | null {
  const { error } = input.schema.validate(value, { abortEarly: false, allowUnknown: false });
  if (error) {
      return makeError(input.__typename, error);
  }
  return null;
}
