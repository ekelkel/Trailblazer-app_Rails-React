import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
const queryString = require("query-string");
import axios from "axios";
import { csrfToken } from "@rails/ujs";
import { toast } from "react-toastify";
import { Grid } from "@material-ui/core";
import LoadingScreen from "./LoadingScreen";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [correctLink, setCorrectLink] = useState(false);
  const parsed = queryString.parse(location.search);
  const notify = (type) => {
    if (type === "error") toast.error("Invalid reset password link.");
  };

  const checkLink = async () => {
    try {
      const response = await axios.get(
        `/check_reset_password_link?resetToken=${parsed.resetToken}&email=${parsed.email}`,
        {
          headers: { "X-CSRF-Token": csrfToken() },
        }
      );
      if (response.data.valid_reset_link) {
        setCorrectLink(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notify("error");
    }
  };

  useEffect(() => {
    checkLink();
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
            {correctLink ? (
              <ResetPasswordForm
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
