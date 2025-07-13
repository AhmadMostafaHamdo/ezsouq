import { useNavigate } from "react-router-dom";
import heartempty from "../../assets/images/heartempty.svg";
import Cookies from "js-cookie";
import TimeAgo from "../TimeAgo";
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
  loading,
}) => {
  const navigate = useNavigate();
  const handleOfferClick = (e) => {
    const token = Cookies.get("token");
    if (!token) {
      e.preventDefault();
      navigate("/login");
    } else {
      navigate(`/offer-details/${_id}`);
    }
  };
  return (
    <div
      onClick={handleOfferClick}
      className="p-[.5rem] w-[86vw] md:w-60  [.75rem] [1.375rem]  shadow-card bg-white rounded-[8px] cursor-pointer"
    >
      <div className="flex flex-col items-start md:full">
        <div className="flex-between mb-[.6rem] w-full  font-normal text-[.75rem] text-[#A3A0DD] h-30">
          <p>
            <TimeAgo postDate={createdAt} />
          </p>
          <p>بواسطة {Owner_id?.name}</p>
          <img
            src={heartempty}
            alt=""
            className="w-6 h-5 -translate-x-12 md:-translate-x-2"
          />
          <p></p>
        </div>
        <div className="w-full">
          <img
            src={`https://ezsouq.store/uploads/images/${main_photos?.[0]}`}
            alt=""
            className="h-40 w-full object-cover rounded-md opacity-0"
            onLoad={(e) => e.target.classList.add("opacity-100")}
            loading="lazy"
          />
        </div>
        <div className="font-normal">
          <p className="text-[1.25rem] text-[#3F3D56] mt-[.4rem]">{name}</p>
          <p className="text-[#A3A0DD] text-[1rem]">
            {Governorate_name}-{city}
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
  );
};

export default Card;
