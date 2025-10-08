import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import HeaderLogin from "../components/website/OfferDetails/HeaderLogin";
import Heading from "../components/common/Heading";
import ImgProfileWithButtons from "../components/website/ImgProfileWithButtons";

// Profile page wrapper
const Profile = () => {
  const profileRef = useRef();

  // Auto-scroll to top on mount
  useEffect(() => {
    profileRef.current.scrollIntoView();
  }, []);

  return (
    <main
      className="bg-[#F7F7FF] overflow-x-hidden"
      ref={profileRef}
      role="main"
    >
      <HeaderLogin />
      <div className="pt-[4rem]">
        <Heading title="الرجوع" />
      </div>

      <ImgProfileWithButtons />

      {/* Dynamic content (posts / contact-info / rating) */}
        <div>
          <Outlet />
        </div>
    </main>
  );
};

export default Profile;
