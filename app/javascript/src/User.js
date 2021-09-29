import { useParams } from "react-router";
import Card from "./Card";
import React, { useState, useEffect } from "react";
import { Avatar, Typography, List, ListItem } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import LoadingScreen from "./common/LoadingScreen";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

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
    pagination: {
      justifyContent: "center",
      display: "flex",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    root: {
      width: "100%",
      marginBottom: "2rem",
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
  const notify = () => {
    toast.success("Pin successfully deleted!");
  };

  const getUser = async () => {
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
      console.log(error);
    }
  };

  const handleDelete = async (pinId) => {
    try {
      const response = await axios.delete(`/pins/${pinId}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      console.log(response.data);
      const newPins = pins.filter((pin) => pin.id != pinId);
      setPins(newPins);
      notify();
    } catch (error) {
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
          <List dense className={classes.root} id="pins-list">
            {pins.map((pin) => {
              return (
                <ListItem key={pin.id} xs={12} style={{ marginBottom: "2rem" }}>
                  <Card pin={pin} user={user} onDelete={handleDelete} />
                </ListItem>
              );
            })}
          </List>
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
