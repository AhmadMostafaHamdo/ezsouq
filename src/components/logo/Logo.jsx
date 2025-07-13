import logo from "../../assets/images/logoWithTitle.svg";

const Logo = ({w,h}) => {
  return (
    <div className="w-full flex justify-center h-[22vh]">
      <img
        src={logo}
        alt="logo"
        className="w-[186px] md:w-[232px]"
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
