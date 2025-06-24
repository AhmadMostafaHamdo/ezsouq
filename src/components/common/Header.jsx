import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import menuIcon from "../../assets/images/menu.svg";
import searchIcon from "../../assets/images/search.svg";
import close from "../../assets/images/close.png";
import { selectOptions } from "../../data/filterData";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  return (
    <header className="bg-primary text-white p-4 md:px-12 lg:px-20 md:py-6 shadow-md">
      {/* Mobile Search (appears below header when toggled) */}
      <div className="flex items-center justify-between">
        <button
          onClick={toggleSidebar}
          className="md:hidden w-8 h-8 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <img
            src={isSidebarOpen ? "" : menuIcon}
            alt={isSidebarOpen ? "Close menu" : "Open menu"}
            className="w-6 h-6"
          />
        </button>
        {/* Mobile Menu Button - Right side */}
        {isSearchVisible && (
          <div className="mt-3 md:hidden animate-fadeIn">
            <SearchInput mobile />
          </div>
        )}
        {/* Logo - Right aligned */}
        <div className="flex-1 flex justify-end md:flex-none md:mr-16">
          <img src={logo} alt="Logo" className="w-40 h-14 object-contain" />
        </div>
        {/* Desktop Search - Center */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl h-12 bg-main rounded-lg shadow-sm">
          <SearchInput />
        </div>

        {/* Desktop Auth Links - Left side */}
        <div className="hidden md:flex items-center justify-start w-[14.75rem] text-sm space-x-reverse space-x-4">
          <AuthLinks />
        </div>

        {/* Mobile Search Toggle - Left side */}
        <div className="flex-center">
          <button
            onClick={toggleSearch}
            className="md:hidden w-8 h-8 flex items-center justify-center"
            aria-label="Toggle search"
          >
            <img src={searchIcon} alt="Search" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          />
          <div className="relative z-10 w-80 h-full bg-gradient-to-b from-primary to-primary-dark p-6 shadow-xl transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-8">
              <img src={logo} alt="Logo" className="w-32 h-auto" />
              <button onClick={toggleSidebar} className="text-white">
                <img src={close} alt="" className="w-[32px]" />
              </button>
            </div>

            <nav className="mt-8">
              <ul className="space-y-6 text-lg">
                <li>
                  <Link
                    to="/"
                    className="block py-2 hover:text-secondary transition-colors"
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 hover:text-secondary transition-colors"
                  >
                    التصنيفات
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="block py-2 hover:text-secondary transition-colors"
                  >
                    العروض
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-12">
              <AuthLinks mobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Reusable Search Input Component
const SearchInput = ({ mobile = false }) => (
  <div
    className={`flex w-full h-12 items-center font-sans bg-main rounded-lg px-4 ${
      mobile ? "border border-gray-600 shadow-md" : ""
    }`}
  >
    <select className="outline-none cursor-pointer font-bold text-sm bg-main ml-3 text-primary-dark">
      {selectOptions.map((option, index) => (
        <option key={index} value={option[index]}>
          {option}
        </option>
      ))}
    </select>
    <div className="border-r border-gray-300 flex items-center flex-1">
      <input
        type="text"
        className="h-full w-full border-0 bg-main placeholder-gray-400 text-sm focus:outline-none"
        placeholder="ابحث هنا..."
      />
      <button className="ml-3 mr-2 w-5 h-5 text-gray-500">
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  </div>
);

// Reusable Auth Links Component
const AuthLinks = ({ mobile = false }) => (
  <div
    className={`flex ${
      mobile ? "flex-col space-y-4" : "items-center space-x-reverse space-x-4"
    }`}
  >
    <Link
      to="/login"
      className={`px-6 py-3 rounded-lg font-medium ${
        mobile
          ? "bg-white hover:bg-gray-100 text-primary"
          : "bg-secondary hover:bg-secondary-dark text-primary text-nowrap"
      }`}
    >
      تسجيل دخول
    </Link>
    <Link
      to="/register"
      className={`px-6 py-3 rounded-lg font-medium text-nowrap ${
        mobile
          ? "bg-secondary hover:bg-secondary-dark text-primary"
          : "text-white hover:text-secondary"
      }`}
    >
      إنشاء حساب
    </Link>
  </div>
);

export default Header;
