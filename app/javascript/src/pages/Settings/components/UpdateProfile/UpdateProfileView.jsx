import React from "react";
import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => {
  return {
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

const UpdateProfileView = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper className={classes.paper} elevation={5}>
        <Grid item>
          <Typography variant="h5" className={classes.title} color="secondary">
            Update my personal information
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
                id="name"
                fullWidth
                className={classes.field}
                label="Name"
                color="secondary"
                variant="outlined"
                type="text"
                InputLabelProps={{ shrink: true }}
                value={props.values.name}
                onChange={props.onChange}
                error={props.errors.name ? true : false}
                helperText={props.errors.name}
              />
              <TextField
                id="email"
                fullWidth
                className={classes.field}
                label="Email"
                color="secondary"
                variant="outlined"
                type="email"
                InputLabelProps={{ shrink: true }}
                value={props.values.email}
                onChange={props.onChange}
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
                error={props.errors.password_confirmation ? true : false}
                helperText={props.errors.password_confirmation}
              />
              <Button type="submit" variant="contained" color="secondary">
                Update my profile
              </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default UpdateProfileView;
