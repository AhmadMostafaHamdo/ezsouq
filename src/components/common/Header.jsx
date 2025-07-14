import { useState } from "react";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import menuIcon from "../../assets/images/menu.svg";
import searchIcon from "../../assets/images/search.svg";
import SearchInput from "./SearchInput";
import AuthLinks from "./AuthLinks";
import { useScrolled } from "../../hooks/useScrolled";
import Sidebar from "./Sidebar";
import closeIcon from "../../assets/images/close.png";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const isScrolled = useScrolled(10);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);
  return (
    <header
      className={`text-white py-1 font-bold text-[.87rem] fixed w-full z-10 bg-primary md:${
        isScrolled ? "backdrop-blur-[20px] bg-[#0F00FF80]" : "bg-primary"
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
      <div
        className={`fixed inset-0 z-50 ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop with transition */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={toggleSidebar}
          aria-hidden="true"
        />

        <Sidebar
          toggleSidebar={toggleSidebar}
          logo={logo}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </header>
  );
};

export default Header;
