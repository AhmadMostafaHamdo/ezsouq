import React, { useEffect, useState } from "react";
import SortDropdown from "./SortDropdown";
import personalImg from "../../assets/images/personal.svg";
import start from "../../assets/images/start.svg";
import { NavLink, useParams } from "react-router-dom";
import { sortOptions } from "../../data/filterData";
import { useDispatch, useSelector } from "react-redux";
import { userThunkById } from "../../store/users/thunk/userThunkById";

const ImgProfileWithButtons = () => {
  const [sortBy, setSortBy] = useState("newest");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { id } = useParams();
  useEffect(() => {
    dispatch(userThunkById(id));
  }, [dispatch, id]);

  return (
    <div>
      {/* صورة واسم المستخدم */}
      <div className="flex flex-col items-center">
        <img
          src={personalImg}
          alt=""
          className="w-24 h-24 shadow-xl rounded-full"
        />
        <p className="font-normal text-[1.3rem] text-[#2F2E41]">{user?.name}</p>

        {/* التقييم */}
        <div className="flex gap-2">
          <img src={start} alt="rating" />
          <div className="font-normal">
            <span className="ml-1 text-[#1D2232]">
              {user?.averageRating?.toFixed(1)}
            </span>
            <NavLink to={`/profile/${id}/rating`} className="text-[#7770E9]">
              تقييم
            </NavLink>
          </div>
        </div>
      </div>

      {/* الأزرار (Tabs) */}
      <div className="flex-center text-[1rem] font-bold gap-3 mt-3">
        <NavLink
          to={`/profile/${id}`}
          end
          className={({ isActive }) =>
            `rounded-[3rem] py-1 px-8 transition ${
              isActive
                ? "bg-[#7770E9] text-[#F7F7FF]"
                : "border border-[#C2BFFF] text-[#C2BFFF]"
            }`
          }
        >
          المنشورات
        </NavLink>

        <NavLink
          to={`/profile/${id}/contact-info`}
          className={({ isActive }) =>
            `rounded-[3rem] py-1 px-8 transition ${
              isActive
                ? "bg-[#7770E9] text-[#F7F7FF]"
                : "border border-[#C2BFFF] text-[#C2BFFF]"
            }`
          }
        >
          معلومات التواصل
        </NavLink>
      </div>

      {/* Dropdown (يظهر فقط في صفحة المنشورات) */}
      <div>
        <NavLink to={`/profile/${id}`} end>
          {({ isActive }) =>
            isActive && (
              <SortDropdown
                options={sortOptions}
                selectedOption={sortBy}
                onSelect={setSortBy}
              />
            )
          }
        </NavLink>
      </div>
    </div>
  );
};

export default ImgProfileWithButtons;
