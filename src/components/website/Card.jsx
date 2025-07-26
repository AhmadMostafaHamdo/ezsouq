// src/components/Card.jsx
import { Link, useNavigate } from "react-router-dom";
import emptyHeart from "../../assets/images/emptyHeart.svg";
import commit from "../../assets/images/commit.svg";
import emptyFavorit from "../../assets/images/emptyFavorit.svg";
import views from "../../assets/images/views.svg";
import share from "../../assets/images/share.svg";
import Cookies from "js-cookie";
import TimeAgo from "../TimeAgo";
import { useDispatch, useSelector } from "react-redux";
import { likeToggleWishlistThunk } from "../../store/wishlist/thunk/likeToggleWishlistThunk";
import { toggleLikeProduct } from "../../store/product/thunk/toggleLikeProduct";
import { memo, useCallback, useEffect, useState } from "react";
import imgLiked from "../../assets/lottifiles/heartAnmation.json";
import saved from "../../assets/lottifiles/saved.json";
import Lottie from "lottie-react";
import { setSavedProduct } from "../../store/product/productSlice";
import { getAllLikesThunk } from "../../store/product/thunk/getAllLikesThunk";

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
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products = [], savedProducts = [] } = useSelector(
    (state) => state.products
  );
  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.users);
  const userId = user?._id;

  const productData = products.find((p) => p._id === _id) || { likes: [] };

  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const likesArray = Array.isArray(productData.likes)
      ? productData.likes
      : [];
    setLiked(likesArray.includes(userId));
    setTotalLikes(likesArray.length);
  }, [productData.likes, userId]);

  const isSaved = Array.isArray(savedProducts)
    ? savedProducts.includes(_id)
    : false;

  const handleOfferClick = useCallback(
    (e) => {
      const token = Cookies.get("token");
      if (!token) {
        e.preventDefault();
        navigate("/login");
      } else {
        navigate(`/offer-details/${_id}`);
      }
    },
    [_id, navigate]
  );

  const handleLike = useCallback(
    async (e) => {
      e.stopPropagation();
      const newLiked = !liked;
      setLiked(newLiked);
      setTotalLikes((prev) => (newLiked ? prev + 1 : prev - 1));
      dispatch(toggleLikeProduct(_id));
    },
    [_id, dispatch, liked]
  );

  const handelFavorit = useCallback(
    (e) => {
      e.stopPropagation();
      dispatch(setSavedProduct(_id));
      dispatch(likeToggleWishlistThunk(_id));
    },
    [_id, dispatch]
  );

  return (
    <div
      onClick={handleOfferClick}
      title={name}
      className="p-[.5rem] w-[86vw] md:w-52 lg:w-60 m-auto shadow-card bg-white rounded-[8px] cursor-pointer"
    >
      <div className="flex flex-col items-start md:w-full ">
        <div className="flex-between mb-[.6rem] w-full font-normal text-[.75rem] text-[#A3A0DD] h-30">
          <p>
            <TimeAgo postDate={createdAt} />
          </p>
          <p className="mr-1">بواسطة {Owner_id?.name}</p>
          <div onClick={handelFavorit}>
            {isSaved ? (
              <Lottie animationData={saved} loop={false} />
            ) : (
              <img
                src={emptyFavorit}
                alt=""
                className="w-6 h-5 mr-auto"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <img
            src={`https://api.ezsouq.store/uploads/images/${main_photos?.[0]}`}
            alt=""
            className="h-32 w-full object-cover rounded-md opacity-0"
            onLoad={(e) => e.target.classList.add("opacity-100")}
            loading="lazy"
          />
        </div>
        <div className="font-normal w-full">
          <p className="text-[1.1rem] text-[#3F3D56] mt-[.4rem]">{name}</p>
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
            <div className="flex-center gap-2" onClick={handleLike}>
              <div className="w-8 h-6 flex-center">
                {liked ? (
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
                {totalLikes}
              </span>
            </div>
            <Link
              to={`/commits/${_id}`}
              className="flex-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={commit} alt="comment" />
              <span className="font-normal text-[.625rem] text-[#535353]">
                {comments?.length}
              </span>
            </Link>
            <div className="flex-center gap-2">
              <img src={views} alt="views" />
              <span className="font-normal text-[.625rem] text-[#535353]">
                33
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
