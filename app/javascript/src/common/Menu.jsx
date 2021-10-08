import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { ActionCreators } from "../actions/actionCreators";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

export default function AppBarMenu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
    <div>
      <IconButton id="menu-icon" onClick={handleMenu}>
        <AccountCircleRoundedIcon style={{ color: "#787878", fontSize: 30 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
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
              component={Link}
              to={`/user/${user.id}`}
            >
              My profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/settings">
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/users">
              Trailblazers
            </MenuItem>
            <MenuItem onClick={handleLogoutClick} component={Link} to="/">
              Log out
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose} component={Link} to="/login">
              Log In
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/signup">
              Sign up
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}
