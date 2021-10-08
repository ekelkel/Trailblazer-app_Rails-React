import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingScreen from "../../../common/LoadingScreen";
import FeedView from "./FeedView";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const FeedContainer = () => {
  const user = useSelector((state) => state.user);
  const [feedItems, setFeedItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [loading, setLoading] = useState(true);

  const notify = () => {
    toast.success("Pin successfully deleted!");
  };

  const getFeedItems = async () => {
    try {
      const response = await axios.get(`/feed?page=${page}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      setFeedItems(response.data.feed);
      setPage(response.data.page);
      setTotalPages(response.data.pages);
      setLoading(false);
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
      const newFeedItems = feedItems.filter((item) => item.id != pinId);
      setFeedItems(newFeedItems);
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    setLoading(true);
    getFeedItems();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <FeedView
          onChange={handleChange}
          onDelete={handleDelete}
          feedItems={feedItems}
          user={user}
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default FeedContainer;
