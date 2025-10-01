// components/common/DeleteModal.jsx
import React from "react";
import close from "../../assets/images/close.svg";
import deleteOffer from "../../assets/images/dashboard/deleteOffer.svg";

const DeleteModal = ({ open, onClose, onConfirm, title = "حذف" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#67676780] z-20 flex-center">
      <div className="w-96 p-5 rounded-lg bg-white relative">
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
      </div>
    </div>
  );
};

export default DeleteModal;
