import { motion } from "framer-motion";
import arrowBtn from "../../assets/images/arrow-btn.svg";
import { useNavigate } from "react-router";

const Heading = ({ title, url }) => {
  const navigate = useNavigate();

  const handelClick = () => {
    if (url || window.history.length > 1) {
      navigate(url || -1);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4 mt-1 mr-2 relative">
      {/* Back button always shows the image */}
      <motion.button
        onClick={handelClick}
        className="bg-white rounded-md shadow-[0px_4px_15.8px_0px_#00000014]
                   hover:bg-[#F4F3FF] hover:scale-105 hover:shadow-[0px_6px_20px_0px_#00000020]
                   transition-all duration-200 flex items-center justify-center p-2"
        aria-label="العودة للخلف"
        whileHover={{ rotate: -5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={arrowBtn} alt="سهم العودة" className="w-3" />
      </motion.button>

      <h1 className="font-normal w-full text-[#2F2E41] text-[1.5rem] text-nowrap text-start">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
