export const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export const parseErrors = (errors) => {
  let parsedErrors = {};
  if (errors.email) {
    parsedErrors.email = "User does not exist";
  }
  if (errors.password) {
    parsedErrors.password = "Invalid email/password combination";
  }
  return parsedErrors;
};
