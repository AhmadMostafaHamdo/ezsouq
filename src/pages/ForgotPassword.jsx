import Logo from "../components/logo/Logo";
import forgotPassword from "../assets/images/undraw_forgot-password_odai 1.svg";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim().length === 0) {
      toast.error("يجب إدخال الإيميل");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(import.meta.env.VITE_SEND_RESET_LINK_ENDPOINT, { email });
      toast.success(res.data?.message || "تم إرسال رابط إعادة التعيين");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "حدث خطأ ما";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex-center bg-gray-50">
      <ToastContainer />
      <div className="w-[100vw] h-[100vh] flex-center shadow-custom">
        {/* Right Section */}
        <div className="hidden md:block w-[40vw] bg-secondary h-[100vh]">
          <Logo />
          <div>
            <img
              src={forgotPassword}
              alt="Forgot Password"
              className="object-contain w-[96%] m-auto mt-6"
            />
          </div>
        </div>

        {/* Left Section */}
        <div className="sm:w-full md:w-[60vw] bg-white overflow-y-auto">
          <div className="md:hidden">
            <Logo />
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="w-[90vw] p-3 sm:w-[357px] md:w-[357px] lg:w-[487px] m-auto"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
          >
            <div className="h-[157px]">
              <h1 className="text-primary font-bold text-[1.25rem] sm:text-[2rem] h-[67px]">
                نسيان كلمة المرور
              </h1>
              <p className="font-normal text-[#282828] text-[1.25rem] sm:text-[1.3rem]">
                قم بإدخال رقم الهاتف أو البريد الالكتروني لإعادة تعيين كلمة
                المرور
              </p>
            </div>

            <div className="md:w-[330px] lg:w-[487px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[56px] border-none rounded-xl bg-[#D9D8FF] text-black placeholder:text-white py-4 px-2 mb-14 mt-10"
                placeholder="الايميل"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[56px] bg-primary text-white font-bold rounded-xl py-4 px-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    جارٍ إرسال رمز التحقق ...
                  </span>
                ) : (
                  "إرسال رمز التحقق"
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
