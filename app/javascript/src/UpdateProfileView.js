import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      body: { margin: 0, padding: 0 },
      backgroundColor: "#ffffff",
    },
    title: {
      marginBottom: "2rem",
    },
    field: {
      marginBottom: "1rem",
    },
    form: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  };
});

const UpdateProfileView = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh" }}
      spacing={5}
    >
      <Grid item>
        <Typography variant="h5" className={classes.title} color="secondary">
          Update my profile
        </Typography>
      </Grid>
      <Grid item>
        <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.form}
          >
            <TextField
              fullWidth
              id="name"
              className={classes.field}
              label="Name"
              color="secondary"
              variant="outlined"
              type="text"
              value={props.values.name}
              onChange={props.onChange}
              required
              error={props.errors.name ? true : false}
              helperText={props.errors.name}
            />
            <TextField
              id="email"
              className={classes.field}
              fullWidth
              label="Email"
              color="secondary"
              variant="outlined"
              type="email"
              value={props.values.email}
              onChange={props.onChange}
              required
              error={props.errors.email ? true : false}
              helperText={props.errors.email}
            />
            <TextField
              id="password"
              fullWidth
              className={classes.field}
              label="New password"
              color="secondary"
              variant="outlined"
              type="password"
              value={props.values.password}
              onChange={props.onChange}
              required
              error={props.errors.password ? true : false}
              helperText={props.errors.password}
            />
            <TextField
              id="password_confirmation"
              fullWidth
              className={classes.field}
              color="secondary"
              label="New password confirmation"
              variant="outlined"
              type="password"
              value={props.values.password_confirmation}
              onChange={props.onChange}
              required
              error={props.errors.password_confirmation ? true : false}
              helperText={props.errors.password_confirmation}
            />
            <Button type="submit" variant="contained" color="secondary">
              Update my profile
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default UpdateProfileView;
