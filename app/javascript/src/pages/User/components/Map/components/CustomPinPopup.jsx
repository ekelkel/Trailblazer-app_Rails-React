import React from "react";
import { Popup } from "react-map-gl";
import { Chip, Box } from "@mui/material";

const CustomPopup = ({ pin, closePopup }) => {
  return (
    <Popup
      latitude={pin.latitude}
      longitude={pin.longitude}
      onClose={closePopup}
      closeButton={true}
      closeOnClick={false}
      offsetTop={-30}
    >
      <p style={{ fontFamily: "Raleway" }}>{pin.name}</p>
      {pin.tags.map((tag) => {
        const color = `#${tag.color}`;
        return (
          <Box component="div" sx={{ display: "inline" }} key={tag.id}>
            <Chip
              color="primary"
              style={{ backgroundColor: color }}
              label={tag.name}
            />
          </Box>
        );
      })}
    </Popup>
  );
};

export default CustomPopup;
