import React from "react";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { useSelector } from "react-redux";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../actions/actionCreators";
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
    link: {
      textDecoration: "none",
      color: "#FFBC1F",
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
          <Typography className={classes.logo}>
            <Link to={"/"} className={classes.link}>
              Trailblazer
            </Link>
          </Typography>
          <Typography color="secondary">Welcome</Typography>
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
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/profile"
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to={`/user/${user.id}`}
                >
                  My locations
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/users"
                >
                  Users
                </MenuItem>
                <MenuItem
                  onClick={handleLogoutClick}
                  component={RouterLink}
                  to="/"
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
