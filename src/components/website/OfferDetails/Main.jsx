import car from "../../../assets/images/car-offer.svg";
const Main = () => {
  return (
    <div className="">
      <div className="container">
        {/* left section */}
        <div className=" flex flex-col items-center w-fit gap-8 mt-16">
          <div className="h-[calc(100vh-23.2rem)] w-[calc(100vw-641px)] rounded-[14px] relative">
            <img
              src={car}
              alt=""
              className="h-full w-full object-cover rounded-[14px]"
            />
            <div
              style={{ transform: "translate(-50%)" }}
              className="absolute flex justify-between w-[80%] transform -translte-x-1/2 -translate-y-1/2 left-1/2 top-1/2 gap-30"
            >
              <button className="w-10 h-10 bg-[#F7F7FF] backdrop-filter-blur(17px) flex-center rounded-md">
                &lt;
              </button>
              <button className="w-10 h-10 bg-[#F7F7FF] backdrop-filter-blur(17px) flex-center rounded-md">
                &gt;
              </button>
            </div>
          </div>
          <div className="flex gap-[.5rem]">
            <img
              src={car}
              alt=""
              className="w-[103px] rounded-[3px] border-2 border-[#6C63FF] shadow-[0px 4px 15.6px 8px rgba(63, 61, 86, 0.3)] "
            />
            <img
              src={car}
              alt=""
              className="w-[103px] rounded-[3px] border-2 border-[#D9D9D9] h-[103px]"
            />
            <img
              src={car}
              alt=""
              className="w-[103px] rounded-[3px] border-2 border-[#D9D9D9] h-[103px]"
            />
            <img
              src={car}
              alt=""
              className="w-[103px] rounded-[3px] border-2 border-[#D9D9D9] h-[103px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
