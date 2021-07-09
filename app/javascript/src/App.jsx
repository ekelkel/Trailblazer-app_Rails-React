import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Registration from "./Registration";
//import { setAuthHeaders } from "./apis/axios";

const App = () => {
  /*const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);*/

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Registration} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
