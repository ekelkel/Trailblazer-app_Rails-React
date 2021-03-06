import React, { useEffect } from "react";
import { Redirect } from "react-router";
const queryString = require("query-string");
import axios from "axios";
import { csrfToken } from "@rails/ujs";
import { toast } from "react-toastify";

const ActivateAccount = () => {
  const parsed = queryString.parse(location.search);
  const notify = (type) => {
    if (type === "success")
      toast.success("Account activated! You can now log in.");
    if (type === "error") toast.error("Invalid activation link");
  };

  const activateAccount = async (controller) => {
    try {
      const response = await axios.get(
        `/validate_account?validationToken=${parsed.validationToken}&email=${parsed.email}`,
        {
          headers: { "X-CSRF-Token": csrfToken() },
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.activated) {
        notify("success");
      }
    } catch (error) {
      notify("error");
    }
  };

  useEffect(() => {
    let controller = new AbortController();
    activateAccount(controller);
    return () => controller?.abort();
  }, []);

  return (
    <>
      <Redirect to="/login" />
    </>
  );
};

export default ActivateAccount;
