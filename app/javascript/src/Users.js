import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import LoadingScreen from "./LoadingScreen";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      body: { margin: 0, padding: 0 },
      backgroundColor: "#ffffff",
    },
    title: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    root: {
      width: "100%",
    },
    pagination: {
      justifyContent: "center",
      display: "flex",
      marginBottom: theme.spacing(2),
    },
  };
});

const Users = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await axios.get(`/get_users?page=${page}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setUsers(response.data.users);
      setPage(response.data.page);
      setTotalPages(response.data.pages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Typography variant="h5" className={classes.title} color="secondary">
            Meet new trailblazers
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="secondary"
            className={classes.pagination}
          />
          <List dense className={classes.root} id="users-list">
            {users.map((user) => {
              const labelId = `users-list-label-${user.id}`;
              return (
                <ListItem
                  key={user.id}
                  button
                  component={RouterLink}
                  to={`/user/${user.id}`}
                >
                  <ListItemAvatar>
                    <Avatar>{user.name[0].toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${user.name}`} />
                  {/*<ListItemSecondaryAction>
                    </ListItemSecondaryAction>*/}
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

export default Users;
