import { useEffect, useState, useRef, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react"; // lucide-react icons

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
import locationImg from "../../../assets/images/locationIcondDetails.svg";
import time from "../../../assets/images/timeIconDetails.svg";

// Components & Thunks
import TimeAgo from "../../TimeAgo";
import Spinner from "../../../feedback/loading/Spinner";
import ThumbnailImage from "../../../feedback/loading/ThumbnailImage";
import Heading from "../../common/Heading";
import { productThunkById } from "../../../store/product/thunk/productThunkById";
import { userThunkById } from "../../../store/users/thunk/userThunkById";
import { viewsThunk } from "../../../store/views/thunk/thunkViews";
import { Helmet } from "react-helmet";

const Main = () => {
  const { product, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  console.log(product);
  const { id } = useParams();
  const location = useLocation();
  const [publisher, setPublisher] = useState(null);
  const [loadingPublisher, setLoadingPublisher] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); // full image state
  const [showVideo, setShowVideo] = useState(false); // video display state
  const imgRef = useRef(null);
  const videoRef = useRef(null);

  // 🔹 Fetch product details by ID
  useEffect(() => {
    if (id) dispatch(productThunkById(id));
  }, [dispatch, id]);

  // 🔹 Register a view for this product
  useEffect(() => {
    if (id) dispatch(viewsThunk(id));
  }, [dispatch, id]);

  // 🔹 Fetch publisher info
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

  // 🔹 Check if product has video and decode filename
  const hasVideo = product?.video && product.video.trim() !== "";
  const videoFileName = hasVideo ? decodeURIComponent(product.video) : null;
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

  const myImg = publisher?.avatar ? publisher.avatar : personalImg;

  return (
    <div className="bg-[#F7F7FF] md:pt-2 overflow-x-hidden h-fit relative">
      <Helmet>
        <title>{product?.name} | EzSouq</title>
        <meta
          name="description"
          content={product?.description || "تفاصيل الإعلان"}
        />
        <link
          rel="canonical"
          href={`https://www.ezsouq.store/offer-details/${id}`}
        />
        <meta property="og:title" content={product?.name} />
        <meta property="og:description" content={product?.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.ezsouq.store/offer-details/${id}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={product?.name} />
        <meta name="twitter:description" content={product?.description} />
      </Helmet>

      {loading ? (
        <div className="mt-56">
          <Spinner />
        </div>
      ) : (
        <>
          {/* 🔹 Heading */}
          <div className="mt-[4rem] mb-8 md:mb-0">
            <Heading title="الرجوع" />
          </div>

          {/* 🔹 Main Layout */}
          <div className="container flex flex-col md:flex-row items-center md:items-start md:gap-8 lg:gap-11 -mt-5">
            {/* ================= Left Section (Images & Video) ================= */}
            <div className="flex flex-col items-center w-fit gap-6 md:mt-5">
              {/* Media Toggle Buttons */}
              {hasVideo && (
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-black/20">
                  <button
                    onClick={() => setShowVideo(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      !showVideo
                        ? "bg-primary text-white shadow-sm"
                        : "text-[#808080b4] hover:text-black"
                    }`}
                  >
                    الصور ({mainPhotos.length})
                  </button>
                  <button
                    onClick={() => setShowVideo(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      showVideo
                        ? "bg-primary text-white shadow-sm"
                        : "text-[#808080b4] hover:text-black"
                    }`}
                  >
                    الفيديو
                  </button>
                </div>
              )}

              {/* Main Media Container */}
              <div className="relative bg-[#F7F7FF] w-[100vw] h-[30vh] md:w-[50vh] lg:w-[60vh] md:h-[53vh] md:rounded-2xl overflow-hidden">
                {/* Image Display */}
                {!showVideo && selectedImage && (
                  <>
                    {!isImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                        <Spinner className="w-12 h-12" />
                      </div>
                    )}
                    <img
                      ref={imgRef}
                      src={`${
                        import.meta.env.VITE_API_BASE_URL
                      }/uploads/images/${selectedImage}`}
                      alt="Main Product Image"
                      className={`h-full w-full object-contain md:rounded-2xl bg-[#F7F7FF] transition-opacity duration-300 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      loading="lazy"
                      onLoad={handleImageLoad}
                      onError={() => setIsImageLoaded(true)}
                    />

                    {/* expand icon */}
                    <button
                      onClick={() => setIsFullScreen(true)}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-[#3F3D56] p-2 rounded-full shadow-md transition-all"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Video Display */}
                {showVideo && hasVideo && (
                  <div className="relative h-full w-full">
                    <video
                      ref={videoRef}
                      controls
                      className="h-full w-full object-contain md:rounded-2xl bg-[#F7F7FF]"
                      poster={
                        selectedImage
                          ? `${
                              import.meta.env.VITE_API_BASE_URL
                            }/uploads/images/${selectedImage}`
                          : undefined
                      }
                      onError={(e) => {
                        console.error("Video loading error:", e);
                        console.error("Video src:", e.target.src);
                      }}
                      onLoadStart={() => console.log("Video loading started")}
                      onCanPlay={() => console.log("Video can play")}
                    >
                      <source
                        src={`${
                          import.meta.env.VITE_API_BASE_URL
                        }/uploads/videos/optimized/${encodeURIComponent(
                          product.video
                        )}`}
                        type="video/mp4"
                      />
                      <source
                        src={`${
                          import.meta.env.VITE_API_BASE_URL
                        }/uploads/videos/${encodeURIComponent(product.video)}`}
                        type="video/mp4"
                      />
                      <p className="text-center text-gray-500 p-4">
                        متصفحك لا يدعم عرض الفيديو.
                        <a
                          href={`${
                            import.meta.env.VITE_API_BASE_URL
                          }/uploads/videos/optimized/${encodeURIComponent(
                            product.video
                          )}`}
                          className="text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          اضغط هنا لتحميل الفيديو
                        </a>
                      </p>
                    </video>

                    {/* Video Loading Indicator */}
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      🎥 فيديو
                    </div>
                  </div>
                )}

                {/* Image navigation - only show when viewing images */}
                {!showVideo && mainPhotos.length > 1 && (
                  <div className="absolute inset-y-1/2 left-1/2 -translate-x-1/2 flex justify-between w-[92%]">
                    <button
                      onClick={previousImg}
                      className="w-8 h-8 bg-[#FFFFFF] hover:bg-[#E0E0FF] transition-colors duration-200 flex items-center justify-center rounded-md shadow-md"
                    >
                      <img src={rightArrow} alt="Previous" loading="lazy" />
                    </button>
                    <button
                      onClick={nextImg}
                      className="w-8 h-8 bg-[#FFFFFF] hover:bg-[#E0E0FF] transition-colors duration-200 flex items-center justify-center rounded-md shadow-md"
                    >
                      <img src={leftArrow} alt="Next" loading="lazy" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails - only show when viewing images */}
              {!showVideo && mainPhotos.length > 1 && (
                <div className="hidden md:flex gap-[.3rem]">
                  {mainPhotos.map((img, index) => (
                    <ThumbnailImage
                      key={index}
                      src={img}
                      isSelected={selectedImage === img}
                      onClick={() => {
                        handleSelectImage(img);
                        setShowVideo(false);
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Video Info */}
              {showVideo && hasVideo && (
                <div className="hidden md:block text-center text-sm text-[#808080d8] bg-white px-4 py-2 rounded-lg shadow-sm">
                  <p className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM15 9a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    فيديو المنتج
                  </p>
                </div>
              )}
            </div>

            {/* ================= Right Section (Details) ================= */}
            <div className="w-full md:w-[70vw] pt-4 md:pt-2 pb-1">
              <div className="flex justify-between md:block">
                <div className="md:flex md:justify-between">
                  <h1 className="text-nowrap text-[1.5rem] lg:text-[1.8rem] text-[#3F3D56] font-bold">
                    {product.name}
                  </h1>
                  <img
                    src={heartDetails}
                    alt="Favorite"
                    className="hidden md:inline w-8 h-8 lg:w-9 lg:h-9"
                  />
                </div>
                <p className="text-[1rem] lg:text-[1.1rem] text-[#918AFF] font-bold">
                  {product.price} <span className="text-[.9rem]">ل.س</span>
                </p>
              </div>

              <ul className="my-2">
                <li className="flex gap-2 items-center mb-2 text-[#716D97]">
                  <img src={car} alt="Car icon" />
                  <span>{product?.name}</span>
                </li>
                <li className="flex gap-2 items-center mb-2 text-[#716D97]">
                  <img src={locationImg} alt="Location icon" />
                  <span>
                    {product?.Governorate_name} - {product?.city}
                  </span>
                </li>
                <li className="flex gap-2 items-center mb-2 text-[#716D97]">
                  <img src={time} alt="Time icon" loading="lazy" />
                  <TimeAgo postDate={product?.createdAt} />
                </li>
              </ul>

              <div
                className={`${
                  location.pathname.includes("dashboard")
                    ? "md:ml-44 lg:ml-36"
                    : "md:ml-44 lg:ml-32"
                }text-[#827FB2] text-[.9rem] break-words `}
              >
                {product.description}
              </div>

              <hr className="text-[#D9D9D9] mt-3" />

              {loadingPublisher ? (
                <Spinner />
              ) : (
                <div className="md:w-[45vw] lg:w-3/4 mt-4">
                  <h3 className="text-[#3F3D56] text-[1.1rem] my-2 font-normal">
                    معلومات الناشر
                  </h3>
                  {publisher && (
                    <div className="flex flex-col md:flex-row justify-between bg-[#FFFFFF] p-3 rounded-lg hover:shadow-md transition-all duration-200 gap-4">
                      <img
                        key={publisher.avatar}
                        src={`${myImg}`}
                        loading="lazy"
                        alt="Publisher"
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full self-center md:self-start"
                      />
                      <ul className="flex flex-col justify-center gap-2 text-[#716D97]">
                        <li className="flex items-center gap-2">
                          <img
                            src={iconProfile}
                            alt="Profile icon"
                            className="w-4 h-4"
                          />
                          <span>{publisher?.name}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <img
                            src={phoneIcon}
                            alt="Email icon"
                            className="w-4 h-4"
                          />
                          <span>{publisher?.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <img
                            src={whatsIcon}
                            alt="WhatsApp icon"
                            className="w-4 h-4"
                          />
                          <span>{publisher?.whats_app}</span>
                        </li>
                      </ul>
                      <div className="flex flex-col md:items-end gap-2 mt-2 md:mt-0">
                        <p className="flex items-center justify-end">
                          <img src={start} alt="Rating" className="w-4 h-4" />
                          <span className="mr-1 text-[#1D2232]">
                            {publisher?.averageRating
                              ? publisher.averageRating.toFixed(1)
                              : "0.0"}
                          </span>
                        </p>
                        <Link
                          to={
                            location.pathname.includes("dashboard")
                              ? `/dashboard/users/${product?.Owner?._id}`
                              : `/profile/${product?.Owner?._id}`
                          }
                          className="bg-[#918AFF] hover:bg-[#7C73FF] transition-colors duration-200 text-white px-3 py-2 rounded-md font-bold text-[.8rem] text-center md:text-right"
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

          {/* Fullscreen Image Modal */}
          <AnimatePresence>
            {isFullScreen && (
              <motion.div
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.img
                  src={`${
                    import.meta.env.VITE_API_BASE_URL
                  }/uploads/images/${selectedImage}`}
                  alt="Expanded Image"
                  className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.05, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-[#1D2232] p-2 rounded-full shadow-md transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </motion.div>
            )}
            []
          </AnimatePresence>

          <Link
            to={`/offer-details/${id}/report/${product?.Owner?._id}`}
            replace={true}
          >
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
