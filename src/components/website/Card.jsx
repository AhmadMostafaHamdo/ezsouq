import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useMemo, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Lottie from "lottie-react";

import emptyHeart from "../../assets/images/emptyHeart.svg";
import commit from "../../assets/images/commit.svg";
import emptyFavorit from "../../assets/images/emptyFavorit.svg";
import viewsImg from "../../assets/images/views.svg";
import share from "../../assets/images/share.svg";
import TimeAgo from "../TimeAgo";
import { likeToggleWishlistThunk } from "../../store/wishlist/thunk/likeToggleWishlistThunk";
import { toggleLikeProduct } from "../../store/product/thunk/toggleLikeProduct";
import {
  setSavedProduct,
  setLikeLocal,
} from "../../store/product/productSlice";
import imgLiked from "../../assets/lottifiles/heartAnmation.json";
import saved from "../../assets/lottifiles/saved.json";

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

  const userId = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token).id;
    } catch {
      return null;
    }
  }, [token]);

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
      userId && Array.isArray(likesFromStore)
        ? likesFromStore.includes(userId)
        : false,
    [likesFromStore, userId]
  );
  const isLiked = optimisticLiked !== null ? optimisticLiked : isLikedFromStore;
  const currentLikesCount =
    optimisticLikesCount !== null
      ? optimisticLikesCount
      : likesFromStore?.length || 0;

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

  const handleOfferClick = useCallback(() => {
    if (!token) navigate("/login");
    else navigate(`/offer-details/${_id}`);
  }, [_id, navigate, token]);

  const handelFavorit = useCallback(
    (e) => {
      e.stopPropagation();
      if (!token) {
        navigate("/login");
        return;
      }
      dispatch(setSavedProduct(_id));
      dispatch(likeToggleWishlistThunk(_id));
    },
    [_id, dispatch, navigate, token]
  );

  const handelLiked = useCallback(
    (e) => {
      e.stopPropagation();
      if (!token) {
        navigate("/login");
        return;
      }

      const newLikedState = !isLiked;
      setOptimisticLiked(newLikedState);
      setOptimisticLikesCount(
        newLikedState ? currentLikesCount + 1 : currentLikesCount - 1
      );

      dispatch(toggleLikeProduct({ productId: _id }))
        .unwrap()
        .then(() => {
          dispatch(
            setLikeLocal({ productId: _id, userId, liked: newLikedState })
          );
          setOptimisticLiked(null);
          setOptimisticLikesCount(null);
        })
        .catch(() => {
          setOptimisticLiked(!newLikedState);
          setOptimisticLikesCount(currentLikesCount);
        });
    },
    [_id, dispatch, isLiked, currentLikesCount, userId]
  );

  return (
    <div
      onClick={handleOfferClick}
      title={name}
      className="p-[.5rem] w-[86vw] md:w-52 lg:w-60 m-auto shadow-card bg-white rounded-[8px] cursor-pointer"
    >
      <div className="flex flex-col items-start md:w-full">
        <div className="flex-between mb-[.6rem] w-full font-normal text-[.75rem] text-[#A3A0DD] h-30">
          <p>
            <TimeAgo postDate={createdAt} />
          </p>
          <p className="mr-1">بواسطة {Owner_id?.name}</p>
          <div onClick={handelFavorit}>
            {isSaved ? (
              <Lottie animationData={saved} loop={false} />
            ) : (
              <img src={emptyFavorit} alt="" className="w-6 h-5 mr-auto" />
            )}
          </div>
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="h-32 w-full object-cover rounded-md transition-opacity duration-300 opacity-0"
            onLoad={(e) => e.target.classList.add("opacity-100")}
          />
        )}
        <div className="font-normal w-full">
          <p className="text-[1.1rem] text-[#3F3D56] mt-[.4rem] truncate">
            {name}
          </p>
          <p className="text-[#A3A0DD] text-[.9rem]">
            {Governorate_name}-{city}
          </p>
          <div className="text-[.8rem] my-1 flex-between">
            <span className="ml-5 text-[#A3A0DD] font-bold">
              {type} أوتوماتيك
            </span>
            <span className="text-[#3F3D56] text-[.87rem] font-bold">
              {price} ل.س
            </span>
          </div>
          <div className="flex-between mt-4">
            <div className="flex-center gap-2">
              <div
                className="w-8 h-6 flex-center"
                onClick={handelLiked}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                {isLiked ? (
                  <Lottie
                    animationData={imgLiked}
                    loop={false}
                    className="inline"
                  />
                ) : (
                  <img src={emptyHeart} alt="heart" className="inline" />
                )}
              </div>
              <span className="font-normal text-[.625rem] text-[#535353]">
                {currentLikesCount}
              </span>
            </div>
            <Link
              to={`/commits/${_id}`}
              className="flex-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={commit} alt="comment" />
              <span className="font-normal text-[.625rem] text-[#535353]">
                {commentCount}
              </span>
            </Link>
            <div className="flex-center gap-2">
              <img src={viewsImg} alt="views" />
              <span className="font-normal text-[.625rem] text-[#535353]">
                {views || 0}
              </span>
            </div>
            <div
              className="flex-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={share} alt="share" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
