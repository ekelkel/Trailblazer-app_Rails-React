import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Chip, Typography } from "@mui/material";
import Map from "../Map/Map";
import PinsList from "../PinsList/PinsList";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";

const useStyles = makeStyles(() => {
  return {
    legend: {
      fontSize: 12,
      marginTop: "0.2rem",
      marginBottom: "1rem",
    },
  };
});

const Pins = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

  const handleSelectTagClick = (tag) => {
    setSelected([...selected, tag.label]);
  };

  const handleRemoveTagClick = (tag) => {
    const filtered = selected.filter((item) => {
      return item !== tag.label;
    });
    setSelected(filtered);
  };

  return (
    <div>
      <div style={{ marginLeft: "1rem" }}>
        {props.tags.length > 0 ? (
          props.tags.map((tag) => {
            const color = `#${tag.color}`;
            return (
              <Box
                component="div"
                style={{
                  display: "inline",
                  padding: 1,
                  marginTop: -1,
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
                      marginTop: 1,
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
        {props.tags.length > 0 ? (
          <Typography className={classes.legend} color="textSecondary">
            Click on the tags to filter the pins displayed
          </Typography>
        ) : (
          <div />
        )}
      </div>
      {props.toggled ? (
        <Map user={props.user} tags={props.tags} selected={selected} />
      ) : (
        <PinsList
          user={props.user}
          tags={props.tags}
          selected={selected}
          pinsNumber={props.pinsNumber}
          setPinsNumber={props.setPinsNumber}
        />
      )}
    </div>
  );
};

export default Pins;
