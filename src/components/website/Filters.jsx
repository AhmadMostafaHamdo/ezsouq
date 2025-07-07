import { useEffect, useState } from "react";
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

const Filters = () => {
  const dispatch = useDispatch();
  const [selectedGovernorate, setSelectedGovernor] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("سيارات");
  const [sortBy, setSortBy] = useState("newest");
  const { products, loading } = useSelector((state) => state.products);
  const { governorates } = useSelector((state) => state.governorates);
  const { cities } = useSelector((state) => state.cities);
  useEffect(() => {
    if (cities.length > 0) {
      setSelectedCity(cities[0]);
    }
  }, [cities]);

  useEffect(() => {
    dispatch(thunkGovernorates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(thunkCities(selectedGovernorate));
  }, [dispatch, selectedGovernorate]);

  useEffect(() => {
    dispatch(productThunk());
  }, [dispatch]);

  return (
    <div className="pr-4 md:pr-14 font-sans bg-[#F7F7FF] pt-6 pb-20">
      <h1 className="text-xl md:text-2xl font-normal">المحافظة</h1>
      <TabFilter
        items={governorates}
        selectedItem={selectedGovernorate}
        onSelect={setSelectedGovernor}
        className="overflow-x-auto scrollbar-hide"
        type="governorate"
      />

      <h1 className="text-xl md:text-2xl font-normal mt-8">المنطقة</h1>
      <TabFilter
        items={cities}
        selectedItem={selectedCity}
        onSelect={setSelectedCity}
        className="overflow-hidden"
        type="city"
      />

      <h1 className="text-xl md:text-2xl font-normal mt-8 mb-2">التصنيفات</h1>
      <IconFilter
        items={allCategory}
        selectedItem={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <SortDropdown
        options={sortOptions}
        selectedOption={sortBy}
        onSelect={setSortBy}
      />

      <div className="w-full flex flex-wrap gap-9 pl-4 md:pl-12 justify-start">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={`skeleton-${i}`} />
            ))
          : products.map((product, i) => <Card key={i} {...product} />)}
      </div>

      <div className="flex-center mt-8 text-base font-normal">
        <span>عرض المزيد</span>
        <img src={scrollPostsIcon} alt="عرض المزيد" />
      </div>
    </div>
  );
};

export default Filters;
