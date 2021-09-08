import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import ResetPasswordFormContainer from "./ResetPasswordFormContainer";
import { Redirect } from "react-router";

const ResetPasswordForm = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        {!isSubmitted ? (
          <ResetPasswordFormContainer
            setIsSubmitted={setIsSubmitted}
            email={props.email}
            resetToken={props.resetToken}
          />
        ) : (
          <Redirect to="/login" />
        )}
      </Grid>
    </>
  );
};

export default ResetPasswordForm;
