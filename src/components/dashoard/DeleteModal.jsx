// components/common/DeleteModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import close from "../../assets/images/close.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const DeleteModal = ({ open, onClose, onConfirm, title = "حذف" }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-[#67676780] z-20 flex-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="w-96 p-5 rounded-lg bg-white relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={onClose}>
              <img src={close} alt="close" className="mr-auto cursor-pointer" />
            </button>
            <img src={deleteOffer} alt="delete" className="m-auto" />
            <p className="text-center my-5 font-bold text-lg">{title}</p>
            <p className="text-[#444444] text-center leading-6 text-sm">
              هل أنت متأكد من أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا
              الإجراء.
            </p>
            <div className="flex justify-between mt-5 font-normal">
              <button
                className="px-5 py-1 rounded-md text-[#818181] border border-[#818181]"
                onClick={onClose}
              >
                إلغاء
              </button>
              <button
                className="px-5 py-1 rounded-md bg-[#BD4749] text-white"
                onClick={onConfirm}
              >
                حذف
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
