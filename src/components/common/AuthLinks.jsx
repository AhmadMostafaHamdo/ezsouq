import { Link } from "react-router";

const AuthLinks = ({ isMobile = false }) => (
  <div
    className={`flex ${
      isMobile ? "flex-col space-y-4" : "items-center space-x-reverse space-x-4"
    }`}
  >
    <Link
      to="/login"
      className={`px-6 py-[.5rem] text-primary  rounded-lg font-medium text-center ${
        isMobile ? "bg-white" : "bg-secondary  text-nowrap"
      }`}
    >
      تسجيل دخول
    </Link>
    <Link
      to="/register"
      className={`px-6 text-white py-3 rounded-lg font-medium text-nowrap text-center ${
        isMobile ? " border-2 border-white" : ""
      }`}
    >
      إنشاء حساب
    </Link>
  </div>
);
export default AuthLinks;
