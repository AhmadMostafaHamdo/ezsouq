import React from "react";
import { useSelector } from "react-redux";

// Images
import close from "../../assets/images/close.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";
import banUserImg from "../../assets/images/dashboard/block.svg";
import Spinner from "../../feedback/loading/Spinner";

/**
 *  General modal component used for:
 *   - Deleting user / message / governorate
 *   - Banning or unbanning user
 *
 * Props:
 * - type: "delete" | "ban" | "governorate"
 * - action: "ban" | "unban" (for ban type)
 * - onConfirm: function executed on confirm
 * - onCancel: function executed on cancel
 */
const DeleteOrBanModal = ({ type, action, onConfirm, onCancel }) => {
  const { loading: userLoading } = useSelector((state) => state.users || {});
  const { loading: govLoading } = useSelector(
    (state) => state.governorates || {}
  );
  const loading = userLoading || govLoading;

  // Determine type
  const isDelete = type === "delete";
  const isBan = type === "ban";
  const isUnban = action === "unban";
  const isGovernorate = type === "governorate";
  const msg = "message";

  // Modal title
  const title = isGovernorate
    ? "حذف محافظة"
    : isDelete
    ? "حذف مستخدم"
    : isUnban
    ? "إلغاء حظر المستخدم"
    : msg
    ? "حذف رسالة "
    : isBan
    ? "حظر مستخدم"
    : "";

  // Modal description
  const description = isGovernorate
    ? "هل أنت متأكد من أنك تريد حذف هذه المحافظة؟ لا يمكن التراجع عن هذا الإجراء."
    : isDelete
    ? "هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
    : isUnban
    ? "هل أنت متأكد من أنك تريد إلغاء الحظر عن هذا المستخدم؟"
    : msg
    ? "هل أنت متأكد من أنك تريد حذف هذه الرسالة؟"
    : isBan
    ? "هل أنت متأكد من أنك تريد حظر هذا المستخدم؟ يمكنك التراجع لاحقًا بإلغاء الحظر."
    : "";

  // Confirm button label
  const confirmLabel = isGovernorate
    ? "حذف"
    : isDelete
    ? "حذف"
    : isUnban
    ? "إلغاء الحظر"
    : msg
    ? "حذف"
    : "حظر";

  // Confirm button color
  const confirmColor = isUnban ? "bg-[#30C795]" : "bg-[#BD4749]";

  // Select icon
  const icon = isBan && !isUnban ? banUserImg : deleteOffer;

  return (
    <div className="fixed inset-0 bg-[#67676780] z-40 flex items-center justify-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-96 p-5 rounded-lg bg-white relative shadow-lg">
          {/* Close Button */}
          <button onClick={onCancel}>
            <img src={close} alt="إغلاق" className="cursor-pointer" />
          </button>

          {/*Main Icon */}
          <img
            src={icon}
            alt={isGovernorate ? "صورة حذف محافظة" : "صورة حذف أو حظر"}
            className="m-auto my-4 w-24 h-24"
          />

          {/*  Title */}
          <p className="text-center my-2 font-bold text-lg">{title}</p>

          {/*  Description */}
          <p className="text-[#444444] text-center leading-6 text-sm px-2">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between mt-5 font-normal">
            <button
              className="px-5 py-1 rounded-md duration-150 hover:bg-[#ddddddb0] text-[#818181] border border-[#818181a1]"
              onClick={onCancel}
            >
              إلغاء
            </button>
            <button
              className={`px-5 py-1 rounded-md text-white duration-150 hover:bg-[#ec1f4bcc] ${confirmColor}`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteOrBanModal;
