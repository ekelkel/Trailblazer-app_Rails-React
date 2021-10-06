import React from "react";
import { List, ListItem } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import PinCard from "../../../common/Card";
import BouncingMarker from "./BouncingMarker/BouncingMarker";
import EmptyFeedScreen from "./EmptyFeedScreen";

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
    root: {
      width: "100%",
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
        <EmptyFeedScreen />
      ) : (
        <div>
          <List dense className={classes.root} id="feed-items-list">
            {props.feedItems.map((item) => {
              return (
                <ListItem
                  key={item.id}
                  xs={12}
                  style={{ marginBottom: "2rem" }}
                >
                  <PinCard pin={item} onDelete={props.onDelete} />
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
