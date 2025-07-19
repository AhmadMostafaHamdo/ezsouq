// src/components/Card.jsx
import { Link, useNavigate } from "react-router-dom";
import emptyHeartCard from "../../assets/images/emptyHeartCard.svg";
import redHeart from "../../assets/images/redHeart.svg";
import commit from "../../assets/images/commit.svg";
import favorit from "../../assets/images/favorit.svg";
import emptyFavorit from "../../assets/images/emptyFavorit.svg";
import views from "../../assets/images/views.svg";
import share from "../../assets/images/share.svg";
import Cookies from "js-cookie";
import TimeAgo from "../TimeAgo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toggleLikeThunk } from "../../store/like/thunk/toggleLikeThunk";
import { getAllLikes } from "../../store/like/thunk/getAllLikes";
import Spinner from "../../feedback/loading/Spinner";
import { likeToggleWishlistThunk } from "../../store/wishlist/thunk/likeToggleWishlistThunk";

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
  const [liked, setLiked] = useState(false);
  // قراءة بيانات اللايك من الريدوكس لكل منتج
  const likeData = useSelector((state) => state.likes.likes[_id]) || {
    totalLikes: 0,
    loading: false,
  };
  const { likedFavorit } = useSelector((state) => state.wishlist);
  const { totalLikes, loading } = likeData;

  useEffect(() => {
    dispatch(getAllLikes(_id));
  }, [dispatch, _id]);

  const handleOfferClick = (e) => {
    const token = Cookies.get("token");
    if (!token) {
      e.preventDefault();
      navigate("/login");
    } else {
      navigate(`/offer-details/${_id}`);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    dispatch(toggleLikeThunk(_id));
  };
  const handelFavorit = (e) => {
    e.stopPropagation();
    dispatch(likeToggleWishlistThunk(_id));
  };
  return (
    <div
      onClick={handleOfferClick}
      title={name}
      className="p-[.5rem] w-[86vw] md:w-52 lg:w-60 shadow-card bg-white rounded-[8px] cursor-pointer"
    >
      <div className="flex flex-col items-start md:w-full">
        <div className="flex-between mb-[.6rem] w-full font-normal text-[.75rem] text-[#A3A0DD] h-30">
          <p>
            <TimeAgo postDate={createdAt} />
          </p>
          <p className="mr-1">بواسطة {Owner_id?.name}</p>
          <div onClick={handelFavorit}>
            <img
              src={likedFavorit ? favorit : emptyFavorit}
              alt=""
              className="w-6 h-5 mr-auto"
            />
          </div>
        </div>
        <div className="w-full">
          <img
            src={`https://ezsouq.store/uploads/images/${main_photos?.[0]}`}
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
              <img src={liked ? redHeart : emptyHeartCard} alt="heart" />
              <span className="font-normal text-[.625rem] text-[#535353]">
                {loading ? <Spinner size={14} /> : totalLikes}
              </span>
            </div>
            <Link
              to={`/commits/${_id}`}
              className="flex-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={commit} alt="comment" />
              <span className="font-normal text-[.625rem] text-[#535353]">
                22
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

export default Card;
