const SortDropdown = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="flex-between mt-[1.875rem] font-normal text-[#A3A0DD] text-[1rem] mb-[1.5rem] w-[90vw]">
      <p>فرز النتائج حسب:</p>
      <select
        className="outline-none w-16 cursor-pointer bg-[#F7F7FF]"
        value={selectedOption}
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SortDropdown;
