import { useSelector } from "react-redux";

const Stepper = () => {
  // Get steps array and current step from Redux
  const { steps, currentStep } = useSelector((state) => state.steps);

  return (
    <div className="flex-center w-fit p-4 gap-5 relative">
      {/* Dotted line connecting steps */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-16 border-t-2 border-primary border-dotted opacity-60 z-0" />

      {/* Optional static line behind steps */}
      <div className="absolute bg-primary w-3" />

      {/* Step circles */}
      {steps?.map((step, index) => (
        <div
          key={index}
          className={`w-6 h-6 rounded-full flex-center relative border-[1px] border-solid border-primary ${
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
