// pages/dashboard/ReportDetails.jsx
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReportById } from "../../store/report/thunk/getReportById";
import Spinner from "../../feedback/loading/Spinner";

const ReportDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { report, loading } = useSelector((state) => state.report);

  useEffect(() => {
    if (id) dispatch(getReportById(id));
  }, [dispatch, id]);

  const createdDate = report?.createdAt
    ? new Date(report.createdAt).toLocaleString("ar-EG")
    : "-";

  const reporterAvatar = report?.reporter?.avatar || "https://i.pravatar.cc/40";
  const reportedAvatar = report?.reported?.avatar || "https://i.pravatar.cc/40";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      {/* Modal Container */}
      <div
        className="rounded-2xl shadow-lg w-full max-w-lg p-6 relative"
        style={{ backgroundColor: "#FFFFFF", minHeight: "300px" }}
      >
        {/* Close Button */}
        <Link
          to="/dashboard/reports"
          className="absolute top-4 right-4"
          style={{ color: "#6B7280" }}
        >
          <X size={22} />
        </Link>

        {loading ? (
          // Spinner أثناء التحميل
          <div className="flex justify-center items-center h-48">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Title */}
            <h2
              className="text-xl font-semibold text-center"
              style={{ color: "#1F2937" }}
            >
              تفاصيل الإبلاغ
            </h2>

            {/* Date */}
            <p
              className="text-center text-sm mt-1"
              style={{ color: "#6B7280" }}
            >
              {createdDate}
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
                    onClick={() =>
                      navigate(`/dashboard/users/${report.reporter?._id}`)
                    }
                  >
                    عرض الملف الشخصي
                  </button>
                  <div className="flex items-center gap-2">
                    <img
                      src={reporterAvatar}
                      alt={report.reporter?.name || "المرسل"}
                      className="w-10 h-10 rounded-full border"
                    />
                    <span className="font-medium" style={{ color: "#1F2937" }}>
                      {report.reporter?.name || "-"}
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
                    onClick={() =>
                      navigate(`/dashboard/users/${report.reported?._id}`)
                    }
                  >
                    عرض الملف الشخصي
                  </button>
                  <div className="flex items-center gap-2">
                    <img
                      src={reportedAvatar}
                      alt={report.reported?.name || "المُبلّغ عليه"}
                      className="w-10 h-10 rounded-full border"
                    />
                    <span className="font-medium" style={{ color: "#1F2937" }}>
                      {report.reported?.name || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <p className="font-medium mb-2" style={{ color: "#374151" }}>
                  سبب الإبلاغ:
                </p>
                <div
                  className="p-4 rounded-xl text-sm leading-relaxed"
                  style={{ backgroundColor: "#F3E8FF", color: "#374151" }}
                >
                  {report?.reason || "-"}
                </div>
              </div>

              {/* Details */}
              <div>
                <p className="font-medium mb-2" style={{ color: "#374151" }}>
                  تفاصيل الإبلاغ:
                </p>
                <div
                  className="p-4 rounded-xl text-sm leading-relaxed"
                  style={{ backgroundColor: "#F3E8FF", color: "#374151" }}
                >
                  {report?.details || "-"}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;
