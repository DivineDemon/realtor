import { Menu } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiHome5Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { setProperty } from "../store/house/houseSlice";

const PropertyDropdown = () => {
  const dispatch = useDispatch();
  const { houses, property } = useSelector((state) => state.house);

  const [isOpen, setIsOpen] = useState(false);
  const [properties, setProperties] = useState([property]);

  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    setProperties([property, ...new Set(allProperties)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [houses]);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiHome5Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">
            {property}
          </div>
          <div className="text-[13px]">Select your Property</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="dropdown-menu">
        {properties.map((property, index) => {
          return (
            <Menu.Item
              onClick={() => dispatch(setProperty(property))}
              className="cursor-pointer hover:text-violet-700 transition"
              as="li"
              key={index}
            >
              {property}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
