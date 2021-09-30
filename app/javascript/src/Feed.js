import React, { useState, useEffect } from "react";
import { Typography, List, ListItem } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import LoadingScreen from "./common/LoadingScreen";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card";
import { useSelector } from "react-redux";
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
      marginBottom: "2rem",
      marginTop: "3rem",
      display: "flex",
      justifyContent: "center",
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
    },
  };
});

const Feed = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [feedItems, setFeedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const notify = () => {
    toast.success("Pin successfully deleted!");
  };

  const getFeedItems = async () => {
    try {
      const response = await axios.get(`/feed?page=${page}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setFeedItems(response.data.feed);
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
      const newFeedItems = feedItems.filter((item) => item.id != pinId);
      setFeedItems(newFeedItems);
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
    getFeedItems();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Typography variant="h5" className={classes.title} color="secondary">
            Welcome {user.name}!
          </Typography>
          <List dense className={classes.root} id="feed-items-list">
            {feedItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  xs={12}
                  style={{ marginBottom: "2rem" }}
                >
                  <Card pin={item} user={user} onDelete={handleDelete} />
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

export default Feed;
