import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { Avatar, Typography } from "@material-ui/core";
import LoadingScreen from "./LoadingScreen";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => {
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
  };
});

const Users = () => {
  const id = useParams().userId;
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(`/get_user?id=${id}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      //console.log(response);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className={classes.title}>
          <Avatar>{user.name[0].toUpperCase()}</Avatar>
          <Typography
            variant="body1"
            color="secondary"
            style={{ marginLeft: "1rem" }}
          >
            {user.name}
          </Typography>
        </div>
      )}
    </>
  );
};

export default Users;
