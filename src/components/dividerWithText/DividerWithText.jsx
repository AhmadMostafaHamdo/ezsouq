import React from "react";

const DividerWithText = ({ text }) => {
  return (
    <div className="flex items-center my-2">
      {/* Left line */}
      <div className="flex-grow border-t border-[#c9c9c9]" />

      {/* Center text */}
      <span className="mx-2 text-[12px] text-[#939393]">{text}</span>

      {/* Right line */}
      <div className="flex-grow border-t border-[#c9c9c9]" />
    </div>
  );
};

export default DividerWithText;
