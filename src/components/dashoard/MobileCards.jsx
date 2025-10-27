import React from "react";
import Spinner from "../../feedback/loading/Spinner";
import profile from "../../assets/images/profileIcon.svg";

/**
 * Mobile view cards for products
 */
const MobileCards = ({ data, loading, onDelete }) => {
  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spinner size={50} />
      </div>
    );

  if (!data?.length)
    return (
      <p className="text-center py-4 text-gray-500">لا يوجد بيانات حالياً</p>
    );

  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.isArray(data) &&
        data.length > 0 &&
        data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2"
          >
            <img
              src={
                item.main_photos?.[0]
                  ? `${import.meta.env.VITE_API_BASE_URL}/uploads/images/${item.main_photos[0]}`
                  : profile
              }
              alt={item.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="font-semibold text-[#2C7A7B]">{item.name}</h3>
            <p className="text-gray-600">{item.Category_name}</p>
            <p className="text-gray-500">
              {item.Governorate_name} - {item.city}
            </p>
            <p className="text-[#2C7A7B] font-semibold">
              {item.price?.toLocaleString()} ل.س
            </p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>الإعجابات: {item.likes?.length || 0}</span>
              <span>المشاهدات: {item.views || 0}</span>
            </div>
            <button
              onClick={() => onDelete?.(item._id)}
              className="flex items-center gap-2 justify-center mt-2 px-4 py-1 rounded-md bg-[#BD4749] text-white hover:bg-[#9B383A] duration-150"
            >
              حذف
            </button>
          </div>
        ))}
    </div>
  );
};

export default MobileCards;
