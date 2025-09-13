import React, { useEffect } from "react";

const Select = ({ options = [], type, value, onSelect }) => {
  useEffect(() => {
    if (!value && options.length > 0) {
      const firstOption =
        type === "governorate" || type === "city"
          ? options[0]?.name || ""
          : options[0] || "";
      onSelect?.(firstOption);
    }
  }, [options, value, type, onSelect]);

  return (
    <select
      value={value || ""}
      onChange={(e) => onSelect?.(e.target.value)}
      className="w-full p-2 bg-white rounded-[5px] outline-none cursor-pointer border-[1px] border-solid border-[#B9B5FF]"
    >
      {options.map((option, index) => {
        const optionValue =
          type === "governorate" || type === "city"
            ? option?.name || option
            : option;
        return (
          <option key={index} value={optionValue}>
            {optionValue}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
