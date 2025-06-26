import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import menuIcon from "../../assets/images/menu.svg";
import searchIcon from "../../assets/images/search.svg";
import closeIcon from "../../assets/images/close.png";
import SearchInput from "./SearchInput";
import { ulLinks } from "../../data/filterData";

const AuthLinks = ({ isMobile = false }) => (
  <div
    className={`flex ${
      isMobile ? "flex-col space-y-4" : "items-center space-x-reverse space-x-4"
    }`}
  >
    <Link
      to="/login"
      className={`px-6 py-3 rounded-lg font-medium text-center ${
        isMobile
          ? "bg-white hover:bg-gray-100 text-primary"
          : "bg-secondary hover:bg-secondary-dark text-primary text-nowrap"
      }`}
    >
      تسجيل دخول
    </Link>
    <Link
      to="/register"
      className={`px-6 py-3 rounded-lg font-medium text-nowrap text-center ${
        isMobile
          ? "text-white border-2 border-white"
          : "text-white hover:text-secondary"
      }`}
    >
      إنشاء حساب
    </Link>
  </div>
);

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(isScrolled);
  return (
    <header
      className={`bg-primary text-white pt-8 z-10   md:px-12 lg:px-20 md:py-6  fixed  w-full  md:${
        isScrolled ? "backdrop-blur-[38.1px]   from-primary" : ""
      } `}
    >
      <div className="container flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-8 h-8 md:hidden"
          aria-label="Toggle menu"
        >
          <img
            src={isSidebarOpen ? closeIcon : menuIcon}
            alt={isSidebarOpen ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
        </button>
        {/* Mobile Search Button */}
        <div className="flex-center md:hidden">
          <button
            onClick={toggleSearch}
            className="flex items-center justify-center w-8 h-8"
            aria-label="Toggle search"
          >
            <img src={searchIcon} alt="Search" className="w-5 h-5" />
          </button>
        </div>
        {/* Mobile Search Input */}
        {isSearchVisible && (
          <div className="mt-0 md:hidden">
            <SearchInput isMobile />
          </div>
        )}
        {/* Logo */}
        {!isSearchVisible && (
          <div className="flex-1 flex justify-end ml-[-2.1rem] md:flex-none">
            <img
              src={logo}
              alt="Logo"
              className="object-contain w-40 h-14 md:scale-[1.7]"
            />
          </div>
        )}
        {/* Desktop Search Input */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl h-12 bg-main rounded-lg shadow-sm">
          <SearchInput />
        </div>
        {/* Desktop Auth Links */}
        <div className="hidden md:flex items-center justify-start w-[14.75rem] text-sm space-x-reverse space-x-4">
          <AuthLinks />
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
                {ulLinks.map(({ link, name }) => (
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
    </header>
  );
};

export default Header;
