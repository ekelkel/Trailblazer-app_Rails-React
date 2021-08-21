import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Registration from "./auth/register";
import LogIn from "./auth/login";
import Profile from "./updateProfile";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import axios from "axios";
import { csrfToken } from "@rails/ujs";
//import { setAuthHeaders } from "./apis/axios";
import { useDispatch } from "react-redux";
import { ActionCreators } from "./actions";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import Users from "./Users";
import User from "./User";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: {
      main: "#FFBC1F",
    },
  },
  typography: {
    fontFamily: "Raleway",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
};

const AppComponent = () => {
  /*
  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);*/
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("/logged_in", {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      if (response.data.logged_in) {
        dispatch(ActionCreators.login(response.data.user));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {loading ? (
          <LoadingScreen />
        ) : (
          <Layout>
            {user ? (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/user/:userId" component={User} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Registration} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/user/:userId" component={User} />
                <Route render={() => <Redirect to="/" />} />
              </Switch>
            )}
          </Layout>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
