// ✅ pages/dashboard/Reports.jsx (Final Mobile + Desktop version)
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/dashoard/Pagination";
import Spinner from "../../feedback/loading/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { Eye, Ban, Undo2, Trash2 } from "lucide-react";

// Images
import iconSettingUser from "../../assets/images/dashboard/iconSettingUser.svg";

// Data & Thunks
import { columnsReports } from "../../data/dashboard";
import { getAllReports } from "../../store/report/thunk/getAllReports";
import { deleteReport } from "../../store/report/thunk/deleteReport";
import { banUser } from "../../store/users/thunk/banUser";
import DeleteOrBanModal from "../../components/dashoard/DeleteOrBanModal";

const Reports = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSetting, setShowSetting] = useState(null);

  // Modal state
  const [modal, setModal] = useState({
    open: false,
    type: "",
    reportId: null,
    userId: null,
  });

  const {
    reports = [],
    pages = 1,
    total = 0,
    loading,
  } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(getAllReports({ page, limit: 4 }));
  }, [dispatch, page]);

  const filteredReports = useMemo(() => {
    if (!search) return reports;
    return reports.filter(
      (r) =>
        r?.reporter?.name?.toLowerCase().includes(search.toLowerCase()) ||
        r?.reported?.name?.toLowerCase().includes(search.toLowerCase()) ||
        r?.reason?.toLowerCase().includes(search.toLowerCase())
    );
  }, [reports, search]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("ar-EG") : "-";

  const openModal = (type, reportId = null, userId = null) => {
    setModal({ open: true, type, reportId, userId });
  };

  const handleConfirm = async () => {
    try {
      if (modal.type === "delete") {
        await dispatch(deleteReport(modal.reportId));
        toast.success("تم حذف الإبلاغ بنجاح");
      } else if (modal.type === "ban" || modal.type === "unban") {
        const action = modal.type;
        await dispatch(banUser({ id: modal.userId, action }));
        toast.success(
          action === "ban"
            ? "تم حظر المستخدم بنجاح"
            : "تم إلغاء حظر المستخدم بنجاح"
        );
      }

      dispatch(getAllReports({ page, limit: 4 }));
    } catch {
      toast.error("حدث خطأ أثناء تنفيذ العملية");
    } finally {
      setModal({ open: false, type: "", reportId: null, userId: null });
    }
  };

  const renderActions = (report) => (
    <div className="flex justify-center gap-2 relative">
      <img
        src={iconSettingUser}
        alt="إعدادات"
        className="cursor-pointer"
        onClick={() =>
          setShowSetting(showSetting === report._id ? null : report._id)
        }
      />
      {showSetting === report._id && (
        <div className="absolute left-[4.2rem] top-3 w-48 p-3 bg-white shadow-lg rounded-xl z-20 border border-[#E0E0E0]">
          <Link
            to={`/dashboard/reports/${report._id}`}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#EEF2FF] text-[#3B82F6] font-medium"
          >
            <Eye size={18} />
            عرض التفاصيل
          </Link>

          {report?.reported?.Role === "BANNED" ? (
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#EAF9F4] text-[#22C55E] font-medium w-full"
              onClick={() => openModal("unban", null, report?.reported?.id)}
            >
              <Undo2 size={18} />
              إلغاء الحظر
            </button>
          ) : (
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#FFE8E8] text-[#EF4444] font-medium w-full"
              onClick={() => openModal("ban", null, report?.reported?.id)}
            >
              <Ban size={18} />
              حظر المستخدم
            </button>
          )}

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#F5DADA] text-[#BD4749] font-medium w-full"
            onClick={() => openModal("delete", report._id)}
          >
            <Trash2 size={18} />
            حذف الإبلاغ
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto min-h-[80vh] p-2 sm:p-5">
      <ToastContainer />

      {/* Header */}
      <div className="mb-4 w-full sm:w-[50%] relative flex-between gap-10">
        <h1 className="text-lg sm:text-xl font-bold my-5">الإبلاغات</h1>
        <input
          type="text"
          placeholder="بحث عن إبلاغ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 pr-8 rounded-md border border-[#D1D5DB] text-sm outline-none focus:ring-1 focus:ring-[#3B82F6]"
        />
      </div>

      {/* ===== Desktop Table ===== */}
      <div className="hidden sm:block p-3 bg-white rounded-tr-3xl rounded-tl-3xl">
        <table className="w-full text-sm font-medium">
          <thead>
            <tr className="text-[#959595] text-sm ">
              {columnsReports.map((col) => (
                <th key={col.key} className="px-2 py-4 text-center">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-10 text-center">
                  <Spinner />
                </td>
              </tr>
            ) : filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr
                  key={report._id || index}
                  className="border-t border-[#eee]"
                >
                  <td className="py-4 text-center">{index + 1}</td>
                  <td className="py-4 text-center">
                    {report?.reporter?.name || "-"}
                  </td>
                  <td className="py-4 text-center">
                    {report?.reported?.name || "-"}
                  </td>
                  <td className="py-4 text-center">
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
      <div className="sm:hidden flex flex-col gap-3">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : filteredReports.length > 0 ? (
          filteredReports.map((r, i) => (
            <div
              key={r._id || i}
              className="bg-white p-4 rounded-xl shadow border border-[#E5E7EB]"
            >
              <p className="font-semibold text-[#374151] mb-1">
                رقم الإبلاغ: <span className="text-[#6B7280]">{i + 1}</span>
              </p>
              <p className="text-sm">
                المبلّغ:{" "}
                <span className="text-[#111827]">{r?.reporter?.name}</span>
              </p>
              <p className="text-sm">
                المُبلّغ عليه:{" "}
                <span className="text-[#111827]">{r?.reported?.name}</span>
              </p>
              <p className="text-sm">
                السبب: <span className="text-[#EF4444]">{r?.reason}</span>
              </p>
              <p className="text-xs text-gray-500">
                التاريخ: {formatDate(r?.createdAt)}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <Link
                  to={`/dashboard/reports/${r._id}`}
                  className="text-[#3B82F6] text-sm font-medium"
                >
                  عرض التفاصيل
                </Link>
                {renderActions(r)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-10">لا يوجد إبلاغات</p>
        )}
      </div>

      {/* Pagination */}
      {!loading && pages > 1 && (
        <div className="mt-5">
          <Pagination
            currentPage={page}
            totalPages={pages}
            totalItems={total}
            itemsPerPage={4}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <DeleteOrBanModal
          type={modal.type}
          onConfirm={handleConfirm}
          onCancel={() =>
            setModal({ open: false, type: "", reportId: null, userId: null })
          }
        />
      )}
    </div>
  );
};

export default Reports;
