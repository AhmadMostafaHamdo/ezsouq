import { Link } from "react-router";

const AuthLinks = ({ isMobile = false }) => (
  <div
    className={`flex ${
      isMobile ? "flex-col space-y-4" : "items-center space-x-reverse space-x-4"
    }`}
  >
    <Link
      to="/login"
      className={`px-6 py-[.6rem] rounded-lg font-medium text-center ${
        isMobile
          ? "bg-white hover:bg-gray-100 text-primary"
          : "bg-secondary hover:bg-secondary-dark text-primary text-nowrap"
      }`}
    >
      تسجيل دخول
    </Link>
    <Link
      to="/register"
      className={`px-6 py-3 rounded-lg font-medium text-nowrap text-center ${
        isMobile
          ? "text-white border-2 border-white"
          : "text-white hover:text-secondary"
      }`}
    >
      إنشاء حساب
    </Link>
    
  </div>
);
export default AuthLinks;
