// pages/dashboard/Reports.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/dashoard/Pagination";
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";
import block from "../../assets/images/dashboard/block.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import { columnsReports } from "../../data/dashboard";
import { getAllReports } from "../../store/report/thunk/getAllReports";
import { deleteReport } from "../../store/report/thunk/deleteReport";
import Spinner from "../../feedback/loading/Spinner";
import { ToastContainer } from "react-toastify";
import { banUser } from "../../store/users/thunk/banUser";

const Reports = () => {
  const dispatch = useDispatch();

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 4;
  // Redux state
  const {
    reports = [],
    pages = 1,
    total = 0,
    loading,
  } = useSelector((state) => state.report);

  // For toggling settings menu
  const [showSetting, setShowSetting] = useState(null);

  // Fetch reports when component mounts or page changes
  useEffect(() => {
    dispatch(getAllReports({ page, limit }));
  }, [dispatch, page]);

  // Render action menu for each report
  const renderActions = (report) => (
    <div className="flex justify-center gap-2 relative">
      {/* Settings icon */}
      <img
        src={iconSettingUser}
        alt="إعدادات"
        className="cursor-pointer"
        onClick={() =>
          setShowSetting(showSetting === report._id ? null : report._id)
        }
      />

      {/* Dropdown menu */}
      {showSetting === report._id && (
        <div className="absolute left-[4.2rem] top-3 w-40 p-3 bg-white shadow rounded-lg z-50">
          <Link
            to={`/dashboard/reports/${report._id}`}
            className="flex gap-2 text-[#6C63FF]"
          >
            عرض التفاصيل
          </Link>

          <button
            className="flex gap-2"
            onClick={() => {
              console.log("first");
              dispatch(banUser({ id: report?.reported?.id, action: "ban" }));
            }}
          >
            <img src={block} alt="حظر" />
            حظر
          </button>
          <button
            onClick={() => {
              dispatch(deleteReport(report._id));
              dispatch(getAllReports({ page, limit }));
            }}
            className="flex items-center gap-2 transition-colors duration-200"
            style={{ color: "#BD4749" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#A10000")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#BD4749")}
          >
            <img
              src={deleteIcon}
              alt="حذف"
              style={{ width: "16px", height: "16px" }}
            />
            حذف
          </button>
        </div>
      )}
    </div>
  );

  // Helper to safely format date
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("ar-EG") : "-";

  return (
    <div className="container mx-auto p-2 sm:p-5">
      <ToastContainer />
      <h1 className="text-lg sm:text-xl font-bold my-5">الإبلاغات</h1>

      {/* ===== Desktop / Tablet Table ===== */}
      <div className="hidden sm:block p-3 bg-white rounded-tr-3xl rounded-tl-3xl">
        <table className="w-full p-10 text-sm font-medium min-w-max bg-white">
          <thead>
            <tr className="text-[#959595] text-sm">
              {columnsReports.map((col) => (
                <th key={col.key} className="px-2 py-3 text-center">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-10">
                  <div className="flex justify-center items-center">
                    <Spinner />
                  </div>
                </td>
              </tr>
            ) : Array.isArray(reports) && reports.length > 0 ? (
              reports.map((report, index) => (
                <tr
                  key={report._id || index}
                  className="border-t border-[#eee]"
                >
                  <td className="py-3 text-center">{index + 1}</td>
                  <td className="py-3 text-center">
                    {report?.reporter?.name || "-"}
                  </td>
                  <td className="py-3 text-center">
                    {report?.reported?.name || "-"}
                  </td>
                  <td className="py-3 text-center">
                    {formatDate(report?.createdAt)}
                  </td>
                  <td className="text-center text-[#BD4749]">
                    {report?.reason || "-"}
                  </td>
                  <td className="text-center">{renderActions(report)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-5 text-gray-500">
                  لا يوجد إبلاغات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="sm:hidden space-y-4">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spinner />
          </div>
        ) : Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report, index) => (
            <div
              key={report._id || index}
              className="bg-white rounded-xl shadow p-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">{index + 1}</h2>
                {renderActions(report)}
              </div>
              <p className="text-sm mt-2">
                <span className="font-semibold">المُبلّغ:</span>{" "}
                {report?.reporter?.name || "-"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">المُبلّغ عليه:</span>{" "}
                {report?.reported?.name || "-"}
              </p>
              <p className="text-sm">
                <span className="font-semibold">السبب:</span>{" "}
                <span className="text-[#BD4749]">{report?.reason || "-"}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(report?.createdAt)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center py-5 text-gray-500">لا يوجد إبلاغات</p>
        )}
      </div>

      {/* ===== Pagination ===== */}
      {!loading && pages > 1 && (
        <div className="mt-5">
          <Pagination
            currentPage={page}
            totalPages={pages}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Reports;
