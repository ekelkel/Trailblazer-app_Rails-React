import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";

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

export default IOSSwitch;
