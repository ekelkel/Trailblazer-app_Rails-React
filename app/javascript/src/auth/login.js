import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import LogInForm from "./LogInFormContainer";
import { Redirect } from "react-router";

const LogIn = () => {
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
          <LogInForm setIsSubmitted={setIsSubmitted} />
        ) : (
          <Redirect to="/" />
        )}
      </Grid>
    </>
  );
};

export default LogIn;
