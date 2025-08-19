const StatisticComponent = ({ img, count, info, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white w-full p-4 pl-10 rounded-md relative">
      <img src={img} alt={info} width={40} />
      <div className="leading-[1.30rem] w-[110px]">
        <span className="font-bold text-[#3F3D56]">{count}</span>
        <p className="font-normal text-[#706F84] w-fit text-[.9rem] whitespace-nowrap ">{info}</p>
      </div>
      <div
        style={{ backgroundColor: color }}
        className="absolute left-0 h-14 w-[7px] -translate-y-1/2 top-1/2 rounded-tr-md rounded-br-md"
      ></div>
    </div>
  );
};

export default StatisticComponent;
