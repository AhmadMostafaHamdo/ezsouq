import Cookies from "js-cookie";
import { Outlet } from "react-router";
import HeaderLogin from "../website/OfferDetails/HeaderLogin";
import Header from "../common/Header";
import Footer from "../common/Footer";

export const MainLayout = () => {
  return (
    <div className="overflow-x-hidden font-sans">
      {Cookies.get("token") ? <HeaderLogin /> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};
