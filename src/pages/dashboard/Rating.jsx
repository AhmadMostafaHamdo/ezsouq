// pages/dashboard/Rating.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import Pagination from "../../components/dashoard/Pagination";
import profile from "../../assets/images/profileIcon.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import block from "../../assets/images/dashboard/block.svg";
import star from "../../assets/images/start.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import { Link } from "react-router-dom";
import DataTable from "../../components/dashoard/DataTable";
import MobileCards from "../../components/dashoard/MobileCards";
import { columnsRating } from "../../data/dashboard";

const Rating = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 3;

  const [showSetting, setShowSetting] = useState(null);

  const {
    users = [],
    totalPages = 1,
    totalItems = 0,
    loading,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  // Table columns configuration
 
  // Render action buttons for each row
  const renderActions = (user) => (
    <div className="flex justify-center gap-2 relative">
      <img
        src={viewsBlue}
        alt="عرض"
        className="cursor-pointer"
        onClick={() =>
          setShowSetting(showSetting === user._id ? null : user._id)
        }
      />
      {showSetting === user._id && (
        <div className="absolute left-[4.2rem] top-3 w-36 p-3 bg-white shadow rounded-lg z-30">
          <Link
            to={`/dashboard/rating/${user._id}`}
            className="flex gap-2 text-[#6C63FF]"
          >
            عرض التفاصيل
          </Link>
          <div className="flex gap-2 text-yellow-600">
            <img src={star} alt="تقييم" />
            عرض التقييمات
          </div>
          <div className="flex gap-2 text-red-600">
            <img src={block} alt="حظر" />
            حظر
          </div>
          <div className="flex gap-2 text-red-700">
            <img src={deleteIcon} alt="حذف" />
            حذف
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto">
      {/* Header + Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between my-5 w-full lg:w-[60vw] gap-3">
        <h1 className="text-xl font-bold">التقييمات</h1>
        <div className="relative w-full lg:w-[40vw]">
          <input
            type="text"
            placeholder="بحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pr-8 rounded-md border border-gray-300 text-sm outline-none"
            aria-label="حقل البحث"
          />
          <img
            src={profile}
            alt="بحث"
            className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-4"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block p-3 bg-white rounded-tr-3xl rounded-tl-3xl overflow-x-auto">
        <DataTable
          data={users}
          columns={columnsRating  }
          loading={loading}
          renderActions={renderActions}
        />
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        <MobileCards
          data={users}
          loading={loading}
          renderCard={(user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={profile}
                  alt="صورة المستخدم"
                  className="w-16 h-16 rounded-full border-2 border-primary opacity-60 shadow-sm"
                />
                <div>
                  <p className="font-semibold text-lg text-[#808080f5]">
                    {user.name}
                  </p>
                  <p className="text-[#808080de] text-sm">{user.email}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between mb-4 text-[#808080fb]">
                <div className="flex flex-col items-center flex-1">
                  <p className="text-xs mb-1">⭐ التقييم</p>
                  <span className="font-bold text-base">
                    {user.averageRating?.toFixed(1) || "0"}
                  </span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <p className="text-xs mb-1">التقييمات</p>
                  <span className="font-bold text-base">
                    {user.ratings?.length || 0}
                  </span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <p className="text-xs mb-1">الإعلانات</p>
                  <span className="font-bold text-base text-green-600">
                    {user.adsCount || 0}
                  </span>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={limit}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default Rating;
