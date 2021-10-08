import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { makeStyles } from "@mui/styles";
import {
  /*CardActions,*/
  CardHeader,
  Chip,
  Divider,
  Typography,
  Avatar,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
/*import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";*/
import ClearIcon from "@mui/icons-material/Clear";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Image from "../assets/logo";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    margin: "auto",
    border: 0,
    borderRadius: "6px",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    fontFamily: "Karla",
    /*"&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },*/
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  link: {
    textDecoration: "none",
    color: "#FFBC1F",
  },
  cardContent: {
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
    marginTop: 0,
  },
  pinName: {
    fontSize: 24,
    marginBottom: 12,
  },
  pinText: {
    color: "#707070",
  },
  icon: {
    marginRight: 4,
    fontSize: 18,
  },
  timeAgo: {
    marginTop: "3px",
    color: "#707070",
    fontSize: 12,
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
    <div className={classes.root}>
      <CardHeader
        title={
          <div className={classes.header}>
            <Avatar
              style={{ textDecoration: "none" }}
              component={Link}
              to={`/user/${props.pin.user_id}`}
            >
              {props.pin.owner[0].toUpperCase()}
            </Avatar>
            <Typography variant="body1" style={{ marginLeft: "1rem" }}>
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
      <div className={classes.cardContent}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <h3 className={classes.pinName}>{props.pin.name}</h3>
              <Box
                color={"grey.500"}
                display={"flex"}
                alignItems={"center"}
                mb={1}
              >
                <LocationOnIcon className={classes.icon} />
                <span className={classes.pinText}>{props.pin.address}</span>
              </Box>
              <Box
                color={"grey.500"}
                display={"flex"}
                alignItems={"center"}
                style={{ marginBottom: "1rem" }}
                mb={1}
              >
                <FormatQuoteIcon className={classes.icon} />
                <span className={classes.pinText}>{props.pin.comment}</span>
              </Box>
              <div style={{ marginBottom: "3px" }}>
                {props.pin.tags.map((tag) => {
                  const color = `#${tag.color}`;
                  return (
                    <Box
                      component="div"
                      style={{ display: "inline", padding: 1 }}
                      key={tag.id}
                    >
                      <Chip
                        color="primary"
                        style={{ backgroundColor: color }}
                        label={tag.name}
                      />
                    </Box>
                  );
                })}
              </div>
              <Divider light style={{ marginRight: "1rem" }} />
              <span className={classes.timeAgo}>
                added <TimeAgo date={props.pin.created_at} />
              </span>
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
      </div>
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
    </div>
  );
}
