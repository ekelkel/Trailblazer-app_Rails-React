import React from "react";
import { Grid, TextField, Button, Typography, Paper } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
  };
});

const LogInFormView = (props) => {
  const classes = useStyles();

  return (
    <Bird>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
        spacing={5}
      >
        <Paper className={classes.paper} elevation={5}>
          <Grid item>
            <Typography
              variant="h5"
              className={classes.title}
              color="secondary"
            >
              Trailblazer
            </Typography>
          </Grid>
          <Grid item>
            <form noValidate autoComplete="off" onSubmit={props.onSubmit}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ width: 350 }}
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={props.checked}
                      onChange={props.onCheck}
                      id="remember_me"
                      color="secondary"
                    />
                  }
                  label="Remember me on this computer"
                />
                <Button type="submit" color="secondary" variant="contained">
                  Log In
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </Bird>
  );
};

export default LogInFormView;
