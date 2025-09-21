import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

const KeepLogin = ({ children }) => {
  const token = Cookies.get("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const { Role } = jwtDecode(token);

    if (Role === "OWNER") {
      if (location.pathname !== "/dashboard") {
        return <Navigate to="/dashboard" replace />;
      }
      return <>{children}</>;
    } else {
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    console.error("خطأ في قراءة التوكن:", err);
    return <Navigate to="/login" replace />;
  }
};

export default KeepLogin;
