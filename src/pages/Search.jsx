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
import { thunkGovernorates } from "../store/governorates/thunk/thunkGovernorates";
import { thunkCities } from "../store/cities/thunk/citiesThunk";

const Search = () => {
  const contactRef = useRef(null);
  const dispatch = useDispatch();

  const { governorates = [] } = useSelector((state) => state.governorates);
  const { cities = [], loadingCity } = useSelector((state) => state.cities);

  const [searchValue, setSearchValue] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [filter, setFilter] = useState(false);

  const {
    data: searchedProducts = [],
    loading,
    currentPage,
    totalPages,
    totalItems,
  } = useSelector((state) => state.search);

  // Debounced search
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
    dispatch(thunkGovernorates()); // تحميل المحافظات عند الفتح
  }, [dispatch]);

  // Reset & search when searchValue changes
  useEffect(() => {
    if (searchValue.trim()) {
      dispatch(setCurrentPage(1));
      debouncedSearch(searchValue, 1);
    }
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch, dispatch]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        currentPage < totalPages
      ) {
        dispatch(setCurrentPage(currentPage + 1));
        debouncedSearch(searchValue, currentPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    dispatch,
    searchValue,
    currentPage,
    totalPages,
    loading,
    debouncedSearch,
  ]);

  // عند تغيير المحافظة → استدعاء المدن
  useEffect(() => {
    if (governorate) {
      dispatch(thunkCities(governorate));
      setCity(""); // إعادة تعيين المدينة
    }
  }, [dispatch, governorate]);

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

  return (
    <div className="bg-[#F7F7FF]" ref={contactRef}>
      <ToastContainer />
      {filter && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#23193E]/[.57] backdrop-blur-[20] z-10">
          <div className="p-4 w-80 h-fit bg-white left-0 top-[3rem] absolute rounded-tr-[25px] rounded-br-[25px]">
            <div className="flex-between">
              <p>فلترة حسب:</p>
              <Link to="/search" onClick={handelClick}>
                <img src={closeIcon} alt="" />
              </Link>
            </div>
            <div>
              {/* نوع */}
              <select className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]">
                <option value="">النوع</option>
                <option value="عقارات">عقارات</option>
                <option value="موبايلات">موبايلات</option>
                <option value="سيارات">سيارات</option>
              </select>

              {/* المحافظات */}
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
              >
                <option value="">اختر المحافظة</option>
                {Array.isArray(governorates) &&
                  governorates.length > 0 &&
                  governorates.map((gover) => (
                    <option key={gover._id} value={gover.name}>
                      {gover.name}
                    </option>
                  ))}
              </select>

              {/* المدن */}
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
                disabled={!governorate || loadingCity}
              >
                <option value="">اختر المدينة</option>
                {Array.isArray(cities) &&
                  cities.length > 0 &&
                  cities.map((cityName, i) => (
                    <option key={i} value={cityName}>
                      {cityName}
                    </option>
                  ))}
              </select>

              {/* حالة المنتج */}
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

              {/* الوقت */}
              <select className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]">
                <option value="">الوقت</option>
                <option value="اليوم">اليوم</option>
                <option value="هذا الاسبوع">هذا الأسبوع</option>
                <option value="هذا الشهر">هذا الشهر</option>
              </select>

              {/* زرار */}
              <div className="flex-between mt-2">
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

      {/* البحث */}
      <div className="container pt-20">
        <div className="flex items-center gap-4 md:gap-10 flex-col md:flex-row">
          <div className="flex items-center md:w-auto">
            <h1 className="font-normal text-[#2F2E41] text-xl md:text-[1.5rem] leading-9 mb-3 ml-4 md:mb-0">
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

        {loading && currentPage === 1 ? (
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
                    <Card key={product._id} {...product} />
                  ))}
                </div>

                {/* Infinite scroll loader */}
                {loading && currentPage > 1 && (
                  <div className="flex justify-center py-6">
                    <Spinner />
                  </div>
                )}
                {currentPage >= totalPages && searchedProducts.length > 0 && (
                  <p className="text-center text-gray-500 my-6">
                    انتهت النتائج ({totalItems} نتيجة)
                  </p>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Simple debounce
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
