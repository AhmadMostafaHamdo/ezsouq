// components/common/DataTable.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../../feedback/loading/Spinner";

/**
 * Reusable table component for desktop view
 * @param {Array} data - array of objects
 * @param {Array} columns - array of column config {key, label, visible}
 * @param {boolean} loading - loading state
 * @param {Function} renderActions - function to render action buttons
 */
const DataTable = ({ data, columns, loading, renderActions }) => {
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

  // Animation variants
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

  return (
    <motion.table
      className="w-full text-sm font-medium min-w-max border-separate border-spacing-y-2 shadow-lg rounded-xl overflow-hidden"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <thead>
        <tr className="bg-[#F3F4F6] text-[#6B7280] text-sm uppercase tracking-wide">
          {columns.map((col) => (
            <th key={col.key} className="py-3 px-5 text-center">
              {col.label}
            </th>
          ))}
          {renderActions && <th className="py-3 px-5 text-center">إجراءات</th>}
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
              className="bg-[#FFFFFF] hover:bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg transition-colors cursor-pointer"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="text-center py-3 px-5 text-[#374151] break-words"
                >
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {renderActions && (
                <td className="text-center py-3 px-5">{renderActions(item)}</td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </AnimatePresence>
    </motion.table>
  );
};

export default DataTable;
