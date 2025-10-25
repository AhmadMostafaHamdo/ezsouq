import { useEffect, useState, useRef, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Images
import iconProfile from "../../../assets/images/profileIcon.svg";
import phoneIcon from "../../../assets/images/phoneIcon.svg";
import whatsIcon from "../../../assets/images/whatsIcon.svg";
import heartDetails from "../../../assets/images/heartDeatails.svg";
import personalImg from "../../../assets/images/pesonal.png";
import start from "../../../assets/images/start.svg";
import leftArrow from "../../../assets/images/leftArrow.svg";
import rightArrow from "../../../assets/images/rightArrow.svg";
import car from "../../../assets/images/carIconDetails.svg";
import location from "../../../assets/images/locationIcondDetails.svg";
import time from "../../../assets/images/timeIconDetails.svg";

// Components & Thunks
import TimeAgo from "../../TimeAgo";
import Spinner from "../../../feedback/loading/Spinner";
import ThumbnailImage from "../../../feedback/loading/ThumbnailImage";
import Heading from "../../common/Heading";
import { productThunkById } from "../../../store/product/thunk/productThunkById";
import { userThunkById } from "../../../store/users/thunk/userThunkById";
import { viewsThunk } from "../../../store/views/thunk/thunkViews";

const Main = () => {
  const { product, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [publisher, setPublisher] = useState(null);
  const [loadingPublisher, setLoadingPublisher] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef(null);
  console.log(product);
  // 🔹 Fetch product details by ID
  useEffect(() => {
    if (id) dispatch(productThunkById(id));
  }, [dispatch, id]);

  // 🔹 Register a view for this product
  useEffect(() => {
    if (id) dispatch(viewsThunk(id));
  }, [dispatch, id]);

  // 🔹 Fetch publisher (owner) info
  useEffect(() => {
    const fetchPublisher = async () => {
      if (!product?.Owner?._id) return;
      setLoadingPublisher(true);
      try {
        const res = await dispatch(userThunkById(product.Owner._id)).unwrap();
        setPublisher(res);
      } catch (err) {
        console.error("❌ Failed to fetch publisher:", err);
      } finally {
        setLoadingPublisher(false);
      }
    };
    fetchPublisher();
  }, [dispatch, product?.Owner?._id]);

  // 🔹 Set first image as default
  useEffect(() => {
    if (product?.main_photos?.length) {
      setSelectedImage(product.main_photos[0]);
      setIsImageLoaded(false);
    }
  }, [product]);

  // 🔹 Handle image load state
  useEffect(() => {
    setIsImageLoaded(false);
    if (imgRef.current?.complete) setIsImageLoaded(true);
  }, [selectedImage]);

  const mainPhotos = useMemo(() => product?.main_photos || [], [product]);

  // 🔹 Image navigation
  const handleSelectImage = (img) => setSelectedImage(img);
  const handleImageLoad = () => setIsImageLoaded(true);

  const previousImg = () => {
    if (!mainPhotos.length) return;
    const currentIndex = mainPhotos.indexOf(selectedImage);
    const previousIndex =
      (currentIndex - 1 + mainPhotos.length) % mainPhotos.length;
    setSelectedImage(mainPhotos[previousIndex]);
  };

  const nextImg = () => {
    if (!mainPhotos.length) return;
    const currentIndex = mainPhotos.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % mainPhotos.length;
    setSelectedImage(mainPhotos[nextIndex]);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }
  console.log(publisher);
  const myImg = publisher?.avatar ? publisher.avatar : personalImg;

  return (
    <div className="bg-[#F7F7FF] md:pt-2 overflow-x-hidden h-fit">
      {loading ? (
        <div className="mt-56">
          <Spinner />
        </div>
      ) : (
        <>
          {/* 🔹 Heading */}
          <div className="mt-[4rem]">
            <Heading title="الرجوع" />
          </div>

          {/* 🔹 Main Layout */}
          <div className="container flex flex-col md:flex-row items-center md:items-start md:gap-8 lg:gap-11 -mt-5">
            {/* ================= Left Section (Images) ================= */}
            <div className="flex flex-col items-center w-fit gap-6 md:mt-5">
              {/* Main Image */}
              <div className="relative bg-[#F7F7FF] w-[100vw] h-[30vh] md:w-[50vh] lg:w-[60vh] md:h-[53vh] md:rounded-2xl">
                {selectedImage && (
                  <>
                    {!isImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                        <Spinner className="w-12 h-12" />
                      </div>
                    )}
                    <img
                      ref={imgRef}
                      src={`https://api.ezsouq.store/uploads/images/${selectedImage}`}
                      alt="الصورة الرئيسية للمنتج"
                      className={`h-full w-full object-contain md:rounded-2xl bg-[#F7F7FF] transition-opacity duration-300 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      loading="lazy"
                      onLoad={handleImageLoad}
                      onError={() => setIsImageLoaded(true)}
                    />
                  </>
                )}

                {/* Image Navigation Buttons */}
                {mainPhotos.length > 1 && (
                  <div className="absolute inset-y-1/2 left-1/2 -translate-x-1/2 flex justify-between w-[92%]">
                    <button
                      onClick={previousImg}
                      className="w-8 h-8 bg-[#FFFFFF] hover:bg-[#E0E0FF] transition-colors duration-200 flex items-center justify-center rounded-md shadow-md"
                    >
                      <img src={rightArrow} alt="السابق" loading="lazy" />
                    </button>
                    <button
                      onClick={nextImg}
                      className="w-8 h-8 bg-[#FFFFFF] hover:bg-[#E0E0FF] transition-colors duration-200 flex items-center justify-center rounded-md shadow-md"
                    >
                      <img src={leftArrow} alt="التالي" loading="lazy" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {mainPhotos.length > 1 && (
                <div className="hidden md:flex gap-[.3rem]">
                  {mainPhotos.map((img, index) => (
                    <ThumbnailImage
                      key={index}
                      src={img}
                      isSelected={selectedImage === img}
                      onClick={() => handleSelectImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* ================= Right Section (Details) ================= */}
            <div className="w-full md:w-[70vw] pt-4 md:pt-2 pb-1">
              {/* Product Name + Price */}
              <div className="flex justify-between md:block">
                <div className="md:flex md:justify-between">
                  <h1 className="text-nowrap text-[1.5rem] lg:text-[1.8rem] text-[#3F3D56] font-bold">
                    {product.name}
                  </h1>
                  <img
                    src={heartDetails}
                    alt="مفضلة"
                    className="hidden md:inline w-8 h-8 lg:w-9 lg:h-9"
                  />
                </div>
                <p className="text-[1rem] lg:text-[1.1rem] text-[#918AFF] font-bold">
                  {product.price} <span className="text-[.9rem]">ل.س</span>
                </p>
              </div>

              {/* Product Info */}
              <ul className="my-2">
                <li className="flex gap-2 items-center mb-2 text-[#716D97]">
                  <img src={car} alt="رمز السيارة" />
                  <span>{product?.name}</span>
                </li>
                <li className="flex gap-2 items-center mb-2 text-[#716D97]">
                  <img src={location} alt="رمز الموقع" />
                  <span>
                    {product?.Governorate_name} - {product?.city}
                  </span>
                </li>
                <li className="flex gap-2 items-center mb-2 text-[#716D97]">
                  <img src={time} alt="رمز الوقت" loading="lazy" />
                  <TimeAgo postDate={product?.createdAt} />
                </li>
              </ul>

              {/* Description */}
              <div className="text-[#827FB2] text-[.9rem] break-words md:ml-44 lg:ml-32">
                {product.description}
              </div>

              <hr className="text-[#D9D9D9] mt-3" />

              {/* Publisher Info */}
              {loadingPublisher ? (
                <Spinner />
              ) : (
                <div className="md:w-[45vw] lg:w-3/4 mt-4">
                  <h3 className="text-[#3F3D56] text-[1.1rem] my-2 font-normal">
                    معلومات الناشر
                  </h3>
                  {publisher && (
                    <div className="flex flex-col md:flex-row justify-between bg-[#FFFFFF] p-3 rounded-lg hover:shadow-md transition-all duration-200 gap-4">
                      {/* Avatar */}
                      <img
                        key={publisher.avatar}
                        src={`${myImg}`}
                        loading="lazy"
                        alt="صورة الناشر"
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full self-center md:self-start"
                      />

                      {/* Info */}
                      <ul className="flex flex-col justify-center gap-2 text-[#716D97]">
                        <li className="flex items-center gap-2">
                          <img
                            src={iconProfile}
                            alt="رمز الملف الشخصي"
                            className="w-4 h-4"
                          />
                          <span>{publisher?.name}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <img
                            src={phoneIcon}
                            alt="رمز البريد الإلكتروني"
                            className="w-4 h-4"
                          />
                          <span>{publisher?.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <img
                            src={whatsIcon}
                            alt="رمز الواتس آب"
                            className="w-4 h-4"
                          />
                          <span>{publisher?.whats_app}</span>
                        </li>
                      </ul>

                      {/* Rating + Profile Link */}
                      <div className="flex flex-col md:items-end gap-2 mt-2 md:mt-0">
                        <p className="flex items-center justify-end">
                          <img src={start} alt="تقييم" className="w-4 h-4" />
                          <span className="mr-1 text-[#1D2232]">
                            {publisher?.averageRating
                              ? publisher.averageRating.toFixed(1)
                              : "0.0"}
                          </span>
                        </p>
                        <Link
                          to={`/profile/${product?.Owner?._id}`}
                          className="bg-[#918AFF] text-nowrap hover:bg-[#7C73FF] transition-colors duration-200 text-white px-3 py-2 rounded-md font-bold text-[.8rem] text-center md:text-right"
                        >
                          عرض الملف الشخصي
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 🔹 Report Section */}
          <Link to={`/offer-details/${id}/report/${product?.Owner?._id}`}>
            <p className="text-center text-[12px] font-normal text-[#7E7E7E] pt-5 pb-10 underline cursor-pointer hover:text-[#918AFF] transition-colors duration-200">
              ابلاغ عن هذا المستخدم
            </p>
          </Link>
        </>
      )}
    </div>
  );
};

export default Main;
