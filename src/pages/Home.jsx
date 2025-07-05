import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import HeaderLogin from "../components/website/OfferDetails/HeaderLogin";
import Main from "../components/main/Main";
import Filters from "../components/website/Filters";
import Cookies from "js-cookie";
import { Outlet } from "react-router";
const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {Cookies.get("token") ? <HeaderLogin /> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
