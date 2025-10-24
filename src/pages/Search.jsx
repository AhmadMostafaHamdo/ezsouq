import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Images
import filterImg from "../assets/images/filter.svg";
import closeIcon from "../assets/images/close.svg";
import corrected from "../assets/images/corrected.svg";
import searchFilter from "../assets/images/searchFilter.svg";
import emptySearch from "../assets/images/emptySearch.svg";

// Components & Thunks
import { searchThunk } from "../store/search/thunk/serachThunk";
import { setCurrentPage } from "../store/search/searchSlice";
import { thunkGovernorates } from "../store/governorates/thunk/thunkGovernorates";
import { thunkCities } from "../store/cities/thunk/citiesThunk";
import Card from "../components/website/Card";
import Spinner from "../feedback/loading/Spinner";

const Search = () => {
  const contactRef = useRef(null);
  const dispatch = useDispatch();

  // Redux states
  const { governorates = [] } = useSelector((state) => state.governorates);
  const { cities = [], loadingCity } = useSelector((state) => state.cities);
  const {
    data: searchedProducts = [],
    loading,
    currentPage,
    totalPages,
    totalItems,
  } = useSelector((state) => state.search);

  // Local states
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(false);
  const [category, setCategory] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [isNew, setIsNew] = useState(""); // "true" or "false"
  const [realEstateType, setRealEstateType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((params) => dispatch(searchThunk(params)), 500),
    [dispatch]
  );

  // Load governorates on mount
  useEffect(() => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
    dispatch(thunkGovernorates());
  }, [dispatch]);

  // Fetch cities when governorate changes
  useEffect(() => {
    if (governorate) {
      dispatch(thunkCities(governorate));
      setCity("");
    }
  }, [dispatch, governorate]);

  // Auto search whenever filters change
  useEffect(() => {
    if (searchValue.trim()) {
      dispatch(setCurrentPage(1));
      const params = buildSearchParams();
      debouncedSearch(params);
    }
    return () => debouncedSearch.cancel();
  }, [
    searchValue,
    category,
    governorate,
    city,
    isNew,
    realEstateType,
    minPrice,
    maxPrice,
    sortOption,
    debouncedSearch,
    dispatch,
  ]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        currentPage < totalPages
      ) {
        const nextPage = currentPage + 1;
        dispatch(setCurrentPage(nextPage));
        dispatch(searchThunk({ ...buildSearchParams(), page: nextPage }));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, currentPage, totalPages, loading]);

  // Build params for search
  const buildSearchParams = () => {
    const params = {
      keyword: searchValue,
      page: 1,
      limit: 20,
      category,
      governorate,
      city,
      real_estate_type: realEstateType,
      minPrice,
      maxPrice,
    };
    if (isNew) params.isnew = isNew;
    if (sortOption) params.sort = sortOption;
    return params;
  };

  const handleInputChange = (e) => setSearchValue(e.target.value);
  const handleFilterToggle = () => setFilter(!filter);

  const handleSearchFilter = () => {
    setFilter(false);
    dispatch(setCurrentPage(1));
    dispatch(searchThunk(buildSearchParams()));
  };

  const hasSearchResults =
    searchedProducts.length > 0 && searchValue.trim() !== "";

  return (
    <div className="bg-[#F7F7FF]" ref={contactRef}>
      <ToastContainer />

      {/* ===== Filter Sidebar ===== */}
      {filter && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#23193E]/[.57] backdrop-blur-[20] z-10">
          <div className="p-4 w-80 bg-white absolute top-[3rem] left-0 rounded-tr-[25px] rounded-br-[25px] shadow-lg">
            <div className="flex-between">
              <p>فلترة حسب:</p>
              <Link to="#" onClick={handleFilterToggle}>
                <img
                  src={closeIcon}
                  alt="إغلاق نافذة الفلترة"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            <div>
              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
              >
                <option value="">النوع</option>
                <option value="عقارات">عقارات</option>
                <option value="تقنيات">تقنيات</option>
                <option value="سيارات">سيارات</option>
              </select>

              {/* Governorates */}
              <select
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
              >
                <option value="">اختر المحافظة</option>
                {governorates.map((gover) => (
                  <option key={gover._id} value={gover.name}>
                    {gover.name}
                  </option>
                ))}
              </select>

              {/* Cities */}
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
                disabled={!governorate || loadingCity}
              >
                <option value="">اختر المدينة</option>
                {cities.map((cityName, i) => (
                  <option key={i} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>

              {/* Real Estate Type */}
              {category === "عقارات" && (
                <select
                  value={realEstateType}
                  onChange={(e) => setRealEstateType(e.target.value)}
                  className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
                >
                  <option value="">نوع العقار</option>
                  <option value="شقة">شقة</option>
                  <option value="بيت">بيت</option>
                  <option value="أرض">أرض</option>
                </select>
              )}

              {/* Condition (isnew) */}
              <select
                value={isNew}
                onChange={(e) => setIsNew(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
              >
                <option value="">الحالة</option>
                <option value="true">جديد</option>
                <option value="false">مستعمل</option>
              </select>

              {/* Price Filter */}
              <div className="flex gap-2 mt-4">
                <input
                  type="number"
                  value={minPrice}
                  placeholder="سعر أدنى"
                  className="outline-none w-1/2 p-2 bg-white rounded border border-[#B9B5FF]"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  value={maxPrice}
                  placeholder="سعر أقصى"
                  className="outline-none w-1/2 p-2 bg-white rounded border border-[#B9B5FF]"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              {/* Sort options */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
              >
                <option value="">الأحدث</option>
                <option value="priceAsc">السعر: من الأرخص للأغلى</option>
                <option value="priceDesc">السعر: من الأغلى للأرخص</option>
                <option value="oldest">الأقدم</option>
              </select>

              {/* Action Buttons */}
              <div className="flex-between mt-3">
                <button
                  className="flex-center rounded-xl py-[.4rem] px-5 border-[1px] text-[#B1ADFF] border-[#B1ADFF] hover:bg-[#B1ADFF] hover:text-white transition-colors"
                  onClick={() => {
                    setCategory("");
                    setGovernorate("");
                    setCity("");
                    setIsNew("");
                    setRealEstateType("");
                    setMinPrice("");
                    setMaxPrice("");
                    setSortOption("");
                  }}
                >
                  إعادة تعيين
                </button>

                <button
                  onClick={handleSearchFilter}
                  className="flex-center gap-1 bg-[#9B95FF] text-white rounded-xl py-[.4rem] px-5 hover:bg-[#7E78FF] transition-colors"
                >
                  تطبيق
                  <img src={corrected} alt="تطبيق الفلترة" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Search Results ===== */}
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
                className="inline w-full md:w-[35vw] p-2 bg-[#D7D5FF] border-none rounded-md outline-none placeholder:text-white focus:ring-2 focus:ring-[#9B99FF]"
                placeholder="بحث ..."
                onChange={handleInputChange}
                aria-label="حقل البحث"
              />
              <img
                src={filterImg}
                alt="رمز الفلترة"
                className="ml-2 md:ml-4 w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleFilterToggle}
              />
            </div>
          </div>
        </div>

        {!searchValue && searchedProducts.length === 0 && (
          <div>
            <p className="text-[#6C63FF] my-2">
              اكتب اسم منتج، خدمة، أو تصفح حسب الفئة
            </p>
            <img
              src={emptySearch}
              alt="الصورة الأساسية للبحث"
              className="m-auto w-44 mt-6"
            />
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

// Debounce helper
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
