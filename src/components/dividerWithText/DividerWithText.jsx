const DividerWithText = ({ text }) => {
  return (
    <div
      className="flex items-center my-2"
    >
      <div className="flex-grow border-t border-[#939393]"></div>
      <span className="mx-2 text-[12px] ">{text}</span>
      <div className="flex-grow border-t border-[#939393]"></div>{" "}
    </div>
  );
};

export default DividerWithText;
