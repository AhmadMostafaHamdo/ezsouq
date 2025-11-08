// Report.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

import { thunkReport } from "../store/report/thunk/thunkReport";
import { reportData } from "../data/report";
import close from "../assets/images/close.svg";
import { replace } from "lodash";

const Report = () => {
  const [selected, setSelected] = useState(false); // Track if a reason is selected
  const [message, setMessage] = useState(""); // User message
  const [reason, setReason] = useState(null); // Selected reason
  const { userId, id } = useParams();
  const dispatch = useDispatch();
  const reportRef = useRef();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.report);

  // Scroll to modal on mount
  useEffect(() => {
    reportRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Close modal and go back
  const handleClose = () => navigate(-1, { replace: true });

  // Select report reason
  const handleSelectReason = (selectedReason) => {
    setReason(selectedReason);
    setSelected(true);
  };

  // Submit report
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
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={reportRef}
        key="report-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full h-screen bg-[#23193E]/60 backdrop-blur-md z-10 flex items-center justify-center"
      >
        <ToastContainer />

        {/* Report Modal */}
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
              aria-label="Close"
            >
              <img src={close} alt="Close" className="w-6 h-6 cursor-pointer" />
            </motion.button>
          </div>

          <motion.h1
            className="text-center text-lg font-bold mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            إبلاغ عن إعلان
          </motion.h1>

          {/* Report form */}
          <form onSubmit={handleSubmit}>
            {/* Report reasons */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.07 },
                },
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
                  className="mb-2 cursor-pointer"
                  onClick={() => handleSelectReason(item.label)}
                >
                  <input
                    type="radio"
                    name="report"
                    id={item.id}
                    checked={reason === item.label}
                    onChange={() => handleSelectReason(item.label)}
                    className="accent-primary"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-[1rem] text-[#B9B5FF] mr-3 cursor-pointer"
                  >
                    {item.label}
                  </label>
                </motion.div>
              ))}
            </motion.div>

            {/* Textarea */}
            <motion.textarea
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="يرجى توضيح الإبلاغ.."
              className="w-full min-h-20 max-h-20 outline-none rounded-[5px] p-2 border border-[#B9B5FF] my-4"
            ></motion.textarea>

            {/* Submit button */}
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

            {/* Warning */}
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
