import React from "react";

const InputCreateOffer = React.forwardRef(
  ({ placeholder, type = "text", ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className="w-full border p-2 rounded border-[#B9B5FF]"
      {...rest} /* يسمح بتمرير register */
    />
  )
);

export default InputCreateOffer;
