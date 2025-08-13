import { useEffect, useState, useRef } from "react";

import iconProfile from "../../../assets/images/profileIcon.svg";
import phoneIcon from "../../../assets/images/phoneIcon.svg";
import whatsIcon from "../../../assets/images/whatsIcon.svg";
import heartDetails from "../../../assets/images/heartDeatails.svg";
import personalImg from "../../../assets/images/personal.svg";
import start from "../../../assets/images/start.svg";
import leftArrow from "../../../assets/images/leftArrow.svg";
import rightArrow from "../../../assets/images/rightArrow.svg";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productThunkById } from "../../../store/product/thunk/productThunkById";
import car from "../../../assets/images/carIconDetails.svg";
import location from "../../../assets/images/locationIcondDetails.svg";
import time from "../../../assets/images/timeIconDetails.svg";
import TimeAgo from "../../TimeAgo";
import Spinner from "../../../feedback/loading/Spinner";
import ThumbnailImage from "../../../feedback/loading/ThumbnailImage";
import { userThunkById } from "../../../store/users/thunk/userThunkById";
import { viewsThunk } from "../../../store/views/thunk/thunkViews";
const Main = () => {
  const { product } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.users);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const imgRef = useRef(null);
  useEffect(() => {
    dispatch(productThunkById(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(viewsThunk(id));
  }, []);
  useEffect(() => {
    dispatch(userThunkById(product?.Owner_id?._id));
  }, [dispatch, id]);
  useEffect(() => {
    if (product?.main_photos?.length) {
      setSelectedImage(product.main_photos[0]);
    }
  }, [product]);

  // Reset image loaded state when image changes
  useEffect(() => {
    setIsImageLoaded(false);

    // Check if image is already cached
    if (imgRef.current?.complete) {
      setIsImageLoaded(true);
    }
  }, [selectedImage]);

  const handelSelectImage = (img) => {
    setSelectedImage(img);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const previousImg = () => {
    if (!product?.main_photos?.length) return;

    const currentIndex = product.main_photos.indexOf(selectedImage);
    if (currentIndex === -1) return;
    const previousIndex =
      (currentIndex - 1 + product.main_photos.length) %
      product.main_photos.length;
    setSelectedImage(product.main_photos[previousIndex]);
  };

  const nextImg = () => {
    if (!product?.main_photos?.length) return;

    const currentIndex = product.main_photos.indexOf(selectedImage);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % product.main_photos.length;
    setSelectedImage(product.main_photos[nextIndex]);
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-12 h-12" />
      </div>
    );

  const mainPhotos = product?.main_photos || [];
  return (
    <div className=" bg-[#F7F7FF] md:pt-2 overflow-x-hidden h-fit">
      <div className="container items-center md:items-start flex flex-col md:flex-row md:gap-8 lg:gap-11 pt-[5rem]">
        <div className="flex flex-col items-center w-fit gap-6 md:mt-5">
          <div className="w-[100vw] h-[30vh] md:h-[53vh] md:w-[50vh] lg:w-[60vh] md:rounded-2xl relative bg-[#F7F7FF]">
            {selectedImage && (
              <>
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner className="w-12 h-12" />
                  </div>
                )}

                {/* Main Image */}
                <img
                  ref={imgRef}
                  src={`https://api.ezsouq.store/uploads/images/${selectedImage}`}
                  alt="Main product"
                  className={`md:h-full h-full w-full object-contain md:rounded-2xl bg-[#F7F7FF] ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-300`}
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={() => setIsImageLoaded(true)}
                />
              </>
            )}

            {mainPhotos.length > 1 && (
              <div className="absolute flex justify-between w-[92%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button
                  className="w-8 h-8 bg-[#F7F7FF] backdrop-blur flex items-center justify-center rounded-md shadow-md"
                  onClick={previousImg}
                >
                  <img src={rightArrow} alt="Previous" loading="lazy" />
                </button>
                <button
                  className="w-8 h-8 bg-[#F7F7FF] backdrop-blur flex items-center justify-center rounded-md shadow-md"
                  onClick={nextImg}
                >
                  <img src={leftArrow} alt="Next" loading="lazy" />
                </button>
              </div>
            )}
          </div>

          {mainPhotos.length > 1 && (
            <div className="hidden md:flex gap-[.3rem]">
              {mainPhotos.map((img, index) => (
                <ThumbnailImage
                  key={index}
                  src={img}
                  isSelected={selectedImage === img}
                  onClick={() => handelSelectImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-[70vw] pt-4 md:pt-2 pb-1">
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
              <img src={car} alt="Car icon" />
              <span className="text-[1rem]">{product?.name}</span>
            </li>
            <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
              <img src={location} alt="Location icon" />
              <span className="text-[1rem]">
                {product?.Governorate_name} - {product?.city}
              </span>
            </li>
            <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
              <img src={time} alt="Time icon" loading="lazy" />
              <span className="text-[1rem]">
                {<TimeAgo postDate={product?.createdAt} />}
              </span>
            </li>

            {/* Mobile Thumbnails */}
            {mainPhotos.length > 1 && (
              <div className="md:hidden flex my-4 gap-2 overflow-x-auto">
                {mainPhotos.map((img, index) => (
                  <ThumbnailImage
                    key={index}
                    src={img}
                    isSelected={selectedImage === img}
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
                <li className="flex items-center gap-2 mb-2">
                  <img src={iconProfile} alt="" />
                  <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
                    {user?.name}
                  </span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <img src={phoneIcon} alt="" />
                  <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
                    {user?.email}
                  </span>
                </li>
                <li className="flex items-center gap-2 mb-2">
                  <img src={whatsIcon} alt="" />
                  <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
                    {user?.whats_app}
                  </span>
                </li>
              </div>
              <div className="flex flex-col items-end gap-4">
                <p className="flex items-center justify-end mb-6">
                  <img src={start} alt="Rating" className="w-4 h-4" />
                  <span className="mr-1 font-normal text-[.9rem] text-[#1D2232]">
                    4.8
                  </span>
                </p>
                <Link
                  to={`/profile/${product?.Owner_id?._id}`}
                  className="bg-primary p-2 w-fit md:w-[120px] lg:w-fit  text-white rounded-md font-bold text-[.75rem]"
                >
                  عرض الملف الشخصي
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/offer-details/${id}/report`}>
        <p className="text-center text-[12px] font-normal text-[#7E7E7E] pt-5 pb-10 underline cursor-pointer">
          ابلاغ عن هذا الإعلان
        </p>
      </Link>
    </div>
  );
};

export default Main;
