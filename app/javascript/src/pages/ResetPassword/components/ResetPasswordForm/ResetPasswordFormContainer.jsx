import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { toast } from "react-toastify";
import { validate, parseErrors } from "../../../../utils/resetPasswordFormUtil";
import ResetPasswordFormView from "./ResetPasswordFormView";

const ResetPasswordFormContainer = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    password: "",
    password_confirmation: "",
  });
  const notify = (type) => {
    if (type === "success")
      toast.success(
        "Password has been successfully reset. You can now log in."
      );
    else if (type === "error") toast.error("Password reset has expired.");
  };

  const submitForm = async () => {
    try {
      const response = await axios.put(
        `/password_resets/${props.resetToken}`,
        { user: values, email: props.email, resetToken: props.resetToken },
        {
          headers: { "X-CSRF-Token": csrfToken() },
        }
      );
      if (response.data.successful_reset) {
        props.setIsSubmitted(true);
        notify("success");
      }
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors.link) notify("error");
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
    <ResetPasswordFormView
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ResetPasswordFormContainer;
