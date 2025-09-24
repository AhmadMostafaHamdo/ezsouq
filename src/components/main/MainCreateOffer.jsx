import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepOne from "../stepper/StepOne";
import StepTwoTec from "../stepper/StepTwoTec";
import StepTwoCars from "../stepper/StepTwoCar";
import StepTwoRealState from "../stepper/StepTwoRealState";
import Stepper from "../stepper/Stepper";
import Heading from "../common/Heading";
import arrowLeft from "../../assets/images/Arrow-left.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import Cookies from "js-cookie";
import axios from "axios";
import {
  stepIncrease,
  stepDecrease,
  clearStep,
} from "../../store/steps/stepsSlice";
import { toast, ToastContainer } from "react-toastify";

const MainCreateOffer = () => {
  const dispatch = useDispatch();
  const offerRef = useRef();
  const { currentStep } = useSelector((state) => state.steps);
  const { user } = useSelector((state) => state.users);
  const { selectedCategory } = useSelector((state) => state.category);

  const userId = user?._id;
  const token = Cookies.get("token");
  const [stepOneData, setStepOneData] = useState(null);

  useEffect(() => {
    offerRef.current.scrollIntoView();
    dispatch(clearStep());
  }, [dispatch]);

  // ==================== Step One ====================
  const handleStepOneSubmit = (data) => {
    setStepOneData(data);
    dispatch(stepIncrease());
  };

  // ==================== Step Two ====================
  const handleStepTwoSubmit = async (stepTwoData) => {
    if (!stepOneData) return;

    // دمج بيانات الخطوتين
    const finalData = {
      ...stepOneData,
      ...stepTwoData,
      owner_id: userId,
    };

    const formData = new FormData();

    // إضافة الحقول النصية والرقمية
    Object.entries(finalData).forEach(([key, value]) => {
      if (key === "main_photos" || key === "video") return; // الصور والفيديو نضيفهم لحال
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    // إضافة الصور (مصفوفة)
    if (Array.isArray(finalData.main_photos)) {
      finalData.main_photos.forEach((file) => {
        formData.append("main_photos", file);
      });
    }

    // إضافة الفيديو
    if (finalData.video) {
      formData.append("video", finalData.video);
    }

    // ✅ Debug: عرض القيم قبل الإرسال
    console.log("📌 Final FormData:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await axios.post("/user/add_product", formData, {
        params: { owner_id: userId }, // إذا الباك يطلبها بالـ query
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },  
      });
      toast.success(res.data?.message || "تم نشر الإعلان بنجاح");
      dispatch(clearStep());
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل في نشر الإعلان");
      console.error("❌ فشل النشر:", error.response?.data || error.message);
    }
  };

  // ==================== Back Button ====================
  const handleBack = () => dispatch(stepDecrease());

  return (
    <div className="pt-14" ref={offerRef}>
      <ToastContainer />
      <Heading title="الرجوع" />
      <div className="bg-[#F7F7FF] flex-center flex-col -mt-10">
        <h1 className="font-normal text-[2rem]">نشر إعلان</h1>
        <Stepper />

        {/* ================= Step Forms ================= */}
        {currentStep === 1 && <StepOne onSubmit={handleStepOneSubmit} />}
        {currentStep === 2 && selectedCategory === "موبايلات" && (
          <StepTwoTec onSubmit={handleStepTwoSubmit} />
        )}
        {currentStep === 2 && selectedCategory === "سيارات" && (
          <StepTwoCars onSubmit={handleStepTwoSubmit} />
        )}
        {currentStep === 2 && selectedCategory === "عقارات" && (
          <StepTwoRealState onSubmit={handleStepTwoSubmit} />
        )}

        {/* ================= Navigation Buttons ================= */}
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

          <div className="my-2">
            {currentStep === 2 ? (
              <button
                onClick={() => document.querySelector("form")?.requestSubmit()}
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
      </div>
    </div>
  );
};

export default MainCreateOffer;
