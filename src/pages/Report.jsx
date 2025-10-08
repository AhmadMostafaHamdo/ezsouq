import { useEffect, useRef, useState } from "react";
import { reportData } from "../data/report";
import close from "../assets/images/close.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkReport } from "../store/report/thunk/thunkReport";
import { ToastContainer } from "react-toastify";

// Report component to submit a product report
const Report = () => {
  const [selected, setSelected] = useState(false); // Tracks if a reason is selected
  const [message, setMessage] = useState(""); // User message
  const [reason, setReason] = useState(null); // Selected reason

  const { userId, id } = useParams();
  const dispatch = useDispatch();
  const reportRef = useRef();
  const navigate = useNavigate();

  // Get loading state from Redux slice
  const { loading } = useSelector((state) => state.report);

  // Scroll to the report modal on mount
  useEffect(() => {
    reportRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Close modal and navigate back
  const handleClose = () => navigate(-1);

  // Handle reason selection
  const handleSelectReason = (selectedReason) => {
    setReason(selectedReason);
    setSelected(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent submission if reason or message is empty
    if (!reason || message.trim().length === 0) return;

    dispatch(
      thunkReport({
        reason,
        details: message,
        reported_user: userId,
        productId: id,
      })
    );
  };

  return (
    <div
      ref={reportRef}
      className="fixed top-0 left-0 w-full h-screen bg-[#23193E]/60 backdrop-blur-md z-10"
    >
      <ToastContainer />
      <div className="absolute rounded-xl font-normal p-5 z-20 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md shadow-lg">
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button onClick={handleClose} aria-label="إغلاق">
            <img src={close} alt="إغلاق" className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <h1 className="text-center text-lg font-bold mb-4">إبلاغ عن إعلان</h1>

        {/* Report form */}
        <form onSubmit={handleSubmit}>
          {/* Reasons radio buttons */}
          {reportData.map((item) => (
            <div
              key={item.id}
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
            </div>
          ))}

          {/* Message textarea */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="يرجى توضيح الإبلاغ.."
            className="w-full min-h-20 max-h-20 outline-none rounded-[5px] p-2 border border-[#B9B5FF] my-4"
          ></textarea>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !selected || message.trim().length === 0}
            className={`block m-auto w-full p-2 rounded-lg text-white transition ${
              selected && message.trim().length > 0
                ? "bg-primary hover:bg-primary/90"
                : "bg-[#C5C5C5] cursor-not-allowed"
            }`}
          >
            {loading ? "جارٍ الإرسال" : "إرسال الإبلاغ"}
          </button>

          {/* Warning */}
          <p className="font-normal text-[.8rem] text-center mt-2 text-[#2F2E41]">
            الإبلاغ الكاذب قد يؤدي إلى تقييد حسابك
          </p>
        </form>
      </div>
    </div>
  );
};

export default Report;
