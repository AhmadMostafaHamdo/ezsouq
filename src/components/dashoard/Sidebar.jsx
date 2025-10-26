// Sidebar.jsx
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logoWithTitle.svg";
import logoutImg from "../../assets/images/dashboard/logout.svg";
import confirmLogout from "../../assets/images/confirmLogout.svg";
import { ulLinks } from "../../data/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/thunk/logout";
import { useState } from "react";
import Cookies from "js-cookie";
import { toggleSidebar, closeSidebar } from "../../store/sidebar/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarIsOpen } = useSelector((state) => state.sidebar);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ✅ Handle logout
  const handleLogout = async () => {
    await dispatch(logout());
    Cookies.remove("token");
    window.location.href = "/login";
  };

  // ✅ Render dashboard links
  const renderLinks = () =>
    ulLinks?.map((link, index) => (
      <div className="flex items-center overflow-hidden gap-2 mb-4" key={index}>
        <img src={link.img} alt={`رابط ${link.name}`} width={25} />
        <li>
          <NavLink
            to={link.link}
            end={link.name === "الاحصائيات"}
            onClick={() => dispatch(closeSidebar())}
            className={({ isActive }) =>
              isActive
                ? "px-7 py-2 rounded-[10px] bg-[#E0E0FF] text-[#2F2E41] text-[.79rem]"
                : "px-4 py-2 rounded-[10px] text-[#2F2E41] text-[.79rem] hover:text-[.88rem] hover:text-main"
            }
          >
            {link.name}
          </NavLink>
        </li>
      </div>
    ));

  return (
    <>
      {/* ===== Desktop Sidebar (fixed on right) ===== */}
      <div className="hidden lg:block fixed top-0 right-0 h-screen z-40">
        <div className="w-44 bg-white rounded-lg flex flex-col justify-between h-full p-4 pt-1 pb-6 shadow-sm">
          {/* Logo & Title */}
          <div>
            <img src={logo} alt="شعار الموقع" width={100} />
            <h1 className="text-[#23193E] mt-[-.5rem] mb-3">
              لوحة تحكم الأدمن
            </h1>
          </div>

          {/* Links */}
          <ul>{renderLinks()}</ul>

          {/* Logout button */}
          <button
            className="text-[#2F2E41] flex items-center gap-2 text-[.9rem] mt-3 rounded-md p-2 hover:text-red"
            onClick={() => setShowLogoutModal(true)}
          >
            <img src={logoutImg} alt="زر تسجيل الخروج" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* ===== Mobile Sidebar (slide from right) ===== */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 z-50 lg:hidden
        ${sidebarIsOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col justify-between h-full p-4">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <img src={logo} alt="شعار الموقع" width={100} />
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <h1 className="text-[#23193E] mt-[-.5rem] mb-3">
              لوحة تحكم الأدمن
            </h1>

            {/* Links */}
            <ul>{renderLinks()}</ul>
          </div>

          {/* Logout button */}
          <button
            className="text-[#2F2E41] flex items-center gap-2 text-[.9rem] mt-3 rounded-md p-2 hover:text-red"
            onClick={() => setShowLogoutModal(true)}
          >
            <img src={logoutImg} alt="زر تسجيل الخروج" />
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* ===== Overlay (mobile only) ===== */}
      {sidebarIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
          onClick={() => dispatch(closeSidebar())}
        />
      )}

      {/* ===== Logout Confirmation Modal ===== */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-[9999]">
          <div className="bg-white rounded-2xl p-6 w-72 text-center shadow-lg">
            <img
              src={confirmLogout}
              alt="تأكيد تسجيل الخروج"
              className="w-20 m-auto"
            />
            <h3 className="my-2 text-black">تسجيل الخروج</h3>
            <p className="my-7 text-[#444444]">
              هل أنت متأكد من أنك تريد تسجيل الخروج؟ لا يمكنك التراجع عن هذا
              الإجراء
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-8 py-1 text-[#818181] border border-[#818181] rounded"
              >
                إلغاء
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red text-white rounded hover:bg-red-600"
              >
                تأكيد الخروج
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
