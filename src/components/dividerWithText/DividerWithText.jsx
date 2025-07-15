const DividerWithText = ({ text }) => {
  return (
    <div className="flex items-center my-2">
      <div className="flex-grow border-t border-[#c9c9c9]"></div>
      <span className="mx-2 text-[12px] text-[#939393]">{text}</span>
      <div className="flex-grow border-t border-[#c9c9c9]"></div>{" "}
    </div>
  );
};

export default DividerWithText;
