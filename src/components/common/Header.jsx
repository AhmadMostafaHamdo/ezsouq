import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import menuIcon from "../../assets/images/menu.svg";
import searchIcon from "../../assets/images/search.svg";
import closeIcon from "../../assets/images/close.png";
import SearchInput from "./SearchInput";
import { ulLinks } from "../../data/filterData";
import AuthLinks from "./AuthLinks";

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
  return (
    <header
      className={`text-white  py-1 font-bold text-[.87rem] fixed  w-full z-10  md:${
        isScrolled ? "backdrop-blur-[20px]  bg-[#0F00FF80]" : "bg-primary"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Mobile Menu Button */}
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
        {/* Mobile Search Button */}
        <div className="flex-center md:hidden">
          <button
            onClick={toggleSearch}
            className="flex-center w-8 h-8"
            aria-label="Toggle search"
          >
            <img
              src={searchIcon}
              alt="Search"
              className="w-5 h-5"
              loading="lazy"
            />
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
              className="object-contain w-40 h-12 md:scale-[1.7]"
            />
          </div>
        )}
        {/* Desktop Search Input */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl h-10 bg-main rounded-lg shadow-sm">
          <SearchInput />
        </div>
        {/* Desktop Auth Links */}
        <div
          className={`hidden md:flex items-center w-[14.75rem] text-sm space-x-reverse space-x-4`}
        >
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
