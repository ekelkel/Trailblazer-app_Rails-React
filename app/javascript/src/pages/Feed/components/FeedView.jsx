import React from "react";
import { Typography, List, ListItem } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../../common/Card";

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

const FeedView = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h5" className={classes.title} color="secondary">
        Welcome {props.user.name}!
      </Typography>
      <List dense className={classes.root} id="feed-items-list">
        {props.feedItems.map((item) => {
          return (
            <ListItem key={item.id} xs={12} style={{ marginBottom: "2rem" }}>
              <Card pin={item} user={props.user} onDelete={props.onDelete} />
            </ListItem>
          );
        })}
      </List>
      <Pagination
        count={props.totalPages}
        page={props.page}
        onChange={props.onChange}
        variant="outlined"
        color="secondary"
        className={classes.pagination}
      />
    </div>
  );
};

export default FeedView;
