import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate, parseErrors } from "./updateProfileValidation";
import UpdateProfileView from "./UpdateProfileView";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "./actions";

toast.configure();

const UpdateProfile = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const notify = () => {
    toast("Profile successfully updated!");
  };

  const submitForm = async () => {
    try {
      const response = await axios.put(
        `/users/${user.id}`,
        { user: values },
        {
          headers: { "X-CSRF-Token": csrfToken() },
        }
      );
      console.log(response.data);
      dispatch(ActionCreators.update(response.data.user));
      notify();
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

  useEffect(() => {
    setValues({
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
      password_confirmation: "",
    });
  }, [user]);

  return (
    <UpdateProfileView
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default UpdateProfile;
