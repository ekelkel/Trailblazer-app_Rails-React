import React, { useState, useEffect } from "react";
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
    <div
      style={{ marginLeft: "2rem", marginRight: "2rem", marginBottom: "2rem" }}
    >
      {loading ? <LoadingScreen /> : <PinFormContainer />}
    </div>
  );
};

export default PinForm;
