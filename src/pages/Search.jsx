import filter from "../assets/images/filter.svg";
import searchFilter from "../assets/images/searchFilter.svg";
const Search = () => {
  return (
    <div className="bg-[#F7F7FF]">
      <div className="container pt-20 ">
        <div className="flex items-center gap-10">
          <h1 className="font-normal text-[#2F2E41] text-[1.5rem] leading-9 mb-3">
            البحث والفلترة
          </h1>
          <input
            type="text"
            className="w-[35vw] p-1 bg-[#D7D5FF] rounded-md outline-none border-none placeholder:text-white"
            placeholder="بحث ..."
          />
          <img src={filter} alt="" />
        </div>
        <p className="text-primary font-normal text-[1rem] my-4 mr-[10.5rem] inline-block w-fit">
          اكتب اسم منتج، خدمة، أو تصفح حسب الفئة
        </p>
        <img src={searchFilter} alt="" className="m-auto w-44 mt-5" />
      </div>
    </div>
  );
};

export default Search;
