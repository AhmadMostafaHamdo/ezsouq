import React from "react";
import AuthLinks from "./AuthLinks";
import { Link } from "react-router";
import closeIcon from "../../assets/images/close.png";
import { ulLinks, ulLinksLogin } from "../../data/filterData";
import Cookies from "js-cookie";

const Sidebar = ({ toggleSidebar, isSidebarOpen, logo }) => {
  const token = Cookies.get("token");

  return (
    <>
      {/* Transparent dark overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
          aria-label="Overlay background"
        ></div>
      )}

      {/* Sidebar container */}
      <div
        className={`fixed inset-y-0 right-0 w-80 h-full bg-gradient-to-b bg-[#0F00FF80] backdrop-blur-[20px] to-primary-dark p-6 shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header section (logo + close button) */}
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="شعار" className="w-32 h-auto" />
          <button
            onClick={toggleSidebar}
            className="text-white"
            aria-label="Close sidebar"
          >
            <img src={closeIcon} alt="إغلاق" className="w-8 h-8" />
          </button>
        </div>

        {/* Navigation links with hover effects */}
        <nav className="mt-8">
          <ul className="space-y-6 text-lg">
            {(token ? ulLinksLogin : ulLinks).map(({ link, name }) => (
              <li className="text-center" key={link}>
                <Link
                  to={link == "/create-offer" ? "/login" : link}
                  onClick={toggleSidebar}
                  className="
          block py-[6px] text-white  duration-300 
          hover:text-[#FFD700] hover:scale-105 hover:shadow-sm
        "
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth section for mobile */}
        <div className="mt-12">
          <AuthLinks isMobile />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
