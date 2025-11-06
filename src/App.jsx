import { useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "./store/auth/thunk/logout";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const tokenFromCookie = Cookies.get("token");

    // Handles session expiration and redirects to login
    const handleExpiredToken = (message = "انتهت صلاحية الجلسة!") => {
      Cookies.remove("token");
      dispatch(logout());

      toast.error(message, {
        autoClose: 3000,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
    };

    if (tokenFromCookie) {
      try {
        const decoded = jwtDecode(tokenFromCookie);
        const role = decoded.Role;
        const exp = decoded.exp;
        const now = Math.floor(Date.now() / 1000);
        const bufferTime = 5 * 60; // 5 minutes safety margin

        // Check token expiration
        if (exp < now) {
          handleExpiredToken("انتهت صلاحية الجلسة!");
          return;
        } else if (exp < now + bufferTime) {
          toast.warning("ستنتهي صلاحية الجلسة قريباً، يرجى حفظ عملك", {
            autoClose: 5000,
            position: "top-center",
          });
        }

        // Redirect owner to dashboard if currently on home page
        if (role === "OWNER" && location.pathname === "/") {
          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.error("Invalid token:", err);
        }
        handleExpiredToken("جلسة غير صالحة، يرجى تسجيل الدخول مرة أخرى");
      }
    } else {
      // No token found - restrict access to protected routes
      if (location.pathname.startsWith("/dashboard")) {
        handleExpiredToken("يجب تسجيل الدخول للوصول لهذه الصفحة");
      }
    }

    // Handle Google OAuth callback
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
};

export default App;
