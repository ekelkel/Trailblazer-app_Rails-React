import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Registration from "./signup";
import LogIn from "./login";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import axios from "axios";
import { csrfToken } from "@rails/ujs";
//import { setAuthHeaders } from "./apis/axios";
import { useDispatch } from "react-redux";
import { ActionCreators } from "./actions";
import { Provider } from "react-redux";
import store from "./store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#292F36",
    },
    secondary: {
      main: "#F5AB00",
    },
  },
  typography: {
    fontFamily: "Karla",
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
  /*const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);*/

  const dispatch = useDispatch();

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get("/logged_in", {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      if (response.data.logged_in) {
        dispatch(ActionCreators.login(response.data.user));
      }
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
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Registration} />
          <Route exact path="/login" component={LogIn} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
