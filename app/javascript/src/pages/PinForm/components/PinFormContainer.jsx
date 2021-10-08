import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate, parseErrors } from "../../../utils/pinFormUtil";
import PinFormView from "./PinFormView";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

toast.configure();

const PinFormContainer = () => {
  const user = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    name: "",
    comment: "",
    /*rating: null,*/
    address: "",
    all_tags: "",
    images: [],
  });
  const notify = () => {
    toast.success("Pin successfully created!");
  };

  const getTags = async () => {
    try {
      const response = await axios.get(`/get_tags?id=${user.id}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setTags(response.data.tags);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (formData) => {
    try {
      const response = await axios.post("/pins/", formData, {
        headers: { "X-CSRF-Token": csrfToken() /*getCookie("CSRF-TOKEN")*/ },
      });
      console.log(response);
      notify();
      setIsSubmitted(true);
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

  /*const handleRating = (value) => {
    setValues({
      ...values,
      ["rating"]: value,
    });
  };*/

  const handleTagsSelect = (tags) => {
    const tags_value = [];
    tags.forEach((tag) => tags_value.push(tag.value));
    const tags_list = tags_value.join(",");
    setValues({
      ...values,
      ["all_tags"]: tags_list,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = validate(values);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("longitude", values.longitude);
      formData.append("latitude", values.latitude);
      //formData.append("rating", values.rating);
      formData.append("comment", values.comment);
      formData.append("all_tags", values.all_tags);
      if (values.images) {
        for (let i = 0; i < values.images.length; i++) {
          formData.append("images[]", values.images[i]);
        }
      }
      submitForm(formData);
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

  const updateFilesCb = (filesAsArray) => {
    setValues({
      ...values,
      ["images"]: filesAsArray,
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length !== 0) setErrors(validate(values));
  }, [values]);

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      {isSubmitted ? (
        <Redirect to="/" />
      ) : (
        <PinFormView
          values={values}
          errors={errors}
          tags={tags}
          onChange={handleChange}
          onSubmit={handleSubmit}
          /*onRating={handleRating}*/
          onTagsSelect={handleTagsSelect}
          onSelectHandler={onSelectHandler}
          updateFilesCb={updateFilesCb}
        />
      )}
    </div>
  );
};

export default PinFormContainer;
