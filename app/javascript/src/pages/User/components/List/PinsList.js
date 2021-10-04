import React, { useState, useEffect } from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import Card from "../../../../common/Card";
import { Typography, List, ListItem, Box, Chip } from "@material-ui/core";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
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
    legend: {
      fontSize: 12,
      marginLeft: "0.2rem",
      marginTop: "0.2rem",
      marginBottom: "1rem",
      marginLeft: "1rem",
    },
    root: {
      width: "100%",
      marginBottom: "2rem",
    },
  };
});

// dans les props tags et user
const PinsList = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
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

  useEffect(() => {
    setPinsLoading(true);
    getPins();
    window.scrollTo(0, 0);
  }, [page, selected]);

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

  return (
    <div>
      <div style={{ marginLeft: "1rem" }}>
        {props.tags ? (
          props.tags.map((tag) => {
            const color = `#${tag.color}`;
            return (
              <Box
                component="div"
                sx={{
                  display: "inline",
                  padding: 0.8,
                  marginTop: -0.8,
                }}
                key={tag.id}
              >
                {selected.includes(tag.label) ? (
                  <Chip
                    color="primary"
                    icon={<CheckSharpIcon />}
                    style={{
                      backgroundColor: color,
                      borderRadius: "2px",
                      marginTop: 0.8,
                    }}
                    onClick={() => handleRemoveTagClick(tag)}
                    label={tag.label}
                    id={`tag-${tag.id}`}
                  />
                ) : (
                  <Chip
                    color="primary"
                    style={{
                      backgroundColor: "#DEDEDE",
                      borderRadius: "2px",
                      marginTop: 0.8,
                    }}
                    onClick={() => handleSelectTagClick(tag)}
                    label={tag.label}
                    id={`tag-${tag.id}`}
                  />
                )}
              </Box>
            );
          })
        ) : (
          <div />
        )}
        <Typography className={classes.legend} color="textSecondary">
          Click on the tags to filter the pins displayed
        </Typography>
      </div>
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
                    <Card pin={pin} user={props.user} onDelete={handleDelete} />
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
