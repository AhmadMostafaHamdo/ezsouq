import { Link } from "react-router-dom";

/* =========================================
   AuthLinks Component
   - Login / Register buttons
   - Prevent text wrapping
   - Add hover effects
========================================= */
const AuthLinks = ({ isMobile = false }) => (
  <div
    className={`flex ${
      isMobile ? "flex-col space-y-4" : "items-center space-x-reverse space-x-4"
    }`}
  >
    <Link
      to="/login"
      className={`px-6 py-[.5rem] rounded-lg font-medium text-center ${
        isMobile
          ? "bg-white text-primary font-bold hover:bg-[#8080805e] transition-colors duration-300 whitespace-nowrap"
          : "bg-secondary text-primary font-bold hover:bg-secondary/80 transition-colors duration-300 whitespace-nowrap"
      }`}
    >
      تسجيل دخول
    </Link>

    <Link
      to="/register"
      className={`px-6 py-3 rounded-lg font-medium text-center ${
        isMobile
          ? "border-2 border-white text-white hover:bg-white hover:text-primary transition-colors duration-300 whitespace-nowrap"
          : "bg-secondary/0 text-white hover:bg-secondary/20 transition-colors duration-300 whitespace-nowrap"
      }`}
    >
      إنشاء حساب
    </Link>
  </div>
);

export default AuthLinks;
