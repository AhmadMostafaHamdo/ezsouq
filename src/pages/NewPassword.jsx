import Logo from "../components/logo/Logo";
import forgotPassword from "../assets/images/undraw_forgot-password_odai 1.svg";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); // ناخذ التوكن من الرابط

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.trim().length === 0) {
        toast.error("يجب إدخال كلمة السر الجديدة");
        return;
      }
      setLoading(true);

      // استدعاء API الصحيح لتغيير كلمة المرور
      const res = await axios.post(`${import.meta.env.VITE_CHANGE_PASSWORD_ENDPOINT}?token=${token}`, {
        newPassword: password,
      });

      toast.success(res.data?.message || "تم تغيير كلمة المرور بنجاح");
      setTimeout(() => {
        window.location.href = "/login"; // رجعه لصفحة تسجيل الدخول
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
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
              <h1 className="text-primary font-bold text-[1rem] sm:text-[1.8rem] h-[67px]">
                كلمة السر الجديدة
              </h1>
              <p className="font-normal text-[#282828] text-[1.25rem] sm:text-[1.3rem]">
                قم بإدخال كلمة السر الجديدة وستصبح قادرًا على استخدامها بعد
                الحفظ
              </p>
            </div>

            <div className="md:w-[330px] lg:w-[487px]">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[56px] border-none rounded-xl bg-[#D9D8FF] text-black placeholder:text-gray-600 py-4 px-2 mb-14 mt-10"
                placeholder="كلمة المرور الجديدة"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[56px] bg-primary text-white font-bold rounded-xl py-4 px-2"
              >
                {loading ? "جارٍ حفظ كلمة المرور..." : "حفظ كلمة المرور"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
