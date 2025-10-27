import { useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "./store/auth/thunk/logout";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const tokenFromCookie = Cookies.get("token");

    const handleExpiredToken = (reason = "انتهت صلاحية الجلسة!") => {
      // تنظيف التوكن من الكوكيز
      Cookies.remove("token");
      
      // تنظيف حالة Redux
      dispatch(logout());
      
      // عرض رسالة للمستخدم
      toast.error(reason, { 
        autoClose: 3000,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
      
      // التحويل لصفحة تسجيل الدخول بعد تأخير
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    };

    if (tokenFromCookie) {
      try {
        const decoded = jwtDecode(tokenFromCookie);
        const role = decoded.Role;
        const exp = decoded.exp; // الوقت بالثواني
        const now = Math.floor(Date.now() / 1000);
        
        // فحص صلاحية التوكن مع هامش أمان (5 دقائق)
        const bufferTime = 5 * 60; // 5 minutes in seconds
        
        if (exp < now) {
          // التوكن منتهي الصلاحية
          handleExpiredToken("انتهت صلاحية الجلسة!");
          return;
        } else if (exp < now + bufferTime) {
          // التوكن سينتهي قريباً - تحذير المستخدم
          toast.warning("ستنتهي صلاحية الجلسة قريباً، يرجى حفظ عملك", {
            autoClose: 5000,
            position: "top-center"
          });
        }

        // توجيه المالك من الصفحة الرئيسية للوحة التحكم
        if (role === "OWNER" && location.pathname === "/") {
          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        // التوكن معطوب أو غير صالح
        if (process.env.NODE_ENV === 'development') {
          console.error("Failed to decode token:", err);
        }
        handleExpiredToken("جلسة غير صالحة، يرجى تسجيل الدخول مرة أخرى");
      }
    } else {
      // لا يوجد توكن - توجيه للتسجيل إذا كان يحاول الوصول لصفحات محمية
      if (location.pathname.startsWith("/dashboard")) {
        handleExpiredToken("يجب تسجيل الدخول للوصول لهذه الصفحة");
      }
    }

    // Handle Google callback
    if (tokenFromUrl && location.pathname === "/") {
      navigate(`/google-callback?token=${tokenFromUrl}`, { replace: true });
    }
  }, [user, location.pathname, navigate, dispatch]);

  return (
    <>
      <ToastContainer />
      <MainLayout />
    </>
  );
}

export default App;
