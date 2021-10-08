import React, { useState } from "react";
import "./AddressAutocomplete.css";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

const AddressAutocomplete = (props) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setIsLoading(true);
    performSearch();
  };

  const performSearch = async () => {
    try {
      if (search === "") {
        setResults([]);
        setIsLoading(false);
      } else {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        );
        setResults(response.data.features);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClicked = (place) => {
    setSearch(place.place_name);
    setResults([]);
    props.onSelect(place);
  };

  return (
    <div className="AutocompletePlace">
      <input
        className="AutocompletePlace-input"
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Type an address"
      />
      {isLoading && <LinearProgress color="secondary" />}
      {results.length > 0 && (
        <ul className="AutocompletePlace-results">
          {results.map((place) => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => handleItemClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
