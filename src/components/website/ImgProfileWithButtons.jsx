import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

import personalImg from "../../assets/images/pesonal.png";
import star from "../../assets/images/start.svg";
import { userThunkById } from "../../store/users/thunk/userThunkById";
import { updateUserPhoto } from "../../store/users/thunk/updateUserPhoto";
import useUserId from "../../hooks/useUserId";
import ProfileSkeleton from "../../assets/sketlon/ProfileSkeleton";
import { setImgUser } from "../../store/users/usersSlice";

const ImgProfileWithButtons = ({ setActiveTab, activeTab }) => {
  const [previewImg, setPreviewImg] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(profileData);
  const dispatch = useDispatch();
  const { id } = useParams();
  const myId = useUserId();
  const token = Cookies.get("token");

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImg(reader.result);
    reader.readAsDataURL(file);

    dispatch(updateUserPhoto(file));
  };

  const avatarUrl =
    previewImg ||
    (profileData?.avatar
      ? profileData.avatar.startsWith("http")
        ? profileData.avatar.replace(/^http:/, "https:")
        : `https://api.ezsouq.store/${profileData.avatar}`
      : personalImg);
  useEffect(() => {
    if (avatarUrl) {
      dispatch(setImgUser(avatarUrl));
    }
  }, [avatarUrl, dispatch]);

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
            <div className="flex gap-2 items-center mt-1">
              <img src={star} alt="تقييم المستخدم" />
              <div className="font-normal flex items-center gap-1">
                <span className="text-[#1D2232]">
                  {profileData?.averageRating
                    ? profileData.averageRating.toFixed(1)
                    : "0.0"}
                </span>
                <Link
                  to={`/profile/${id}/rating`}
                  className="text-[#7770E9] text-sm cursor-pointer"
                >
                  تقييم
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs as Buttons */}
          <nav className="flex justify-center text-[1rem] font-bold gap-3 my-3">
            <button
              onClick={() => setActiveTab("posts")}
              className={`relative rounded-[3rem] py-1 px-8 transition-all duration-300 
      ${
        activeTab === "posts"
          ? "bg-[#7770E9] text-white"
          : "border border-[#C2BFFF] text-[#C2BFFF] hover:text-[#7770E9]"
      }`}
            >
              المنشورات
              <span
                className={`absolute -bottom-[6px] left-1/2 h-[2px] w-10 rounded-md bg-primary transition-transform duration-300 origin-center ${
                  activeTab === "posts"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                } -translate-x-1/2`}
              ></span>
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`relative rounded-[3rem] py-1 px-8 transition-all duration-300 
      ${
        activeTab === "contact"
          ? "bg-[#7770E9] text-white"
          : "border border-[#C2BFFF] text-[#C2BFFF] hover:text-[#7770E9]"
      }`}
            >
              معلومات التواصل
              <span
                className={`absolute -bottom-[6px] left-1/2 h-[2px] w-10 rounded-md bg-primary transition-transform duration-300 origin-center ${
                  activeTab === "contact"
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                } -translate-x-1/2`}
              ></span>
            </button>
          </nav>
        </>
      )}
    </div>
  );
};

export default ImgProfileWithButtons;
