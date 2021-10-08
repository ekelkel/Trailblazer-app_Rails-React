import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Button } from "@mui/material";
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

const EmptyUserScreen = (props) => {
  const classes = useStyles();
  return (
    <div>
      {props.user.id !== props.currentUser.id ? (
        <div />
      ) : (
        <div className={classes.text}>
          <Typography color="textSecondary">
            It's a little quiet out here.
          </Typography>
          <Typography color="textSecondary" style={{ textAlgin: "center" }}>
            Add any place in the world to create your own map with all your
            favorite places.
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
      )}
    </div>
  );
};

export default EmptyUserScreen;
