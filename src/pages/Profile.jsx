import Footer from "../components/common/Footer";
import Header from "../components/website/OfferDetails/Header";
import { Outlet } from "react-router";

const Profile = () => {
  return (
    <div className="font-sans  bg-[#F7F7FF]">
      <Header />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default Profile;
