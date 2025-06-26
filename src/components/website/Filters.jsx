import { useState } from "react";
import {
  governorates,
  cities,
  allCategory,
  cards,
  sortOptions,
} from "../../data/filterData";
import scrollPostsIcon from "../../assets/images/Group 6.svg";
import Card from "./Card";
import TabFilter from "./TapFilter";
import IconFilter from "./IconFilter";
import SortDropdown from "./SortDropdown";

const Filters = () => {
  const [selectedGovernorate, setSelectedGovernor] = useState("الكل");
  const [selectedCity, setSelectedCity] = useState("الكل");
  const [selectedCategory, setSelectedCategory] = useState("سيارات");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="pr-[1rem] md:pr-[3.25rem] font-sans bg-[#F7F7FF] pt-[1.625rem] pb-[5rem]">
      {/* Governorate Filter */}
      <h1 className="font-normal text-[1.25rem] md:text-[1.75rem]">المحافظة</h1>
      <TabFilter
        items={governorates}
        selectedItem={selectedGovernorate}
        onSelect={setSelectedGovernor}
        className="overflow-x-auto scrollbar-hide"
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
      />

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
      <div className="w-full flex justify-start md:justify-evenly items-center gap-[2.25rem] pl-[1rem] md:pl-[3.187rem] flex-wrap">
        {cards.map((card, index) => (
          <Card {...card} key={index} />
        ))}
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
