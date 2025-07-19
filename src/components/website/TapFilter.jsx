import { useEffect, useState } from "react";
import CitiesSketlon from "../../assets/sketlon/CitiesSketlon";

const TabFilter = ({
  items,
  selectedItem,
  onSelect,
  className = "",
  type,
  loading,
}) => {
  
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    if (items.length > 0 && !selectedValue) {
      const initialValue = type === "governorate" ? items[0]?.name : items[0];
      setSelectedValue(initialValue);
      onSelect?.(initialValue);
    }
  }, [items, selectedValue, type]);

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onSelect?.(value);
  };
  return (
    <div>
      {loading ? (
        <CitiesSketlon />
      ) : (
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
              onClick={() =>
                onSelect(type === "governorate" ? item.name : item)
              }
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
      )}
    </div>
  );
};
export default TabFilter;
