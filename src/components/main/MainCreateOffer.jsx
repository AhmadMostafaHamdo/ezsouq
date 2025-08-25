import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepOne from "../stepper/StepOne";
import StepTwoTec from "../stepper/StepTwoTec";
import StepTwoRealState from "../stepper/StepTwoRealState";
import StepTwoCars from "../stepper/StepTwoCar";
import arrowLeft from "../../assets/images/Arrow-left.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import {
  stepIncrease,
  stepDecrease,
  clearStep,
} from "../../store/steps/stepsSlice";
import axios from "axios";
import Stepper from "../stepper/Stepper";

const MainCreateOffer = () => {
  const dispatch = useDispatch();
  const offerRef = useRef();
  const { currentStep } = useSelector((state) => state.steps);
  const { user } = useSelector((state) => state.users);
  const { selectedCategory } = useSelector((state) => state.category);

  const userId = user?._id;
  const [stepOneData, setStepOneData] = useState(null);

  useEffect(() => {
    offerRef.current.scrollIntoView();
    dispatch(clearStep());
  }, [dispatch]);

  const handleStepOneSubmit = (data) => {
    setStepOneData(data);
    dispatch(stepIncrease());
  };

  const handleStepTwoSubmit = async (data) => {
    const finalData = { ...stepOneData, ...data };
    const formData = new FormData();

    Object.entries(finalData).forEach(([key, value]) => {
      if (key === "main_photos") return;
      if (value !== undefined && value !== null) formData.append(key, value);
    });

    finalData.main_photos?.forEach((file) =>
      formData.append("main_photos", file)
    );
    if (finalData.video) formData.append("video", finalData.video);

    try {
      const res = await axios.post("/user/add_product", formData, {
        params: { owner_id: userId },
      });
      console.log("✅ تم النشر بنجاح", res.data);
      dispatch(clearStep());
    } catch (error) {
      console.error("❌ فشل النشر:", error.response?.data || error.message);
    }
  };

  const handleBack = () => dispatch(stepDecrease());

  return (
    <div
      className="bg-[#F7F7FF] flex-center flex-col pt-6 pb-28"
      ref={offerRef}
    >
      <h1 className="font-normal text-[2rem] mt-10">نشر إعلان</h1>
      <Stepper />

      {currentStep === 1 && <StepOne onSubmit={handleStepOneSubmit} />}
      {currentStep === 2 && selectedCategory === "تقنيات" && (
        <StepTwoTec onSubmit={handleStepTwoSubmit} />
      )}
      {currentStep === 2 && selectedCategory === "سيارات" && (
        <StepTwoCars onSubmit={handleStepTwoSubmit} />
      )}
      {currentStep === 2 && selectedCategory === "عقارات" && (
        <StepTwoRealState onSubmit={handleStepTwoSubmit} />
      )}

      <div className="flex-between w-[80vw] md:w-[60vw] lg:w-[40vw] mt-4">
        <button
          disabled={currentStep === 1}
          onClick={handleBack}
          className={`flex-center rounded-xl py-[.4rem] px-5 border-[1px] ${
            currentStep === 1
              ? "bg-[#E0E0E0] text-[#9E9E9E]"
              : "text-[#B1ADFF] border-[#B1ADFF]"
          }`}
        >
          <img src={arrowRight} alt="السابق" /> السابق
        </button>

        {currentStep === 2 ? (
          <button
            onClick={() => document.querySelector("form").requestSubmit()}
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
