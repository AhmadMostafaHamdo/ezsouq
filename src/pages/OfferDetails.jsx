import React, { useEffect, useRef } from "react";
import Header from "../components/website/OfferDetails/HeaderLogin";
import Main from "../components/website/OfferDetails/Main";
import Footer from "../components/common/Footer";

const OfferDetails = () => {
  const offer = useRef();
  useEffect(() => {
    offer.current.scrollIntoView();
  }, []);
  return (
    <div className="md:overflow-x-hidden" ref={offer}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default OfferDetails;
