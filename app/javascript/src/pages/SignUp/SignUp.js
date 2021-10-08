import React, { useState } from "react";
import { Grid } from "@mui/material";
import SignUpForm from "./components/SignUpForm/SignUpFormContainer";
import SignUpFormSuccess from "./components/SignUpFormSuccess/SignUpFormSuccess";

const SignUp = () => {
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
          <SignUpForm setIsSubmitted={setIsSubmitted} />
        ) : (
          <SignUpFormSuccess />
        )}
      </Grid>
    </>
  );
};

export default SignUp;
