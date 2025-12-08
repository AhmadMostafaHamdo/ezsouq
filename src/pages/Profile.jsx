import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { Helmet } from "react-helmet";
import HeaderLogin from "../components/website/OfferDetails/HeaderLogin";
import Heading from "../components/common/Heading";
import ImgProfileWithButtons from "../components/website/ImgProfileWithButtons";
import ContactInfo from "../components/website/ContactInfo";
import MainProfile from "../components/website/MainProfile";

const Profile = () => {
  const profileRef = useRef();
  const [activeTab, setActiveTab] = useState("posts");

  // Scroll to top smoothly when the component mounts
  useEffect(() => {
    profileRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <main
      className="bg-[#F7F7FF] overflow-x-hidden min-h-screen"
      ref={profileRef}
      role="main"
    >
      {/* SEO Tags */}
      <Helmet>
        <title>الملف الشخصي | EzSouq</title>
        <meta
          name="description"
          content="شاهد الملف الشخصي للمستخدم، المنشورات، معلومات التواصل، وتقييماته في EzSouq."
        />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      {/* Header/Login Navigation */}
      <HeaderLogin />

      {/* Back Heading */}
      <div className="pt-[4rem]">
        <Heading title="الرجوع" />
      </div>

      {/* Profile Image & Tab Buttons */}
      <ImgProfileWithButtons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Nested Routes */}
      <Outlet />

      {/* Dynamic Tab Content */}
      <div>{activeTab === "posts" ? <MainProfile /> : <ContactInfo />}</div>
    </main>
  );
};

export default Profile;
