import React, { useEffect } from "react";

/**
 * Reusable Select component
 * @param {Array} options - List of options to display
 * @param {string} type - Type of select ("governorate", "city", or general)
 * @param {string} value - Selected value
 * @param {Function} onSelect - Callback when an option is selected
 */
const Select = ({ options = [], type, value, onSelect }) => {
  // Set default value if none is selected
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
