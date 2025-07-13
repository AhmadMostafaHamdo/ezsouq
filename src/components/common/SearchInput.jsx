import searchIcon from "../../assets/images/search.svg";

import { selectOptions } from "../../data/filterData";
const SearchInput = ({ mobile = false }) => {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`flex w-[78w] h-10 items-center  bg-main rounded-lg px-4 ${
        mobile ? "border border-gray-600 shadow-md" : ""
      }`}
    >
      <select className="outline-none cursor-pointer font-bold text-[.8rem] bg-main ml-3 text-primary-dark">
        {selectOptions.map((option, index) => (
          <option key={index} value={option[index]}>
            {option}
          </option>
        ))}
      </select>
      <div className="border-r border-gray-300 flex items-center flex-1">
        <input
          type="text"
          className="h-full w-full px-2 border-0 bg-main placeholder:text-white  text-sm focus:outline-none"
          placeholder="ابحث هنا..."
        />
        <button
          type="submit"
          className="ml-3 mr-2 w-5 h-5 text-gray-500 md:hidden"
        >
          <img src={searchIcon} alt="Search" loading="lazy" />
        </button>
      </div>
    </form>
  );
};
export default SearchInput;
