// Card.jsx
import { memo, useCallback, useMemo, useState, Suspense, lazy } from "react";
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

// Lazy load heavy animations for performance
const Lottie = lazy(() => import("lottie-react"));
import heartAnim from "../../assets/lottifiles/heartAnmation.json";
import savedAnim from "../../assets/lottifiles/saved.json";

import emptyHeart from "../../assets/images/emptyHeart.svg";
import emptyFavorite from "../../assets/images/emptyFavorit.svg";
import commitIcon from "../../assets/images/commit.svg";
import viewsIcon from "../../assets/images/views.svg";
import shareIcon from "../../assets/images/share.svg";

/* =========================================
   Product Card Component
   Displays product info including:
   - Image
   - Title & Location
   - Category, Price, Condition
   - Likes, Comments, Views, Favorite
========================================= */
const Card = ({
  _id,
  name,
  Governorate_name,
  createdAt,
  Owner_id,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");

  // ✅ Get current user ID
  const userId = useUserId();

  // Local state for image load & optimistic updates
  const [imageLoaded, setImageLoaded] = useState(false);
  const [optimisticLiked, setOptimisticLiked] = useState(null);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(null);

  const { savedProducts = [], products } = useSelector(
    (state) => state.products
  );
  const { commentsByProductId } = useSelector((state) => state.comments);

  // Get product data from store (fallback to props)
  const productFromStore = products.find((p) => p._id === _id);
  const likesFromStore = productFromStore?.likes || likes;

  // Determine if the product is liked by current user
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

  // Number of comments
  const commentCount = useMemo(
    () => commentsByProductId?.[_id]?.length || 0,
    [commentsByProductId, _id]
  );

  // Is product saved by user
  const isSaved = useMemo(
    () => Array.isArray(savedProducts) && savedProducts.includes(_id),
    [savedProducts, _id]
  );

  // Construct image URL
  const imageUrl = useMemo(
    () =>
      main_photos?.[0]
        ? `https://api.ezsouq.store/uploads/images/${main_photos[0]}`
        : null,
    [main_photos]
  );

  /* =========================================
     Event Handlers
  ========================================== */

  // Navigate to product details
  const handleOfferClick = useCallback(() => {
    navigate(token ? `/offer-details/${_id}` : "/login");
  }, [_id, navigate, token]);

  // Toggle favorite
  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      if (!token) return navigate("/login");

      dispatch(setSavedProduct(_id));
      dispatch(likeToggleWishlistThunk(_id));
    },
    [_id, dispatch, navigate, token]
  );

  // Toggle like with optimistic UI
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
          // Revert on error
          setOptimisticLiked(!newLiked);
          setOptimisticLikesCount(currentLikesCount);
        });
    },
    [_id, dispatch, isLiked, currentLikesCount, userId]
  );

  // Handle image load for spinner
  const handleImageLoad = () => setImageLoaded(true);

  return (
    <article
      onClick={handleOfferClick}
      title={name}
      className="p-2 w-[86vw] md:w-52 lg:w-60 shadow-card bg-white rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
    >
      {/* Card Header */}
      <header className="flex justify-between items-center w-full text-sm text-[#A3A0DD] mb-2">
        <time>
          <TimeAgo postDate={createdAt} />
        </time>
        <p className="mr-1">بواسطة {Owner_id?.name}</p>
        <button
          onClick={handleFavorite}
          aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
          className="ml-2"
        >
          {isSaved ? (
            <Suspense fallback={<img src={emptyFavorite} alt="favorite" />}>
              <Lottie animationData={savedAnim} loop={false} />
            </Suspense>
          ) : (
            <img src={emptyFavorite} alt="empty favorite" className="w-6 h-5" />
          )}
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
            onLoad={handleImageLoad}
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
              <Suspense fallback={<img src={emptyHeart} alt="heart" />}>
                <Lottie
                  animationData={heartAnim}
                  loop={false}
                  className="w-6 h-6"
                />
              </Suspense>
            ) : (
              <img src={emptyHeart} alt="heart" className="w-6 h-6" />
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
            <img src={commitIcon} alt="comments" />
            <span className="text-xs text-[#535353]">{commentCount}</span>
          </Link>

          {/* Views */}
          <div className="flex items-center gap-1" aria-label="Views">
            <img src={viewsIcon} alt="views" />
            <span className="text-xs text-[#535353]">{views || 0}</span>
          </div>

          {/* Share */}
          <button
            onClick={(e) => e.stopPropagation()}
            aria-label="Share"
            className="flex items-center"
          >
            <img src={shareIcon} alt="share" />
          </button>
        </footer>
      </div>
    </article>
  );
};

export default memo(Card);
