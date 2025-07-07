import React from "react";

const Select = ({ options = [] }) => {
  return (
    <select className="w-full p-2 bg-white rounded-[5px] outline-none cursor-pointer border-[1px] border-solid border-[#B9B5FF]">
      {options.map((option, key) => (
        <option value={option} key={key}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
