import React from "react";
import { Box, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MatGeocoder from "react-mui-mapbox-geocoder";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";

const geocoderApiOptions = {
  //country: "us",
  //proximity: { longitude: -121.0681, latitude: 38.9197 },
  //bbox: [-123.8501, 38.08, -117.5604, 39.8735],
};

const useStyles = makeStyles((theme) => {
  return {
    title: {
      marginBottom: "2rem",
    },
    field: {
      marginBottom: "1rem",
    },
    addressError: {
      fontSize: 12,
      marginLeft: "0.2rem",
      marginTop: "0.2rem",
    },
  };
});

const PinFormView = (props) => {
  const classes = useStyles();
  const StyledRating = withStyles({
    iconFilled: {
      color: "#FFBC1F",
    },
    icon: {},
  })(Rating);

  return (
    <Box width="75%">
      <Typography variant="h5" className={classes.title} color="secondary">
        Add a new place to your map
      </Typography>
      <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
        <TextField
          id="name"
          fullWidth
          required
          className={classes.field}
          label="Name"
          color="secondary"
          variant="outlined"
          type="text"
          value={props.values.name}
          onChange={props.onChange}
          error={props.errors.name ? true : false}
          helperText={props.errors.name}
        />
        <StyledRating
          name="rating"
          value={props.values.rating}
          onChange={(event, newValue) => {
            props.onRating(newValue);
          }}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          style={{ marginBottom: "1rem" }}
          size="large"
        />
        <TextField
          id="comment"
          fullWidth
          className={classes.field}
          label="Add a comment about this place..."
          color="secondary"
          variant="outlined"
          type="text"
          multiline
          rows={4}
          value={props.values.comment}
          onChange={props.onChange}
          error={props.errors.comment ? true : false}
          helperText={props.errors.comment}
        />
        <MatGeocoder
          inputPlaceholder="Address"
          accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onSelect={props.onSelectHandler}
          showLoader={true}
          {...geocoderApiOptions}
        />
        {props.errors.address ? (
          <Typography className={classes.addressError} color="error">
            Address is required
          </Typography>
        ) : (
          <Typography className={classes.addressError} color="textSecondary">
            Address is required
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={{ marginTop: "1rem" }}
        >
          Pin this location
        </Button>
      </form>
    </Box>
  );
};

export default PinFormView;
