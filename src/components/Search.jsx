import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiSearch2Line } from "react-icons/ri";

import CountryDropdown from "../components/CountryDropdown";
import PropertyDropdown from "../components/PropertyDropdown";
import PriceRangeDropdown from "../components/PriceRangeDropdown";
import { setIsLoading, setHouses } from "../store/house/houseSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { houses, country, property, price } = useSelector(
    (state) => state.house
  );

  const handleClick = () => {
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    // eslint-disable-next-line array-callback-return
    const filteredHouses = houses.filter((house) => {
      dispatch(setIsLoading(true));

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
      }
    });

    setTimeout(() => {
      return (
        filteredHouses.length < 1
          ? dispatch(setHouses([]))
          : dispatch(setHouses(filteredHouses)),
        dispatch(setIsLoading(false))
      );
    }, 1000);
  };

  return (
    <div className="px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-1 bg-white lg:bg-transparent lg:backdrop-blur rounded-lg">
      <CountryDropdown />
      <PropertyDropdown />
      <PriceRangeDropdown />
      <button
        onClick={() => handleClick()}
        className="bg-violet-700 hover:bg-violet-800 transition w-full lg:max-w-[162px] h-16 rounded-lg flex items-center justify-center text-white text-lg"
      >
        <RiSearch2Line />
      </button>
    </div>
  );
};

export default Search;
