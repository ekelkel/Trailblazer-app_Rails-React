import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { validate, parseErrors } from "./LogInFormValidation";
import LogInFormView from "./LogInFormView";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../actions";

const LogInForm = (props) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
    setValues({
      ...values,
      remember_me: event.target.checked,
    });
  };

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
      const err = error.response.data.error;
      console.log(err);
      setErrors(parseErrors(err));
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
    let newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      submitForm();
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) setErrors(validate(values));
  }, [values]);

  return (
    <LogInFormView
      values={values}
      errors={errors}
      checked={checked}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCheck={handleCheck}
    />
  );
};

export default LogInForm;
