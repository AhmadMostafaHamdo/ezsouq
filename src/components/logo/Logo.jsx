import logo from "../../assets/images/logoWithTitle.svg";

// Reusable logo component
const Logo = ({ w, h }) => {
  return (
    <div className="w-full flex justify-center" style={{ height: h || "22vh" }}>
      <img
        src={logo}
        alt="logo"
        className={`w-[${w || 186}px] md:w-[${w || 232}px]`}
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
