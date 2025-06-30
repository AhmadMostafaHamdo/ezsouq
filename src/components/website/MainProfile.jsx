import React from "react";
import personalImg from "../../assets/images/personal.svg";
import { Link } from "react-router";
import SortDropdown from "./SortDropdown";
import { cards, sortOptions } from "../../data/filterData";
import { useState } from "react";
import Card from "./Card";
import ImgProfileWithButtons from "./ImgProfileWithButtons";
const MainProfile = () => {

  return (
    <div className="container pb-10">
        <ImgProfileWithButtons/>
      <div className="w-full flex justify-start md:justify-evenly items-center gap-[2.25rem] pl-[1rem] md:pl-[3.187rem] flex-wrap">
        {cards.map((card, index) => (
          <Card {...card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MainProfile;
