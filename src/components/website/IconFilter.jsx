const IconFilter = ({ items, selectedItem, onSelect }) => {
  return (
    <div className="flex items-center mr-[1.31rem] mt-[12px] w-[7.125rem]">
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          className="ml-10 md:ml-[4.93rem] relative cursor-pointer text-[#9c9cA8]"
          onClick={() => onSelect(item.title)}
        >
          <img
            src={item.img}
            alt={item.title}
            className={`w-9 h-9 md:w-[3.62rem] md:h-[3.68rem] opacity-80 ${
              selectedItem === item.title
                ? "opacity-100 scale-110"
                : "opacity-60"
            }`}
          />
          <span
            className={`font-normal text-[1.25rem] block ${
              selectedItem === item.title ? "text-primary mt-[8px]" : ""
            }`}
          >
            {item.title}
            {selectedItem === item.title && (
              <div className="absolute w-1/2 h-[3px] bottom-[-3px] left-1/2 transform -translate-x-1/2 bg-primary" />
            )}
          </span>
        </button>
      ))}
    </div>
  );
};
export default IconFilter;
