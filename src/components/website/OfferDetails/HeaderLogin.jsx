import { Link, NavLink } from "react-router-dom";
import menu from "../../../assets/images/menu.svg";
import logo from "../../../assets/images/logoWithTitleWhite.svg";
import search from "../../../assets/images/search.svg";
import heart from "../../../assets/images/heart.svg";
import personal from "../../../assets/images/personal.svg";
import { nav } from "../../../data/offerDetails";
import { useEffect, useState } from "react";
const HeaderLogin = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`text-white font-sans font-bold text-[.87rem] fixed w-full z-10  ${
        isScrolled ? "backdrop-blur-[20px]  bg-[#0F00FF80]" : "bg-primary"
      }`}
    >
      <div className="container flex items-center justify-between ">
        <img
          src={menu}
          alt=""
          className="w-[1.87rem] h-[1.87rem] lg:hidden ml-8"
        />
        <img src={logo} className="w-20 h-18 ml-16" />
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
            {nav.map((link, index) => (
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
          <img src={search} className="w-4 h-4" />
          <img
            src={heart}
            className="w-6 h-6"
            style={{ stroke: "white", fill: "red" }}
          />
          <div>
            <img src={personal} className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLogin;
