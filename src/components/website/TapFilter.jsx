import CitiesSketlon from "../../assets/sketlon/CitiesSketlon";

const TabFilter = ({
  items,
  selectedItem,
  onSelect,
  className = "",
  type,
  loading,
}) => {
  return (
    <div>
      {loading ? (
        <CitiesSketlon />
      ) : (
        <div
          className={`flex font-normal overflow-auto scrollbar-hide text-[14px] md:text-[1.2rem] text-[#3F3D56] ${className}`}
        >
          {Array.isArray(items) &&
            items.length > 0 &&
            items.map((item, index) => {
              const value = type === "governorate" ? item.name : item;
              const isSelected = selectedItem === value;
              return (
                <button
                  key={index}
                  type="button"
                  className={`ml-[27px] md:ml-[54px] whitespace-nowrap cursor-pointer b-0 py-2 px-1 rounded-md hover:bg-[#5a59590c]  relative ${
                    isSelected ? "text-primary" : ""
                  }`}
                  onClick={() => onSelect(value)}
                >
                  {value}

                  <div
                    className={`duration-300 absolute  bottom-0 left-1/2 transform -translate-x-1/2 ${
                      isSelected ? "w-1/2" : "w-0"
                    } h-[3px] bg-primary`}
                  />
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TabFilter;
