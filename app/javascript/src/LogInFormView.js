import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  "@global": {
    body: {
      backgroundColor: "#ffffff",
    },
  },
  field: {
    marginBottom: "2rem",
  },
});

const LogInFormView = (props) => {
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
        <Typography variant="h5" color="secondary">
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
            style={{ width: 400 }}
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
    </Grid>
  );
};

export default LogInFormView;
