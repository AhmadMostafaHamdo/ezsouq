import Cookies from "js-cookie";
import { Outlet } from "react-router";
import HeaderLogin from "../website/OfferDetails/HeaderLogin";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { ToastContainer } from "react-toastify";

export const MainLayout = () => {
  return (
    <div className="overflow-x-hidden font-sans flex flex-col min-h-[100vh]">
      <ToastContainer />
      {Cookies.get("token") ? <HeaderLogin /> : <Header />}
      <div className="min-h-[100vh] bg-[#F7F7FF]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
