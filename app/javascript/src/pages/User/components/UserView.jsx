import React from "react";
import { Avatar, Typography, Box, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Pins from "./Pins/Pins";
import { Link } from "react-router-dom";
import IOSSwitch from "./IOSSwitch";
import EmptyUserScreen from "./EmptyUserScreen";
import Pluralize from "react-pluralize";

const useStyles = makeStyles(() => {
  return {
    "@global": {
      body: { margin: 0, padding: 0 },
      backgroundColor: "#ffffff",
    },
    avatar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      marginLeft: "2rem",
      display: "flex",
    },
    switchLegend: {
      fontSize: 12,
      marginLeft: "0.2rem",
      marginTop: "0.2rem",
      marginBottom: "1rem",
    },
  };
});

const UserView = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginTop: "3rem", marginLeft: "1rem" }}>
        <Grid container spacing={0}>
          <Grid item xs={2} className={classes.avatar}>
            <Avatar style={{ height: "54px", width: "54px" }}>
              {props.user.name[0].toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <Typography variant="body1" color="secondary">
                {props.user.name}
              </Typography>
              {props.currentUser.id !== props.user.id ? (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "1rem" }}
                  onClick={props.onClick}
                  disableElevation
                >
                  {props.followed ? "Unfollow" : "Follow"}
                </Button>
              ) : (
                <div />
              )}
            </div>
            <div style={{ display: "flex", marginTop: "1rem" }}>
              <Typography color="textSecondary">
                <Pluralize singular={"pin"} count={props.pinsNumber} />
              </Typography>
              <Typography
                color="textSecondary"
                style={{ marginLeft: "1rem" }}
                component={Link}
                to={`/followers/${props.user.id}`}
              >
                <Pluralize
                  singular={"follower"}
                  count={props.followersNumber}
                />
              </Typography>
              <Typography
                color="textSecondary"
                style={{ marginLeft: "1rem" }}
                component={Link}
                to={`/following/${props.user.id}`}
              >
                {props.followingNumber} following
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
      {props.pinsNumber === 0 ? (
        <EmptyUserScreen user={props.user} currentUser={props.currentUser} />
      ) : (
        <div>
          <div className={classes.container}>
            <div style={{ marginLeft: "auto", marginRight: "1rem" }}>
              <IOSSwitch
                checked={props.toggled}
                onChange={(e) => props.setToggled(e.target.checked)}
                id="map"
              />
              <Typography
                className={classes.switchLegend}
                color="textSecondary"
              >
                Map view
              </Typography>
            </div>
          </div>
          <Pins
            user={props.user}
            tags={props.tags}
            toggled={props.toggled}
            pinsNumber={props.pinsNumber}
            setPinsNumber={props.setPinsNumber}
          />
        </div>
      )}
    </div>
  );
};

export default UserView;
