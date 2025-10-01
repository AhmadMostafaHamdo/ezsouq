import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import personalImg from "../../assets/images/pesonal.png";
import star from "../../assets/images/start.svg"; // fixed typo
import { userThunkById } from "../../store/users/thunk/userThunkById";
import { updateUserPhoto } from "../../store/users/thunk/updateUserPhoto";
import useUserId from "../../hooks/useUserId";
import ProfileSkeleton from "../../assets/sketlon/ProfileSkeleton";

const ImgProfileWithButtons = ({ activeTab, setActiveTab }) => {
  const [previewImg, setPreviewImg] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { id } = useParams();
  const myId = useUserId();

  // Decode role from token
  const token = Cookies.get("token");
  const { Role } = jwtDecode(token);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await dispatch(userThunkById(id)).unwrap();
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [dispatch, id]);

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImg(reader.result);
    reader.readAsDataURL(file);

    dispatch(updateUserPhoto(file));
  };

  // Get avatar url with fallback
  const avatarUrl =
    previewImg ||
    (profileData?.avatar
      ? profileData.avatar.startsWith("http")
        ? profileData.avatar.replace(/^http:/, "https:")
        : `https://api.ezsouq.store/${profileData.avatar}`
      : personalImg);

  return (
    <div>
      <ToastContainer />
      {loading || !profileData ? (
        <div className="flex-center">
          <ProfileSkeleton />
        </div>
      ) : (
        <>
          {/* Profile Image & Name */}
          <div className="flex flex-col items-center relative">
            <label htmlFor="uploadProfile" className="cursor-pointer">
              <img
                src={avatarUrl}
                alt="صورة الملف الشخصي"
                className="w-24 h-24 shadow-xl rounded-full object-cover"
                loading="lazy"
              />
            </label>
            {id === myId && (
              <input
                type="file"
                id="uploadProfile"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}

            <p className="font-normal text-[1.3rem] text-[#2F2E41] mt-2">
              {profileData?.name || "مستخدم"}
            </p>

            {/* User rating */}
            <div className="flex gap-2 items-center mt-1">
              <img src={star} alt="تقييم المستخدم" />
              <div className="font-normal flex items-center gap-1">
                <span className="text-[#1D2232]">
                  {profileData?.averageRating
                    ? profileData.averageRating.toFixed(1)
                    : "0.0"}
                </span>
                <span className="text-[#7770E9] text-sm cursor-pointer">
                  تقييم
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          {Role === "USER" && (
            <nav
              className="flex justify-center text-[1rem] font-bold gap-3 my-3"
              aria-label="Profile navigation"
            >
              <NavLink
                to={`/profile/${myId}`}
                end
                className={({ isActive }) =>
                  `rounded-[3rem] py-1 px-8 transition ${
                    isActive
                      ? "bg-[#7770E9] text-white"
                      : "border border-[#C2BFFF] text-[#C2BFFF]"
                  }`
                }
              >
                المنشورات
              </NavLink>

              <NavLink
                to={`/profile/${myId}/contact-info`}
                className={({ isActive }) =>
                  `rounded-[3rem] py-1 px-8 transition ${
                    isActive
                      ? "bg-[#7770E9] text-white"
                      : "border border-[#C2BFFF] text-[#C2BFFF]"
                  }`
                }
              >
                معلومات التواصل
              </NavLink>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ImgProfileWithButtons;
