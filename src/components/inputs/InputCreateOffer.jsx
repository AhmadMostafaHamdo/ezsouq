import React from "react";

const InputCreateOffer = ({ name }) => {
  return (
    <input
      type="text"
      placeholder={name}
      className="w-full border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
    />
  );
};

export default InputCreateOffer;
