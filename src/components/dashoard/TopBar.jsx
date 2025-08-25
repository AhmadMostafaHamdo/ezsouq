import React from "react";
import notification from "../../assets/images/dashboard/notification.svg";
import personalImg from "../../assets/images/personal.svg";

const TopBar = () => {
  
  return (
    <div className="mt-4">
      <div className="flex-between">
        <h1 className="text-[#23193E]">لوحة تحكم الأدمن</h1>
        <div className="flex flex-center gap-4">
          <div className="relative">
            <img src={notification} alt="" className="ml-3"/>
            <div className="absolute -top-3 left-1 w-5 h-5 rounded-full flex-center bg-primary text-white text-[.9rem]">
              3
            </div>
          </div>
          <div>
            <img src={personalImg} alt="" />
          </div>
          <div className="leading-5">
            <h3 className="font-semibold text-[.8rem]">رنيم الأمين</h3>
            <p className="text-[#959595] text-[-9rem]">ranima@gmail.com</p>
          </div>
        </div>
      </div>
      <hr className="text-[#D2D2D2] my-3" />
    </div>
  );
};

export default TopBar;
