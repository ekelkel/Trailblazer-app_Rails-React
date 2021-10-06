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

const EmptyUserScreen = () => {
  const classes = useStyles();
  return (
    <div className={classes.text}>
      <Typography color="secondary">It's a little quiet out here.</Typography>
      <Typography color="secondary" style={{ textAlgin: "center" }}>
        Add any place in the world to create your own map with all your favorite
        places.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        component={Link}
        to={"/add_pin"}
        style={{ marginTop: "2rem" }}
      >
        Add my first place
      </Button>
    </div>
  );
};

export default EmptyUserScreen;
