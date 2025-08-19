import React, { useEffect, useState } from "react";
import SortDropdown from "./SortDropdown";
import personalImg from "../../assets/images/personal.svg";
import start from "../../assets/images/start.svg/";
import { Link, useLocation, useParams } from "react-router";
import { sortOptions } from "../../data/filterData";
import { useDispatch, useSelector } from "react-redux";
import { userThunkById } from "../../store/users/thunk/userThunkById";

const ImgProfileWithButtons = () => {
  const [selectedCategory, setSelectedCategory] = useState("سيارات");
  const [sortBy, setSortBy] = useState("newest");
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { id } = useParams();
  useEffect(() => {
    dispatch(userThunkById(id));
  }, [dispatch, id]);
  return (
    <div className="my-4">
      <div className="flex flex-col items-center">
        <img
          src={personalImg}
          alt=""
          className="w-24 h-24 shadow-xl rounded-[50%]"
        />
        <p className="font-normal text-[1.3rem] text-[#2F2E41]">{user.name}</p>
        <div className="flex gap-2">
          <img src={start} alt="" />
          <div className="font-normal">
            <span className="ml-1 text-[#1D2232]  ">4.5</span>
            <Link to="/profile/rating" className="text-[#7770E9]">
              تقييم
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-center text-[1rem] font-bold gap-3 mt-3">
        <Link
          to={`/profile/:id`}
          className="bg-[#7770E9]  rounded-[3rem] text-[#F7F7FF] py-1 px-8"
        >
          المنشورات
        </Link>
        <Link
          to="/profile/:id/contact-info"
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
