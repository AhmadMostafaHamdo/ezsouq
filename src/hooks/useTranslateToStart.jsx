import React, { useEffect, useRef } from "react";

const useTranslateToStart = () => {
  const refType = useRef();
  useEffect(() => {
    refType.current.scrollIntoView();
  }, []);
  return <div>useTranslateToStart</div>;
};

export default useTranslateToStart;
