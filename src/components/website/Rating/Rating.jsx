import { useState } from "react";
import close from "../../../assets/images/close.svg";
import startRating from "../../../assets/images/startRating.svg";
import filledStar from "../../../assets/images/filledStar.svg";
import { Link, useParams } from "react-router-dom"; // تصحيح الاستيراد
import { useDispatch, useSelector } from "react-redux";
import { ratingThunk } from "../../../store/rating/thunk/ratingThunk";
import { ToastContainer } from "react-toastify";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.rating);
  const handleSubmit = async () => {
    const res = await dispatch(ratingThunk({ userId: id, rating }));
    if (ratingThunk.fulfilled.match(res)) {
      setTimeout(() => {
        window.location.href = `http://localhost:3000/profile/${id}`;
      }, 700);
    }
  };
  console.log(loading);
  
  return (
    <div className="fixed z-10 top-0 left-0 w-full h-screen bg-[#23193E]/[.57] backdrop-blur-[20px]">
      <ToastContainer />
      <div className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-auto bg-white rounded-[2rem] shadow-[0px_4px_15.8px_0px_#00000026]">
        <div className="flex flex-col items-center px-3 py-5 font-normal opacity-100">
          <Link to="/profile" className="self-start">
            <img src={close} alt="close" />
          </Link>
          <h1 className="leading-9">قيّم تجربتك مع المعلن</h1>
          <p>(اضغط لتحديد عدد النجوم)</p>

          <div className="flex justify-center gap-2 mt-5 mb-5">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < rating ? filledStar : startRating}
                alt={`star-${index + 1}`}
                className="w-8 h-8 cursor-pointer"
                onClick={() => setRating(index + 1)}
              />
            ))}
          </div>

          {rating > 0 && (
            <div className="bg-[#DEDCFF] px-2 rounded-lg w-fit mb-4 mx-auto">
              {rating === 1
                ? "سيء"
                : rating === 2
                ? "مقبول"
                : rating === 3
                ? "جيد"
                : rating === 4
                ? "جيد جدًا"
                : "ممتاز"}
            </div>
          )}

          <div className="flex items-center gap-6">
            <p className="text-[0.9rem]">أخبرنا لماذا اخترت هذا التقييم</p>
            <span className="text-[#B1ADFF] text-[0.8rem]">اختياري</span>
          </div>

          {/* هنا التصحيح الرئيسي */}
          <textarea
            className="p-2 max-h-20 min-h-20 w-full my-5 outline-none border-solid border-2 border-[#B9B5FF] rounded-lg resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب تعليقك هنا..."
            onKeyDown={(e) => {
              e.key == "Enter" ? handleSubmit() : "";
            }}
          />

          <div className="flex justify-between gap-4 w-full">
            <button
              disabled={loading}
              className="bg-primary text-white rounded-xl w-28 p-1"
              onClick={handleSubmit}
            >
              {loading ? "حارٍ الإرسال ..." : " إرسال التقييم"}
            </button>
            <button className="border border-[#B1ADFF] text-primary rounded-xl w-28 p-1">
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
