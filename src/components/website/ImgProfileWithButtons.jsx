import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import SortDropdown from "./SortDropdown";
import personalImg from "../../assets/images/pesonal.png";
import start from "../../assets/images/start.svg";
import { sortOptions } from "../../data/filterData";
import { userThunkById } from "../../store/users/thunk/userThunkById";
import { updateUserPhoto } from "../../store/users/thunk/updateUserPhoto";
import useUserId from "../../hooks/useUserId";
import Spinner from "../../feedback/loading/Spinner";
import ProfileSkeleton from "../../assets/sketlon/ProfileSkeleton";

const ImgProfileWithButtons = () => {
  const [sortBy, setSortBy] = useState("newest"); // Selected sort option
  const [previewImg, setPreviewImg] = useState(null); // Preview for new uploaded image

  const dispatch = useDispatch();
  const { id } = useParams(); // Profile ID from URL
  const myId = useUserId(); // Current logged-in user ID
  const { user, loading } = useSelector((state) => state.users); // Fixed typo

  // Fetch user data on mount or ID change
  useEffect(() => {
    if (id) dispatch(userThunkById(id));
  }, [dispatch, id]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image locally
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImg(reader.result);
    reader.readAsDataURL(file);

    // Dispatch action to update backend
    dispatch(updateUserPhoto(file));
  };

  return (
    <div>
      <ToastContainer />
      {loading && !user ? (
        <div className="flex-center">
          <ProfileSkeleton />
        </div>
      ) : (
        <>
          {/* Profile Image and Name */}
          <div className="flex flex-col items-center relative">
            <label htmlFor="uploadProfile" className="cursor-pointer">
              <img
                src={previewImg || user?.avatar || personalImg} // Preview first, then backend avatar, then default
                alt="صورة الملف الشخصي"
                className="w-24 h-24 shadow-xl rounded-full object-cover"
                loading="lazy"
              />
            </label>

            {/* Only allow current user to change photo */}
            {id === myId && (
              <input
                type="file"
                id="uploadProfile"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}

            {/* User name */}
            <p className="font-normal text-[1.3rem] text-[#2F2E41]">
              {user?.name}
            </p>

            {/* User rating */}
            <div className="flex gap-2 items-center">
              <img src={start} alt="تقييم المستخدم" />
              <div className="font-normal flex items-center gap-1">
                <span className="text-[#1D2232]">
                  {user?.averageRating ? user.averageRating.toFixed(1) : "0.0"}
                </span>
                <NavLink
                  to={`/profile/${id}/rating`}
                  className="text-[#7770E9] text-sm"
                >
                  تقييم
                </NavLink>
              </div>
            </div>
          </div>

          {/* Tabs / Buttons */}
          <div className="flex justify-center text-[1rem] font-bold gap-3 mt-3">
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

          {/* Sort Dropdown, shown only on posts tab */}
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
        </>
      )}
    </div>
  );
};

export default ImgProfileWithButtons;
