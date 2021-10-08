import React from "react";
import { List, ListItem, Typography, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Card from "../../../common/Card";
import BouncingMarker from "./BouncingMarker/BouncingMarker";
import EmptyFeedView from "./EmptyFeedView";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      height: 100,
    },
    pagination: {
      justifyContent: "center",
      display: "flex",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  };
});

const FeedView = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.title}>
        <BouncingMarker />
      </div>
      {props.feedItems.length === 0 ? (
        <EmptyFeedView />
      ) : (
        <div>
          <Typography
            color="textSecondary"
            style={{ marginLeft: "2rem", fontFamily: "Karla" }}
          >
            Discover the most recent places shared by the trailblazers you
            follow
          </Typography>
          <List dense id="feed-items-list">
            {props.feedItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  xs={12}
                  style={{ marginBottom: "2rem" }}
                >
                  <Card pin={item} onDelete={props.onDelete} />
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
      )}
    </div>
  );
};

export default FeedView;
