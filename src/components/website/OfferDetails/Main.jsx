import { useState } from "react";
import heartDetails from "../../../assets/images/heartDeatails.svg";
import personalImg from "../../../assets/images/personal.svg";
import start from "../../../assets/images/start.svg";
import leftArrow from "../../../assets/images/leftArrow.svg";
import rightArrow from "../../../assets/images/rightArrow.svg";
import { carImages, details, infoContact } from "../../../data/offerDetails";
import Footer from "../../common/Footer";
import { Link } from "react-router";

const Main = () => {
  const [selectedImage, setSelectedImage] = useState(carImages[0]);
  const handelSelectImage = (img) => {
    setSelectedImage(img);
  };
  const previousImg = () => {
    const currentIndex = carImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const previousIndex =
      (currentIndex - 1 + carImages.length) % carImages.length;
    setSelectedImage(carImages[previousIndex]);
  };
  const nextImg = () => {
    const currentIndex = carImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    const previousIndex = (currentIndex + 1) % carImages.length;

    setSelectedImage(carImages[previousIndex]);
  };
  return (
    <div className="font-sans bg-[#F7F7FF] md:pt-2 overflow-x-hidden md:overflow-hidden h-[195vh]">
      <div className="container items-center md:items-start flex flex-col  md:flex-row  md:gap-8 lg:gap-11">
        {/* right section */}
        <div className=" flex flex-col items-center w-fit gap-6 md:mt-5">
          <div className="w-[100vw] h-[30vh] md:h-[53vh] md:w-[50vh] lg:w-[60vh] md:rounded-2xl relative">
            <img
              src={selectedImage.img}
              alt=""
              className="md:h-full h-full w-full object-cover md:rounded-2xl bg-[#F7F7FF]"
            />
            <div
              style={{ transform: "translate(-50%)" }}
              className="absolute flex justify-between w-[92%] transform -translte-x-1/2 -translate-y-1/2 left-1/2 top-1/2 gap-30"
            >
              <button
                className="w-8 h-8 bg-[#F7F7FF] backdrop-filter-blur(17px) flex-center rounded-md"
                onClick={previousImg}
              >
                <img src={rightArrow} alt="" />
              </button>
              <button
                className="w-8 h-8 bg-[#F7F7FF] backdrop-filter-blur(17px) flex-center rounded-md"
                onClick={nextImg}
              >
                <img src={leftArrow} alt="" />
              </button>
            </div>
          </div>
          <div className="hidden md:flex gap-[.1rem]">
            {carImages.map((img) => (
              <img
                src={img.img}
                alt=""
                className={`w-20 cursor-pointer rounded-[3px] border-2 ${
                  selectedImage.id === img.id
                    ? "border-[#6C63FF] shadow-[0px_4px_12px_6px_rgba(63,61,86,0.3)]"
                    : "border-[#D9D9D9]"
                } shadow-[0px_4px_15.6px_8px_rgba(63, 61, 86, 0.3)]`}
                key={img.id}
                onClick={() => handelSelectImage(img)}
              />
            ))}
          </div>
        </div>
        {/* left section */}
        <div className=" w-full md:w-[50vw] pt-4 md:pt-2 pb-1">
          <div className="flex-between md:inline">
            <div className="md:flex-between">
              <h1 className="text-nowrap text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem] text-[#3F3D56] font-bold">
                تويوتا كورولا 2015
              </h1>
              <img
                src={heartDetails}
                className="hidden md:inline w-8 h-8 lg:w-9 lg:h-9"
              />
            </div>
            <p className="text-[1rem] text-nowrap  lg:text-[1.1rem] text-[#918AFF] font-bold">
              450,000,000 <span className="text-[.9rem]">ل س</span>
            </p>
          </div>
          <ul className="my-2">
            {details.map((detail, index) => (
              <li
                key={index}
                className="flex gap-2  items-center mb-2 font-normal text-[#716D97]"
              >
                <img src={detail.img} alt="" />
                <span className="text-[1rem]">{detail.name}</span>
              </li>
            ))}
            <div className="md:hidden flex my-4">
              {carImages.map((img) => (
                <img
                  src={img.img}
                  alt=""
                  className={`w-20 cursor-pointer rounded-[3px] border-2 ${
                    selectedImage.id === img.id
                      ? "border-[#6C63FF] box-shadow-[0px 4px 15.6px 8px rgba(63, 61, 86, 0.3)]"
                      : "border-[#D9D9D9]"
                  } shadow-[0px 4px 15.6px 8px rgba(63, 61, 86, 0.3)] `}
                  key={img.id}
                  onClick={() => handelSelectImage(img)}
                />
              ))}
            </div>
          </ul>
          <p className="text-[#827FB2] text-[.9rem]">
            السيارة تحتوي على 5 مقاعد مريحة، ولوحتها خصوصي مسجلة في دمشق. تم فحص
            دهان السيارة بالكامل وهي مرخصة حتى نهاية عام 2025. الإطارات بحالة
            جيدة، وتأتي مع مفتاحين أصليين.{" "}
          </p>
          <hr className="text-[#D9D9D9] mt-3" />
          <div>
            <h3 className="text-[#3F3D56] text-[1.1rem] my-2 font-normal">
              معلومات الناشر
            </h3>
            <div className="flex-between bg-white p-4 rounded-lg">
              <div>
                <img
                  src={personalImg}
                  alt=""
                  className="w-16 h-16 lg:w-24 lg:h-24"
                />
              </div>
              <div>
                {infoContact.map((info, index) => (
                  <li key={index} className="flex items-center gap-2 mb-2">
                    <img src={info.img} alt="" />
                    <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
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
                <Link to='/profile' className="bg-primary p-2 text-white rounded-md font-bold text-[.75rem]">
                  عرض الملف الشخصي
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-[12px] font-normal text-[#7E7E7E] pt-5 pb-10">
            ابلاغ عن هذا الإعلان
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
