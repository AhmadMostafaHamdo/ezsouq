import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { allCategory, sortOptions } from "../../data/filterData";
import scrollPostsIcon from "../../assets/images/Group 6.svg";
import Card from "./Card";
import TabFilter from "./TapFilter";
import IconFilter from "./IconFilter";
import SortDropdown from "./SortDropdown";
import CardSkeleton from "../../assets/sketlon/product";
import CitiesSketlon from "../../assets/sketlon/CitiesSketlon";
import { productThunk } from "../../store/product/thunk/productThunk";
import { thunkGovernorates } from "../../store/governorates/thunk/thunkGovernorates";
import { thunkCities } from "../../store/cities/thunk/citiesThunk";
import debounce from "lodash/debounce";
import { setFilter } from "../../store/filter/filterSlice";

const Filters = () => {
  const dispatch = useDispatch();

  const filters = useSelector((state) => state.filters);
  const {
    products = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.products);

  const { governorates = [] } = useSelector((state) => state.governorates);
  const { cities = [], loadingCity } = useSelector((state) => state.cities);

  const observerRef = useRef(null);

  // Fetch products whenever filters change (with debounce)
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      dispatch(productThunk(filters));
    }, 500);
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [dispatch, filters]);

  // Fetch all governorates on mount
  useEffect(() => {
    dispatch(thunkGovernorates());
  }, [dispatch]);

  // Select the first governorate automatically after loading
  useEffect(() => {
    if (governorates.length > 0 && !filters.governorate) {
      dispatch(setFilter({ governorate: governorates[0].name }));
    }
  }, [governorates, filters.governorate, dispatch]);

  // Fetch cities when governorate changes
  useEffect(() => {
    if (filters.governorate) {
      dispatch(thunkCities(filters.governorate));
    } else {
      dispatch(setFilter({ city: "" }));
    }
  }, [dispatch, filters.governorate]);

  // Automatically select the first city after cities load or when governorate changes
  useEffect(() => {
    if (filters.governorate && cities.length > 0) {
      if (!filters.city || !cities.includes(filters.city)) {
        dispatch(setFilter({ city: cities[0] }));
      }
    }
  }, [dispatch, cities, filters.governorate, filters.city]);

  // Handle filter updates
  const handleFilterChange = useCallback(
    (name, value) => {
      dispatch(
        setFilter({
          [name]: value,
          page: name === "page" ? value : 1,
        })
      );
    },
    [dispatch]
  );

  // Infinite scroll: load more items
  const loadMore = useCallback(() => {
    if (filters.page < totalPages && !loading) {
      handleFilterChange("page", filters.page + 1);
    }
  }, [filters.page, totalPages, loading, handleFilterChange]);

  // Observe scroll for infinite loading
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );

    const target = document.querySelector("#loadMoreTrigger");
    if (target) observer.observe(target);

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="pr-4 md:pr-14 bg-[#F7F7FF] pt-6 pb-20">
      {/* Governorate Filter */}
      <h1 className="text-xl md:text-2xl font-normal">المحافظة</h1>
      <TabFilter
        items={governorates}
        selectedItem={filters.governorate}
        onSelect={(gov) => handleFilterChange("governorate", gov)}
        className="scrollbar-hide"
        type="governorate"
      />

      {/* City Filter */}
      <h1 className="text-xl md:text-2xl font-normal mt-8">المنطقة</h1>
      <TabFilter
        key={filters.governorate}
        items={cities}
        loading={loadingCity}
        selectedItem={filters.city}
        onSelect={(city) => handleFilterChange("city", city)}
        type="city"
      />

      {/* Category Filter */}
      <h1 className="text-xl md:text-2xl font-normal mt-8 mb-2">التصنيفات</h1>
      <IconFilter
        items={allCategory}
        selectedItem={filters.category}
        onSelect={(cat) => handleFilterChange("category", cat)}
      />

      {/* Sort Dropdown */}
      <div className="flex justify-between items-center mt-6 mb-4 w-[86vw]">
        <SortDropdown
          options={sortOptions}
          selectedOption={filters.sortBy}
          onSelect={(sort) => {
            const selectedOption = sortOptions.find(
              (opt) => opt.value === sort
            );
            handleFilterChange("sortBy", selectedOption.value);
            handleFilterChange("order", selectedOption.order);
          }}
        />
      </div>

      {/* Products Grid */}
      <div className="w-full flex flex-wrap gap-9 pl-4 md:pl-12 justify-start">
        {loading && filters.page === 1 ? (
          Array.from({ length: filters.limit }).map((_, i) => (
            <motion.div
              key={`skeleton-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
              <CardSkeleton />
            </motion.div>
          ))
        ) : (
          <>
            {products.length > 0 &&
              Array.isArray(products) &&
              products.map((product, i) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Card {...product} />
                </motion.div>
              ))}

            {loading &&
              filters.page > 1 &&
              Array.from({ length: filters.limit || 4 }).map((_, i) => (
                <motion.div
                  key={`pagination-skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
                  <CardSkeleton />
                </motion.div>
              ))}
          </>
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      {filters.page < totalPages && (
        <div
          id="loadMoreTrigger"
          className="h-10 mt-6 flex justify-center items-center text-gray-400"
        >
          <img
            src={scrollPostsIcon}
            alt="Loading more"
            className="w-6 h-6 animate-bounce"
          />
        </div>
      )}

      {/* No Results */}
      {!loading && products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500">
            لا توجد منتجات تطابق معايير البحث
          </p>
        </div>
      )}
    </div>
  );
};

export default Filters;
