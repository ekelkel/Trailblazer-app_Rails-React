import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
const queryString = require("query-string");
import axios from "axios";
import { csrfToken } from "@rails/ujs";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import LoadingScreen from "../../common/LoadingScreen";
import ResetPasswordFormContainer from "./components/ResetPasswordForm/ResetPasswordFormContainer";

const ResetPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [correctLink, setCorrectLink] = useState(false);
  const parsed = queryString.parse(location.search);
  const notify = (type, message) => {
    if (type === "error") toast.error(message);
  };

  const checkLink = async (controller) => {
    try {
      const response = await axios.get(
        `/check_reset_password_link?resetToken=${parsed.resetToken}&email=${parsed.email}`,
        {
          headers: { "X-CSRF-Token": csrfToken() },
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.valid_reset_link) {
        setCorrectLink(true);
        setLoading(false);
      }
    } catch (error) {
      const errors = error.response.data.errors;
      setLoading(false);
      if (errors.user) notify("error", errors.user);
      else if (errors.link) notify("error", errors.link);
    }
  };

  useEffect(() => {
    let controller = new AbortController();
    checkLink(controller);
    return () => controller?.abort();
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {correctLink && !isSubmitted ? (
              <ResetPasswordFormContainer
                setIsSubmitted={setIsSubmitted}
                email={parsed.email}
                resetToken={parsed.resetToken}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default ResetPassword;
