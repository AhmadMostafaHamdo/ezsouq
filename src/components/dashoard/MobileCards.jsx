// MobileCards.jsx
import React from "react";
import Spinner from "../../feedback/loading/Spinner";

/**
 * Responsive mobile cards
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map(renderCard)}
    </div>
  );
};

export default MobileCards;
