import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import close from "../../../assets/images/close.svg";
import startRating from "../../../assets/images/startRating.svg";
import filledStar from "../../../assets/images/filledStar.svg";
import stars from "../../../assets/images/stars.svg";
import { ratingThunk } from "../../../store/rating/thunk/ratingThunk";

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading } = useSelector((state) => state.rating);

  // Submit rating
  const handleSubmit = async () => {
    const res = await dispatch(ratingThunk({ userId: id, rating, message }));
    if (ratingThunk.fulfilled.match(res)) {
      setShowSuccess(true);
    }
  };

  const goToProfile = () => navigate(`/profile/${id}`);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="rating-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed z-10 top-0 left-0 w-full h-screen bg-[#23193E]/[.57] backdrop-blur-[20px] flex items-center justify-center"
      >
        <ToastContainer />

        {!showSuccess ? (
          <motion.div
            key="rating-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="z-40 w-72 bg-white rounded-[2rem] shadow-[0px_4px_15.8px_0px_#00000026] p-5"
          >
            <img
              src={close}
              alt="إغلاق"
              className="mb-2 cursor-pointer"
              onClick={goToProfile}
            />

            <h1 className="text-center leading-9 font-semibold">
              قيّم تجربتك مع المعلن
            </h1>
            <p className="text-center text-gray-500">
              (اضغط لتحديد عدد النجوم)
            </p>

            {/* Refined Stars Effect */}
            <div className="flex justify-center gap-3 mt-5 mb-5">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                const isActive = starValue <= (hoverRating || rating);

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.3, rotate: 5 }}
                    whileTap={{
                      scale: [1, 1.3, 1],
                      transition: { duration: 0.3 },
                    }}
                    className="relative"
                  >
                    {/* Glow behind active stars */}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-yellow-300 to-orange-400 opacity-60"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.3, opacity: 0.6 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    <img
                      src={isActive ? filledStar : startRating}
                      alt={`نجمة ${starValue}`}
                      className="w-9 h-9 cursor-pointer relative z-10 transition-transform"
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starValue)}
                    />
                  </motion.div>
                );
              })}
            </div>

            {rating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#DEDCFF] px-2 rounded-lg w-fit mb-4 mx-auto text-center"
              >
                {["سيء", "مقبول", "جيد", "جيد جدًا", "ممتاز"][rating - 1]}
              </motion.div>
            )}

            <motion.textarea
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-2 max-h-20 min-h-20 w-full my-5 outline-none border-2 border-[#B9B5FF] rounded-lg resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب تعليقك هنا..."
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />

            <div className="flex justify-between gap-4 w-full">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                disabled={loading}
                className="bg-primary text-white rounded-xl w-28 p-1"
                onClick={handleSubmit}
              >
                {loading ? "جارٍ الإرسال ..." : "إرسال التقييم"}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="border border-[#B1ADFF] text-primary rounded-xl w-28 p-1"
                onClick={goToProfile}
              >
                إلغاء
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="z-40 w-72 bg-white rounded-[2rem] shadow-[0px_4px_15.8px_0px_#00000026] p-5 flex flex-col items-center text-center"
          >
            <img
              src={close}
              alt="إغلاق"
              className="cursor-pointer w-6 h-6 ml-auto"
              onClick={goToProfile}
            />

            <motion.img
              src={stars}
              alt="نجوم التقييم"
              className="w-36 mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 12 }}
            />

            <motion.h1
              className="text-lg font-bold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              تم إرسال تقييمك بنجاح!
            </motion.h1>

            <p className="text-sm mb-5">
              تقييمك للناشر يساعدنا في تحسين تجربتك باستمرار 💜
            </p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-primary font-semibold underline"
              onClick={goToProfile}
            >
              حسنًا
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Rating;
