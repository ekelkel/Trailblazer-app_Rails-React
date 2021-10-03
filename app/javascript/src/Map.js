import React, { useState, useRef, useCallback, useMemo } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import CityPin from "./CityPin";

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: 500,
    latitude: 48.8534,
    longitude: 2.3488,
    zoom: 11,
  });
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const data = [
    { latitude: 48.86761, longitude: 2.3369, id: 1 },
    { latitude: 48.8640838, longitude: 2.3658858, id: 2 },
    { latitude: 48.8678805, longitude: 2.3472063, id: 3 },
  ];

  /*we cache the <Marker> nodes so that we don't rerender them
    when the viewport changes*/
  // Only rerender markers if props.data has changed
  const markers = useMemo(
    () =>
      data.map((pin) => (
        <Marker key={pin.id} longitude={pin.longitude} latitude={pin.latitude}>
          <CityPin />
        </Marker>
      )),
    [/*props.data*/ data]
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactMapGl
        ref={mapRef}
        {...viewport}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v10"
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          position="top-right"
          placeholder="Search here!"
        />
        {markers}
      </ReactMapGl>
    </div>
  );
};

export default Map;
