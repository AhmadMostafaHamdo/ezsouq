import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logoWithTitleWhite.svg";
import menuIcon from "../../assets/images/menu.svg";
import searchIcon from "../../assets/images/search.svg";
import closeIcon from "../../assets/images/close.png";
import { useScrolled } from "../../hooks/useScrolled";
import Sidebar from "./Sidebar";
import AuthLinks from "./AuthLinks";
import { searchThunk } from "../../store/search/thunk/serachThunk";
import { setCurrentPage } from "../../store/search/searchSlice";
import Card from "../website/Card";
import Spinner from "../../feedback/loading/Spinner";

/* =========================================
   Simple debounce function
   Delays function execution by wait ms
========================================= */
function debounce(func, wait) {
  let timeout;
  const debounced = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isScrolled = useScrolled(10);
  const dispatch = useDispatch();

  // Redux search state
  const { data: searchedProducts = [], loading } = useSelector(
    (state) => state.search
  );

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((val) => {
      if (val.trim()) {
        dispatch(setCurrentPage(1));
        dispatch(searchThunk({ keyword: val, page: 1 }));
      }
    }, 500),
    [dispatch]
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClearSearch = () => setSearchValue("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  const hasSearchResults =
    searchedProducts.length > 0 && searchValue.trim() !== "";

  return (
    <div className="relative">
      {/* Header */}
      <header
        className={`text-white py-1 font-bold text-[.87rem] fixed w-full z-20 bg-primary md:${
          isScrolled ? "backdrop-blur-[20px] bg-[#0F00FF80]" : "bg-primary"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="flex-center w-8 h-8 lg:hidden"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
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
              <img src={searchIcon} alt="Search" className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Search Input */}
          {isSearchVisible && (
            <div className="mt-0 md:hidden flex-1">
              <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder="بحث..."
                className="w-full p-2 rounded-md bg-white text-black"
                aria-label="Search input"
              />
            </div>
          )}

          {/* Logo */}
          {!isSearchVisible && (
            <div className="flex-1 flex justify-end ml-[-2.1rem] md:flex-none">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="object-contain w-40 h-12 md:scale-[1.7]"
                />
              </Link>
            </div>
          )}

          {/* Desktop Search Input */}
          <div className="hidden md:flex flex-1 mx-8 max-w-xl h-10 bg-main rounded-lg shadow-sm">
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              placeholder="بحث..."
              className="w-full p-2 rounded-md bg-[#D7D5FF] border-none outline-none text-black"
              aria-label="Search input"
            />
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center w-[14.75rem] text-sm space-x-reverse space-x-4">
            <AuthLinks />
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-0 z-50 ${
            isSidebarOpen ? "visible" : "invisible"
          }`}
        >
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

      {/* Search Results */}
      {searchValue && (
        <div className="absolute top-[4rem] left-0 w-full bg-white z-10 shadow-lg p-6 min-h-[200px]">
          {/* Clear Search Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-700">
              نتائج البحث عن: {searchValue}
            </h2>
            <button
              onClick={handleClearSearch}
              className="text-red font-bold text-lg hover:underline"
              aria-label="Clear search"
            >
              ✖
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner />
            </div>
          ) : hasSearchResults ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchedProducts.map((product) => (
                <Card key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {searchValue
                ? `لا توجد نتائج لـ "${searchValue}"`
                : "اكتب للبحث..."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
