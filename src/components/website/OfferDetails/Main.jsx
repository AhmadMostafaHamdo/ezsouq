import { useEffect, useState } from "react";
import heartDetails from "../../../assets/images/heartDeatails.svg";
import personalImg from "../../../assets/images/personal.svg";
import start from "../../../assets/images/start.svg";
import leftArrow from "../../../assets/images/leftArrow.svg";
import rightArrow from "../../../assets/images/rightArrow.svg";
import { email } from "../../../data/offerDetails";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productThunkById } from "../../../store/product/thunk/productThunkById";
import car from "../../../assets/images/carIconDetails.svg";
import location from "../../../assets/images/locationIcondDetails.svg";
import time from "../../../assets/images/timeIconDetails.svg";
import TimeAgo from "../../TimeAgo";
const Main = () => {
  const { product } = useSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productThunkById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.main_photos?.length) {
      setSelectedImage(product.main_photos[0]);
    }
  }, [product]);

  const handelSelectImage = (img) => {
    setSelectedImage(img);
  };

  const previousImg = () => {
    const currentIndex = product?.main_photos?.indexOf(selectedImage);
    if (currentIndex === -1) return;

    const previousIndex =
      (currentIndex - 1 + product.main_photos.length) %
      product.main_photos.length;
    setSelectedImage(product.main_photos[previousIndex]);
  };

  const nextImg = () => {
    const currentIndex = product?.main_photos?.indexOf(selectedImage);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % product.main_photos.length;
    setSelectedImage(product.main_photos[nextIndex]);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="font-sans bg-[#F7F7FF] md:pt-2 overflow-x-hidden h-fit">
      <div className="container items-center md:items-start flex flex-col md:flex-row md:gap-8 lg:gap-11 pt-[5rem]">
        {/* Image Gallery Section */}
        <div className="flex flex-col items-center w-fit gap-6 md:mt-5">
          <div className="w-[100vw] h-[30vh] md:h-[53vh] md:w-[50vh] lg:w-[60vh] md:rounded-2xl relative">
            {selectedImage && (
              <img
                src={`https://ezsouq.store/uploads/images/${selectedImage}`}
                alt="Main product"
                className="md:h-full h-full w-full object-contain md:rounded-2xl bg-[#F7F7FF]"
              />
            )}
            {product.main_photos.length > 1 && (
              <div className="absolute flex justify-between w-[92%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button
                  className="w-8 h-8 bg-[#F7F7FF] backdrop-blur flex items-center justify-center rounded-md"
                  onClick={previousImg}
                >
                  <img src={rightArrow} alt="Previous" />
                </button>
                <button
                  className="w-8 h-8 bg-[#F7F7FF] backdrop-blur flex items-center justify-center rounded-md"
                  onClick={nextImg}
                >
                  <img src={leftArrow} alt="Next" />
                </button>
              </div>
            )}
          </div>

          {/* Desktop Thumbnails */}
          {product.main_photos.length > 1 && (
            <div className="hidden md:flex gap-[.3rem]">
              {product.main_photos.map((img, index) => (
                <img
                  src={`https://ezsouq.store/uploads/images/${img}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-16 object-contain cursor-pointer rounded-[6px] border-2 ${
                    selectedImage === img
                      ? "border-[#6C63FF] shadow-[0px_4px_12px_6px_rgba(63,61,86,0.3)]"
                      : "border-[#D9D9D9]"
                  }`}
                  key={index}
                  onClick={() => handelSelectImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-[50vw] pt-4 md:pt-2 pb-1">
          <div className="flex justify-between md:block">
            <div className="md:flex md:justify-between">
              <h1 className="text-nowrap text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem] text-[#3F3D56] font-bold">
                {product.name}
              </h1>
              <img
                src={heartDetails}
                alt="Favorite"
                className="hidden md:inline w-8 h-8 lg:w-9 lg:h-9"
              />
            </div>
            <p className="text-[1rem] text-nowrap lg:text-[1.1rem] text-[#918AFF] font-bold">
              {product.price} <span className="text-[.9rem]">ل س</span>
            </p>
          </div>

          <ul className="my-2">
            <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
              <img src={car} />
              <span className="text-[1rem]">{product?.name}</span>
            </li>
            <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
              <img src={location} />
              <span className="text-[1rem]">
                {product?.Governorate_name} - {product?.city}
              </span>
            </li>
            <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
              <img src={time} />
              <span className="text-[1rem]">
                {<TimeAgo postDate={product?.createdAt} />}
              </span>
            </li>

            {/* Mobile Thumbnails */}
            {product.main_photos.length > 1 && (
              <div className="md:hidden flex my-4 gap-2 overflow-x-auto">
                {product.main_photos.map((img, index) => (
                  <img
                    src={`https://ezsouq.store/uploads/images/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-16 object-cover cursor-pointer rounded-[6px] border-2 ${
                      selectedImage === img
                        ? "border-[#6C63FF] shadow-[0px_4px_15.6px_8px_rgba(63,61,86,0.3)]"
                        : "border-[#D9D9D9]"
                    }`}
                    key={index}
                    onClick={() => handelSelectImage(img)}
                  />
                ))}
              </div>
            )}
          </ul>

          <p className="text-[#827FB2] text-[.9rem]">{product.description}</p>
          <hr className="text-[#D9D9D9] mt-3" />

          <div>
            <h3 className="text-[#3F3D56] text-[1.1rem] my-2 font-normal">
              معلومات الناشر
            </h3>
            <div className="flex justify-between bg-white p-3 rounded-lg">
              <div>
                <img
                  src={personalImg}
                  alt="Publisher"
                  className="w-16 h-16 lg:w-24 lg:h-24"
                />
              </div>
              <div>
                {email.map((info, index) => (
                  <li key={index} className="flex items-center gap-2 mb-2">
                    <img src={info.img} alt={info.info} />
                    <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
                      {info.info}
                    </span>
                  </li>
                ))}
              </div>
              <div className="flex flex-col items-end gap-4">
                <p className="flex items-center justify-end mb-6">
                  <img src={start} alt="Rating" className="w-4 h-4" />
                  <span className="mr-1 font-normal text-[.9rem] text-[#1D2232]">
                    4.8
                  </span>
                </p>
                <Link
                  to="/profile"
                  className="bg-primary p-2 text-white rounded-md font-bold text-[.75rem]"
                >
                  عرض الملف الشخصي
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-[12px] font-normal text-[#7E7E7E] pt-5 pb-10 underline cursor-pointer">
        ابلاغ عن هذا الإعلان
      </p>
    </div>
  );
};

export default Main;
