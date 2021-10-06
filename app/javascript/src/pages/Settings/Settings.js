import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import UpdateProfile from "./components/UpdateProfile/UpdateProfileContainer";
import LoadingScreen from "../../common/LoadingScreen";
import { useSelector } from "react-redux";

const Settings = () => {
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
        {loading ? <LoadingScreen /> : <UpdateProfile />}
      </Grid>
    </>
  );
};

export default Settings;
