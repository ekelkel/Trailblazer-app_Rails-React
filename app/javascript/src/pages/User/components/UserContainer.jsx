import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import LoadingScreen from "../../../common/LoadingScreen";
import UserView from "./UserView";
import { useSelector } from "react-redux";

const UserContainer = () => {
  const currentUser = useSelector((state) => state.user);
  const id = useParams().userId;
  const [user, setUser] = useState({});
  const [pinsNumber, setPinsNumber] = useState(0);
  const [followingNumber, setFollowingNumber] = useState(0);
  const [followersNumber, setFollowersNumber] = useState(0);
  const [followed, setFollowed] = useState(false);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggled, setToggled] = useState(false);

  const getUser = async () => {
    try {
      const userResponse = await axios.get(`/get_user?id=${id}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setUser(userResponse.data.user);
      setPinsNumber(userResponse.data.pins_count);
      setFollowingNumber(userResponse.data.following_count);
      setFollowersNumber(userResponse.data.followers_count);
      setTags(userResponse.data.tags);
      const followingResponse = await axios.get(`/is_following?user_id=${id}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setFollowed(followingResponse.data.followed);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async () => {
    try {
      const response = await axios.post(
        `/relationships`,
        { followed_id: id },
        {
          headers: { "X-CSRF-Token": csrfToken() },
        }
      );
      console.log(response);
      setFollowed(true);
      setFollowersNumber(followersNumber + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      const response = await axios.delete(`/unfollow?followed_id=${id}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      console.log(response);
      setFollowed(false);
      setFollowersNumber(followersNumber - 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUser();
  }, [id]);

  const handleClick = () => {
    if (followed) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <UserView
          user={user}
          currentUser={currentUser}
          pinsNumber={pinsNumber}
          setPinsNumber={setPinsNumber}
          tags={tags}
          toggled={toggled}
          setToggled={setToggled}
          followingNumber={followingNumber}
          followersNumber={followersNumber}
          followed={followed}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default UserContainer;
