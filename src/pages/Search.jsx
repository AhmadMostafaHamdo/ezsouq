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
import { data, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { setCurrentPage } from "../store/search/searchSlice";
import { thunkGovernorates } from "../store/governorates/thunk/thunkGovernorates";
import { thunkCities } from "../store/cities/thunk/citiesThunk";

const Search = () => {
  const contactRef = useRef(null);
  const dispatch = useDispatch();

  const { governorates = [] } = useSelector((state) => state.governorates);
  const { cities = [], loadingCity } = useSelector((state) => state.cities);

  // البحث وفلترة
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(false);

  const [category, setCategory] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [city, setCity] = useState("");
  const [isNew, setIsNew] = useState(""); // "1" جديدة، "0" مستعملة
  const [realEstateType, setRealEstateType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // sort & order
  const [sortBy, setSortBy] = useState(""); // price / createdAt
  const [order, setOrder] = useState(""); // asec / desc

  const {
    data: searchedProducts = [],
    loading,
    currentPage,
    totalPages,
    totalItems,
  } = useSelector((state) => state.search);
  const debouncedSearch = useCallback(
    debounce((params) => {
      console.log(params );
      dispatch(searchThunk(params));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
    dispatch(thunkGovernorates());
  }, [dispatch]);

  // البحث التلقائي عند تغيير قيمة البحث
  useEffect(() => {
    if (searchValue.trim()) {
      dispatch(setCurrentPage(1));
      debouncedSearch({
        keyword: searchValue,
        page: 1,
        category,
        governorate,
        city,
        isnew: isNew,
        real_estate_type: realEstateType,
        minPrice,
        maxPrice,
        sortBy,
        order,
      });
    }
    return () => debouncedSearch.cancel();
  }, [
    searchValue,
    debouncedSearch,
    dispatch,
    category,
    governorate,
    city,
    isNew,
    realEstateType,
    minPrice,
    maxPrice,
    sortBy,
    order,
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
        dispatch(
          searchThunk({
            keyword: searchValue,
            page: nextPage,
            category,
            governorate,
            city,
            isnew: isNew,
            real_estate_type: realEstateType,
            minPrice,
            maxPrice,
            sortBy,
            order,
          })
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    dispatch,
    searchValue,
    category,
    governorate,
    city,
    isNew,
    realEstateType,
    minPrice,
    maxPrice,
    sortBy,
    order,
    currentPage,
    totalPages,
    loading,
  ]);

  useEffect(() => {
    if (governorate) {
      dispatch(thunkCities(governorate));
      setCity("");
    }
  }, [dispatch, governorate]);

  const handleInputChange = (e) => setSearchValue(e.target.value);
  const hasSearchResults =
    searchedProducts.length > 0 && searchValue.trim() !== "";
  const handelClick = () => setFilter(!filter);

  const handelSearchFilter = () => {
    setFilter(false);
    dispatch(setCurrentPage(1));
    dispatch(
      searchThunk({
        keyword: searchValue,
        page: 1,
        category,
        governorate,
        city,
        isnew: isNew,
        real_estate_type: realEstateType,
        minPrice,
        maxPrice,
        sortBy,
        order: desc,
      })
    );
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
              {/* النوع */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
              >
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
                {governorates.map((gover) => (
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
                {cities.map((cityName, i) => (
                  <option key={i} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
              {/* نوع العقار */}
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

              {/* الترتيب */}
              <select
                value={sortBy && order ? `${sortBy}_${order}` : ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "asec") {
                    setSortBy("price");
                    setOrder("asec");
                  } else if (value === "desc") {
                    setSortBy("price");
                    setOrder("desc");
                  } else if (value === "createdAt_asec") {
                    setSortBy("createdAt");
                    setOrder("asec");
                  } else if (value === "createdAt_desc") {
                    setSortBy("createdAt");
                    setOrder("desc");
                  } else {
                    setSortBy("");
                    setOrder("");
                  }
                }}
                className="outline-none mt-4 w-full p-2 bg-white rounded border border-[#B9B5FF]"
              >
                <option value="">ترتيب حسب</option>
                <option value="asec">السعر: من الأرخص للأغلى</option>
                <option value="desc">السعر: من الأغلى للأرخص</option>
                <option value="createdAt_asec">الأقدم</option>
                <option value="createdAt_desc">الأحدث</option>
              </select>

              {/* الأزرار */}
              <div className="flex-between mt-2">
                <button
                  className="flex-center rounded-xl py-[.4rem] px-5 border-[1px] text-[#B1ADFF] border-[#B1ADFF]"
                  onClick={() => {
                    setCategory("");
                    setGovernorate("");
                    setCity("");
                    setIsNew("");
                    setRealEstateType("");
                    setMinPrice("");
                    setMaxPrice("");
                    setSortBy("");
                    setOrder("");
                  }}
                >
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

      {/* عرض النتائج */}
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
