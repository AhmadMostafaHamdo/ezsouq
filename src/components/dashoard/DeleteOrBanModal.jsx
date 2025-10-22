import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, UserMinus } from "lucide-react";
import Spinner from "../../feedback/loading/Spinner";
import close from "../../assets/images/close.svg";

/**
 * Animated modal component for delete, ban/unban, grant/withdraw permissions
 * Props:
 * - type: "delete" | "ban" | "grant" | "withdraw"
 * - action: "ban" | "unban" (for ban type)
 * - onConfirm: function executed when user confirms
 * - onCancel: function executed when user cancels
 */
const DeleteOrBanModal = ({ type, action, onConfirm, onCancel }) => {
  const isDelete = type === "delete";
  const isBan = type === "ban";
  const isUnban = action === "unban";
  const isGrant = type === "grant";
  const isWithdraw = type === "withdraw";

  const title = isDelete
    ? "حذف مستخدم"
    : isUnban
    ? "إلغاء حظر المستخدم"
    : isBan
    ? "حظر مستخدم"
    : isGrant
    ? "منح الصلاحيات"
    : isWithdraw
    ? "سحب الصلاحيات"
    : "";

  const description = isDelete
    ? "هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
    : isUnban
    ? "هل أنت متأكد من أنك تريد إلغاء الحظر عن هذا المستخدم؟"
    : isBan
    ? "هل أنت متأكد من أنك تريد حظر هذا المستخدم؟ يمكنك التراجع لاحقًا بإلغاء الحظر."
    : isGrant
    ? "هل أنت متأكد من أنك تريد منح الصلاحيات لهذا المستخدم؟"
    : isWithdraw
    ? "هل أنت متأكد من أنك تريد سحب الصلاحيات من هذا المستخدم؟"
    : "";

  const confirmLabel = isDelete
    ? "حذف"
    : isUnban
    ? "إلغاء الحظر"
    : isBan
    ? "حظر"
    : isGrant
    ? "منح الصلاحيات"
    : isWithdraw
    ? "سحب الصلاحيات"
    : "";

  const confirmColor = isGrant
    ? "bg-[#4CAF50]"
    : isWithdraw
    ? "bg-[#FFC107]"
    : isUnban
    ? "bg-[#30C795]"
    : "bg-[#BD4749]";

  const Icon = isGrant ? UserPlus : isWithdraw ? UserMinus : null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#67676780] z-40 flex items-center justify-center"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="w-96 p-5 rounded-lg bg-white relative shadow-lg"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close button */}
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 hover:opacity-80 transition"
          >
            <img src={close} alt="إغلاق" className="w-5 h-5" />
          </button>

          {/* Icon */}
          {Icon && (
            <div className="flex justify-center my-4">
              <Icon
                size={48}
                className={isGrant ? "text-green-600" : "text-yellow-600"}
              />
            </div>
          )}

          {/* Title */}
          <p className="text-center my-2 font-bold text-lg">{title}</p>

          {/* Description */}
          <p className="text-[#444444] text-center leading-6 text-sm px-2">
            {description}
          </p>

          {/* Action buttons */}
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteOrBanModal;
