import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
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
    checkbox: {
      color: "#787878",
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
        style={{ minHeight: "100vh" }}
      >
        <Paper className={classes.paper} elevation={5}>
          <Grid item>
            <Typography
              variant="h5"
              className={classes.title}
              color="secondary"
            >
              Log In
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
                  className={classes.checkbox}
                  label="Remember me on this computer"
                />
                <Button type="submit" variant="contained" color="secondary">
                  Log In
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              size="small"
              component={Link}
              to={"/reset_password_request"}
              style={{ marginTop: "2rem" }}
            >
              Forgot your password?
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Bird>
  );
};

export default LogInFormView;
