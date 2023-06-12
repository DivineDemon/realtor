import React, { useState, createContext, useEffect } from "react";

import { housesData } from "../utils/data";

export const HouseContext = createContext();

export const HouseContextProvider = ({ children }) => {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [properties, setProperties] = useState([]);
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [property, setProperty] = useState("Property type (any)");

  const handleClick = () => {
    console.log("Clicked");
  };

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    const allProperties = houses.map((house) => {
      return house.type;
    });
    setCountries(["Location (any)", ...new Set(allCountries)]);
    setProperties(["Property type (any)", ...new Set(allProperties)]);
  }, [houses]);

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
