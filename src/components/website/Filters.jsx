import { useEffect, useState } from "react";
import { allCategory, sortOptions } from "../../data/filterData";
import scrollPostsIcon from "../../assets/images/Group 6.svg";
import Card from "./Card";
import TabFilter from "./TapFilter";
import IconFilter from "./IconFilter";
import SortDropdown from "./SortDropdown";
import { useDispatch, useSelector } from "react-redux";
import { productThunk } from "../../store/product/thunk/productThunk";
import { thunkGovernorates } from "../../store/governorates/thunk/thunkGovernorates";
import CardSkeleton from "../../assets/sketlon/product";
import { thunkCities } from "../../store/cities/thunk/citiesThunk";

const Filters = () => {
  const [selectedGovernorate, setSelectedGovernor] = useState("اللاذقية");
  const [selectedCity, setSelectedCity] = useState("الكل");
  const [selectedCategory, setSelectedCategory] = useState("سيارات");
  const [sortBy, setSortBy] = useState("newest");
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(productThunk());
  }, [dispatch]);
  const { governorates } = useSelector((state) => state.governorates);
  const { cities } = useSelector((state) => state.cities);
  useEffect(() => {
    dispatch(thunkGovernorates());
  }, [dispatch]);
  useEffect(() => {
    dispatch(thunkCities(selectedGovernorate));
  }, [dispatch, selectedGovernorate]);
  return (
    <div className="pr-[1rem] md:pr-[3.25rem] font-sans bg-[#F7F7FF] pt-[1.625rem] pb-[5rem]">
      {/* Governorate Filter */}
      <h1 className="font-normal text-[1.25rem] md:text-[1.75rem]">المحافظة</h1>
      <TabFilter
        items={governorates}
        selectedItem={selectedGovernorate}
        onSelect={setSelectedGovernor}
        className="overflow-x-auto scrollbar-hide"
        type={"governorate"}
      />

      {/* City Filter */}
      <h1 className="font-normal text-[1.25rem] md:text-[1.75rem] mt-[1.875rem]">
        المنطقة
      </h1>
      <TabFilter
        items={cities}
        selectedItem={selectedCity}
        onSelect={setSelectedCity}
        className="overflow-hidden"
        type={"city"}      />
      {/* Category Filter */}
      <h1 className="font-normal text-[1.25rem] md:text-[1.75rem] mb-[.5rem] mt-[1.875rem]">
        التصنيفات
      </h1>
      <IconFilter
        items={allCategory}
        selectedItem={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Sort Options */}
      <SortDropdown
        options={sortOptions}
        selectedOption={sortBy}
        onSelect={setSortBy}
      />

      {/* Cards Grid */}
      <div className="w-full flex justify-start md:justify-start  gap-[2.25rem] pl-[1rem] md:pl-[3.187rem] flex-wrap">
        {products.map((product, index) =>
          loading ? (
            Array.from({ length: products.length }).map((_, index) => (
              <div key={index}>
                <CardSkeleton />
              </div>
            ))
          ) : (
            <Card {...product} key={index} />
          )
        )}
      </div>

      {/* Show More */}
      <div className="flex-center font-normal text-[1rem] mt-[2rem]">
        <span>عرض المزيد</span>
        <img src={scrollPostsIcon} alt="Show more icon" />
      </div>
    </div>
  );
};

export default Filters;
