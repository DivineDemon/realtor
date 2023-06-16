import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

import House from "./House";
import { getHouses } from "../store/house/houseSlice";

const HouseList = () => {
  const dispatch = useDispatch();
  const { isError, isLoading, houses, message } = useSelector(
    (state) => state.house
  );

  const [error, setError] = useState(message);

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    dispatch(getHouses());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return (
      <ImSpinner2 className="mx-auto animate-spin text-violet-700 text-4xl mt-[200px]" />
    );
  }

  if (isError) {
    return (
      <div className="text-center text-3xl text-gray-400 mt-48">{error}</div>
    );
  }

  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {houses.map((house) => {
            return (
              <Link to={`/property/${house.id}`} key={house.id}>
                <House house={house} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
