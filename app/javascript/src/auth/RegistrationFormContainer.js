import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { validate, parseErrors } from "./RegistrationFormValidation";
import RegistrationFormView from "./RegistrationFormView";

const RegistrationForm = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  /*function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }*/

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "/users/",
        { user: values },
        {
          headers: { "X-CSRF-Token": csrfToken() /*getCookie("CSRF-TOKEN")*/ },
        }
      );
      props.setIsSubmitted(true);
    } catch (error) {
      const errors = error.response.data.errors;
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
    <RegistrationFormView
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default RegistrationForm;
