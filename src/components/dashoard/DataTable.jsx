import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import Spinner from "../../feedback/loading/Spinner";
import { deleteProduct } from "../../store/product/thunk/deleteProduct";
import DeleteOrBanModal from "./DeleteOrBanModal";
import { Trash2 } from "lucide-react";

/**
 * DataTable Component
 * - Animated table
 * - Local scroll (no page scroll)
 * - Integrated with DeleteOrBanModal
 */
const DataTable = ({ data, columns, loading }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle delete click
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (selectedId) {
      dispatch(deleteProduct(selectedId));
      setShowModal(false);
    }
  };

  // Cancel modal
  const handleCancel = () => setShowModal(false);

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spinner size={60} />
      </div>
    );

  if (!data?.length)
    return (
      <p className="text-center py-6 text-[#9E9E9E] text-lg">
        لا يوجد بيانات حالياً
      </p>
    );

  return (
    <>
      {/* ✅ Scroll only inside the table */}
      <div className="overflow-x-auto max-h-[70vh] lg:max-w-[74vw] overflow-y-auto bg-white rounded-2xl shadow-md border border-[#E5E7EB]">
        <motion.table
          className="w-full  text-sm font-medium min-w-max border-separate border-spacing-y-2"
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          <thead className="sticky top-0 bg-[#F9FAFB] z-10 shadow-sm">
            <tr className="text-[#6B7280] text-sm uppercase tracking-wide">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-3 px-5 text-center whitespace-nowrap border-b border-[#E5E7EB]"
                >
                  {col.label}
                </th>
              ))}
              <th className="py-3 px-5 text-center border-b border-[#E5E7EB]">
                إجراءات
              </th>
            </tr>
          </thead>

          <AnimatePresence>
            <tbody>
              {data.map((item, index) => (
                <motion.tr
                  key={item._id || item.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={rowVariants}
                  className="bg-[#FFFFFF] hover:bg-[#F3F4F6] border-b border-[#E5E7EB] transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="text-center py-3 px-5 text-[#374151] break-words"
                    >
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}

                  <td className="text-center py-3 px-5">
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      title="حذف الإعلان"
                      className="text-[red] hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </motion.table>
      </div>

      {/* ✅ Modal for delete confirmation */}
      {showModal && (
        <DeleteOrBanModal
          type="offer"
          action="delete"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default DataTable;
