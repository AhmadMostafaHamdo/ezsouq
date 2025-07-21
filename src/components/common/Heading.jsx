import { Link } from "react-router";
import arrowBtn from "../../assets/images/arrow-btn.svg";

const Heading = ({ title }) => {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Link
        to="/"
        className="bg-white rounded-md py-3 px-4 shadow-[0px 4px 15.8px 0px #00000014]"
        aria-label="Navigate back"
      >
        <img src={arrowBtn} alt="Back arrow" />
      </Link>
      <h1 className="font-normal w-full text-[#2F2E41] text-[1.5rem] text-center md:text-start">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
