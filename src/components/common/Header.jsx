import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Animation
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
   Debounce function to delay execution
   // دالة تأخير تنفيذ البحث لمنع إرسال عدة طلبات بسرعة
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
  const [category, setCategory] = useState("");

  const isScrolled = useScrolled(10);
  const dispatch = useDispatch();

  const { data: searchedProducts = [], loading } = useSelector(
    (state) => state.search
  );

  // Debounced search with category
  const debouncedSearch = useCallback(
    debounce((val, cat) => {
      if (val.trim() || cat) {
        dispatch(setCurrentPage(1));
        dispatch(searchThunk({ keyword: val, category: cat, page: 1 }));
      }
    }, 500),
    [dispatch]
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value, category);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    debouncedSearch(searchValue, e.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setCategory("");
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  const hasSearchResults =
    searchedProducts.length > 0 && (searchValue.trim() !== "" || category);

  return (
    <div className="relative">
      {/* ================== HEADER ================== */}
      <header
        className={`text-white bg-primary py-1 font-bold text-[.87rem] fixed w-full z-20 transition-all duration-300`}
      >
        <div className="container flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="flex-center w-8 h-8 lg:hidden"
            aria-label={isSidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <img
              src={isSidebarOpen ? closeIcon : menuIcon}
              alt={isSidebarOpen ? "إغلاق القائمة" : "فتح القائمة"}
              className="w-6 h-6"
            />
          </button>

          {/* Mobile Search Button */}
          <div className="flex-center md:hidden">
            <button
              onClick={toggleSearch}
              className="flex-center w-8 h-8"
              aria-label="إظهار البحث"
            >
              <img src={searchIcon} alt="بحث" className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Search Input */}
          {isSearchVisible && (
            <div className="mt-0 md:hidden flex-1 flex gap-2">
              <select
                value={category}
                onChange={handleCategoryChange}
                className="p-2 bg-main text-white outline-none rounded-md"
                aria-label="اختر التصنيف"
              >
                <option value="">التصنيفات</option>
                <option value="عقارات">عقارات</option>
                <option value="تقنيات">تقنيات</option>
                <option value="سيارات">سيارات</option>
              </select>
              <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder="بحث..."
                className="flex-1 p-2 rounded-md bg-white outline-none border-none text-black"
                aria-label="مربع البحث"
              />
            </div>
          )}

          {/* Logo */}
          {!isSearchVisible && (
            <div className="flex-1 flex justify-end ml-[-2.1rem] md:flex-none">
              <Link to="/">
                <img
                  src={logo}
                  alt="شعار الموقع"
                  className="object-contain w-40 h-12 md:scale-[1.7]"
                />
              </Link>
            </div>
          )}

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 items-center ml-8 max-w-xl h-10 gap-2">
            <select
              value={category}
              onChange={handleCategoryChange}
              className="outline-none p-[.4rem] -ml-2 bg-[#9B95FF] rounded-br-md rounded-tr-md text-white"
              aria-label="اختر التصنيف"
            >
              <option value="">التصنيفات</option>
              <option value="عقارات">عقارات</option>
              <option value="تقنيات">تقنيات</option>
              <option value="سيارات">سيارات</option>
            </select>
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              placeholder="بحث..."
              className="flex-1 p-[.5rem] rounded-bl-md rounded-tl-md border-r-1 border-r-white border-t-0 border-b-0 border-l-0 bg-[#9B95FF] placeholder:text-white outline-none text-black"
              aria-label="مربع البحث"
            />
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center w-[14.75rem] text-sm space-x-reverse space-x-4">
            <AuthLinks />
          </div>
        </div>

        {/* ================== Sidebar Animation ================== */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay animation */}
              <motion.div
                key="overlay"
                className="fixed inset-0 bg-black z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={toggleSidebar}
                aria-hidden="true"
              />
              {/* Sidebar slide-in animation */}
              <motion.div
                key="sidebar"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.4 }}
                className="fixed inset-y-0 left-0 z-50"
              >
                <Sidebar
                  toggleSidebar={toggleSidebar}
                  logo={logo}
                  isSidebarOpen={isSidebarOpen}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* ================== SEARCH RESULTS (Animated) ================== */}
      <AnimatePresence>
        {(searchValue || category) && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: -10 }} // Fade and slide down
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[4rem] left-0 w-full bg-white z-10 shadow-lg p-6 min-h-[200px]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-700">
                نتائج البحث عن: {searchValue || "بدون كلمة"}{" "}
                {category && `في ${category}`}
              </h2>
              <button
                onClick={handleClearSearch}
                className="text-red font-bold text-lg hover:underline"
                aria-label="مسح البحث"
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
              <p className="text-center text-gray-500">لا توجد نتائج مطابقة</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
