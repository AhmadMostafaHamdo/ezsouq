import React from "react";

const VerificationChoiceModal = ({ open, onClose, onChoose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full text-center">
        <h2 className="text-lg font-bold mb-4">تأكيد الحساب</h2>
        <p className="mb-6">يرجى اختيار طريقة تأكيد الحساب:</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onChoose("email")}
            className="bg-primary text-white py-2 rounded-xl hover:bg-primary/90"
          >
            تأكيد عبر الإيميل
          </button>
          <button
            onClick={() => onChoose("whatsapp")}
            className="bg-secondary text-white py-2 rounded-xl hover:bg-secondary/90"
          >
            تأكيد عبر رقم الجوال
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-gray-500 hover:underline text-sm"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default VerificationChoiceModal;
