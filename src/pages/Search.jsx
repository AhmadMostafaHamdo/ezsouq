import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import filterImg from "../assets/images/filter.svg";
import closeIcon from "../assets/images/close.svg";
import corrected from "../assets/images/corrected.svg";
import searchFilter from "../assets/images/searchFilter.svg";
import emptySearch from "../assets/images/emptySearch.svg";
import { searchThunk } from "../store/search/thunk/serachThunk";
import Card from "../components/website/Card";
import Spinner from "../feedback/loading/Spinner";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setCurrentPage } from "../store/search/searchSlice";

const Search = () => {
  const contactRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(false);
  const dispatch = useDispatch();

  // Get state from Redux
  const {
    data: searchedProducts = [],
    loading,
    currentPage,
    totalPages,
    totalItems,
  } = useSelector((state) => state.search);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value, page = 1) => {
      if (value.trim()) {
        dispatch(searchThunk({ keyword: value, page }));
      }
    }, 500),
    [dispatch]
  );

  // Scroll to top on mount
  useEffect(() => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Trigger search when searchValue changes (resets to page 1)
  useEffect(() => {
    if (searchValue.trim()) {
      debouncedSearch(searchValue, 1);
      // Reset to page 1 when search term changes
      dispatch(setCurrentPage(1));
    }
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch, dispatch]);

  // Handle page changes
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    debouncedSearch(searchValue, page);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const hasSearchResults =
    searchedProducts.length > 0 && searchValue.trim() !== "";
  const handelClick = () => {
    setFilter(!filter);
  };

  const handelSearchFilter = () => {
    setFilter(false);
  };

  // Pagination component
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're at the beginning or end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
        }`}
      >
        &lt;
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full ${
            currentPage === i
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-primary hover:text-white"
        }`}
      >
        &gt;
      </button>
    );

    return (
      <div className="flex justify-center my-8">
        <div className="flex gap-2 items-center">
          {pages}
          <span className="text-gray-600 ml-4">
            صفحة {currentPage} من {totalPages} - {totalItems} نتيجة
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#F7F7FF]" ref={contactRef}>
      <ToastContainer />
      {filter && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#23193E]/[.57] backdrop-blur-[20] z-10">
          <div className="p-4 w-80 h-fit bg-white left-0 top-[3.22rem] absolute rounded-tr-[25px] rounded-br-[25px]">
            <div className="flex-between">
              <p>فلترة حسب:</p>
              <Link to="/search" onClick={handelClick}>
                <img src={closeIcon} alt="" />
              </Link>
            </div>
            <div>
              <select className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]">
                <option value="">النوع</option>
                <option value="لابتوب">عقارات</option>
                <option value="موبايلات">موبايلات</option>
                <option value="تابلت">سيارات</option>
              </select>
              <select className="outline-none mt-4  w-full p-2 bg-white rounded border border-[#B9B5FF]">
                <option value="">النوع</option>
                <option value="لابتوب">عقارات</option>
                <option value="موبايلات">موبايلات</option>
                <option value="تابلت">سيارات</option>
              </select>
              <select className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]">
                <option value="">النوع</option>
                <option value="لابتوب">عقارات</option>
                <option value="موبايلات">موبايلات</option>
                <option value="تابلت">سيارات</option>
              </select>
              <div className="outline-none flex gap-5 my-4">
                <label className="block cursor-pointer">
                  <input type="radio" value="جديدة" className="ml-2" />
                  جديدة
                </label>
                <label className="block cursor-pointer">
                  <input type="radio" value="مستعملة" className="ml-2" />
                  مستعملة
                </label>
              </div>
              <div className="flex-between">
                <button className="flex-center rounded-xl py-[.4rem] px-5 border-[1px] text-[#B1ADFF] border-[#B1ADFF]">
                  إعادة تعيين
                </button>
                <button
                  onClick={handelSearchFilter}
                  className="flex-center gap-1 bg-primary text-white rounded-xl py-[.4rem] px-5"
                >
                  تطبيق
                  <img src={corrected} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container pt-20">
        <div className="flex items-center gap-4 md:gap-10 flex-col md:flex-row">
          <div className="flex items-center  md:w-auto">
            <h1 className="font-normal text-[#2F2E41] text-xl md:text-[1.5rem] leading-9 mb-3 ml-4  md:mb-0">
              البحث والفلترة
            </h1>
            <div className="flex-between gap-4 w-fit">
              <input
                type="text"
                value={searchValue}
                className="inline w-full md:w-[35vw] p-2 bg-[#D7D5FF] rounded-md outline-none border-none placeholder:text-white focus:ring-2 focus:ring-[#9B99FF]"
                placeholder="بحث ..."
                onChange={handleInputChange}
                aria-label="Search input"
              />
              <img
                src={filterImg}
                alt="Filter icon"
                className="ml-2 md:ml-4 w-6 h-6 cursor-pointer"
                onClick={handelClick}
              />
            </div>
          </div>
        </div>

        {!searchedProducts.length > 0 && (
          <div>
            <p className="text-[#6C63FF] my-2">
              اكتب اسم منتج، خدمة، أو تصفح حسب الفئة
            </p>
            <img src={emptySearch} alt="" className="m-auto w-44 mt-6" />
          </div>
        )}
        {loading ? (
          <div className="flex-center mt-40">
            <Spinner />
          </div>
        ) : (
          <>
            {!hasSearchResults && searchValue && (
              <div className="text-center py-12">
                <p className="text-primary text-lg mb-6">
                  لم يتم العثور على نتائج لـ "{searchValue}"
                </p>
                <img
                  src={searchFilter}
                  alt="لا توجد نتائج"
                  className="mx-auto w-48 opacity-70"
                />
                <p className="text-gray-500 mt-6">
                  حاول استخدام كلمات بحث مختلفة أو تصفح الفئات
                </p>
              </div>
            )}

            {hasSearchResults && (
              <>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
                  {searchedProducts.map((product) => (
                    <Card key={product.id} {...product} />
                  ))}
                </div>

                {/* Pagination */}
                {renderPagination()}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Simple debounce implementation
function debounce(func, wait) {
  let timeout;
  const debounced = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}

export default Search;
