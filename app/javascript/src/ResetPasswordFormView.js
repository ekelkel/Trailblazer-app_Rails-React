import React from "react";
import { Grid, TextField, Button, Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Bird from "./Bird";

const useStyles = makeStyles((theme) => {
  return {
    "@global": {
      body: { margin: 0, padding: 0 },
    },
    title: {
      marginBottom: "2rem",
    },
    field: {
      marginBottom: "1rem",
    },
    paper: {
      padding: theme.spacing(5),
      textAlign: "center",
    },
    form: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    container: {
      minHeight: "100vh",
    },
  };
});

const ResetPasswordFormView = (props) => {
  const classes = useStyles();

  return (
    <Bird>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.container}
        spacing={5}
      >
        <Paper className={classes.paper} elevation={5}>
          <Grid item>
            <Typography
              variant="h5"
              className={classes.title}
              color="secondary"
            >
              Choose a new password
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
                  Reset password
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </Bird>
  );
};

export default ResetPasswordFormView;
