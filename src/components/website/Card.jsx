import { Link, useNavigate } from "react-router-dom";
import heart from "../../assets/images/heart.svg";
import CardSketlon from "../../assets/sketlon/product";
import Cookies from "js-cookie";
const Card = ({
  title,
  governorate,
  publishedDate,
  publisher,
  img,
  type,
  city,
  price,
}) => {
  const navigate = useNavigate();
  const handleOfferClick = (e) => {
    const token = Cookies.get("token");
    if (!token) {
      e.preventDefault();
      navigate("/login");
    } else {
      navigate("/offer-details");
    }
  };
  return (
    <CardSketlon isLoading={false}>
      <div
        onClick={handleOfferClick}
        className="p-[.5rem] w-[86vw] md:w-60  [.75rem] [1.375rem]  shadow-card bg-white rounded-[8px] cursor-pointer"
      >
        <div className="flex flex-col items-start md:full">
          <div className="flex-between mb-[.6rem] w-full  font-normal text-[.75rem] text-[#A3A0DD] h-30">
            <p>{publishedDate}</p>
            <p>بواسطة {publisher}</p>
            <img
              src={heart}
              alt=""
              className="w-6 h-5 -translate-x-16 md:-translate-x-6"
            />
            <p></p>
          </div>
          <div className="w-full">
            <img
              src={img}
              alt=""
              className="h-40 w-full object-cover rounded-md"
            />
          </div>
          <div className="font-normal">
            <p className="text-[1.25rem] text-[#3F3D56] mt-[.4rem]">{title}</p>
            <p className="text-[#A3A0DD] text-[1rem]">
              {governorate}-{city}
            </p>
            <div className="text-[.9rem] my-1">
              <span className="ml-5 text-[#A3A0DD] font-bold">{type}</span>
              <span className="text-[#3F3D56] text-[1rem] font-bold">
                {price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardSketlon>
  );
};

export default Card;
