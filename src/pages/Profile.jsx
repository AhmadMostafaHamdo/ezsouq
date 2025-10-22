import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import HeaderLogin from "../components/website/OfferDetails/HeaderLogin";
import Heading from "../components/common/Heading";
import ImgProfileWithButtons from "../components/website/ImgProfileWithButtons";
import ContactInfo from "../components/website/ContactInfo";
import MainProfile from "../components/website/MainProfile";

// Profile page wrapper
const Profile = () => {
  const profileRef = useRef();
  const [activeTab, setActiveTab] = useState("posts");

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
        <Heading title="الرجوع" url={"/"} />
      </div>

      <ImgProfileWithButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Outlet />
      {/* Dynamic content (posts / contact-info / rating) */}
      <div>{activeTab == "posts" ? <MainProfile /> : <ContactInfo />}</div>
    </main>
  );
};

export default Profile;
