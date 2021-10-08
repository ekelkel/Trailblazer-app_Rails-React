import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { csrfToken } from "@rails/ujs";
import axios from "axios";
import ReactMapGl, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import CityPin from "./components/CityPin";
import CustomPopup from "./components/CustomPinPopup";

const Map = (props) => {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: 500,
    latitude: 48.8534,
    longitude: 2.3488,
    zoom: 11,
  });
  const [mapPins, setMapPins] = useState([]);
  const [mapPinsLoading, setMapPinsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const mapRef = useRef();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const getMapPins = async () => {
    try {
      let url = `/get_map_pins?id=${props.user.id}`;
      if (props.selected.length > 0) {
        const tags_param = props.selected.join(",");
        url += `&tags=${tags_param}`;
      }
      const response = await axios.get(url, {
        headers: { "X-CSRF-Token": csrfToken() },
      });
      //console.log(response);
      setMapPins(response.data.pins);
      setMapPinsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    closePopup();
    setMapPinsLoading(true);
    getMapPins();
  }, [props.selected]);

  useEffect(() => {
    getMapPins();
  }, []);

  const closePopup = () => {
    setSelectedIndex(null);
  };

  const openPopup = (index) => {
    setSelectedIndex(index);
  };

  // Only rerender markers if mapPins has changed so that we don't rerender them
  // when the viewport changes
  const markers = useMemo(
    () =>
      mapPins.map((pin, index) => (
        <div key={pin.id}>
          <Marker longitude={pin.longitude} latitude={pin.latitude}>
            <CityPin id={`pin-${pin.id}`} onClick={openPopup} index={index} />
          </Marker>
        </div>
      )),
    [mapPins]
  );

  return (
    <div>
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
          {mapPinsLoading ? (
            <div />
          ) : (
            <div>
              {markers}
              {selectedIndex !== null && (
                <CustomPopup
                  pin={mapPins[selectedIndex]}
                  closePopup={closePopup}
                />
              )}
            </div>
          )}
        </ReactMapGl>
      </div>
    </div>
  );
};

export default Map;
