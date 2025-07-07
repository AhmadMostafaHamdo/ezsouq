import React from "react";
import Stepper from "../stepper/Stepper";
import StepOne from "../stepper/StepOne";
import { useDispatch, useSelector } from "react-redux";
import StepTwoTec from "../stepper/StepTwoTec";
import StepTwoCar from "../stepper/StepTwoCar";
import arrowLeft from "../../assets/images/Arrow-left.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import { stepIncrease, stepDecrease } from "../../store/steps/stepsSlice";

const MainCreateOffer = () => {
  const { currentStep } = useSelector((state) => state.steps);
  const dispatch = useDispatch();
  const handelDecrease = () => {
    dispatch(stepIncrease());
  };
  const handelIncrease = () => {
    dispatch(stepDecrease());
  };
  return (
    <div className="bg-[#F7F7FF] flex-center flex-col pt-6 pb-28">
      <h1 className="font-normal text-[2rem] mt-10">نشر إعلان</h1>
      <Stepper />
      {currentStep === 1 ? (
        <div>
          <StepOne />
        </div>
      ) : (
        <StepTwoTec />
      )}
      <div className="flex-between w-[80vw] md:w-[60vw] lg:w-[40vw]">
        <button
          className={`${
            currentStep === 1
              ? "bg-[#E0E0E0] text-[#9E9E9E] "
              : "bg-primary text-white"
          }  rounded-xl py-[.4rem] px-5`}
        >
          نشر الإعلان
        </button>
        {currentStep === 1 ? (
          <button
            onClick={handelDecrease}
            className="flex-center rounded-xl py-[.4rem] px-5 border-[1px] text-[#B1ADFF] border-solid border-[#B1ADFF]"
          >
            التالي <img src={arrowLeft} alt="" />
          </button>
        ) : (
          <button
            onClick={handelIncrease}
            className="flex-center rounded-xl py-[.4rem] px-5 border-[1px] text-[#B1ADFF] border-solid border-[#B1ADFF]"
          >
            <img src={arrowRight} alt="" />
            السابق
          </button>
        )}
      </div>
    </div>
  );
};

export default MainCreateOffer;
