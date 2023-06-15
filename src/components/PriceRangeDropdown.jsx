import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RiWallet3Line,
  RiArrowDownSLine,
  RiArrowUpSLine,
} from "react-icons/ri";

import { setPrice } from "../store/house/houseSlice";

const PriceRangeDropdown = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { price } = useSelector((state) => state.house);

  const prices = [
    {
      id: 0,
      value: "Price range (any)",
    },
    {
      id: 1,
      value: "10000 - 30000",
    },
    {
      id: 2,
      value: "30000 - 40000",
    },
    {
      id: 3,
      value: "100000 - 130000",
    },
    {
      id: 4,
      value: "130000 - 160000",
    },
    {
      id: 5,
      value: "160000 - 190000",
    },
    {
      id: 6,
      value: "190000 - 220000",
    },
  ];

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn w-full text-left"
      >
        <RiWallet3Line className="dropdown-icon-primary" />
        <div>
          <div className="text-[15px] font-medium leading-tight">{price}</div>
          <div className="text-[13px]">Choose Price</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="dropdown-menu">
        {prices.map((price) => {
          return (
            <Menu.Item
              onClick={() => dispatch(setPrice(price.value))}
              className="cursor-pointer hover:text-violet-700 transition"
              as="li"
              key={price.id}
            >
              {price.value}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
