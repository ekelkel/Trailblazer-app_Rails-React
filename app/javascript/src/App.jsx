import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import PinForm from "./pages/PinForm/PinForm";
import SignUp from "./pages/SignUp/SignUp";
import ActivateAccount from "./pages/SignUp/components/ActivateAccount/ActivateAccount";
import ResetPasswordRequest from "./pages/ResetPasswordRequest/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Profile from "./pages/Profile/Profile";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import axios from "axios";
import { csrfToken } from "@rails/ujs";
//import { setAuthHeaders } from "./apis/axios";
import { useDispatch } from "react-redux";
import { ActionCreators } from "./actions/actionCreators";
import { Provider } from "react-redux";
import store from "./store";
import Layout from "./common/Layout";
import { useSelector } from "react-redux";
import LoadingScreen from "./common/LoadingScreen";
import UsersList from "./pages/UsersList/UsersList";
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

  const checkLoginStatus = async (controller) => {
    try {
      const response = await axios.get(
        "/logged_in",
        {
          headers: { "X-CSRF-Token": csrfToken() },
        },
        {
          signal: controller.signal,
        }
      );
      if (response.data.logged_in) {
        dispatch(ActionCreators.login(response.data.user));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let controller = new AbortController();
    checkLoginStatus(controller);
    return () => controller?.abort();
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
                <Route exact path="/users" component={UsersList} />
                <Route exact path="/user/:userId" component={User} />
                <Route exact path="/add_pin" component={PinForm} />
                <Redirect to="/" />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/user/:userId" component={User} />
                <Route path="/activate_account" component={ActivateAccount} />
                <Route
                  exact
                  path="/reset_password_request"
                  component={ResetPasswordRequest}
                />
                <Route
                  exact
                  path="/reset_password_form"
                  component={ResetPassword}
                />
                <Redirect to="/" />
              </Switch>
            )}
          </Layout>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
