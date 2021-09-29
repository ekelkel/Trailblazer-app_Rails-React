import React from "react";
import { Box, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MatGeocoder from "react-mui-mapbox-geocoder";
import Rating from "@material-ui/lab/Rating";
//import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import UploadImages from "../../../UploadImages";

const geocoderApiOptions = {
  //country: "us",
  //proximity: { longitude: -121.0681, latitude: 38.9197 },
  //bbox: [-123.8501, 38.08, -117.5604, 39.8735],
};

const useStyles = makeStyles((theme) => {
  return {
    title: {
      marginBottom: "2rem",
      textAlign: "center",
    },
    field: {
      marginBottom: "1rem",
    },
    legend: {
      fontSize: 12,
      marginLeft: "0.2rem",
      marginTop: "0.2rem",
      marginBottom: "1rem",
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
    <div>
      <Typography variant="h5" className={classes.title} color="secondary">
        Add a new place to your collection of pins
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
          <Typography className={classes.legend} color="error">
            Address is required
          </Typography>
        ) : (
          <Typography className={classes.legend} color="textSecondary">
            Address is required
          </Typography>
        )}
        {/*<StyledRating
          name="rating"
          value={props.values.rating ? props.values.rating : 0}
          onChange={(event, newValue) => {
            props.onRating(newValue);
          }}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          style={{ marginTop: "1rem" }}
          size="large"
        />
        <Typography color="textSecondary" className={classes.legend}>
          You can rate this place if you have already visited it, otherwise
          leave blank
        </Typography>*/}
        <UploadImages updateFilesCb={props.updateFilesCb} />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "1rem" }}
            size="large"
          >
            Pin this location
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default PinFormView;
