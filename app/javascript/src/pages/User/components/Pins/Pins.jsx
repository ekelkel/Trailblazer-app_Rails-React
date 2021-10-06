import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Chip, Typography } from "@material-ui/core";
import Map from "../Map/Map";
import PinsList from "../PinsList/PinsList";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";

const useStyles = makeStyles((theme) => {
  return {
    legend: {
      fontSize: 12,
      marginLeft: "0.2rem",
      marginTop: "0.2rem",
      marginBottom: "1rem",
      marginLeft: "1rem",
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
