// components/common/MobileCards.jsx
import React from "react";
import Spinner from "../../feedback/loading/Spinner";
import { Link } from "react-router-dom";

/**
 * Reusable mobile cards component
 * @param {Array} data - array of objects
 * @param {boolean} loading - loading state
 * @param {Function} renderCard - function to render card content
 */
const MobileCards = ({ data, loading, renderCard }) => {
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

  return <div className="space-y-4">{data.map(renderCard)}</div>;
};

export default MobileCards;
