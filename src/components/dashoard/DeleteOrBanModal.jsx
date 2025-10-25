import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, UserMinus } from "lucide-react";
import block from "../../assets/images/dashboard/block.svg"
import deleteUser from "../../assets/images/dashboard/deleteIcon.svg";
import close from "../../assets/images/close.svg";

/**
 * Animated modal component for delete, ban/unban, grant/withdraw permissions
 */
const DeleteOrBanModal = ({ type, action, onConfirm, onCancel }) => {
  const isDelete = type === "delete";
  const isBan = type === "ban";
  const isUnban = action === "unban";
  const isGrant = type === "grant";
  const isWithdraw = type === "withdraw";
  const offer = type === "offer";
  const img = type === "ban" ? block : type === "delete"||"offer" ? deleteUser : "";
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
    :offer
    ?"حذف الإعلان"
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
    :offer
    ? "هل أنت متأكد من أنك تريد حذف هذا الإعلان ؟"

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
    :offer
    ?"حذف"
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

  const elementDelay = {
    title: 0.1,
    icon: 0.2,
    description: 0.3,
    buttons: 0.4,
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
          <motion.button
            onClick={onCancel}
            className="absolute top-3 right-3 hover:opacity-80 transition"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0 } }}
            exit={{ opacity: 0, y: -10 }}
          >
            <img src={close} alt="إغلاق" className="w-5 h-5" />
          </motion.button>

          {/* Title */}
          <motion.p
            className="text-center my-2 font-bold text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: elementDelay.title },
            }}
            exit={{ opacity: 0, y: -10 }}
          >
            {title}
          </motion.p>
          <img src={img} alt="صورة" width={100} className="m-auto my-2" />
          {/* Icon */}
          {Icon && (
            <motion.div
              className="flex justify-center my-4"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  delay: elementDelay.icon,
                  type: "spring",
                  stiffness: 300,
                },
              }}
              exit={{ scale: 0 }}
            >
              <Icon
                size={48}
                className={isGrant ? "text-green-600" : "text-yellow-600"}
              />
            </motion.div>
          )}

          {/* Description */}
          <motion.p
            className="text-[#444444] text-center leading-6 text-sm px-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: elementDelay.description },
            }}
            exit={{ opacity: 0, y: 5 }}
          >
            {description}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex justify-between mt-5 font-normal"
            initial={{ opacity: 0, y: 5 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: elementDelay.buttons },
            }}
            exit={{ opacity: 0, y: 5 }}
          >
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
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteOrBanModal;
