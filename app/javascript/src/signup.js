import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import RegistrationForm from "./RegistrationFormContainer";
import RegistrationSuccess from "./RegistrationSuccess";

const Registration = () => {
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
          <RegistrationForm setIsSubmitted={setIsSubmitted} />
        ) : (
          <RegistrationSuccess />
        )}
      </Grid>
    </>
  );
};

export default Registration;
