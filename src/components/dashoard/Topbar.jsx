import notification from "../../assets/images/dashboard/notification.svg";
import search from "../../assets/images/search.svg";
const Topbar = () => {
  return (
    <div className="flex-between my-5">
      <h1 className="text-[#1D2A45] font-bold">احصائيات عامة</h1>
      <div className="relative">
        <input
          type="text "
          className="relative p-1 pr-7 border-none rounded-md w-[40vw]" 
          placeholder="بحث..."
        />
        <img
          src={search}
          className="filter invert-0 brightness-0 contrast-100 absolute top-1/2 -translate-y-1/2 right-2"
          alt=""
        />
      </div>
      <img src={notification} alt="" />
    </div>
  );
};

export default Topbar;
