// components/common/DataTable.jsx
import React from "react";
import Spinner from "../../feedback/loading/Spinner";
import { Link } from "react-router-dom";

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
      <p className="text-center py-4 text-gray-500">لا يوجد بيانات حالياً</p>
    );

  return (
    <table className="w-full text-sm font-medium min-w-max">
      <thead>
        <tr className="text-[#959595] text-sm">
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id || item.id} className="border-t border-[#eee]">
            {columns.map((col) => (
              <td key={col.key} className="text-center py-3">
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
            {renderActions && (
              <td className="text-center">{renderActions(item)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
