import React from "react";

// Input component with forwardRef for integration with react-hook-form
const InputCreateOffer = React.forwardRef(
  ({ placeholder, type = "text", ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className="w-full border p-2 rounded border-[#B9B5FF]"
      {...rest}
    />
  )
);

export default InputCreateOffer;
