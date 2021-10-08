import React from "react";
import { Grid, CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <CircularProgress color="secondary" />
      </Grid>
    </Grid>
  );
};

export default LoadingScreen;
