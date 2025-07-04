import { useEffect, useRef } from "react";
import Footer from "../components/common/Footer";
import Header from "../components/website/OfferDetails/Header";
import { Outlet } from "react-router";

const Profile = () => {
  const profileRef = useRef();
  useEffect(() => {
    profileRef.current.scrollIntoView();
  }, []);
  return (
    <div className="font-sans  bg-[#F7F7FF] overflow-x-hidden" ref={profileRef}>
      <Header />
      <div className="pt-[5rem]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
