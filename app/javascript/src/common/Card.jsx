import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
  Avatar,
  IconButton,
  Box,
  Grid,
} from "@material-ui/core";
/*import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";*/
import TimeAgo from "react-timeago";
import ClearIcon from "@material-ui/icons/Clear";
import { useSelector } from "react-redux";
import Image from "../assets/logo";

const useStyles = makeStyles({
  root: {
    width: "100%",
    border: 0,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    /*"&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },*/
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
  divider: {
    margin: "3px 3px 3px 0",
  },
  link: {
    textDecoration: "none",
    color: "#FFBC1F",
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  /*const StyledRating = withStyles({
    iconFilled: {
      color: "#FFBC1F",
    },
    icon: {},
  })(Rating);*/
  const user = useSelector((state) => state.user);
  const coverImage = props.pin.image ? `${props.pin.image.url}` : Image;
  const deleteId = `delete-pin-${props.pin.id}`;

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={
          <div className={classes.pinOwner}>
            <Avatar
              style={{ textDecoration: "none" }}
              component={Link}
              to={`/user/${props.pin.user_id}`}
            >
              {props.pin.owner[0].toUpperCase()}
            </Avatar>
            <Typography
              variant="body1"
              color="secondary"
              style={{ marginLeft: "1rem" }}
            >
              <Link to={`/user/${props.pin.user_id}`} className={classes.link}>
                {props.pin.owner}
              </Link>
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography variant="h5" component="h2" color="secondary">
                {props.pin.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {props.pin.address}
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                {props.pin.comment}
              </Typography>
              {props.pin.tags.map((tag) => {
                const color = `#${tag.color}`;
                return (
                  <Box component="div" sx={{ display: "inline" }} key={tag.id}>
                    <Chip
                      color="primary"
                      style={{ backgroundColor: color }}
                      label={tag.name}
                    />
                  </Box>
                );
              })}
              <Divider className={classes.divider} light />
              <Typography
                variant="body2"
                component="p"
                style={{ color: "rgb(169, 169, 169)" }}
              >
                added <TimeAgo date={props.pin.created_at} />
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              id="pin-image"
              style={
                props.pin.image
                  ? {
                      backgroundImage: `url(${coverImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      minHeight: 200,
                      borderRadius: "6px",
                    }
                  : {
                      backgroundImage: `url(${coverImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "100px 100px",
                    }
              }
            />
          </Grid>
        </Box>
      </CardContent>
      {/*<CardActions>
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
        </CardActions*/}
    </Card>
  );
}
