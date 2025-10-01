import React from "react";
import { X, Star } from "lucide-react";
import { Link } from "react-router";

const RatingDetails = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="rounded-2xl shadow-lg w-full max-w-lg p-6 relative"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Close Button */}
        <Link
          to="/dashboard/rating"    
          className="absolute top-4 right-4"
          style={{ color: "#6B7280" }}
        >
          <X size={22} />
        </Link>

        {/* Title */}
        <h2
          className="text-xl font-semibold text-center"
          style={{ color: "#1F2937" }}
        >
          تفاصيل التقييم
        </h2>

        {/* Date */}
        <p className="text-center text-sm mt-1" style={{ color: "#6B7280" }}>
          2025-7-22
        </p>

        <div className="mt-6 space-y-5">
          {/* Sender */}
          <div>
            <p className="font-medium mb-2" style={{ color: "#374151" }}>
              المرسل
            </p>
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ backgroundColor: "#F3E8FF" }}
            >
              <button
                className="text-sm px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}
              >
                عرض الملف الشخصي
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt="sender"
                  className="w-10 h-10 rounded-full border"
                />
                <span className="font-medium" style={{ color: "#1F2937" }}>
                  أسعد مسعود
                </span>
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <p className="font-medium mb-2" style={{ color: "#374151" }}>
              المرسل إليه
            </p>
            <div
              className="flex items-center justify-between p-3 rounded-xl"
              style={{ backgroundColor: "#F3E8FF" }}
            >
              <button
                className="text-sm px-4 py-2 rounded-lg"
                style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}
              >
                عرض الملف الشخصي
              </button>
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/40?img=2"
                  alt="receiver"
                  className="w-10 h-10 rounded-full border"
                />
                <span className="font-medium" style={{ color: "#1F2937" }}>
                  مياو المياو
                </span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <p className="font-medium" style={{ color: "#374151" }}>
              نسبة التقييم:
            </p>
            <span className="font-semibold" style={{ color: "#1F2937" }}>
              4.8
            </span>
            <Star size={18} style={{ color: "#FBBF24", fill: "#FBBF24" }} />
          </div>

          {/* Reason */}
          <div>
            <p className="font-medium mb-2" style={{ color: "#374151" }}>
              سبب اختيار هذا التقييم:
            </p>
            <div
              className="p-4 rounded-xl text-sm leading-relaxed"
              style={{ backgroundColor: "#F3E8FF", color: "#374151" }}
            >
              مياو مياو مياو مياو مياو مياو مياو مياو مياو مياو مياو مياو مياو
              مياو مياو مياو مياو مياو مياو
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingDetails;
