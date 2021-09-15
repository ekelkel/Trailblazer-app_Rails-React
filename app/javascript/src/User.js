import { useParams } from "react-router";
import Card from "./Card";
import React, { useState, useEffect } from "react";
import { Avatar, Typography, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import LoadingScreen from "./common/LoadingScreen";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      body: { margin: 0, padding: 0 },
      backgroundColor: "#ffffff",
    },
    title: {
      marginLeft: "2rem",
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
    },
    pagination: {
      justifyContent: "center",
      display: "flex",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    gridContainer: {
      paddingLeft: "40px",
      paddingRight: "40px",
    },
  };
});

const User = () => {
  const id = useParams().userId;
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [pinsNumber, setPinsNumber] = useState(0);
  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);

  const getUser = async (controller) => {
    try {
      const response = await axios.get(`/get_user?id=${id}&page=${page}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      //console.log(response);
      setUser(response.data.user);
      setPinsNumber(response.data.count);
      setPins(response.data.pins);
      setPage(response.data.page);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      console.log("coucou");
      console.log(error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className={classes.title}>
            <Avatar>{user.name[0].toUpperCase()}</Avatar>
            <Typography
              variant="body1"
              color="secondary"
              style={{ marginLeft: "1rem" }}
            >
              {user.name}
            </Typography>
            <Typography color="textSecondary" style={{ marginLeft: "2rem" }}>
              {pinsNumber} pins
            </Typography>
          </div>
          <Grid
            container
            spacing={4}
            className={classes.gridContainer}
            justifyContent="center"
            id="pins-list"
          >
            {pins.map((pin) => {
              return (
                <Grid item key={pin.id} xs={12}>
                  <Card pin={pin} />
                </Grid>
              );
            })}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="secondary"
            className={classes.pagination}
          />
        </div>
      )}
    </>
  );
};

export default User;
