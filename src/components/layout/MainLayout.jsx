import Cookies from "js-cookie";
import { Outlet } from "react-router";
import HeaderLogin from "../website/OfferDetails/HeaderLogin";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ToastContainer } from "react-toastify";

// Main layout component that wraps the entire application
export const MainLayout = () => {
  const isAuthenticated = Boolean(Cookies.get("token")); // Check if user is logged in

  return (
    <div className="overflow-x-hidden font-sans flex flex-col min-h-[100vh]">
      <ToastContainer />

      {/* Conditional header based on authentication */}
      {isAuthenticated ? <HeaderLogin /> : <Header />}

      {/* Main content area */}
      <div className="min-h-[100vh] bg-[#F7F7FF]">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
