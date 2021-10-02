import React from "react";
import Card from "../../../common/Card";
import {
  Avatar,
  Typography,
  List,
  ListItem,
  Box,
  Chip,
} from "@material-ui/core";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import Pagination from "@material-ui/lab/Pagination";
import LoadingScreen from "../../../common/LoadingScreen";
import { makeStyles } from "@material-ui/core/styles";

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
    legend: {
      fontSize: 12,
      marginLeft: "0.2rem",
      marginTop: "0.2rem",
      marginBottom: "1rem",
      marginLeft: "1rem",
    },
    root: {
      width: "100%",
      marginBottom: "2rem",
    },
  };
});

const UserView = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.title}>
        <Avatar>{props.user.name[0].toUpperCase()}</Avatar>
        <Typography
          variant="body1"
          color="secondary"
          style={{ marginLeft: "1rem" }}
        >
          {props.user.name}
        </Typography>
        <Typography color="textSecondary" style={{ marginLeft: "2rem" }}>
          {props.pinsNumber} pins
        </Typography>
      </div>
      <div style={{ marginLeft: "1rem" }}>
        {props.tags ? (
          props.tags.map((tag) => {
            const color = `#${tag.color}`;
            return (
              <Box
                component="div"
                sx={{
                  display: "inline",
                  padding: 0.8,
                  marginTop: -0.8,
                }}
                key={tag.id}
              >
                {props.selected.includes(tag.label) ? (
                  <Chip
                    color="primary"
                    icon={<CheckSharpIcon />}
                    style={{
                      backgroundColor: color,
                      borderRadius: "2px",
                      marginTop: 0.8,
                    }}
                    onClick={() => props.onRemoveTagClick(tag)}
                    label={tag.label}
                    id={`tag-${tag.id}`}
                  />
                ) : (
                  <Chip
                    color="primary"
                    style={{
                      backgroundColor: "#DEDEDE",
                      borderRadius: "2px",
                      marginTop: 0.8,
                    }}
                    onClick={() => props.onSelectTagClick(tag)}
                    label={tag.label}
                    id={`tag-${tag.id}`}
                  />
                )}
              </Box>
            );
          })
        ) : (
          <div />
        )}
      </div>
      <Typography className={classes.legend} color="textSecondary">
        Click on the tags to filter the pins displayed
      </Typography>

      {props.pinsLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <List dense className={classes.root} id="pins-list">
            {props.pins.map((pin) => {
              return (
                <ListItem key={pin.id} xs={12} style={{ marginBottom: "1rem" }}>
                  <Card pin={pin} user={props.user} onDelete={props.onDelete} />
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

export default UserView;
