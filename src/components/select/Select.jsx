import React, { useEffect, useState } from "react";

const Select = ({ options = [], type, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (options.length > 0 && !selectedValue) {
      const initialValue =
        type === "governorate" ? options[0]?.name : options[0];
      setSelectedValue(initialValue);
      onSelect?.(initialValue); 
    }
  }, [options, selectedValue, type]);

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onSelect?.(value); 
  };
  return (
    <select
      value={selectedValue}
      onChange={handleSelect}
      className="w-full p-2 bg-white rounded-[5px] outline-none cursor-pointer border-[1px] border-solid border-[#B9B5FF]"
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={type === "governorate" ? option?.name : option}
        >
          {type === "governorate" ? option?.name : option}
        </option>
      ))}
    </select>
  );
};

export default Select;
