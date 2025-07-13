import { useEffect, useRef } from "react";
import Footer from "../components/common/Footer";
import HeaderLogin from "../components/website/OfferDetails/HeaderLogin";
import { Outlet } from "react-router";

const Profile = () => {
  const profileRef = useRef();
  useEffect(() => {
    profileRef.current.scrollIntoView();
  }, []);
  return (
    <div className="  bg-[#F7F7FF] overflow-x-hidden" ref={profileRef}>
      <HeaderLogin />
      <div className="pt-[5rem]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
