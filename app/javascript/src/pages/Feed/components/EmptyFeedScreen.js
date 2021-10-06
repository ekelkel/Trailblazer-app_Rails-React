import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    text: {
      marginTop: "5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
  };
});

const EmptyFeedScreen = () => {
  const classes = useStyles();
  return (
    <div className={classes.text}>
      <Typography color="secondary">It's a little quiet out here.</Typography>
      <Typography color="secondary" style={{ textAlgin: "center" }}>
        Start following fellow trailblazers or add your own favorite places!
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        component={Link}
        to={"/users"}
        style={{ marginTop: "2rem" }}
      >
        Find fellow trailblazers
      </Button>
    </div>
  );
};

export default EmptyFeedScreen;
