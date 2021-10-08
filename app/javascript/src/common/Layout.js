import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
//import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "./Menu";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      width: "100%",
    },
    root: {
      display: "flex",
    },
    appBar: {
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    },
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
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar position="fixed" elevation={0} color="primary">
        <div className={classes.appBar}>
          <Toolbar>
            <React.Fragment>
              <Typography className={classes.logo}>
                <Link to={"/"} className={classes.link}>
                  Trailblazer
                </Link>
              </Typography>
              {/*<Typography color="secondary">Welcome</Typography>*/}
              {user && (
                <div>
                  <Button
                    color="secondary"
                    size="small"
                    component={Link}
                    to={"/add_pin"}
                    startIcon={<AddIcon />}
                  >
                    ADD PLACE
                  </Button>
                </div>
              )}
              {/*user && (
            <div>
              <IconButton>
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon
                    style={{ color: "#787878", fontSize: 30 }}
                  />
                </Badge>
              </IconButton>
            </div>
          )*/}
              <Menu />
            </React.Fragment>
          </Toolbar>
        </div>
      </AppBar>
      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
