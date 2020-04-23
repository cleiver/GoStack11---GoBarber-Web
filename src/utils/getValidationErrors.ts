import { ValidationError } from 'yup';

// As we don't know how many fields and neither their names,
// we create a generic interface that has a format of string: string
interface ErrorResponse {
  [key: string]: string;
}

export default function getValidationErrors(
  errors: ValidationError,
): ErrorResponse {
  const allErrors: ErrorResponse = {};

  errors.inner.forEach((error) => {
    allErrors[error.path] = error.message;
  });

  return allErrors;
}
