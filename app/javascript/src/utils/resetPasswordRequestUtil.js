export const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  }

  return errors;
};

export const parseErrors = (errors) => {
  let parsedErrors = {};
  if (errors.email) {
    parsedErrors.email = "User does not exist";
  }
  return parsedErrors;
};
