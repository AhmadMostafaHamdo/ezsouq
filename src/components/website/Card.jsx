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
    <div className="p-[.625rem]  [.75rem] [1.375rem] w-[100vw] md:w-[80vw] lg:w-[42vw] shadow-card bg-white rounded-[8px]">
      <div className="flex-between">
        <div className="flex items-center">
          <div className="text-[.75rem] font-normal ml-[5px] text-[#A3A0DD] text-nowrap w-[10.81rem]">
            <div className="flex-between mb-[.5rem]">
              <p>{publishedDate}</p>
              <p>بواسطة {publisher}</p>
            </div>
            <img
              src={img}
              alt=""
              className="w-[9.75rem] h-[9.75rem] object-cover"
            />
          </div>
          <div>
            <p className="text-[1rem] md:text-[1.5rem] text-[#3F3D56] font-normal">
              {title}
            </p>
            <div className="font-normal text-[#A3A0DD] text-[10px] md:text-[1rem]">
              <p>
                {governorate}-{city}
              </p>
              <p>{type}</p>
            </div>
            <p className="font-bold text-[12px] md:text-[1.25rem] text-[#3F3D56] mt-[1.187rem]">
              {price}
            </p>
          </div>
        </div>
        <div className="self-start">
          <img
            src={heart}
            alt=""
            className=" w-[1.875rem] h-[1.56rem] flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
