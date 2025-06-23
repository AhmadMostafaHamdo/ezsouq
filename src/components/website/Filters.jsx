import { useState } from "react";
import {
  governorates,
  cities,
  allCategory,
  cards,
} from "../../data/filterData";
import heart from "../../assets/images/heart.svg";
import scroollPosts from "../../assets/images/Group 6.svg";

const Filters = () => {
  const [selectedGovernorates, setSelectedGovernorates] = useState("الكل");
  const [selectedCity, setSelectedCity] = useState("الكل");
  const [selectedClassification, setSelectedClassification] =
    useState("سيارات");

  return (
    <div>
      <div className="pr-[3.25rem] font-sans bg-[#F7F7FF] pt-[1.625rem] pb-[5rem]">
        <h1 className="font-normal text-[1.75rem]">المحافظة</h1>
        <div className="flex font-normal text-[1.25rem] text-[#3F3D56] overflow-x-auto  scrollbar-hide">
          {governorates.map((governorate, index) => (
            <div
              key={index}
              className={`ml-[54px] whitespace-nowrap cursor-pointer b-0 py-2 px-1 relative ${
                selectedGovernorates === governorate ? "text-primary" : ""
              }`}
              onClick={() => setSelectedGovernorates(governorate)}
            >
              {governorate}
              {selectedGovernorates === governorate && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[3px] bg-primary"></div>
              )}
            </div>
          ))}
        </div>

        <h1 className="font-sans font-normal text-[1.75rem]  mt-[1.875rem]">
          المنطقة
        </h1>
        <div className="flex font-normal text-[1.25rem] text-[#3F3D56] overflow-hidden">
          {cities.map((city, index) => (
            <div
              key={index}
              className={`ml-[3.375rem] w-fit cursor-pointer b-0 py-2 px-1 relative ${
                selectedCity === city ? "text-primary" : ""
              }`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
              {selectedCity === city && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[3px] bg-primary"></div>
              )}
            </div>
          ))}
        </div>

        <h1 className="font-sans font-normal text-[1.75rem] mb-[.5rem] mt-[1.875rem]">
          التصنيفات
        </h1>
        <div className="flex items-center mr-[1.31rem] mt-[12px] w-[7.125rem]">
          {allCategory.map((category, index) => (
            <div
              key={index}
              className="ml-[4.93rem] relative cursor-pointer text-[#9c9cA8] "
              onClick={() => setSelectedClassification(category.title)}
            >
              <img
                src={category.img}
                className={`w-[3.62rem] h-[3.68rem] opacity-80 ${
                  selectedClassification === category.title
                    ? "opacity-100 scale-110"
                    : "opacity-60 "
                }`}
              />
              <span
                className={`font-normal text-[1.25rem] block ${
                  selectedClassification === category.title
                    ? "text-primary mt-[8px]"
                    : ""
                }`}
              >
                {category.title}
                {selectedClassification === category.title && (
                  <div className="absolute w-1/2 h-[3px] bottom-[-3px] left-1/2  transform -translate-x-1/2 bg-primary"></div>
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="flex-between mt-[1.875rem] font-normal text-[#A3A0DD]  text-[1rem] mb-[1.5rem]   mr-[17px] w-[90vw]">
          <p>فرز النتائج حسب:</p>
          <select className="outline-none cursor-pointer bg-[#F7F7FF]">
            <option value="">الأحدث</option>
            <option value="">الأحدث</option>
            <option value="">الأحدث</option>
          </select>
        </div>
        <div className="w-full flex justify-evenly items-center gap-[2.25rem] pl-[3.187rem] flex-wrap">
          {cards.map((card, index) => (
            <div
              key={index}
              className="p-[.625rem] [3.81rem] [.75rem] [1.375rem] md:w-[80vw] lg:w-[42vw] shadow-card bg-white rounded-[8px]"
            >
              <div className="flex-between">
                <div className="flex items-center">
                  <div className="text-[.75rem] font-normal ml-[5px] text-[#A3A0DD] text-nowrap w-[10.81rem]">
                    <div className="flex-between mb-[.5rem]">
                      <p>{card.publishedDate}</p>
                      <p>بواسطة {card.publisher}</p>
                    </div>
                    <img
                      src={card.img}
                      alt=""
                      className="w-[9.75rem] h-[9.75rem] object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[1.5rem] text-[#3F3D56] font-normal">
                      {card.title}
                    </p>
                    <div className="font-normal text-[#A3A0DD] text-[1rem]">
                      <p>
                        {card.governorate}-{card.city}
                      </p>
                      <p>{card.type}</p>
                    </div>
                    <p className="font-bold text-[1.25rem] text-[#3F3D56] mt-[1.187rem]">
                      {card.price}
                    </p>
                  </div>
                </div>
                <div className="self-start">
                  <img
                    src={heart}
                    alt=""
                    className=" w-[1.875rem] h-[1.56rem] flex-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-center font-normal text-[1rem] mt-[2rem]">
          <span>عرض المزيد</span>
          <img src={scroollPosts} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
