import { useEffect, useRef } from "react";
import HeaderLogin from "../components/website/OfferDetails/HeaderLogin";
import { Outlet } from "react-router";
import Heading from "../components/common/Heading";

const Profile = () => {
  const profileRef = useRef();
  useEffect(() => {
    profileRef.current.scrollIntoView();
  }, []);
  return (
    <div className="  bg-[#F7F7FF] overflow-x-hidden" ref={profileRef}>
      <HeaderLogin />
      <div className="pt-[4rem]">
        <Heading title="الرجوع" />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
