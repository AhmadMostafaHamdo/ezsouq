import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import Spinner from "../../feedback/loading/Spinner";
import Pagination from "../../components/dashoard/Pagination";
import DeleteOrBanModal from "../../components/dashoard/DeleteOrBanModal";
import { getAllMessages } from "../../store/messages/thunk/getAllMessages";

// Modal component to show message details
const MessageDetailsModal = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-[#00000080] z-50 flex items-center justify-center"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      className="bg-[#FFFFFF] rounded-xl shadow-lg w-11/12 sm:w-96 p-5 relative"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-[#CA4646] hover:text-[#000000] text-xl"
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
          className="px-4 py-1 rounded-md bg-[#2563EB] text-[#FFFFFF] hover:bg-[#1D4ED8] transition"
        >
          إغلاق
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const Notification = () => {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.messages);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Message details modal state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsMessage, setDetailsMessage] = useState(null);

  // === Fetch messages on page change ===
  useEffect(() => {
    dispatch(getAllMessages(page));
  }, [dispatch, page]);

  const allMessages = messages?.messages || [];
  const totalPages = messages?.totalPages || 1;
  const currentPage = messages?.page || 1;
  const totalItems = messages?.total || 0;

  // === Filter messages based on search ===
  const filteredMessages = allMessages.filter(
    (msg) =>
      msg?.name?.toLowerCase().includes(search.toLowerCase()) ||
      msg?.subject?.toLowerCase().includes(search.toLowerCase()) ||
      msg?.message?.toLowerCase().includes(search.toLowerCase())
  );

  // === Delete message handler ===
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

  // === Render mobile card view ===
  const renderMobileCard = (msg) => (
    <motion.div
      key={msg._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-[#FFFFFF] p-4 rounded-xl shadow-md border border-[#E5E7EB] w-full"
    >
      <p className="font-semibold text-[#1F2937]">{msg?.name || "-"}</p>
      <p className="text-[#6B7280] truncate">{msg?.subject || "-"}</p>
      <p className="text-[#374151] mt-1 truncate">{msg?.message || "-"}</p>
      <p className="text-[#6B7280] text-xs mt-1">
        {new Date(msg?.createdAt).toLocaleDateString("ar-EG")}
      </p>
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => {
            setDetailsMessage(msg);
            setShowDetailsModal(true);
          }}
          className="px-2 py-1 bg-[#DBEAFE] text-[#1E40AF] rounded-md hover:bg-[#BFDBFE] transition text-xs"
        >
          عرض
        </button>
        <button
          onClick={() => {
            setSelectedMessage(msg);
            setShowDeleteModal(true);
          }}
          className="px-2 py-1 bg-[#FEE2E2] text-[#B91C1C] rounded-md hover:bg-[#FCA5A5] transition text-xs"
        >
          حذف
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-3">
      <ToastContainer />

      {/* Header with search */}
      <div className="flex flex-col sm:flex-row items-center justify-between my-6 gap-3 w-full">
        <h1 className="text-xl font-bold text-[#1F2937]">📩 الرسائل</h1>
        <input
          type="text"
          placeholder="بحث عن رسالة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[40%] p-2 rounded-md border border-[#D1D5DB] text-sm focus:ring-1 focus:ring-[#3B82F6]"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-[#FFFFFF] rounded-3xl shadow-md p-3 overflow-x-auto">
        <table className="w-full text-sm text-[#374151]">
          <thead>
            <tr className="border-b border-[#E5E7EB] text-center text-[#6B7280]">
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
            ) : filteredMessages.length > 0 ? (
              filteredMessages.map((msg) => (
                <tr
                  key={msg._id}
                  className="border-t border-[#E5E7EB] hover:bg-[#F9FAFB] transition text-center"
                >
                  <td className="py-3">{msg?.name || "-"}</td>
                  <td className="py-3">{msg?.subject || "-"}</td>
                  <td className="py-3 truncate max-w-[150px]">
                    {msg?.message || "-"}
                  </td>
                  <td className="py-3">
                    {new Date(msg?.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="py-3 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setDetailsMessage(msg);
                        setShowDetailsModal(true);
                      }}
                      className="px-2 py-1 bg-[#DBEAFE] text-[#1E40AF] rounded-md hover:bg-[#BFDBFE] transition text-xs"
                    >
                      عرض
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMessage(msg);
                        setShowDeleteModal(true);
                      }}
                      className="px-2 py-1 bg-[#FEE2E2] text-[#B91C1C] rounded-md hover:bg-[#FCA5A5] transition text-xs"
                    >
                      حذف
                    </button>
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

      {/* Mobile cards */}
      <div className="sm:hidden grid grid-cols-1 gap-4">
        <AnimatePresence>
          {loading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map(renderMobileCard)
          ) : (
            <p className="text-center py-6 text-[#6B7280]">
              لا توجد رسائل حالياً
            </p>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteOrBanModal
            type="msg"
            loading={deleting}
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>

      {/* Message Details Modal */}
      <AnimatePresence>
        {showDetailsModal && detailsMessage && (
          <MessageDetailsModal
            message={detailsMessage}
            onClose={() => setShowDetailsModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
