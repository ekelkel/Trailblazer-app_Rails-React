import React from "react";
import { Popup } from "react-map-gl";

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
    </Popup>
  );
};

export default CustomPopup;
