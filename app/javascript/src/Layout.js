import React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";
import NotificationsTwoToneIcon from "@material-ui/icons/NotificationsTwoTone";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    appBar: {},
    logo: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  };
});

export default function Layout({ children }) {
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        elevation={0}
        className={classes.appBar}
        color="transparent"
      >
        <Toolbar>
          <Typography className={classes.logo}>Trailblazer</Typography>
          <Typography>Elora</Typography>
          {user.name && (
            <div>
              <IconButton>
                <Badge badgeContent={17} color="error">
                  <NotificationsTwoToneIcon color="primary" fontSize="large" />
                </Badge>
              </IconButton>
            </div>
          )}
          <IconButton onClick={handleMenu}>
            <AccountCircleTwoToneIcon color="primary" fontSize="large" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
            onClose={handleClose}
          >
            {user.name ? (
              <div>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={handleClose}>Log In</MenuItem>
                <MenuItem onClick={handleClose}>Sign up</MenuItem>
              </div>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
