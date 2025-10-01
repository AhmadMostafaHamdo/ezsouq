import React, { useEffect, useState } from "react";
import personalImg from "../../assets/images/personal.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../store/sidebar/sidebarSlice";
import { userThunkById } from "../../store/users/thunk/userThunkById";

const TopBar = () => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth); // بيانات تسجيل الدخول
  const [adminData, setAdminData] = useState(null); // نخزن بيانات الأدمن محليًا
  const [loading, setLoading] = useState(true);

  // جلب بيانات الأدمن مرة واحدة عند التحميل
  useEffect(() => {
    const fetchAdmin = async () => {
      if (authUser?.user?._id) {
        setLoading(true);
        try {
          const data = await dispatch(
            userThunkById(authUser.user._id)
          ).unwrap();
          setAdminData(data); // نخزن البيانات في state مستقل
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAdmin();
  }, [dispatch, authUser]);

  const avatarUrl = adminData?.avatar
    ? adminData.avatar.startsWith("http")
      ? adminData.avatar.replace(/^http:/, "https:")
      : `https://api.ezsouq.store/${adminData.avatar}`
    : personalImg;

  return (
    <div className="mt-4">
      <div className="flex-between items-center">
        <h1 className="hidden md:block text-[#23193E]">لوحة تحكم الأدمن</h1>

        <div
          onClick={() => dispatch(toggleSidebar())}
          className="cursor-pointer lg:hidden bg-primary"
        >
          {/* أيقونة القائمة */}
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={avatarUrl}
              alt="ملف شخصي"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}

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
      <hr className="text-[#D2D2D2] my-3" />
    </div>
  );
};

export default TopBar;
