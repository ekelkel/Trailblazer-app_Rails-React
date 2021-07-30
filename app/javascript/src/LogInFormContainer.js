import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { validate, parseErrors } from "./LogInFormValidation";
import LogInFormView from "./LogInFormView";
import { useDispatch } from "react-redux";
import { ActionCreators } from "./actions";

const LogInForm = (props) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "/login",
        { user: values },
        {
          headers: { "X-CSRF-Token": csrfToken() },
        }
      );
      props.setIsSubmitted(true);
      dispatch(ActionCreators.login(response.data.user));
      console.log(response.data);
    } catch (error) {
      const errors = error.response.data.errors;
      console.log(errors);
      setErrors(parseErrors(errors));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
      setIsSubmitting(false);
    }
  }, [errors]);

  return (
    <LogInFormView
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default LogInForm;
