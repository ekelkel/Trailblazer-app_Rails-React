import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import Card from "../../../../common/Card";
import { List, ListItem } from "@material-ui/core";
import LoadingScreen from "../../../../common/LoadingScreen";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const useStyles = makeStyles((theme) => {
  return {
    pagination: {
      justifyContent: "center",
      display: "flex",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    root: {
      width: "100%",
      marginBottom: "2rem",
    },
  };
});

const PinsList = (props) => {
  const classes = useStyles();
  const [pins, setPins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pinsLoading, setPinsLoading] = useState(true);
  const notify = () => {
    toast.success("Pin successfully deleted!");
  };

  const getPins = async () => {
    try {
      let url = `/get_user_pins?id=${props.user.id}&page=${page}`;
      if (props.selected.length > 0) {
        const tags_param = props.selected.join(",");
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

  useEffect(() => {
    setPinsLoading(true);
    getPins();
    window.scrollTo(0, 0);
  }, [page, props.selected]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (pinId) => {
    try {
      const response = await axios.delete(`/pins/${pinId}`, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      console.log(response.data);
      const newPins = pins.filter((pin) => pin.id != pinId);
      setPins(newPins);
      props.setPinsNumber(props.pinsNumber - 1);
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {pinsLoading ? (
          <LoadingScreen />
        ) : (
          <div>
            <List dense className={classes.root} id="pins-list">
              {pins.map((pin) => {
                return (
                  <ListItem
                    key={pin.id}
                    xs={12}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Card pin={pin} onDelete={handleDelete} />
                  </ListItem>
                );
              })}
            </List>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              className={classes.pagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PinsList;
