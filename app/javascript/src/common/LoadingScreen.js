import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: "#FFFFFF",
      },
    },
  };
});

const LoadingScreen = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh" }}
      spacing={2}
    >
      <Grid item>
        <CircularProgress color="secondary" />
      </Grid>
    </Grid>
  );
};

export default LoadingScreen;
