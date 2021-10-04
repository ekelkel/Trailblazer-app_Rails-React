import React from "react";
import { Avatar, Typography, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Map from "./Map/Map";
import PinsList from "./List/PinsList";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      body: { margin: 0, padding: 0 },
      backgroundColor: "#ffffff",
    },
    title: {
      marginTop: "3rem",
      marginLeft: "2rem",
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
    },
    switchLegend: {
      fontSize: 12,
      marginLeft: "0.2rem",
      marginTop: "0.2rem",
      marginBottom: "1rem",
    },
  };
});

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
  },
  switchBase: {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&$checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + $track": {
        backgroundColor: "#FFBC1F",
        opacity: 1,
        border: 0,
      },
    },
    "&$focusVisible $thumb": {
      color: "#FFBC1F",
      border: "6px solid #fff",
    },
  },
  thumb: {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  track: {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.grey[300],
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const UserView = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.title}>
        <Avatar>{props.user.name[0].toUpperCase()}</Avatar>
        <Typography
          variant="body1"
          color="secondary"
          style={{ marginLeft: "1rem" }}
        >
          {props.user.name}
        </Typography>
        <Typography color="textSecondary" style={{ marginLeft: "2rem" }}>
          {props.pinsNumber} pins
        </Typography>
        <div style={{ marginLeft: "auto", marginRight: "1rem" }}>
          <IOSSwitch
            checked={props.toggled}
            onChange={(e) => props.setToggled(e.target.checked)}
            id="map"
          />
          <Typography className={classes.switchLegend} color="textSecondary">
            Switch on to display the map
          </Typography>
        </div>
      </div>
      {props.toggled ? (
        <Map user={props.user} tags={props.tags} />
      ) : (
        <PinsList user={props.user} tags={props.tags} />
      )}
    </div>
  );
};

export default UserView;
