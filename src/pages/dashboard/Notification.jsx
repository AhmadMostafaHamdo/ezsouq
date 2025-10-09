import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "../../feedback/loading/Spinner";
import Pagination from "../../components/dashoard/Pagination";
import DeleteOrBanModal from "../../components/dashoard/DeleteOrBanModal";

// 🖼️ Icons
import eye from "../../assets/images/dashboard/viewsBlue.svg";
import deleteIcon from "../../assets/images/dashboard/deleteIcon.svg";
import searchIcon from "../../assets/images/search.svg";

import { getAllMessages } from "../../store/messages/thunk/getAllMessages";

// ✅ Modal component to show message details
const MessageDetailsModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-[#00000080] z-50 flex items-center justify-center">
    <div className="bg-[#FFFFFF] rounded-xl shadow-lg w-96 p-5 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-[#ca4646] hover:text-[#000000] text-xl"
      >
        ✖
      </button>
      <h2 className="text-[#1F2937] text-lg font-bold text-center mb-2">
        تفاصيل الرسالة
      </h2>
      <p className="text-[#374151] mb-1">
        <span className="font-semibold">الاسم:</span> {message?.name}
      </p>
      <p className="text-[#374151] mb-1">
        <span className="font-semibold">الموضوع:</span> {message?.subject}
      </p>
      <p className="text-[#374151] mt-2">
        <span className="font-semibold">الرسالة:</span> {message?.message}
      </p>
      <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="px-4 py-1 rounded-md bg-[#2563EB] text-[#FFFFFF] hover:bg-[#1D4ED8]"
        >
          إغلاق
        </button>
      </div>
    </div>
  </div>
);

const Notification = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.messages);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // ✅ State for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ✅ State for message details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsMessage, setDetailsMessage] = useState(null);

  // === Fetch messages when page changes ===
  useEffect(() => {
    dispatch(getAllMessages(page));
  }, [dispatch, page]);

  const allMessages = messages?.messages || [];
  const totalPages = messages?.totalPages || 1;
  const currentPage = messages?.page || 1;
  const totalItems = messages?.total || 0;

  // === Search filter ===
  const filtered = allMessages.filter(
    (m) =>
      m?.name?.toLowerCase().includes(search.toLowerCase()) ||
      m?.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m?.message?.toLowerCase().includes(search.toLowerCase())
  );

  // === Delete message from server ===
  const handleDelete = async () => {
    if (!selectedMessage?._id) return;
    try {
      setDeleting(true);
      const token = Cookies.get("token");

      await axios.delete(`/admin/delete_message/${selectedMessage._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      toast.success("✅ تم حذف الرسالة بنجاح");
      setShowDeleteModal(false);
      setSelectedMessage(null);

      dispatch(getAllMessages(page));
    } catch (err) {
      toast.error("❌ فشل حذف الرسالة");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-3">
      <ToastContainer />

      {/* Header with search */}
      <div className="flex flex-col lg:flex-row items-center justify-between my-6 w-full lg:w-[60vw] gap-3">
        <h1 className="text-xl font-bold text-[#1F2937]">📩 الرسائل</h1>

        <div className="relative w-full lg:w-[40vw]">
          <input
            type="text"
            placeholder="بحث عن رسالة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pr-8 rounded-md border border-[#D1D5DB] text-sm outline-none focus:ring-1 focus:ring-[#3B82F6]"
          />
          <img
            src={searchIcon}
            alt="أيقونة البحث"
            className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-4 opacity-60"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="hidden sm:block p-3 bg-[#FFFFFF] rounded-3xl shadow-md">
        <table className="w-full text-sm font-medium bg-[#FFFFFF]">
          <thead>
            <tr className="text-[#6B7280] border-b text-center">
              <th className="py-3 px-2">الاسم</th>
              <th className="py-3 px-2">الموضوع</th>
              <th className="py-3 px-2">الرسالة</th>
              <th className="py-3 px-2">التاريخ</th>
              <th className="py-3 px-2">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <Spinner />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[#DC2626]">
                  {error}
                </td>
              </tr>
            ) : filtered.length > 0 ? (
              filtered.map((msg, i) => (
                <tr
                  key={msg._id || i}
                  className="border-t border-[#E5E7EB] hover:bg-[#F9FAFB] transition"
                >
                  <td className="py-3 text-center">{msg?.name || "-"}</td>
                  <td className="py-3 text-center">{msg?.subject || "-"}</td>
                  <td className="py-3 text-center truncate max-w-[150px]">
                    {msg?.message || "-"}
                  </td>
                  <td className="py-3 text-center">
                    {new Date(msg?.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {/* View message details */}
                      <button
                        onClick={() => {
                          setDetailsMessage(msg);
                          setShowDetailsModal(true);
                        }}
                        title="عرض التفاصيل"
                        className="p-1.5 bg-[#DBEAFE] hover:bg-[#BFDBFE] rounded-full transition"
                      >
                        <img src={eye} alt="عرض الرسالة" width={18} />
                      </button>

                      {/* Delete message */}
                      <button
                        onClick={() => {
                          setSelectedMessage(msg);
                          setShowDeleteModal(true);
                        }}
                        title="حذف الرسالة"
                        className="p-1.5 bg-[#FEE2E2] hover:bg-[#FCA5A5] rounded-full transition"
                      >
                        <img src={deleteIcon} alt="حذف الرسالة" width={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-[#6B7280]">
                  لا توجد رسائل حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={10}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteOrBanModal
          type="delete"
          loading={deleting}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* Message Details Modal */}
      {showDetailsModal && detailsMessage && (
        <MessageDetailsModal
          message={detailsMessage}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default Notification;
