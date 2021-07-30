import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  return <div>Hello hello hello {user.name ? user.name : "World"}!</div>;
};

export default Home;
