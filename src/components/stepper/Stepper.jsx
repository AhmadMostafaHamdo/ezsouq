import { useSelector } from "react-redux";

const Stepper = () => {
  const { steps } = useSelector((state) => state.steps);
  const { currentStep } = useSelector((state) => state.steps);
  return (
    <div className="flex-center w-fit p-4 over gap-5 relative ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-16 border-t-2 border-primary border-dotted opacity-60 z-0" />

      <div className="absolute bg-primary w-3 " />
      {steps?.map((step, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-[50%] flex-center relative border-[1px] border-solid border-primary ${
            currentStep === step
              ? "bg-primary text-white"
              : "bg-white text-primary"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
