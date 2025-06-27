import { useState } from "react";
import car from "../../../assets/images/car-offer.svg";
import heart from "../../../assets/images/heart.svg";
import personalImg from "../../../assets/images/personal.svg";
import start from "../../../assets/images/start.svg";
import leftArrow from "../../../assets/images/leftArrow.svg";
import rightArrow from "../../../assets/images/rightArrow.svg";
import { details, infoContact } from "../../../data/offerDetails";

const Main = () => {
  const [selectedImage, setSelectedImage] = useState("");
  return (
    <div className="font-sans bg-[#F7F7FF] overflow-hidden pb-4">
      <div className="container flex gap-8">
        {/* left section */}
        <div className=" flex flex-col items-center w-fit gap-8 mt-5">
          <div className="h-[55vh] w-[calc(60vh)] rounded-3xl relative">
            <img
              src={car}
              alt=""
              className="h-full w-full object-cover rounded-3xl"
            />
            <div
              style={{ transform: "translate(-50%)" }}
              className="absolute flex justify-between w-[92%] transform -translte-x-1/2 -translate-y-1/2 left-1/2 top-1/2 gap-30"
            >
              <button className="w-8 h-8 bg-[#F7F7FF] backdrop-filter-blur(17px) flex-center rounded-md">
                <img src={rightArrow} alt="" />
              </button>
              <button className="w-8 h-8 bg-[#F7F7FF] backdrop-filter-blur(17px) flex-center rounded-md">
               <img src={leftArrow} alt="" />
              </button>
            </div>
          </div>
          <div className="flex gap-[.1rem]">
            <img
              src={car}
              alt=""
              className="w-[90px] cursor-pointer rounded-[3px] border-2 border-[#6C63FF] shadow-[0px 4px 15.6px 8px rgba(63, 61, 86, 0.3)] "
            />
            <img
              src={car}
              alt=""
              className="w-[90px] cursor-pointer rounded-[3px] border-2 border-[#D9D9D9] h-[90px]"
            />
            <img
              src={car}
              alt=""
              className="w-[90px] cursor-pointer rounded-[3px] border-2 border-[#D9D9D9] h-[90px]"
            />
            <img
              src={car}
              alt=""
              className="w-[90px] cursor-pointer rounded-[3px] border-2 border-[#D9D9D9] h-[90px]"
            />
          </div>
        </div>
        {/* right section */}
        <div className=" w-[50vw]">
          <div className="flex-between">
            <h1 className="text-[2rem] text-[#3F3D56] font-bold">
              تويوتا كورولا 2015
            </h1>
            <img
              src={heart}
              className="backdrop-filter: blur(17px) rounded-[10px] pt-[2px] bg-[#6C63FF4D]"
            />
          </div>
          <p className="text-[1.2rem] text-[#918AFF] font-bold">
            450,000,000 <span className="text-[.9rem]">ل س</span>
          </p>
          <ul className="mt-3">
            {details.map((detail, index) => (
              <li
                key={index}
                className="flex gap-2 items-center mb-3 font-normal text-[#716D97]"
              >
                <img src={detail.img} alt="" />
                <span className="text-[1rem]">{detail.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#827FB2] text-[.9rem]">
            السيارة تحتوي على 5 مقاعد مريحة، ولوحتها خصوصي مسجلة في دمشق. تم فحص
            دهان السيارة بالكامل وهي مرخصة حتى نهاية عام 2025. الإطارات بحالة
            جيدة، وتأتي مع مفتاحين أصليين.{" "}
          </p>
          <hr className="text-[#D9D9D9] mt-3" />
          <div>
            <h3 className="text-[#3F3D56] text-[1.2rem] my-2 font-normal">
              معلومات الناشر
            </h3>
            <div className="flex-between bg-white p-2">
              <div>
                <img src={personalImg} alt="" />
              </div>
              <div>
                {infoContact.map((info, index) => (
                  <li key={index} className="flex items-center gap-2 mb-2">
                    <img src={info.img} alt="" />
                    <span className="font-normal text-[12px] text-[#716D97]">
                      {info.info}
                    </span>
                  </li>
                ))}
              </div>
              <div>
                <p className="flex items-center justify-end mb-4">
                  <img src={start} alt="" />
                  <span className="mr-1">4.8</span>
                </p>
                <button className="bg-primary p-2 text-white rounded-md">
                  عرض الملف الشخصي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
