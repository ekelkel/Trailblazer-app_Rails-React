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
  };
});

const ResetPasswordRequestView = (props) => {
  const classes = useStyles();

  return (
    <Bird>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper className={classes.paper} elevation={5}>
          <Grid item>
            <Typography
              variant="h5"
              className={classes.title}
              color="secondary"
            >
              Get a reset password link
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

export default ResetPasswordRequestView;
