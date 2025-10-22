// components/common/UserActionsMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import block from "../../assets/images/dashboard/block.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";

const UserActionsMenu = ({ user, onDelete, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // Animation for smooth fade & slide effect
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-36 leading-7 absolute left-[4.2rem] top-3 rounded-lg bg-white p-3 shadow-md z-50"
        >
          {/* View details */}
          <Link
            to={user._id}
            className="text-[#6C63FF] flex gap-2 cursor-pointer hover:text-[#534CF2] transition-colors duration-150"
          >
            <img src={viewsBlue} alt="عرض التفاصيل" />
            عرض التفاصيل
          </Link>

          {/* Ban user */}
          <p className="flex gap-2 cursor-pointer hover:text-[#BD4749] transition-colors duration-150">
            <img src={block} alt="حظر المستخدم" />
            حظر
          </p>

          {/* Delete user */}
          <p
            className="flex gap-2 cursor-pointer hover:text-[#9B383A] transition-colors duration-150"
            onClick={onDelete}
          >
            <img src={deleteIcon} alt="حذف المستخدم" />
            <span className="text-[#BD4749]">حذف</span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserActionsMenu;
