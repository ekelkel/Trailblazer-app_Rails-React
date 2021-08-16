import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import UpdateProfile from "./UpdateProfileContainer";

const Profile = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
      >
        <UpdateProfile setIsSubmitted={setIsSubmitted} />
      </Grid>
    </>
  );
};

export default Profile;
