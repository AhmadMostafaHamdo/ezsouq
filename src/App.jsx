// 🧩 App.jsx
// Comments in English only
// واجهة التطبيق الرئيسية - Main App Entry

import { useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const tokenFromCookie = Cookies.get("token");
    if (tokenFromCookie) {
      try {
        const decoded = jwtDecode(tokenFromCookie);
        const role = decoded.Role;
        console.log("User Role:", role);

        // ✅ Redirect OWNER from home to dashboard
        if (role === "OWNER" && location.pathname === "/") {
          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
        // 🚫 Invalid token → redirect to home
        if (location.pathname.startsWith("/dashboard")) {
          navigate("/", { replace: true });
        }
      }
    } else {
      // 🚫 No token at all → redirect if trying to access dashboard
      if (location.pathname.startsWith("/dashboard")) {
        navigate("/", { replace: true });
      }
    }

    // Handle Google callback
    if (tokenFromUrl && location.pathname === "/") {
      navigate(`/google-callback?token=${tokenFromUrl}`, { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      <ToastContainer />
      <MainLayout />
    </>
  );
}

export default App;
