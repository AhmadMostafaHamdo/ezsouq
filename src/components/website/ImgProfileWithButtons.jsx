import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // ✅ For animation
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { Camera } from "lucide-react"; // ✅ Lucide camera icon

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
  const [isHovered, setIsHovered] = useState(false); // ✅ Hover state

  const dispatch = useDispatch();
  const { id } = useParams();
  const myId = useUserId();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  // ✅ Fetch user data
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

  // ✅ Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImg(reader.result);
    reader.readAsDataURL(file);

    dispatch(updateUserPhoto(file));
  };

  // ✅ Determine avatar URL
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

  const handelRating = () => navigate("rating", { replace: true });

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
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)} // ✅ show on hover
              onMouseLeave={() => setIsHovered(false)} // ✅ hide on leave
            >
              <label htmlFor="uploadProfile" className="cursor-pointer">
                <img
                  src={avatarUrl}
                  alt="صورة الملف الشخصي"
                  className="w-24 h-24 shadow-xl rounded-full object-cover transition-all duration-300"
                  loading="lazy"
                />
                {/* ✅ Animated Lucide camera icon */}
                {id === myId && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.8,
                      y: isHovered ? 0 : 10,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-0 right-0 bg-white rounded-full shadow-md border p-1 cursor-pointer"
                  >
                    <Camera
                      size={20}
                      strokeWidth={1.8}
                      className="text-[#7770E9]"
                    />
                  </motion.div>
                )}
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
            </div>

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
                <button
                  className="text-[#7770E9] text-sm cursor-pointer"
                  onClick={handelRating}
                >
                  تقييم
                </button>
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
