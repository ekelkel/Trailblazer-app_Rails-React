import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import LoadingScreen from "../../../common/LoadingScreen";
import UserView from "./UserView";

const UserContainer = () => {
  const id = useParams().userId;
  const [user, setUser] = useState({});
  const [pinsNumber, setPinsNumber] = useState(0);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggled, setToggled] = useState(false);

  const getUser = async () => {
    try {
      const userResponse = await axios.get(`/get_user?id=${id}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setUser(userResponse.data.user);
      setPinsNumber(userResponse.data.count);
      const tagsResponse = await axios.get(`/get_tags?id=${id}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setTags(tagsResponse.data.tags);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <UserView
          user={user}
          pinsNumber={pinsNumber}
          tags={tags}
          toggled={toggled}
          setToggled={setToggled}
        />
      )}
    </>
  );
};

export default UserContainer;
