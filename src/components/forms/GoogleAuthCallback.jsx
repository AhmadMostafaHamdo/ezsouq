import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux";
import Spinner from "../../feedback/loading/Spinner";
import { setCurrentUser } from "../../store/auth/authSlice";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      console.error("Token not found in URL");
      navigate("/login", { replace: true }); // Redirect to login if token is missing
      return;
    }

    try {
      // Decode token to get user info
      const decoded = jwtDecode(token);
      const role = decoded.Role || decoded.role;

      if (!role) {
        console.error("Role not found in token");
        navigate("/login", { replace: true }); // Redirect if role missing
        return;
      }

      // Update Redux state immediately with user and token
      dispatch(setCurrentUser({ user: decoded, token }));
      Cookies.set("token", token, { expires: 7 }); // Save token in cookies

      // Redirect based on user role
      navigate(role === "OWNER" ? "/dashboard" : "/", { replace: true });
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login", { replace: true }); // Redirect if token invalid
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex-center h-screen bg-white flex-col">
      <h1 className="text-xl mb-3 text-primary">
        جاري تسجيل الدخول بواسطة Google...
      </h1>
      <Spinner /> {/* Loading spinner */}
    </div>
  );
};

export default GoogleAuthCallback;
