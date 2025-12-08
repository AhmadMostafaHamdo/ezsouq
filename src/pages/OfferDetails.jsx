import React, { useEffect, useRef } from "react";
import Main from "../components/website/OfferDetails/Main";

const OfferDetails = () => {
  const offer = useRef();
  useEffect(() => {
    offer.current.scrollIntoView();
  }, []);
  return (
    <div className="md:overflow-x-hidden" ref={offer}>
        <Main />
    </div>
  );
};

export default OfferDetails;
