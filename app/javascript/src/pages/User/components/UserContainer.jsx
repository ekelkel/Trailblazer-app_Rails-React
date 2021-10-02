import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import LoadingScreen from "../../../common/LoadingScreen";
import UserView from "./UserView";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const UserContainer = () => {
  const id = useParams().userId;
  const [user, setUser] = useState({});
  const [pinsNumber, setPinsNumber] = useState(0);
  const [pins, setPins] = useState([]);
  const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);
  const [pinsLoading, setPinsLoading] = useState(true);
  const notify = () => {
    toast.success("Pin successfully deleted!");
  };

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

  const getPins = async () => {
    try {
      let url = `/get_user_pins?id=${id}&page=${page}`;
      if (selected.length > 0) {
        const tags_param = selected.join(",");
        url += `&tags=${tags_param}`;
      }
      const response = await axios.get(url, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      //console.log(response);
      setPins(response.data.pins);
      setPage(response.data.page);
      setTotalPages(response.data.pages);
      setPinsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pinId) => {
    try {
      const response = await axios.delete(`/pins/${pinId}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      console.log(response.data);
      const newPins = pins.filter((pin) => pin.id != pinId);
      setPins(newPins);
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectTagClick = (tag) => {
    setSelected([...selected, tag.label]);
  };

  const handleRemoveTagClick = (tag) => {
    const filtered = selected.filter((item) => {
      return item !== tag.label;
    });
    setSelected(filtered);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setPinsLoading(true);
    getPins();
    window.scrollTo(0, 0);
  }, [page, selected]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <UserView
          onChange={handleChange}
          onDelete={handleDelete}
          onSelectTagClick={handleSelectTagClick}
          onRemoveTagClick={handleRemoveTagClick}
          user={user}
          pinsNumber={pinsNumber}
          tags={tags}
          selected={selected}
          pins={pins}
          totalPages={totalPages}
          page={page}
          pinsLoading={pinsLoading}
        />
      )}
    </>
  );
};

export default UserContainer;
