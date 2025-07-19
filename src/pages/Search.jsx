import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import filter from "../assets/images/filter.svg";
import searchFilter from "../assets/images/searchFilter.svg";
import { searchThunk } from "../store/search/thunk/serachThunk";
import Card from "../components/website/Card";
import Spinner from "../feedback/loading/Spinner";

const Search = () => {
  const contactRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const { searchedProducts = [], loading } = useSelector(
    (state) => state.search
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim()) {
        dispatch(searchThunk(value));
      }
    }, 500),
    [dispatch]
  );

  // Scroll to top on mount
  useEffect(() => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Trigger search when searchValue changes
  useEffect(() => {
    debouncedSearch(searchValue);
    return () => debouncedSearch.cancel();
  }, [searchValue, debouncedSearch]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const hasSearchResults = searchedProducts.length > 0;

  return (
    <div className="bg-[#F7F7FF]" ref={contactRef}>
      <div className="container pt-20">
        <div className="flex items-center gap-4 md:gap-10 flex-col md:flex-row">
          <div className="flex items-center w-full md:w-auto">
            <h1 className="font-normal text-[#2F2E41] text-xl md:text-[1.5rem] leading-9 mb-3 md:mb-0">
              البحث والفلترة
            </h1>
          </div>

          <input
            type="text"
            value={searchValue}
            className="w-full md:w-[35vw] p-2 bg-[#D7D5FF] rounded-md outline-none border-none placeholder:text-white focus:ring-2 focus:ring-[#9B99FF]"
            placeholder="بحث ..."
            onChange={handleInputChange}
            aria-label="Search input"
          />
          <img
            src={filter}
            alt="Filter icon"
            className="ml-2 md:ml-4 w-6 h-6"
          />
        </div>

        {loading ? (
          <div className="flex-center mt-40">
            <Spinner />
          </div>
        ) : (
          <>
            {!hasSearchResults && (
              <div className="text-center mt-8">
                <p className="text-primary font-normal text-base md:text-[1rem] my-4">
                  اكتب اسم منتج، خدمة، أو تصفح حسب الفئة
                </p>
                <img
                  src={searchFilter}
                  alt="Search illustration"
                  className="mx-auto w-44 mt-5"
                />
              </div>
            )}

            {hasSearchResults && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-10">
                {searchedProducts.map((product) => (
                  <Card key={product.id} {...product} />
                ))}
              </div>
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
