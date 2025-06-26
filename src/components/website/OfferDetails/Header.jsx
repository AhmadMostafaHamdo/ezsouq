import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logoWithTitleWhite.svg";
import search from "../../../assets/images/search.svg";
import heart from "../../../assets/images/heart.svg";
import personal from "../../../assets/images/personal.svg";
import { nav } from "../../../data/offerDetails";
const Header = () => {
  return (
    <div className="bg-primary text-white font-sans font-bold text-[.87rem]">
      <div className="container flex items-center justify-between">
        <img src={logo} className="w-24 h-24 ml-16" />
        <div className="flex-1">
          <ul className="flex items-center justify-start ">
            {nav.map((link, index) => (
              <li key={index} className="">
                <NavLink
                  to={link.link}
                  className={({ isActive }) =>
                    isActive
                      ? "px-4 py-2 rounded-[10px] bg-[#9B95FF]"
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
          <img src={search} className="w-6 h-6" />
          <img src={heart} className="w-6 h-6" style={{stroke:'white',fill:'red'}}/>
          <div>
            <img src={personal} className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
