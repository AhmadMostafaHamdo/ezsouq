const TabFilter = ({ items, selectedItem, onSelect, className = "", type }) => {
  return (
    <div
      className={`flex font-normal text-[14px] md:text-[1.2rem] text-[#3F3D56] ${className}`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className={`ml-[27px] md:ml-[54px] whitespace-nowrap cursor-pointer b-0 py-2 px-1 relative ${
            selectedItem === item.name || selectedItem === item
              ? "text-primary"
              : ""
          }`}
          onClick={() => onSelect(type === "governorate" ? item.name : item)}
        >
          {type === "governorate" ? item.name : item}
          {type === "governorate" && selectedItem == item.name && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[3px] bg-primary" />
          )}
          {type === "city" && selectedItem == item && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[3px] bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};
export default TabFilter;
