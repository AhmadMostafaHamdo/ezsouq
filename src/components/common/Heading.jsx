import { useNavigate } from "react-router";
import arrowBtn from "../../assets/images/arrow-btn.svg";

const Heading = ({ title, url }) => {
  const navigate = useNavigate();

  const handelClick = () => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4 mt-1 mr-2">
      {/* Back button */}
      <button
        onClick={handelClick}
        className="bg-white rounded-md  shadow-[0px_4px_15.8px_0px_#00000014] 
                   transition-all duration-300 hover:bg-[#F4F3FF] hover:scale-105 hover:shadow-[0px_6px_20px_0px_#00000020]"
        aria-label="العودة للخلف"
      >
        <img
          src={arrowBtn}
          alt="سهم العودة"
          loading="lazy"
          className="transition-transform py-[.6rem] px-4 w-10 duration-300 group-hover:-translate-x-1 hover:-translate-x-1"
        />
      </button>

      {/* Heading title */}
      <h1 className="font-normal w-full text-[#2F2E41] text-[1.5rem] text-nowrap text-start">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
