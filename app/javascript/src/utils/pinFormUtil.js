export const validate = (values) => {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Name required";
  }

  if (!values.address.trim()) {
    errors.address = "Address required";
  }

  if (values.comment.length > 500) {
    errors.password = "Comment needs to be less than 500 characters";
  }

  return errors;
};

export const parseErrors = (errors) => {
  let parsedErrors = {};
  if (errors.name) {
    parsedErrors.name = `Name ${errors.name}.`;
  }
  if (errors.address) {
    parsedErrors.address = `Address ${errors.email}.`;
  }
  if (errors.comment) {
    parsedErrors.comment = `Comment ${errors.password}.`;
  }
  if (errors.rating) {
    parsedErrors.rating = `Rating ${errors.password_confirmation}.`;
  }

  return parsedErrors;
};
