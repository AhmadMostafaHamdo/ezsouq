// components/common/UserActionsMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import block from "../../assets/images/dashboard/block.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";

const UserActionsMenu = ({ user, onDelete }) => {
  return (
    <div className="w-36 leading-7 absolute left-[4.2rem] top-3 rounded-lg bg-white p-3 shadow-md">
      <Link to={user._id} className="text-[#6C63FF] flex gap-2 cursor-pointer">
        <img src={viewsBlue} alt="" /> عرض التفاصيل
      </Link>
      <p className="flex gap-2 cursor-pointer">
        <img src={block} alt="" /> حظر
      </p>
      <p className="flex gap-2 cursor-pointer">
        <img src={deleteIcon} alt="" />
        <span className="text-[#BD4749]" onClick={onDelete}>
          حذف
        </span>
      </p>
    </div>
  );
};

export default UserActionsMenu;
