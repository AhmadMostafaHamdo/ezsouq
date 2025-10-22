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

  // Get product by ID
  useEffect(() => {
    if (id) dispatch(productThunkById(id));
  }, [dispatch, id]);

  // Register product views
  useEffect(() => {
    if (id) dispatch(viewsThunk(id));
  }, [dispatch, id]);

  // Fetch publisher info (local state)
  useEffect(() => {
    const fetchPublisher = async () => {
      if (!product?.Owner?._id) return;
      setLoadingPublisher(true);
      try {
        const res = await dispatch(userThunkById(product.Owner._id)).unwrap();
        setPublisher(res);
      } catch (err) {
        console.error("Failed to fetch publisher:", err);
      } finally {
        setLoadingPublisher(false);
      }
    };
    fetchPublisher();
  }, [dispatch, product?.Owner?._id]);

  // Handle main image
  useEffect(() => {
    if (product?.main_photos?.length) {
      setSelectedImage(product.main_photos[0]);
      setIsImageLoaded(false);
    }
  }, [product]);

  useEffect(() => {
    setIsImageLoaded(false);
    if (imgRef.current?.complete) setIsImageLoaded(true);
  }, [selectedImage]);

  const mainPhotos = useMemo(() => product?.main_photos || [], [product]);

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

  const myImg = publisher?.avatar
    ? publisher.avatar.replace(/^http/, "https")
    : personalImg;

  return (
    <div>
      {loading ? (
        <div className="mt-56">
          <Spinner />
        </div>
      ) : (
        <div className="bg-[#F7F7FF] md:pt-2 overflow-x-hidden h-fit">
          {/* Heading */}
          <div className="mt-[4rem]">
            <Heading title="الرجوع" url={"/"} />
          </div>

          {/* Main Content */}
          <div className="container items-center md:items-start flex flex-col md:flex-row md:gap-8 lg:gap-11 -mt-5">
            {/* Left Column - Images */}
            <div className="flex flex-col items-center w-fit gap-6 md:mt-5">
              <div className="w-[100vw] h-[30vh] md:h-[53vh] md:w-[50vh] lg:w-[60vh] md:rounded-2xl relative bg-[#F7F7FF]">
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
                      <img src={rightArrow} alt="السابق" loading="lazy" />
                    </button>
                    <button
                      className="w-8 h-8 bg-[#F7F7FF] backdrop-blur flex items-center justify-center rounded-md shadow-md"
                      onClick={nextImg}
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

            {/* Right Column - Product Details */}
            <div className="w-full md:w-[70vw] pt-4 md:pt-2 pb-1">
              <div className="flex justify-between md:block">
                <div className="md:flex md:justify-between">
                  <h1 className="text-nowrap text-[1.2rem] md:text-[1.5rem] lg:text-[1.8rem] text-[#3F3D56] font-bold">
                    {product.name}
                  </h1>
                  <img
                    src={heartDetails}
                    alt="مفضلة"
                    className="hidden md:inline w-8 h-8 lg:w-9 lg:h-9"
                  />
                </div>
                <p className="text-[1rem] text-nowrap lg:text-[1.1rem] text-[#918AFF] font-bold">
                  {product.price} <span className="text-[.9rem]">ل س</span>
                </p>
              </div>

              {/* Product Info */}
              <ul className="my-2">
                <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
                  <img src={car} alt="رمز السيارة" />
                  <span className="text-[1rem]">{product?.name}</span>
                </li>
                <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
                  <img src={location} alt="رمز الموقع" />
                  <span className="text-[1rem]">
                    {product?.Governorate_name} - {product?.city}
                  </span>
                </li>
                <li className="flex gap-2 items-center mb-2 font-normal text-[#716D97]">
                  <img src={time} alt="رمز الوقت" loading="lazy" />
                  <span className="text-[1rem]">
                    <TimeAgo postDate={product?.createdAt} />
                  </span>
                </li>
              </ul>

              {/* Description */}
              <p className="text-[#827FB2] text-[.9rem]">
                <div className="break-words md:ml-44 lg:ml-32">
                  {product.description}
                </div>
              </p>

              <hr className="text-[#D9D9D9] mt-3" />

              {/* Publisher Info */}
              {loadingPublisher ? (
                <Spinner />
              ) : (
                <div className="md:w-[45vw] lg:w-3/4">
                  <h3 className="text-[#3F3D56] text-[1.1rem] my-2 font-normal">
                    معلومات الناشر
                  </h3>
                  {publisher && (
                    <div className="flex justify-between bg-white p-3 rounded-lg">
                      <div>
                        <img
                          key={publisher.avatar}
                          src={`${myImg}?t=${Date.now()}`}
                          loading="lazy"
                          alt="صورة الناشر"
                          className="w-16 h-16 rounded-[50%] lg:w-24 lg:h-24"
                        />
                      </div>
                      <div>
                        <li className="flex items-center gap-2 mb-2">
                          <img src={iconProfile} alt="رمز الملف الشخصي" />
                          <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
                            {publisher?.name}
                          </span>
                        </li>
                        <li className="flex items-center gap-2 mb-2">
                          <img src={phoneIcon} alt="رمز البريد الإلكتروني" />
                          <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
                            {publisher?.email}
                          </span>
                        </li>
                        <li className="flex items-center gap-2 mb-2">
                          <img src={whatsIcon} alt="رمز الواتس آب" />
                          <span className="font-normal text-[.7rem] lg:text-[.88rem] text-[#716D97]">
                            {publisher?.whats_app}
                          </span>
                        </li>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <p className="flex items-center justify-end mb-6">
                          <img src={start} alt="تقييم" className="w-4 h-4" />
                          <span className="mr-1 font-normal text-[.9rem] text-[#1D2232]">
                            {publisher?.averageRating
                              ? publisher.averageRating.toFixed(1)
                              : "0.0"}
                          </span>
                        </p>
                        <Link
                          to={`/profile/${product?.Owner?._id}`}
                          className="bg-primary p-2 w-fit md:w-[120px] lg:w-fit text-white rounded-md font-bold text-[.75rem]"
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

          {/* Report */}
          <Link to={`/offer-details/${id}/report/${product?.Owner?._id}`}>
            <p className="text-center text-[12px] font-normal text-[#7E7E7E] pt-5 pb-10 underline cursor-pointer">
              ابلاغ عن هذا المستخدم
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Main;
