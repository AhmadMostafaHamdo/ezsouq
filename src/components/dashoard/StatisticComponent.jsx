import { motion } from "framer-motion";

const StatisticComponent = ({ img, count, info, color }) => {
  return (
    <motion.div
      className="flex items-center gap-4 bg-white w-full p-4 pl-10 rounded-md relative shadow-sm"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <img src={img} alt={info} width={40} className="select-none" />
      <div className="leading-[1.3rem] w-[110px]">
        <span className="font-bold text-[#3F3D56]">{count}</span>
        <p className="font-normal text-[#706F84] w-fit text-[.86rem] whitespace-nowrap">
          {info}
        </p>
      </div>

      {/* Colored side bar */}
      <div
        style={{ backgroundColor: color }}
        className="absolute left-0 h-14 w-[7px] -translate-y-1/2 top-1/2 rounded-tr-md rounded-br-md"
      ></div>
    </motion.div>
  );
};

export default StatisticComponent;
