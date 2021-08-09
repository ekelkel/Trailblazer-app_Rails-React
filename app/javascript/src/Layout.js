import React from "react";
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionCreators } from "./actions";
import { csrfToken } from "@rails/ujs";
import axios from "axios";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
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
  const dispatch = useDispatch();
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

  const handleLogoutClick = async () => {
    try {
      const response = await axios.delete("/logout", {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      console.log(response.data);
      dispatch(ActionCreators.login(null));
      setAnchorEl(null);
    } catch (error) {
      console.log("logout error");
    }
  };

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        elevation={0}
        className={classes.appBar}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.logo}>Trailblazer</Typography>
          <Typography>Welcome</Typography>
          {user && (
            <div>
              <IconButton>
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon
                    style={{ color: "#787878", fontSize: 30 }}
                  />
                </Badge>
              </IconButton>
            </div>
          )}
          <IconButton id="menu-icon" onClick={handleMenu}>
            <AccountCircleRoundedIcon
              style={{ color: "#787878", fontSize: 30 }}
            />
          </IconButton>
          <Menu
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
            {user ? (
              <div>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={handleLogoutClick}
                  component={RouterLink}
                  to="/login"
                >
                  Log out
                </MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/login"
                >
                  Log In
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/signup"
                >
                  Sign up
                </MenuItem>
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