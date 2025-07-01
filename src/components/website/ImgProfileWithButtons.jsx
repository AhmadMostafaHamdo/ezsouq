import React, { useState } from "react";
import SortDropdown from "./SortDropdown";
import personalImg from "../../assets/images/personal.svg";
import { Link, useLocation } from "react-router";
import { sortOptions } from "../../data/filterData";

const ImgProfileWithButtons = () => {
  const [selectedCategory, setSelectedCategory] = useState("سيارات");
  const [sortBy, setSortBy] = useState("newest");
  const location = useLocation();

  return (
    <div className="my-4">
      <div className="flex flex-col items-center">
        <img
          src={personalImg}
          alt=""
          className="w-24 h-24 shadow-xl rounded-[50%]"
        />
        <p className="font-normal text-[1.3rem] text-[#2F2E41]">أحمد حمدو</p>
      </div>
      <div className="flex-center text-[1rem] font-bold gap-3 mt-3">
        <Link
          to=""
          className="bg-[#7770E9]  rounded-[3rem] text-[#F7F7FF] py-1 px-8"
        >
          المنشورات
        </Link>
        <Link
          to="/profile/contact-info"
          className="py-1 px-8 border  border-[#C2BFFF] text-[#C2BFFF] rounded-[3rem]"
        >
          معلومات التواصل
        </Link>
      </div>
      <div>
        {location.pathname !== "/profile/contact-info" && (
          <SortDropdown
            options={sortOptions}
            selectedOption={sortBy}
            onSelect={setSortBy}
          />
        )}
      </div>
    </div>
  );
};

export default ImgProfileWithButtons;
