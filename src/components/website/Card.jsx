  import { Link, useNavigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { memo, useCallback, useMemo, useState, Suspense, lazy } from "react";
  import Cookies from "js-cookie";
  import emptyHeart from "../../assets/images/emptyHeart.svg";
  import commitIcon from "../../assets/images/commit.svg";
  import emptyFavorite from "../../assets/images/emptyFavorit.svg";
  import viewsIcon from "../../assets/images/views.svg";
  import shareIcon from "../../assets/images/share.svg";

  import TimeAgo from "../TimeAgo";
  import { likeToggleWishlistThunk } from "../../store/wishlist/thunk/likeToggleWishlistThunk";
  import { toggleLikeProduct } from "../../store/product/thunk/toggleLikeProduct";
  import {
    setSavedProduct,
    setLikeLocal,
  } from "../../store/product/productSlice";

  // Lazy load heavy animations
  const Lottie = lazy(() => import("lottie-react"));
  import heartAnim from "../../assets/lottifiles/heartAnmation.json";
  import savedAnim from "../../assets/lottifiles/saved.json";
  import useUserId from "../../hooks/useUserId";
  import Spinner from "../../feedback/loading/Spinner";
import { setLikeLocalByCat } from "../../store/getProductsByCat/getProductByCatSlice";

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
  }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = Cookies.get("token");

    // ✅ Decode token safely
    const userId = useUserId();
    const [imageLoaded, setIsImageLoaded] = useState(false);
    const [optimisticLiked, setOptimisticLiked] = useState(null);
    const [optimisticLikesCount, setOptimisticLikesCount] = useState(null);

    const { savedProducts = [], products } = useSelector(
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
      () => commentsByProductId?.[_id]?.length || 0,
      [commentsByProductId, _id]
    );

    const isSaved = useMemo(
      () => Array.isArray(savedProducts) && savedProducts.includes(_id),
      [savedProducts, _id]
    );

    const imageUrl = useMemo(
      () =>
        main_photos?.[0]
          ? `https://api.ezsouq.store/uploads/images/${main_photos[0]}`
          : null,
      [main_photos]
    );

    // ✅ Handlers
    const handleOfferClick = useCallback(() => {
      navigate(token ? `/offer-details/${_id}` : "/login");
    }, [_id, navigate, token]);

    const handleFavorite = useCallback(
      (e) => {
        e.stopPropagation();
        if (!token) return navigate("/login");
        dispatch(setSavedProduct(_id));
        dispatch(likeToggleWishlistThunk(_id));
      },
      [_id, dispatch, navigate, token]
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
    const handleImageLoad = () => {
      setIsImageLoaded(true);
    };
    return (
      <article
        onClick={handleOfferClick}
        title={name}
        className="p-2 w-[86vw] md:w-52 lg:w-60 m-auto shadow-card bg-white rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
      >
        <div className="flex flex-col items-start">
          {/* Header */}
          <header className="flex justify-between items-center w-full text-sm text-[#A3A0DD] mb-2">
            <time>
              <TimeAgo postDate={createdAt} />
            </time>
            <p className="mr-1">بواسطة {Owner_id?.name}</p>
            <button
              onClick={handleFavorite}
              aria-label={
                isSaved ? "Remove from favorites" : "Add to favorites"
              }
              className="ml-2"
            >
              {isSaved ? (
                <Suspense fallback={<img src={emptyFavorite} alt="favorite" />}>
                  <Lottie animationData={savedAnim} loop={false} />
                </Suspense>
              ) : (
                <img
                  src={emptyFavorite}
                  alt="empty favorite"
                  className="w-6 h-5"
                />
              )}
            </button>
          </header>

          <div className="relative h-32 w-full">
            {/* Spinner أثناء التحميل */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-md">
                <Spinner />
              </div>
            )}

            {/* الصورة */}
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              onLoad={handleImageLoad}
              className={`h-32 w-full object-cover rounded-md transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Body */}
          <div className="w-full mt-2">
            <h2 className="text-lg text-[#3F3D56] font-medium truncate">
              {name}
            </h2>
            <p className="text-[#A3A0DD] text-sm">
              {Governorate_name} - {city}
            </p>

            <div className="flex justify-between items-center my-2 text-sm">
              <span className="text-[#A3A0DD] font-bold">{type} أوتوماتيك</span>
              <span className="text-[#3F3D56] font-bold">{price} ل.س</span>
            </div>

            {/* Footer Actions */}
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
                <span className="text-xs text-[#535353]">
                  {currentLikesCount}
                </span>
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
        </div>
      </article>
    );
  };

  export default memo(Card);
