import {
  memo,
  useCallback,
  useMemo,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import TimeAgo from "../TimeAgo";
import Spinner from "../../feedback/loading/Spinner";
import { likeToggleWishlistThunk } from "../../store/wishlist/thunk/likeToggleWishlistThunk";
import { toggleLikeProduct } from "../../store/product/thunk/toggleLikeProduct";
import {
  setSavedProduct,
  setLikeLocal,
} from "../../store/product/productSlice";
import { setLikeLocalByCat } from "../../store/getProductsByCat/getProductByCatSlice";
import useUserId from "../../hooks/useUserId";

const Lottie = lazy(() => import("lottie-react"));
import heartAnim from "../../assets/lottifiles/heartAnmation.json";
import savedAnim from "../../assets/lottifiles/saved.json";

// Icons
import emptyHeart from "../../assets/images/emptyHeart.svg";
import emptyFavorite from "../../assets/images/emptyFavorit.svg";
import commitIcon from "../../assets/images/commit.svg";
import viewsIcon from "../../assets/images/views.svg";
import shareIcon from "../../assets/images/share.svg";
import facebookIcon from "../../assets/images/ic_baseline-facebook.svg";
import twitterIcon from "../../assets/images/twitterIcon.png";
import whatsappIcon from "../../assets/images/ri_whatsapp-fill.svg";
import { deleteProduct } from "../../store/product/thunk/deleteProduct";

const Card = ({
  _id,
  name,
  Governorate_name,
  createdAt,
  Owner,
  main_photos,
  type,
  city,
  price,
  views,
  likes,
  isnew,
  real_estate_type,
  Category_name,
  for_sale,
}) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const userId = useUserId();
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [optimisticLiked, setOptimisticLiked] = useState(null);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);

  const { products, savedProductsByUser = {} } = useSelector(
    (state) => state.products
  );
  const { commentsByProductId } = useSelector((state) => state.comments);

  const productFromStore = products.find((p) => p._id === _id);
  const likesFromStore = productFromStore?.likes || likes;
  const isLikedFromStore = useMemo(
    () =>
      userId &&
      Array.isArray(likesFromStore) &&
      likesFromStore.includes(userId),
    [likesFromStore, userId]
  );
  const isLiked = optimisticLiked ?? isLikedFromStore;
  const currentLikesCount =
    optimisticLikesCount ?? (likesFromStore?.length || 0);

  const commentCount = useMemo(
    () => commentsByProductId?.[_id]?.total || 0,
    [commentsByProductId, _id]
  );
  const isSaved = useMemo(
    () =>
      userId && Array.isArray(savedProductsByUser[userId])
        ? savedProductsByUser[userId].includes(_id)
        : false,
    [savedProductsByUser, userId, _id]
  );
  const imageUrl = useMemo(
    () =>
      main_photos?.[0]
        ? `https://api.ezsouq.store/uploads/images/${main_photos[0]}`
        : null,
    [main_photos]
  );

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShareOpen(false);
    if (shareOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [shareOpen]);

  const handleOfferClick = useCallback(() => {
    navigate(token ? `/offer-details/${_id}` : "/login");
  }, [_id, navigate, token]);

  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      if (!token) return navigate("/login");
      dispatch(setSavedProduct({ userId, productId: _id }));
      dispatch(likeToggleWishlistThunk(_id));
    },
    [_id, dispatch, navigate, token, userId]
  );

  const handleLike = useCallback(
    (e) => {
      e.stopPropagation();
      if (!token) return navigate("/login");
      const newLiked = !isLiked;
      setOptimisticLiked(newLiked);
      setOptimisticLikesCount(
        newLiked ? currentLikesCount + 1 : currentLikesCount - 1
      );

      dispatch(toggleLikeProduct({ productId: _id }))
        .unwrap()
        .then(() => {
          dispatch(setLikeLocal({ productId: _id, userId, liked: newLiked }));
          dispatch(
            setLikeLocalByCat({ productId: _id, userId, liked: newLiked })
          );
          setOptimisticLiked(null);
          setOptimisticLikesCount(null);
        })
        .catch(() => {
          setOptimisticLiked(!newLiked);
          setOptimisticLikesCount(currentLikesCount);
        });
    },
    [_id, dispatch, isLiked, currentLikesCount, userId]
  );

  const handleShareClick = (e) => {
    e.stopPropagation();
    setShareOpen((prev) => !prev);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      .unwrap()
      .then(() => navigate(0));
  };

  return (
    <article
      onClick={handleOfferClick}
      title={name}
      className="p-2 w-[86vw] md:w-52 lg:w-60 shadow-card bg-white rounded-lg cursor-pointer transition-transform hover:scale-[1.02] relative z-1"
    >
      {/* Card Header */}
      <header className="flex justify-between items-center w-full text-sm text-[#A3A0DD] mb-2">
        <time>
          <TimeAgo postDate={createdAt} />
        </time>
        <p>
          <span className="mx-1">بواسطة</span>
          {Owner?.name?.length > 7
            ? Owner.name.slice(0, 7) + ".."
            : Owner?.name}
        </p>

        {/* Favorite */}
        <button
          onClick={handleFavorite}
          aria-label="Favorite toggle"
          className="ml-2 relative"
        >
          {Owner?._id !== userId &&
            (isSaved ? (
              <Suspense fallback={<img src={emptyFavorite} alt="مفضلة" />}>
                <Lottie animationData={savedAnim} loop={false} />
              </Suspense>
            ) : (
              <img
                src={emptyFavorite}
                alt="إضافة إلى المفضلة"
                className="w-6 h-5"
              />
            ))}
        </button>
      </header>

      {/* Product Image */}
      <div className="relative h-32 w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-md">
            <Spinner />
          </div>
        )}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`h-32 w-full object-cover rounded-md transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Card Body */}
      <div className="w-full mt-2">
        <h2 className="text-lg text-[#3F3D56] font-medium truncate">{name}</h2>
        <p className="text-[#A3A0DD] text-sm">
          {Governorate_name} - {city}
        </p>

        <div className="flex justify-between items-center my-2 text-sm">
          <span className="text-[#A3A0DD] font-bold">
            {Category_name === "موبايلات" && (isnew ? "جديد" : "قديم")}
            {Category_name === "عقارات" && real_estate_type}
            {Category_name === "سيارات" && (for_sale ? "للبيع" : "للإيجار")}
          </span>
          <span className="text-[#3F3D56] font-bold">{price} ل.س</span>
        </div>

        {/* Card Footer Actions */}
        <footer className="flex justify-between items-center mt-3">
          {/* Like */}
          <button
            onClick={handleLike}
            aria-label={isLiked ? "Unlike" : "Like"}
            className="flex items-center gap-1"
          >
            {isLiked ? (
              <Suspense fallback={<img src={emptyHeart} alt="إعجاب" />}>
                <Lottie
                  animationData={heartAnim}
                  loop={false}
                  className="w-6 h-6"
                />
              </Suspense>
            ) : (
              <img src={emptyHeart} alt="إعجاب فارغ" className="w-6 h-6" />
            )}
            <span className="text-xs text-[#535353]">{currentLikesCount}</span>
          </button>

          {/* Comments */}
          <Link
            to={`/commits/${_id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1"
            aria-label="Comments"
          >
            <img src={commitIcon} alt="تعليقات" />
            <span className="text-xs text-[#535353]">{commentCount}</span>
          </Link>

          {/* Views */}
          <div className="flex items-center gap-1" aria-label="Views">
            <img src={viewsIcon} alt="مشاهدات" />
            <span className="text-xs text-[#535353]">{views || 0}</span>
          </div>

          {/* Share */}
          <div className="relative">
            <button
              onClick={handleShareClick}
              aria-label="Share"
              className="flex items-center"
            >
              <img src={shareIcon} alt="مشاركة" />
            </button>

            {/* Share Dropdown Animated */}
            {shareOpen && (
              <div
                className="absolute  -translate-x-1/2 left-1/2 bottom-10 mt-2 w-44 bg-white p-3 rounded-xl shadow-lg border border-gray-200 z-50
      animate-slide-fade"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShareOpen(false)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-[#888787] transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>

                <ul className="flex flex-col gap-2 mt-4">
                  {[
                    {
                      name: "Facebook",
                      icon: facebookIcon,
                      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        window.location.origin + "/offer-details/" + _id
                      )}`,
                    },
                    {
                      name: "Twitter",
                      icon: twitterIcon,
                      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        "شاهد هذا الإعلان: " + name
                      )}&url=${encodeURIComponent(
                        window.location.origin + "/offer-details/" + _id
                      )}`,
                    },
                    {
                      name: "WhatsApp",
                      icon: whatsappIcon,
                      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
                        window.location.origin + "/offer-details/" + _id
                      )}`,
                    },
                  ].map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:scale-110 transition-all"
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {item.name}
                      </span>
                    </li>
                  ))}

                  {/* Copy Link */}
                  <li
                    className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition-all"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.origin + "/offer-details/" + _id
                      );
                      setShareOpen(false);
                    }}
                  >
                    <span className="text-sm font-medium text-[#332f2f] hover:scale-110 duration-150">
                      نسخ الرابط
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </footer>
      </div>
    </article>
  );
};

export default memo(Card);
