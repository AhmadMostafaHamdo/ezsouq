import { Link, NavLink } from "react-router-dom";
import menuIcon from "../../../assets/images/menu.svg";
import logo from "../../../assets/images/logoWithTitleWhite.svg";
import closeIcon from "../../../assets/images/close.png";
import search from "../../../assets/images/search.svg";
import heartempty from "../../../assets/images/heartempty.svg";
import heartFavorit from "../../../assets/images/heartFavorit.svg";
import personal from "../../../assets/images/personal.svg";
import { useEffect, useState } from "react";
import { ulLinksLogin } from "../../../data/filterData";
import AuthLinks from "../../common/AuthLinks";
const HeaderLogin = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toggleHeart, setToggleHeart] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleToggle = () => {
    setToggleHeart((prev) => !prev);
  };
  return (
    <div
      className={`text-white  font-bold text-[.87rem] fixed w-full z-10 py-[1.5px] ${
        isScrolled
          ? " bg-gradient-to-b from-primary to-main  backdrop-blur-[38.1px]"
          : "bg-primary"
      }`}
    >
      <div className="container flex items-center justify-between ">
        <button
          onClick={toggleSidebar}
          className="flex-center w-8 h-8 md:hidden"
          aria-label="Toggle menu"
        >
          <img
            src={isSidebarOpen ? closeIcon : menuIcon}
            alt={isSidebarOpen ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
        </button>
        <img src={logo} className="w-20 h-12 ml-16" />
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
          <img src={search} className="w-4 h-4" />
          <Link to="/wishlist" onClick={handleToggle}>
            {toggleHeart ? (
              <img
                src={heartFavorit}
                className="w-6 h-6"
                style={{ stroke: "white", fill: "red" }}
              />
            ) : (
              <img
                src={heartempty}
                className="w-6 h-6"
                style={{ stroke: "white", fill: "red" }}
              />
            )}
          </Link>
          <div>
            <img src={personal} className="w-10 h-10" />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
            aria-hidden="true"
          />

          <div className="relative z-10 w-80 h-full bg-gradient-to-b from-primary to-primary-dark p-6 shadow-xl backdrop-blur-[38.1px]">
            <div className="flex items-center justify-between mb-8">
              <img
                src={logo}
                alt="Logo"
                className="w-32 h-auto"
                loading="lazy"
              />
              <button
                onClick={toggleSidebar}
                className="text-white"
                aria-label="Close sidebar"
              >
                <img
                  src={closeIcon}
                  alt="Close"
                  className="w-8 h-8"
                  loading="lazy"
                />
              </button>
            </div>

            <nav className="mt-8">
              <ul className="space-y-6 text-lg">
                {ulLinksLogin.map(({ link, name }) => (
                  <li className="text-center" key={link}>
                    <Link
                      to={link}
                      className="block py-2 transition-colors hover:text-secondary"
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
        </div>
      )}
    </div>
  );
};

export default HeaderLogin;
