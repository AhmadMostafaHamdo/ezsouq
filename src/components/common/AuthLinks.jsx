// AuthLinks Component
import { Link } from "react-router-dom";

/**
 *  AuthLinks component for Login/Register buttons
 * @param {boolean} isMobile - Adjusts layout and styles for mobile
 */
const AuthLinks = ({ isMobile = false }) => (
  <div
    className={`flex ${
      isMobile ? "flex-col space-y-4" : "items-center space-x-reverse space-x-4"
    }`}
  >
    {/*  Login Button */}
    <Link
      to="/login"
      className={`px-6 py-[0.5rem] rounded-lg font-medium text-center transition-colors duration-300 whitespace-nowrap ${
        isMobile
          ? "bg-white text-primary font-bold hover:bg-[#8080805e]"
          : "bg-secondary text-primary font-bold hover:bg-secondary/80"
      }`}
    >
      تسجيل دخول
    </Link>

    {/*  Register Button */}
    <Link
      to="/register"
      className={`px-6 py-3 rounded-lg font-medium text-center transition-colors duration-300 whitespace-nowrap ${
        isMobile
          ? "border-2 border-white text-white hover:bg-white hover:text-primary"
          : "bg-secondary/0 text-white hover:bg-secondary/20"
      }`}
    >
      إنشاء حساب
    </Link>
  </div>
);

export default AuthLinks;
