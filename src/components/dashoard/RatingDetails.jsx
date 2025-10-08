import React, { useEffect } from "react";
import { X, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRatingById } from "../../store/rating/thunk/getRatingById";
import Spinner from "../../feedback/loading/Spinner";

const RatingDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { rateById, loading } = useSelector((s) => s.rating);

  useEffect(() => {
    if (id) dispatch(getRatingById(id));
  }, [dispatch, id]);

  const avatar = rateById?.avatar
    ? rateById.avatar.replace(/^http:/, "https:")
    : "";

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      ) : (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="rounded-2xl shadow-lg w-full max-w-lg p-6 relative flex flex-col"
            style={{
              backgroundColor: "#FFFFFF",
              maxHeight: "90vh",
            }}
          >
            {/* زر الإغلاق */}
            <Link
              to="/dashboard/rating"
              className="absolute top-4 right-4"
              style={{ color: "#6B7280" }}
            >
              <X size={22} />
            </Link>

            {/* العنوان */}
            <h2
              className="text-xl font-semibold text-center"
              style={{ color: "#1F2937" }}
            >
              تفاصيل التقييم
            </h2>

            {/* التاريخ */}
            <p
              className="text-center text-sm mt-1"
              style={{ color: "#6B7280" }}
            >
              {rateById?.ratings?.[0]?.createdAt
                ? new Date(rateById.ratings[0].createdAt).toLocaleDateString(
                    "ar-EG"
                  )
                : ""}
            </p>

            {/* المحتوى القابل للتمرير */}
            <div
              className="mt-6 space-y-5 overflow-y-auto pr-2 custom-scroll"
              style={{
                maxHeight: "70vh",
              }}
            >
              {/* المستخدم الذي تم تقييمه */}
              <div>
                <p className="font-medium mb-2" style={{ color: "#374151" }}>
                  المستخدم الذي تم تقييمه
                </p>
                <div
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ backgroundColor: "#F3E8FF" }}
                >
                  <Link
                    to={`/dashboard/users/${rateById?._id}`}
                    className="text-sm px-4 py-2 rounded-lg"
                    style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}
                  >
                    عرض الملف الشخصي
                  </Link>

                  <div className="flex items-center gap-2">
                    <img
                      src={avatar}
                      alt="صورة المستخدم"
                      className="w-10 h-10 rounded-full border"
                    />
                    <span className="font-medium" style={{ color: "#1F2937" }}>
                      {rateById?.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* متوسط التقييم */}
              <div className="flex items-center gap-2">
                <p className="font-medium" style={{ color: "#374151" }}>
                  متوسط التقييم:
                </p>
                <span className="font-semibold" style={{ color: "#1F2937" }}>
                  {rateById?.averageRating || 0}
                </span>
                <Star size={18} style={{ color: "#FBBF24", fill: "#FBBF24" }} />
              </div>

              {/* قائمة المقيمين */}
              <div>
                <p className="font-medium mb-2" style={{ color: "#374151" }}>
                  المقيمون وتفاصيل تقييمهم:
                </p>

                {rateById?.ratings?.length > 0 ? (
                  <div className="space-y-4">
                    {rateById.ratings.map((r, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl text-sm leading-relaxed shadow-sm"
                        style={{
                          backgroundColor: "#F3E8FF",
                          color: "#374151",
                        }}
                      >
                        {/* التقييم */}
                        <div className="flex items-center gap-1 mb-2">
                          <Star
                            size={14}
                            style={{ color: "#FBBF24", fill: "#FBBF24" }}
                          />
                          <span className="font-medium">{r.rating}</span>
                        </div>

                        {/* الرسالة */}
                        <p>{r.message || "— لا يوجد تعليق —"}</p>

                        {/* معلومات المقيم */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                r.sender?.avatar
                                  ? r.sender.avatar.replace(/^http:/, "https:")
                                  : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                              }
                              alt="صورة المقيم"
                              className="w-8 h-8 rounded-full border"
                            />
                            <div>
                              <p
                                className="font-medium text-sm"
                                style={{ color: "#1F2937" }}
                              >
                                {r.sender?.name || "مستخدم مجهول"}
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: "#6B7280" }}
                              >
                                {new Date(r.createdAt).toLocaleDateString(
                                  "ar-EG"
                                )}
                              </p>
                            </div>
                          </div>

                          {/* زر عرض ملف المقيم */}
                          {r.sender?._id && (
                            <Link
                              to={`/dashboard/users/${r.sender._id}`}
                              className="text-xs px-3 py-1 rounded-lg"
                              style={{
                                backgroundColor: "#7C3AED",
                                color: "#FFFFFF",
                              }}
                            >
                              عرض ملف المقيم
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className="text-center text-sm"
                    style={{ color: "#9CA3AF" }}
                  >
                    لا توجد تقييمات حالياً.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RatingDetails;
