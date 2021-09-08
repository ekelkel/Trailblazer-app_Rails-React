import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { toast } from "react-toastify";
import { validate, parseErrors } from "./ResetPasswordRequestValidation";
import ResetPasswordRequestView from "./ResetPasswordRequestView";

const ResetPasswordRequestForm = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
  });
  const notify = () => {
    toast.success("Email sent with password reset instructions");
  };

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "/password_resets",
        { password_reset: values },
        {
          headers: { "X-CSRF-Token": csrfToken() },
        }
      );
      props.setIsSubmitted(true);
      console.log(response.data);
      notify();
    } catch (error) {
      const err = error.response.data.error;
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
    <ResetPasswordRequestView
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ResetPasswordRequestForm;
