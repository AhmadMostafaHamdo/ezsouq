import React from "react";

// Images used in the modal
import close from "../../assets/images/close.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";
import banUserImg from "../../assets/images/dashboard/block.svg";
import Spinner from "../../feedback/loading/Spinner";
import { useSelector } from "react-redux";

/**
 * General componen t to display Delete or Ban modal
 *
 * Props:
 * - type: operation type ("delete" or "ban")
 * - action: action type in case of ban ("ban" or "unban")
 * - onConfirm: function executed on confirm
 * - onCancel: function executed on cancel
 */
const DeleteOrBanModal = ({ type, action, onConfirm, onCancel }) => {
  const isDelete = type === "delete"; // Is modal for delete
  const isBan = type === "ban"; // Is modal for ban
  const isUnban = action === "unban"; // Is action unban
  const { loading } = useSelector((state) => state.users);
  // Modal title based on state
  const title = isDelete
    ? "حذف مستخدم"
    : isUnban
    ? "إلغاء حظر المستخدم"
    : "message"
    ? "حذف الرسالة"
    : "حظر مستخدم";

  // Description text based on state
  const description = isDelete
    ? "هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
    : isUnban
    ? "هل أنت متأكد من أنك تريد إلغاء الحظر عن هذا المستخدم؟"
    : "message"
    ? "هل أنت متأكد من أنك تريد حذف هذه الرسالة"
    : "هل أنت متأكد من أنك تريد حظر هذا المستخدم؟ يمكنك التراجع لاحقًا بإلغاء الحظر.";

  // Confirm button label based on state
  const confirmLabel = isDelete
    ? "حذف"
    : isUnban
    ? "إلغاء الحظر"
    : "message"
    ? "حذف الرسالة"
    : "حظر";

  // Confirm button color based on state
  const confirmColor = isDelete
    ? "bg-[#BD4749]"
    : isUnban
    ? "bg-[#30C795]"
    : "bg-[#BD4749]";

  // 🔹 Choose appropriate icon
  const icon = isDelete ? deleteOffer : banUserImg;

  return (
    <div className="fixed inset-0 bg-[#67676780] z-40 flex items-center justify-center">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-96 p-5 rounded-lg bg-white relative shadow-lg">
          {/* Close button */}
          <button onClick={onCancel}>
            <img src={close} alt="إغلاق" className="mr-auto cursor-pointer" />
          </button>

          {/* Main icon */}
          <img
            src={icon}
            alt={isDelete ? "صورة حذف" : "صورة حظر"}
            className="m-auto my-4 w-24 h-24"
          />

          {/* Title and description */}
          <p className="text-center my-2 font-bold text-lg">{title}</p>
          <p className="text-[#444444] text-center leading-6 text-sm px-2">
            {description}
          </p>

          {/* Action buttons */}
          <div className="flex justify-between mt-5 font-normal">
            <button
              className="px-5 py-1 rounded-md text-[#818181] border border-[#818181]"
              onClick={onCancel}
            >
              إلغاء
            </button>
            <button
              className={`px-5 py-1 rounded-md text-white ${confirmColor}`}
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
