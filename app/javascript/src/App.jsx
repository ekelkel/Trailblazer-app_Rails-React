import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Registration from "./signup";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
//import { setAuthHeaders } from "./apis/axios";

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
  /*const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);*/

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Registration} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
