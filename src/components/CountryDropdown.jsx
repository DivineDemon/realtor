import { Menu } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { setCountry } from "../store/house/houseSlice";

const CountryDropdown = () => {
  const dispatch = useDispatch();
  const { houses, country } = useSelector((state) => state.house);

  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState([country]);

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    setCountries([country, ...new Set(allCountries)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houses]);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{country}</div>
          <div className="text-[13px]">Select your Country</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="dropdown-menu">
        {countries.map((country, index) => {
          return (
            <Menu.Item
              onClick={() => dispatch(setCountry(country))}
              className="cursor-pointer hover:text-violet-700 transition"
              as="li"
              key={index}
            >
              {country}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
