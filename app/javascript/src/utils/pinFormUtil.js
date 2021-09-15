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
