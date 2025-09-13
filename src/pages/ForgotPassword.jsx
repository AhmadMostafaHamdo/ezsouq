import Logo from "../components/logo/Logo";
import forgotPassword from "../assets/images/undraw_forgot-password_odai 1.svg";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email.trim().length === 0) {
        toast.error("يجب إدخال الإيميل");
        return; // وقف التنفيذ
      }
      setLoading(true);

      const res = await axios.post("/send_reset_link", { email });

      toast.success(res.data?.message || "تم إرسال رابط إعادة التعيين");
      setTimeout(() => {
        window.location.href = "/change_password_link";
      }, 600);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false); // يوقف التحميل بأي حالة
    }
  };

  return (
    <div className="h-[100vh] flex-center">
      <ToastContainer />
      <div className="w-[100vw] h-[100vh] flex-center shadow-custom">
        {/* القسم الأيمن */}
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

        {/* القسم الأيسر */}
        <div className="sm:w-full md:w-[60vw] bg-white">
          <div className="md:hidden">
            <Logo />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-[90vw] p-3 sm:w-[357px] md:w-[357px] lg:w-[487px] m-auto"
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
                className="w-full h-[56px] bg-primary text-white font-bold rounded-xl py-4 px-2"
              >
                {loading ? "جارٍ إرسال رمز التحقق ..." : "إرسال رمز التحقق"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
