import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
//import Image from "./assets/pexels-helena-lopes-693269";
//import mobileImage from "./assets/pexels-blue-bird-7242744";
import Typed from "react-typed";
import "./pulse.css";
import { Grid, Button, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      body: {
        margin: 0,
        padding: 0,
        //backgroundImage: `url(${Image})`,
        //backgroundRepeat: "no-repeat",
        backgroundColor: "#FFBC1F",
      },
    },
    titleText: {
      textAlign: "center",
      fontFamily: "Raleway",
      color: "#ffffff",
      fontSize: "50px",
    },
  };
});

const Home = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh" }}
      spacing={2}
    >
      <Grid item>
        <Typography className={classes.titleText}>
          {"Share your favorite "}
        </Typography>
        <div className={classes.titleText}>
          <Typed
            strings={[
              "bakery",
              "cafe",
              "bar",
              "restaurant",
              "pastry shop",
              "food truck",
              "coffee house",
              "beer hall",
              "burger joint",
              "boba shop",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </div>
      </Grid>
      <Grid item>
        <div className="pulse"></div>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to={"/signup"}
        >
          Register
        </Button>
      </Grid>
      <Grid item>
        <Button color="primary" size="small" component={Link} to={"/login"}>
          Already have an account? Log In
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
