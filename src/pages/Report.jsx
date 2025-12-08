// Report.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

import { thunkReport } from "../store/report/thunk/thunkReport";
import { reportData } from "../data/report";
import close from "../assets/images/close.svg";

const MAX_MESSAGE_LENGTH = 250; // حد أقصى للرسالة

const Report = () => {
  const [selected, setSelected] = useState(false);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState(null);
  const { userId, id } = useParams();
  const dispatch = useDispatch();
  const reportRef = useRef();
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.report);

  // Scroll to modal on mount
  useEffect(() => {
    reportRef.current?.scrollIntoView({ behavior: "smooth" });
    textareaRef.current?.focus(); // autofocus على textarea
  }, []);

  const handleClose = () => navigate(-1, { replace: true });

  const handleSelectReason = (selectedReason) => {
    setReason(selectedReason);
    setSelected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason || message.trim().length === 0) return;

    dispatch(
      thunkReport({
        reason,
        details: message,
        reported_user: userId,
        productId: id,
        navigate,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("تم إرسال الإبلاغ بنجاح!");
        setReason(null);
        setMessage("");
        setSelected(false);
      })
      .catch(() => {
        toast.error("حدث خطأ أثناء إرسال الإبلاغ.");
      });
  };

  return (
    <AnimatePresence>
      <Helmet>
        <title>إبلاغ عن إعلان | EzSouq</title>
        <meta
          name="description"
          content="استخدم هذه الصفحة للإبلاغ عن أي إعلان مخالف في تطبيق EzSouq بطريقة سهلة وسريعة."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        ref={reportRef}
        key="report-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#23193E]/60 backdrop-blur-md z-10 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
      >
        <ToastContainer position="top-right" autoClose={3000} />

        <motion.div
          key="report-modal"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="relative rounded-xl font-normal p-5 z-20 bg-white w-[90%] max-w-md shadow-lg"
        >
          {/* Close button */}
          <div className="flex justify-end mb-2">
            <motion.button
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.4 }}
              onClick={handleClose}
              aria-label="Close report modal"
            >
              <img src={close} alt="إغلاق" className="w-6 h-6 cursor-pointer" />
            </motion.button>
          </div>

          <motion.h1
            id="report-title"
            className="text-center text-lg font-bold mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            إبلاغ عن إعلان
          </motion.h1>

          {/* Report form */}
          <form onSubmit={handleSubmit}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {reportData.map((item) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2 cursor-pointer flex items-center"
                  onClick={() => handleSelectReason(item.label)}
                >
                  <input
                    type="radio"
                    name="report"
                    id={item.id}
                    checked={reason === item.label}
                    onChange={() => handleSelectReason(item.label)}
                    className="accent-primary"
                    aria-checked={reason === item.label}
                  />
                  <label
                    htmlFor={item.id}
                    className="text-[1rem] text-[#B9B5FF] mr-3 cursor-pointer select-none"
                  >
                    {item.label}
                  </label>
                </motion.div>
              ))}
            </motion.div>

            <motion.textarea
              ref={textareaRef}
              id="report-message"
              aria-label="تفاصيل الإبلاغ"
              aria-describedby="char-count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= MAX_MESSAGE_LENGTH)
                  setMessage(e.target.value);
              }}
              placeholder="يرجى توضيح الإبلاغ.."
              className="w-full min-h-20 max-h-28 outline-none rounded-[5px] p-2 border border-[#B9B5FF] my-4"
            />
            <p
              id="char-count"
              className="text-[.75rem] text-right text-[#7E7E7E] mb-2"
            >
              {message.length}/{MAX_MESSAGE_LENGTH} حرف
            </p>

            <motion.button
              whileHover={{
                scale: selected && message.trim().length > 0 ? 1.05 : 1,
              }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading || !selected || message.trim().length === 0}
              className={`block m-auto w-full p-2 rounded-lg text-white transition ${
                selected && message.trim().length > 0
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-[#C5C5C5] cursor-not-allowed"
              }`}
            >
              {loading ? "جارٍ الإرسال..." : "إرسال الإبلاغ"}
            </motion.button>

            <motion.p
              className="font-normal text-[.8rem] text-center mt-2 text-[#2F2E41]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              الإبلاغ الكاذب قد يؤدي إلى تقييد حسابك
            </motion.p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Report;
