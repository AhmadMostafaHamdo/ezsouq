import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCategory, sortOptions } from "../../data/filterData";
import scrollPostsIcon from "../../assets/images/Group 6.svg";
import Card from "./Card";
import TabFilter from "./TapFilter";
import IconFilter from "./IconFilter";
import SortDropdown from "./SortDropdown";
import CardSkeleton from "../../assets/sketlon/product";
import { productThunk } from "../../store/product/thunk/productThunk";
import { thunkGovernorates } from "../../store/governorates/thunk/thunkGovernorates";
import { thunkCities } from "../../store/cities/thunk/citiesThunk";
import debounce from "lodash/debounce";

const Filters = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    governorate: "",
    city: "",
    category: "سيارات",
    sortBy: "",
    order: "",
    page: 1,
    limit: 6,
  });

  const {
    products = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.products);
  const { governorates = [] } = useSelector((state) => state.governorates);
  const { cities = [], loadingCity } = useSelector((state) => state.cities);

  /* Fetch products with debounce */
  useEffect(() => {
    const debouncedFetch = debounce(() => {
      dispatch(productThunk(filters));
    }, 500);

    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [dispatch, filters]);

  /* Load governorates on mount */
  useEffect(() => {
    const loadGovernorates = async () => {
      try {
        await dispatch(thunkGovernorates());
      } catch (error) {
        console.error("Failed to load governorates:", error);
        // TODO: Add error handling UI
      }
    };
    loadGovernorates();
  }, [dispatch]);

  /* Load cities when governorate changes */
  useEffect(() => {
    const loadCities = async () => {
      if (filters.governorate) {
        try {
          setFilters((prev) => ({ ...prev, city: "" }));
          await dispatch(thunkCities(filters.governorate));
        } catch (error) {
          console.error("Failed to load cities:", error);
          // TODO: Add error handling UI
        }
      } else {
        setFilters((prev) => ({ ...prev, city: "" }));
      }
    };
    loadCities();
  }, [dispatch, filters.governorate]);

  /* Select first city when cities load */
  useEffect(() => {
    if (filters.governorate && cities.length > 0 && !filters.city) {
      setFilters((prev) => ({
        ...prev,
        city: cities[0],
      }));
    }
  }, [cities, filters.governorate, filters.city]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: name === "page" ? value : 1,
    }));
  };

  const loadMore = () => {
    if (filters.page < totalPages) {
      handleFilterChange("page", filters.page + 1);
    }
  };

  return (
    <div className="pr-4 md:pr-14 bg-[#F7F7FF] pt-6 pb-20">
      {/* Governorate Filter */}
      <h1 className="text-xl md:text-2xl font-normal">المحافظة</h1>
      <TabFilter
        items={governorates}
        selectedItem={filters.governorate}
        onSelect={(gov) => handleFilterChange("governorate", gov)}
        className="overflow-x-auto scrollbar-hide"
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
        className="overflow-x-auto"
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
            <CardSkeleton key={`skeleton-${i}`} />
          ))
        ) : (
          <>
            {products.map((product) => (
              <Card key={product._id} {...product} />
            ))}
            {loading &&
              filters.page > 1 &&
              Array.from({ length: 4 }).map((_, i) => (
                <CardSkeleton key={`pagination-skeleton-${i}`} />
              ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {products.length > 0 && filters.page < totalPages && (
        <button
          className="flex-center mt-8 mx-auto text-base font-normal cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
          onClick={loadMore}
          aria-label="Load more products"
        >
          <span>عرض المزيد</span>
          <img
            src={scrollPostsIcon}
            alt="Load more icon"
            className="ml-2"
            aria-hidden="true"
          />
        </button>
      )}

      {/* No Results Message */}
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
