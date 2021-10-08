import React, { useState } from "react";
import { Grid } from "@mui/material";
import ResetPasswordRequestForm from "./components/ResetPasswordRequestForm/ResetPasswordRequestContainer";
import { Redirect } from "react-router";

const ResetPasswordRequest = () => {
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
          <ResetPasswordRequestForm setIsSubmitted={setIsSubmitted} />
        ) : (
          <Redirect to="/login" />
        )}
      </Grid>
    </>
  );
};

export default ResetPasswordRequest;
