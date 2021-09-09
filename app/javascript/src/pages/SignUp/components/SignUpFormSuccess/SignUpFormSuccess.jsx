import React from "react";
import { Grid, Typography } from "@material-ui/core";

const SignUpFormSuccess = () => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography variant="h5" color="secondary">
            Please check your email to activate your account.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUpFormSuccess;
