import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import TimeAgo from "react-timeago";
import ClearIcon from "@material-ui/icons/Clear";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    width: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  pinOwner: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const StyledRating = withStyles({
    iconFilled: {
      color: "#FFBC1F",
    },
    icon: {},
  })(Rating);
  const user = useSelector((state) => state.user);
  const deleteId = `delete-pin-${props.pin.id}`;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={
          <div className={classes.pinOwner}>
            <Avatar>{props.user.name[0].toUpperCase()}</Avatar>
            <Typography
              variant="body1"
              color="secondary"
              style={{ marginLeft: "1rem" }}
            >
              {props.user.name}
            </Typography>
          </div>
        }
        action={
          user.id === props.pin.user_id ? (
            <IconButton
              id={deleteId}
              onClick={() => props.onDelete(props.pin.id)}
            >
              <ClearIcon />
            </IconButton>
          ) : (
            <div />
          )
        }
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.pin.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.pin.address}
        </Typography>
        <Typography variant="body2" component="p">
          {props.pin.comment}
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          added <TimeAgo date={props.pin.created_at} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        {props.pin.rating ? (
          <StyledRating
            className="pop-score-hearts"
            value={props.pin.rating}
            precision={0.1}
            icon={<FavoriteIcon fontSize="inherit" />}
            readOnly
          />
        ) : (
          <div />
        )}
      </CardActions>
    </Card>
  );
}
