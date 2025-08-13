import { Link, NavLink, useLocation } from "react-router-dom";
import menuIcon from "../../../assets/images/menu.svg";
import logo from "../../../assets/images/logoWithTitleWhite.svg";
import closeIcon from "../../../assets/images/close.png";
import search from "../../../assets/images/search.svg";
import emptyHeart from "../../../assets/images/emptyHeart.svg";
import redHeart from "../../../assets/images/redHeart.svg";
import personal from "../../../assets/images/personal.svg";
import { useState } from "react";
import { ulLinksLogin } from "../../../data/filterData";
import Sidebar from "../../common/Sidebar";
const HeaderLogin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div
      className={`bg-primary text-white  font-bold text-[.87rem] fixed w-full z-10 py-[1.5px] `}
    >
      <div className="container flex items-center justify-between ">
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
          <div className=" hidden md:flex justify-end lg:hidden">
            <Link
              to="/create-offer"
              className="ml-12 px-6 py-2 rounded-[10px] bg-[#9B95FF]"
            >
              نشر إعلان
            </Link>
          </div>

          <ul className="hidden lg:flex items-center justify-start">
            {ulLinksLogin.map((link, index) => (
              <li key={index} className="">
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
            {location.pathname == "/wishlist" ? (
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
          <div>
            <Link to="/profile">
              <img src={personal} className="w-10 h-10" />
            </Link>
          </div>
        </div>
      </div>
      <Sidebar
        toggleSidebar={toggleSidebar}
        logo={logo}
        isSidebarOpen={isSidebarOpen}
      />
      {""}
    </div>
  );
};

export default HeaderLogin;
