import { Link, useNavigate } from "react-router";
import arrowBtn from "../../assets/images/arrow-btn.svg";

// Heading component with back navigation
const Heading = ({ title, url }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 mb-4 mr-2">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-white rounded-md py-3 px-4 shadow-[0px_4px_15.8px_0px_#00000014]"
        aria-label="العودة للخلف" // Arabic ARIA label for accessibility
      >
        <img src={arrowBtn} alt="سهم العودة" loading="lazy" />{" "}
        {/* Arabic alt for SEO */}
      </button>

      {/* Heading title */}
      <h1 className="font-normal w-full text-[#2F2E41] text-[1.5rem] text-center text-start">
        {title}
      </h1>
    </div>
  );
};

export default Heading;
