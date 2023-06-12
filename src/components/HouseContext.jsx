import React, { useState, createContext, useEffect } from "react";

import { housesData } from "../utils/data";

export const HouseContext = createContext();

export const HouseContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [properties, setProperties] = useState([]);
  const [houses, setHouses] = useState(housesData);
  const [price, setPrice] = useState("Price range (any)");
  const [country, setCountry] = useState("Location (any)");
  const [property, setProperty] = useState("Property type (any)");

  const handleClick = () => {
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    // eslint-disable-next-line array-callback-return
    const filteredHouses = housesData.filter((house) => {
      setLoading(true);

      const housePrice = parseInt(house.price);
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      } else if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(price)
      ) {
        return house.country === country;
      } else if (
        isDefault(country) &&
        !isDefault(property) &&
        isDefault(price)
      ) {
        return house.type === property;
      } else if (
        isDefault(country) &&
        isDefault(property) &&
        !isDefault(price)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      } else if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(price)
      ) {
        return house.country === country && house.type === property;
      } else if (
        !isDefault(country) &&
        isDefault(property) &&
        !isDefault(price)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      } else if (
        isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      } else {
        return house;
      }
    });

    setTimeout(() => {
      return (
        filteredHouses.length < 1 ? setHouses([]) : setHouses(filteredHouses),
        setLoading(false)
      );
    }, 1000);
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
