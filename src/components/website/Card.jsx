import { Link } from "react-router";
import heart from "../../assets/images/heart.svg";

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
  return (
    <Link to="/offer-details">
      <div className="p-[.5rem] w-[70vw] md:w-fit  [.75rem] [1.375rem]  shadow-card bg-white rounded-[8px]">
        <div className="flex flex-col items-start w-[70vw] md:w-fit">
          <div className="flex-between mb-[.6rem] w-full  font-normal text-[.75rem] text-[#A3A0DD]">
            <p>{publishedDate}</p>
            <p>بواسطة {publisher}</p>
            <img src={heart} alt="" className="w-6 h-5 -translate-x-2" />
            <p></p>
          </div>
          <div className="w-full">
            <img src={img} alt="" className="w-[60vw] h-40 md:w-full object-cover rounded-md" />
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
    </Link>
  );
};

export default Card;
