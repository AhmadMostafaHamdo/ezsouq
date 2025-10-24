import React, { useEffect, useState } from "react";
import personalImg from "../../assets/images/personal.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/sidebar/sidebarSlice";
import { userThunkById } from "../../store/users/thunk/userThunkById";
import { Menu, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: authUser } = useSelector((state) => state.auth); // Logged-in user data
  const [adminData, setAdminData] = useState(null); // Store admin data locally
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch admin data once on component mount
  useEffect(() => {
    const fetchAdmin = async () => {
      if (authUser?.user?._id) {
        setLoading(true);
        try {
          const data = await dispatch(
            userThunkById(authUser.user._id)
          ).unwrap();
          setAdminData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAdmin();
  }, [dispatch, authUser]);

  // Determine avatar image URL
  const avatarUrl = adminData?.avatar
    ? adminData.avatar.startsWith("http")
      ? adminData.avatar.replace(/^http:/, "https:")
      : `https://api.ezsouq.store/${adminData.avatar}`
    : personalImg;

  return (
    <div className="mt-4">
      <div className="flex-between items-center">
        {/* Page title */}
        <h1 className="hidden md:block text-[#23193E]">لوحة تحكم الأدمن</h1>

        {/* Sidebar toggle button for mobile view */}
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="cursor-pointer lg:hidden"
        >
          <Menu />
        </div>

        <div className="flex items-center gap-4">
          {/* Admin avatar */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={avatarUrl}
              alt="ملف شخصي"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}

          {/* Admin name and email */}
          <div className="leading-5">
            <h3 className="font-semibold text-[.8rem]">
              {adminData?.name || "الأدمن"}
            </h3>
            <p className="text-[#959595] text-[.7rem]">
              {adminData?.email || "الإيميل"}
            </p>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <hr className="text-[#D2D2D2] my-3" />
    </div>
  );
};

export default TopBar;
