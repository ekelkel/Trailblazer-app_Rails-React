import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
//import Rating from "@material-ui/lab/Rating";
//import FavoriteIcon from "@material-ui/icons/Favorite";
//import { withStyles } from "@material-ui/core/styles";
import UploadImages from "./UploadImages";
import AddressAutocomplete from "./AddressAutocomplete/AddressAutocomplete";
import CreatableSelect from "react-select/creatable";

const default_options = [
  { value: "brunch", label: "brunch" },
  { value: "bar", label: "bar" },
  { value: "vegan", label: "vegan" },
];

const useStyles = makeStyles(() => {
  return {
    title: {
      marginTop: "3rem",
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
    tags: {
      fontFamily: "Raleway",
      fontSize: "15px",
    },
  };
});

const PinFormView = (props) => {
  const classes = useStyles();
  /*const StyledRating = withStyles({
    iconFilled: {
      color: "#FFBC1F",
    },
    icon: {},
  })(Rating);*/
  return (
    <div>
      <Typography
        variant="h5"
        className={classes.title}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        color="secondary"
      >
        Add a new place to your collection of pins
      </Typography>
      <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
        <TextField
          id="name"
          fullWidth
          required
          label="Name"
          color="secondary"
          variant="outlined"
          type="text"
          className={classes.field}
          value={props.values.name}
          onChange={props.onChange}
          error={props.errors.name ? true : false}
          helperText={props.errors.name}
        />
        <TextField
          id="comment"
          fullWidth
          label="Add a comment about this place..."
          color="secondary"
          variant="outlined"
          type="text"
          multiline
          rows={4}
          className={classes.field}
          value={props.values.comment}
          onChange={props.onChange}
          error={props.errors.comment ? true : false}
          helperText={props.errors.comment}
        />
        <AddressAutocomplete onSelect={props.onSelectHandler} />
        {props.errors.address ? (
          <Typography className={classes.legend} color="error">
            Address is required
          </Typography>
        ) : (
          <Typography className={classes.legend} color="textSecondary">
            Address is required
          </Typography>
        )}
        <CreatableSelect
          isMulti
          options={props.tags.length > 0 ? props.tags : default_options}
          className={classes.tags}
          onChange={props.onTagsSelect}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#ffbc1f",
              primary25: "#FFD678",
              primary50: "#FFD678",
            },
          })}
        />
        <Typography className={classes.legend} color="textSecondary">
          You can add a new tag by writing it and pressing enter
        </Typography>
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
        />*/}
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
