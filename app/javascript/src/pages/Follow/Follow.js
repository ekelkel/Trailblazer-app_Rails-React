import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Pagination,
} from "@mui/material";
import LoadingScreen from "../../common/LoadingScreen";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      marginTop: "3rem",
      textAlign: "center",
      marginBottom: "2rem",
    },
    pagination: {
      justifyContent: "center",
      display: "flex",
      marginBottom: theme.spacing(2),
    },
  };
});

const Follow = (props) => {
  const id = useParams().userId;
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const url = props.following
    ? `/following?id=${id}&page=${page}`
    : `/followers?id=${id}&page=${page}`;

  const getFollow = async () => {
    try {
      const response = await axios.get(url, {
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
    getFollow();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <Typography variant="h5" className={classes.title} color="secondary">
            {props.following ? "Following" : "Followers"}
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            variant="outlined"
            color="secondary"
            className={classes.pagination}
          />
          <List dense id="users-list">
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

export default Follow;
