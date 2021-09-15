import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import PinFormContainer from "./components/PinFormContainer";
import LoadingScreen from "../../common/LoadingScreen";
import { useSelector } from "react-redux";

const PinForm = () => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        {loading ? <LoadingScreen /> : <PinFormContainer />}
      </Grid>
    </>
  );
};

export default PinForm;
