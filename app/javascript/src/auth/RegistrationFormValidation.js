export const validate = (values) => {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Name required";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password needs to be 8 characters or more";
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = "Password is required";
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = "Passwords do not match";
  }

  return errors;
};

export const parseErrors = (errors) => {
  let parsedErrors = {};
  if (errors.name) {
    parsedErrors.name = `Name ${errors.name}.`;
  }
  if (errors.email) {
    parsedErrors.email = `Email ${errors.email}.`;
  }
  if (errors.password) {
    parsedErrors.password = `Password ${errors.password}.`;
  }
  if (errors.password_confirmation) {
    parsedErrors.password_confirmation = `Password confirmation ${errors.password_confirmation}.`;
  }

  return parsedErrors;
};
