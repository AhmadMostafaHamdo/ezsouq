// pages/dashboard/Reports.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/dashoard/Pagination";
import profile from "../../assets/images/profileIcon.svg";
import viewsBlue from "../../assets/images/dashboard/viewsBlue.svg";
import sendmsg from "../../assets/images/dashboard/sendmsg.svg";
import block from "../../assets/images/dashboard/block.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import DataTable from "../../components/dashoard/DataTable";
import MobileCards from "../../components/dashoard/MobileCards";
import { getAllUsers } from "../../store/users/thunk/getAllUsers";
import { deleteUser } from "../../store/users/thunk/deleteUser";
import { columnsReports } from "../../data/dashboard";

const Reports = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 4;

  const {
    users = [],
    totalPages = 1,
    totalItems = 0,
    loading,
  } = useSelector((state) => state.users);

  const [showSetting, setShowSetting] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers({ page, limit }));
  }, [dispatch, page]);

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
        <div className="absolute left-[4.2rem] top-3 w-40 p-3 bg-white shadow rounded-lg z-30">
          <Link
            to={`/dashboard/reports/${user._id}`}
            className="flex gap-2 text-[#6C63FF]"
          >
            عرض التفاصيل
          </Link>
          <button className="flex gap-2">رسالة</button>
          <button className="flex gap-2">حظر</button>
          <button
            className="flex gap-2 text-[#BD4749]"
            onClick={() => dispatch(deleteUser(user._id))}
          >
            حذف
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-xl my-5">الإبلاغات</h1>

      {/* Desktop Table */}
      <div className="hidden sm:block p-3 bg-white rounded-tr-3xl rounded-tl-3xl overflow-x-auto">
        <DataTable
          data={users}
          columns={columnsReports}
          loading={loading}
          renderActions={renderActions}
        />
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden">
        <MobileCards
          data={users}
          loading={loading}
          renderCard={(user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-xl p-4 space-y-2 border"
            >
              <div className="flex items-center gap-3">
                <img src={profile} alt="صورة المستخدم" width={50} />
                <h2 className="font-bold text-lg">{user.name}</h2>
              </div>
              <p>
                <strong>البريد: </strong>
                {user.email}
              </p>
              <p>
                <strong>الهاتف: </strong>مياو المياو
              </p>
              <p>
                <strong>الإعلانات: </strong>50 مليون
              </p>
              <p>
                <strong>الحالة: </strong>
                <span className="text-[#30C795] bg-[#EAF9F4] rounded-md px-3 py-1">
                  نشط
                </span>
              </p>
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

export default Reports;
