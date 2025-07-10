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
    sortBy: "newest",
    page: 1,
    limit: 10,
  });

  const {
    products = [],
    loading,
    totalPages = 1,
  } = useSelector((state) => state.products);
  const { governorates = [] } = useSelector((state) => state.governorates); // ["دمشق", "حلب"]
  const { cities = [] } = useSelector((state) => state.cities); // ["المزة", "المالكي"]

  /* جلب المنتجات */
  const fetchProducts = useCallback(() => {
    dispatch(productThunk(filters));
  }, [dispatch, filters]);

  const debouncedFetch = useCallback(debounce(fetchProducts, 500), [
    fetchProducts,
  ]);

  /* تحميل المحافظات عند أول تحميل */
  useEffect(() => {
    dispatch(thunkGovernorates());
  }, [dispatch]);

  /* تحميل المدن عند تغيير المحافظة */
  useEffect(() => {
    if (filters.governorate) {
      setFilters((prev) => ({ ...prev, city: "" }));
      dispatch(thunkCities(filters.governorate));
    } else {
      setFilters((prev) => ({ ...prev, city: "" }));
    }
  }, [dispatch, filters.governorate]);

  /* اختيار أول مدينة عند وصول المدن */
  useEffect(() => {
    if (filters.governorate && cities.length > 0 && !filters.city) {
      setFilters((prev) => ({
        ...prev,
        city: cities[0], // لأن المدن عبارة عن أسماء نصية
      }));
    }
  }, [cities, filters.governorate]);

  /* جلب المنتجات عند تغيير الفلاتر */
  useEffect(() => {
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [debouncedFetch, filters]);

  /* تغيير الفلاتر */
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
    <div className="pr-4 md:pr-14 font-sans bg-[#F7F7FF] pt-6 pb-20">
      {/* المحافظة */}
      <h1 className="text-xl md:text-2xl font-normal">المحافظة</h1>
      <TabFilter
        items={governorates}
        selectedItem={filters.governorate}
        onSelect={(gov) => handleFilterChange("governorate", gov)}
        className="overflow-x-auto scrollbar-hide"
        type="governorate"
      />

      {/* المدينة */}
      <h1 className="text-xl md:text-2xl font-normal mt-8">المنطقة</h1>
      <TabFilter
        key={filters.governorate} // يساعد على إعادة ضبط تبويب المدن عند تغيير المحافظة
        items={cities}
        selectedItem={filters.city}
        onSelect={(city) => handleFilterChange("city", city)}
        className="overflow-x-auto"
        type="city"
      />

      {/* التصنيفات */}
      <h1 className="text-xl md:text-2xl font-normal mt-8 mb-2">التصنيفات</h1>
      <IconFilter
        items={allCategory}
        selectedItem={filters.category}
        onSelect={(cat) => handleFilterChange("category", cat)}
      />

      {/* الترتيب */}
      <div className="flex justify-between items-center mt-6 mb-4 w-[86vw]">
        <SortDropdown
          options={sortOptions}
          selectedOption={filters.sortBy}
          onSelect={(sort) => handleFilterChange("sortBy", sort)}
        />
      </div>

      {/* عرض المنتجات */}
      <div className="w-full flex flex-wrap gap-9 pl-4 md:pl-12 justify-start">
        {loading && filters.page === 1 ? (
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        ) : (
          <>
            {products.map((product) => (
              <Card key={product.id} {...product} />
            ))}
            {loading &&
              filters.page > 1 &&
              Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
          </>
        )}
      </div>

      {/* زر تحميل المزيد */}
      {products.length > 0 && filters.page < totalPages && (
        <div
          className="flex-center mt-8 text-base font-normal cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
          onClick={loadMore}
        >
          <span>عرض المزيد</span>
          <img src={scrollPostsIcon} alt="عرض المزيد" className="ml-2" />
        </div>
      )}

      {/* لا نتائج */}
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
