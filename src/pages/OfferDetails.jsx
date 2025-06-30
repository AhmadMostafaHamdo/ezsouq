import React from "react";
import Header from "../components/website/OfferDetails/Header";
import Main from "../components/website/OfferDetails/Main";
import Footer from "../components/common/Footer";

const OfferDetails = () => {
  return (
    <div className=" md:overflow-x-hidden">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default OfferDetails;
