import React from "react";
import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Bird from "../../../../common/Bird";

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
    container: {
      minHeight: "100vh",
    },
  };
});

const SignUpFormView = (props) => {
  const classes = useStyles();

  return (
    <Bird>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.container}
      >
        <Paper className={classes.paper} elevation={5}>
          <Grid item>
            <Typography
              variant="h5"
              className={classes.title}
              color="secondary"
            >
              Create your Trailblazer account
            </Typography>
          </Grid>
          <Grid item>
            <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
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
                  label="Password"
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
                  label="Password confirmation"
                  variant="outlined"
                  type="password"
                  value={props.values.password_confirmation}
                  onChange={props.onChange}
                  required
                  error={props.errors.password_confirmation ? true : false}
                  helperText={props.errors.password_confirmation}
                />
                <Button type="submit" variant="contained" color="secondary">
                  Register
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </Bird>
  );
};

export default SignUpFormView;
