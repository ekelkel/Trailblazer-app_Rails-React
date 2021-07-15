import React from "react";
import { Grid, Typography } from "@material-ui/core";

const RegistrationSuccess = () => {
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
            We have received your request!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationSuccess;
