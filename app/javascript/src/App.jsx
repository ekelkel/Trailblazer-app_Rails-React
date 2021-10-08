import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector, Provider } from "react-redux";
import store from "./store";
import { ActionCreators } from "./actions/actionCreators";
import axios from "axios";
import { csrfToken } from "@rails/ujs";
//import { setAuthHeaders } from "./apis/axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./common/Layout";
import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import LogIn from "./pages/LogIn/LogIn";
import PinForm from "./pages/PinForm/PinForm";
import SignUp from "./pages/SignUp/SignUp";
import ActivateAccount from "./pages/SignUp/components/ActivateAccount/ActivateAccount";
import ResetPasswordRequest from "./pages/ResetPasswordRequest/ResetPasswordRequest";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Settings from "./pages/Settings/Settings";
import LoadingScreen from "./common/LoadingScreen";
import UsersList from "./pages/UsersList/UsersList";
import User from "./pages/User/User";
import Follow from "./pages/Follow/Follow";

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
        { headers: { "X-CSRF-Token": csrfToken() } },
        { signal: controller.signal }
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
                <Route exact path="/" component={Feed} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/users" component={UsersList} />
                <Route exact path="/user/:userId" component={User} />
                <Route exact path="/add_pin" component={PinForm} />
                <Route
                  exact
                  path="/followers/:userId"
                  component={() => <Follow following={false} />}
                />
                <Route
                  exact
                  path="/following/:userId"
                  component={() => <Follow following={true} />}
                />
                <Redirect to="/" />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={LogIn} />
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
