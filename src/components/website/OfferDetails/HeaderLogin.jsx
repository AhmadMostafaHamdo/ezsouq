import { Link, NavLink, useLocation } from "react-router-dom";
import menuIcon from "../../../assets/images/menu.svg";
import logo from "../../../assets/images/logoWithTitleWhite.svg";
import closeIcon from "../../../assets/images/close.png";
import search from "../../../assets/images/search.svg";
import emptyHeart from "../../../assets/images/emptyHeart.svg";
import redHeart from "../../../assets/images/redHeart.svg";
import confirmLogout from "../../../assets/images/confirmLogout.svg";

import personal from "../../../assets/images/pesonal.png";
import { useState } from "react";
import { ulLinksLogin } from "../../../data/filterData";
import Sidebar from "../../common/Sidebar";
import useUserId from "../../../hooks/useUserId";
import Cookies from "js-cookie";

const HeaderLogin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // ✅ لإظهار تبويبة التأكيد

  const location = useLocation();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const userId = useUserId();

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  return (
    <div className="bg-primary text-white font-bold text-[.87rem] fixed w-full z-10 py-[1.5px]">
      <div className="container flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="flex-center w-8 h-8 lg:hidden"
          aria-label="Toggle menu"
        >
          <img
            src={isSidebarOpen ? closeIcon : menuIcon}
            alt={isSidebarOpen ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
        </button>
        <Link to="/">
          <img src={logo} className="w-20 h-12 ml-16" />
        </Link>
        <div className="flex-1">
          <div className="hidden md:flex justify-end lg:hidden">
            <Link
              to="/create-offer"
              className="ml-12 px-6 py-2 rounded-[10px] bg-[#9B95FF]"
            >
              نشر إعلان
            </Link>
          </div>

          <ul className="hidden lg:flex items-center justify-start">
            {ulLinksLogin.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    isActive
                      ? "px-4 py-1 rounded-[10px] bg-[#9B95FF]"
                      : "px-4 py-2 rounded-[10px]"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-center gap-4">
          <Link to="/search">
            <img src={search} className="w-4 h-4" />
          </Link>
          <Link to="/wishlist">
            {location.pathname === "/wishlist" ? (
              <img
                src={redHeart}
                className="w-6 h-6"
                style={{ stroke: "white", fill: "red" }}
              />
            ) : (
              <img
                src={emptyHeart}
                className="w-6 h-6"
                style={{ stroke: "white", fill: "red" }}
              />
            )}
          </Link>

          <div className="relative cursor-pointer">
            <img
              src={personal}
              className="w-10 h-10 rounded-[50%]"
              onClick={() => setMenu((prev) => !prev)}
            />

            {menu && (
              <div className="flex flex-col absolute top-14 bg-secondary left-0 text-[.7rem] text-black shadow-md p-3 rounded-md">
                <button
                  onClick={() => {
                    window.location.href = `/profile/${userId}`;
                    setMenu(false);
                  }}
                  className="mb-2 shadow-sm w-20 hover:text-primary"
                >
                  الملف الشخصي
                </button>

                <button
                  onClick={() => {
                    setShowLogoutModal(true); // ✅ فتح تبويبة التأكيد
                    setMenu(false);
                  }}
                  className="text-red shadow-sm w-20 hover:text-[#ff6600]"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Sidebar
        toggleSidebar={toggleSidebar}
        logo={logo}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Modal لتأكيد تسجيل الخروج */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black backdrop-filter:blur(20px) bg-opacity-40 z-50"
        >
          <div className="bg-white rounded-2xl p-6 w-72 text-center shadow-lg ">
            <img src={confirmLogout} alt="" className="w-20 m-auto" />
            <h3 className="my-2 text-black">تسجيل الخروج</h3>
            <p className="my-7 text-[#444444]">
              هل أنت متأكد من أنك تريد تسجيل الخروج؟ لا يمكنك التراجع عن هذا
              الاجراء
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-8  py-1 text-[#818181] border-[#818181] border-[1px] border-solid  rounded"
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
    </div>
  );
};

export default HeaderLogin;
