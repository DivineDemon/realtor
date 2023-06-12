import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

import House from "./House";
import { HouseContext } from "./HouseContext";

const HouseList = () => {
  const { houses, loading } = useContext(HouseContext);

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
