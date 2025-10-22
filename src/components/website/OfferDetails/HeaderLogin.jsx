import { useState, useEffect, useRef, memo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import menuIcon from "../../../assets/images/menu.svg";
import logo from "../../../assets/images/logoWithTitleWhite.svg";
import closeIcon from "../../../assets/images/close.png";
import search from "../../../assets/images/search.svg";
import emptyHeart from "../../../assets/images/emptyHeartLogin.svg";
import redHeart from "../../../assets/images/redHeart.svg";
import confirmLogout from "../../../assets/images/confirmLogout.svg";
import personal from "../../../assets/images/pesonal.png";

import Sidebar from "../../common/Sidebar";
import useUserId from "../../../hooks/useUserId";
import { ulLinksLogin } from "../../../data/filterData";
import { AnimatePresence, motion } from "framer-motion";

// ====================== Hook to detect scroll ======================
const useScrolled = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
};

const HeaderLogin = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = useUserId();
  const isScrolled = useScrolled(10);
  const menuRef = useRef();

  // Fetch user image
  const getMyImage = async () => {
    try {
      const res = await axios.get(`/user/get_user/${userId}`);
      const img = res.data?.avatar?.replace(/^http:/, "https:") || "";
      setImage(img);
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  };

  // Fetch image only when userId is available
  useEffect(() => {
    if (userId) getMyImage();
  }, [userId]);

  const myImage = image ? image : personal;

  // Handle sidebar open/close
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Logout handler
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  // Disable page scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`fixed flex w-full z-10 py-1 font-bold text-[.87rem] bg-primary text-white transition-all duration-300 ${
        isScrolled ? "opacity-90 shadow-custom" : "bg-primary"
      }`}
    >
      {/* ================= Header Container ================= */}
      <div className="container flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="flex-center w-8 h-8 lg:hidden outline-none"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <img
            src={isSidebarOpen ? closeIcon : menuIcon}
            alt={isSidebarOpen ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
        </button>

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Website logo"
            className="w-20 h-12 ml-16 outline-none"
          />
        </Link>

        {/* Navigation Links */}
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
                      ? "px-4 py-1 rounded-[10px] bg-[#9B95FF] outline-none"
                      : "px-4 py-2 rounded-[10px] outline-none hover:text-[gold]"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Icons Section */}
        <div className="flex-center gap-4">
          <Link to="/search">
            <img src={search} alt="Search" className="w-4 h-4" />
          </Link>

          <Link to="/wishlist">
            <img
              src={location.pathname === "/wishlist" ? redHeart : emptyHeart}
              alt={
                location.pathname === "/wishlist"
                  ? "Wishlist"
                  : "Add to wishlist"
              }
              className="w-6 h-6"
              style={{ stroke: "white", fill: "red" }}
            />
          </Link>

          {/* Profile Dropdown */}
          <div
            ref={menuRef}
            className="relative cursor-pointer border-solid border-[#f5f5f559] border-[1.5px] rounded-[50%] p-[1.5px]"
          >
            <img
              src={myImage}
              alt="Profile"
              className="w-10 h-10 rounded-full"
              onClick={() => setMenuOpen((prev) => !prev)}
            />

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute top-14 left-0 flex flex-col bg-secondary text-black text-[.7rem] shadow-md p-3 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => {
                      if (userId) {
                        navigate(`/profile/${userId}`, {
                          state: { from: location.pathname },
                        });
                      }
                      setMenuOpen(false);
                    }}
                    className="mb-2 w-20 shadow-sm hover:text-primary"
                  >
                    الملف الشخصي
                  </button>

                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setMenuOpen(false);
                    }}
                    className="w-20 shadow-sm text-red hover:text-[#ff6600]"
                  >
                    تسجيل الخروج
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Sidebar Component */}
      <Sidebar
        toggleSidebar={toggleSidebar}
        logo={logo}
        isSidebarOpen={isSidebarOpen}
      />
      {/* Logout Confirmation Modal */};
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-[20px] z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-72 p-6 bg-white rounded-2xl text-center shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <img
                src={confirmLogout}
                alt="Confirm logout"
                className="w-20 m-auto"
              />
              <h3 className="my-2 text-black">تسجيل الخروج</h3>
              <p className="my-7 text-[#444444]">
                هل أنت متأكد من أنك تريد تسجيل الخروج؟ لا يمكنك التراجع عن هذا
                الإجراء
              </p>
              <div className="flex justify-around ">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-8 py-1 border border-[#818181] rounded text-[#818181]"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(HeaderLogin);
