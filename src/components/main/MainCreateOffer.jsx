import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../stepper/Stepper";
import StepOne from "../stepper/StepOne";
import StepTwoTec from "../stepper/StepTwoTec";
import arrowLeft from "../../assets/images/Arrow-left.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import { stepIncrease, stepDecrease } from "../../store/steps/stepsSlice";
import axios from "axios";

const MainCreateOffer = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state) => state.steps);
  const { user } = useSelector((state) => state.users);
  const userId = user?._id;
  const [stepOneData, setStepOneData] = useState(null);
  const [stepTwoData, setStepTwoData] = useState(null);

  const handleBack = () => dispatch(stepDecrease());

  const handleStepOneSubmit = (data) => {
    setStepOneData(data);
    dispatch(stepIncrease());
  };

  const handleStepTwoSubmit = async (data) => {
    setStepTwoData(data);
    const finalData = { ...stepOneData, ...data };
    console.log("📦 إعلان كامل:", finalData);
    try {
      const res = await axios.post(
        `/user/add_product?owner_id=${userId}`,
        finalData
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    // dispatch(createOfferThunk(finalData));
  };

  return (
    <div className="bg-[#F7F7FF] flex-center flex-col pt-6 pb-28">
      <h1 className="font-normal text-[2rem] mt-10">نشر إعلان</h1>
      <Stepper />

      {currentStep === 1 && <StepOne onSubmit={handleStepOneSubmit} />}
      {currentStep === 2 && <StepTwoTec onSubmit={handleStepTwoSubmit} />}

      <div className="flex-between w-[80vw] md:w-[60vw] lg:w-[40vw] mt-6">
        <button
          disabled={currentStep === 1}
          onClick={handleBack}
          className={`flex-center rounded-xl py-[.4rem] px-5 border-[1px] ${
            currentStep === 1
              ? "bg-[#E0E0E0] text-[#9E9E9E]"
              : "text-[#B1ADFF] border-[#B1ADFF]"
          }`}
        >
          <img src={arrowRight} alt="السابق" loading="lazy" /> السابق
        </button>

        {currentStep === 2 ? (
          <button
            onClick={() => document.getElementById("submit-step2")?.click()}
            className="bg-primary text-white rounded-xl py-[.4rem] px-5"
          >
            نشر الإعلان
          </button>
        ) : (
          <button
            onClick={() => document.getElementById("submit-step1")?.click()}
            className="flex-center rounded-xl py-[.4rem] px-5 border-[1px] text-[#B1ADFF] border-[#B1ADFF]"
          >
            التالي <img src={arrowLeft} alt="التالي" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MainCreateOffer;
