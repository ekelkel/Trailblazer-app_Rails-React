import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate, parseErrors } from "../../../utils/pinFormUtil";
import PinFormView from "./PinFormView";

toast.configure();

const PinFormContainer = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    comment: "",
    rating: 2,
    address: "",
    longitude: null,
    latitude: null,
  });
  const notify = () => {
    toast.success("Pin successfully created!");
  };

  const submitForm = /*async*/ () => {
    /*try {
      const response = await axios.put(
        "",
        { pin: values },
        {
          headers: { "X-CSRF-Token": csrfToken() },
        }
      );
      console.log(response.data);

      notify();
    } catch (error) {
      const errors = error.response.data.errors;
      setErrors(parseErrors(errors));
    }*/
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues({
      ...values,
      [id]: value,
    });
  };

  const handleRating = (value) => {
    setValues({
      ...values,
      ["rating"]: value,
    });
  };

  const handleSubmit = (event) => {
    console.log(values);
    event.preventDefault();
    let newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      submitForm();
    }
  };

  const onSelectHandler = (result) => {
    setValues({
      ...values,
      ["address"]: result.place_name,
      ["latitude"]: result.geometry.coordinates[1],
      ["longitude"]: result.geometry.coordinates[0],
    });
    /*console.log(result.geometry.coordinates);
    console.log(result.place_name);*/
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) setErrors(validate(values));
  }, [values]);

  return (
    <PinFormView
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onRating={handleRating}
      onSelectHandler={onSelectHandler}
    />
  );
};

export default PinFormContainer;
