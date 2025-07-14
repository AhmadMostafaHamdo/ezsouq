import React from "react";
import AuthLinks from "./AuthLinks";
import { Link } from "react-router";
import closeIcon from "../../assets/images/close.png";
import { ulLinks, ulLinksLogin } from "../../data/filterData";
import Cookies from "js-cookie";
const Sidebar = ({ toggleSidebar, isSidebarOpen, logo }) => {
  const token = Cookies.get("token");
  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 h-full bg-gradient-to-b from-primary to-primary-dark p-6 shadow-xl backdrop-blur-[38.1px] transform transition-transform duration-300 ease-in-out   ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <img src={logo} alt="Logo" className="w-32 h-auto" />
        <button
          onClick={toggleSidebar}
          className="text-white"
          aria-label="Close sidebar"
        >
          <img src={closeIcon} alt="Close" className="w-8 h-8" />
        </button>
      </div>
      <nav className="mt-8">
        <ul className="space-y-6 text-lg">
          {token
            ? ulLinksLogin.map(({ link, name }) => (
                <li className="text-center" key={link}>
                  <Link
                    to={link}
                    className="block py-[6px] transition-colors hover:text-secondary"
                    onClick={toggleSidebar}
                  >
                    {name}
                  </Link>
                </li>
              ))
            : ulLinks.map(({ link, name }) => (
                <li className="text-center" key={link}>
                  <Link
                    to={link}
                    className="block py-2 transition-colors hover:text-secondary"
                    onClick={toggleSidebar}
                  >
                    {name}
                  </Link>
                </li>
              ))}
        </ul>
      </nav>

      <div className="mt-12">
        <AuthLinks isMobile />
      </div>
    </div>
  );
};

export default Sidebar;
