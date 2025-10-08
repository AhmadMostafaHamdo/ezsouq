import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import close from "../../../assets/images/close.svg";
import startRating from "../../../assets/images/startRating.svg";
import filledStar from "../../../assets/images/filledStar.svg";
import stars from "../../../assets/images/stars.svg";

import { ratingThunk } from "../../../store/rating/thunk/ratingThunk";

const Rating = () => {
  const [rating, setRating] = useState(0); // User-selected rating
  const [hoverRating, setHoverRating] = useState(0); //  Hover effect for stars
  const [message, setMessage] = useState(""); // User comment
  const [showSuccess, setShowSuccess] = useState(false); // Show success modal

  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.rating);

  //  Handle submit rating
  const handleSubmit = async () => {
    const res = await dispatch(ratingThunk({ userId: id, rating, message }));
    if (ratingThunk.fulfilled.match(res)) {
      setShowSuccess(true); // Show success modal instead of redirect
    }
  };

  // Navigate to profile
  const goToProfile = () => (window.location.href = `/profile/${id}`);

  return (
    <div className="fixed z-10 top-0 left-0 w-full h-screen bg-[#23193E]/[.57] backdrop-blur-[20px] flex items-center justify-center">
      <ToastContainer />

      {!showSuccess ? (
        // Rating modal
        <div className="z-40 w-72 h-auto bg-white rounded-[2rem] shadow-[0px_4px_15.8px_0px_#00000026] p-5">
          {/* Close button */}
          <img
            src={close}
            alt="إغلاق"
            className="mb-2 cursor-pointer"
            onClick={goToProfile}
          />

          <h1 className="text-center leading-9">قيّم تجربتك مع المعلن</h1>
          <p className="text-center">(اضغط لتحديد عدد النجوم)</p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mt-5 mb-5">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <img
                  key={index}
                  src={
                    starValue <= (hoverRating || rating)
                      ? filledStar
                      : startRating
                  }
                  alt={`نجمة ${starValue}`}
                  className="w-8 h-8 cursor-pointer transition-transform duration-200 transform hover:scale-125"
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(starValue)}
                />
              );
            })}
          </div>

          {/* Rating description */}
          {rating > 0 && (
            <div className="bg-[#DEDCFF] px-2 rounded-lg w-fit mb-4 mx-auto text-center">
              {["سيء", "مقبول", "جيد", "جيد جدًا", "ممتاز"][rating - 1]}
            </div>
          )}

          {/* User comment */}
          <textarea
            className="p-2 max-h-20 min-h-20 w-full my-5 outline-none border-2 border-[#B9B5FF] rounded-lg resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          {/* Buttons */}
          <div className="flex justify-between gap-4 w-full">
            <button
              disabled={loading}
              className="bg-primary text-white rounded-xl w-28 p-1"
              onClick={handleSubmit}
            >
              {loading ? "جارٍ الإرسال ..." : "إرسال التقييم"}
            </button>
            <button
              className="border border-[#B1ADFF] text-primary rounded-xl w-28 p-1"
              onClick={goToProfile}
            >
              إلغاء
            </button>
          </div>
        </div>
      ) : (
        // Success modal
        <div className="z-40 w-72 h-auto bg-white rounded-[2rem] shadow-[0px_4px_15.8px_0px_#00000026] p-5 flex flex-col items-center text-center">
          <img
            src={close}
            alt="إغلاق"
            className="cursor-pointer w-6 h-6 ml-auto"
            onClick={goToProfile}
          />
          <img src={stars} alt="نجمة" className="w-36 mb-3" />
          <h1 className="text-lg font-bold mb-2">تم إرسال تقييمك بنجاح!</h1>
          <p className="text-sm mb-5">
            تقييمك للناشر سيساعدنا في تحديد اهتماماتك وتحسين التطبيق بناءً عليها
          </p>
          <button
            className="text-primary font-semibold underline"
            onClick={goToProfile}
          >
            حسنًا
          </button>
        </div>
      )}
    </div>
  );
};

export default Rating;
