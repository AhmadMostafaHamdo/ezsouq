import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputCreateOffer from "../inputs/InputCreateOffer";
import Error from "../../feedback/error/Error";
import uploadVideo from "../../assets/images/uploadVideo.svg";
import { stepTwoCarsSchema } from "../../validation/createOffer";

const StepTwoCars = ({ onSubmit }) => {
  const videoRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepTwoCarsSchema),
    defaultValues: {
      carName: "",
      color: "",
      dealType: "",
      isnew: "",
      video: undefined,
    },
  });
  useEffect(() => {
    if (window.screenY > 0) {
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-[80vw] md:w-[60vw] lg:w-[45vw] pb-6 text-[#B9B5FF]"
    >
      <InputCreateOffer placeholder="اسم السيارة" {...register("carName")} />
      <Error error={errors.carName?.message} />

      <InputCreateOffer placeholder="اللون" {...register("color")} />
      <Error error={errors.color?.message} />

      <div className="flex gap-6 my-3">
        <div>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="rent"
              {...register("dealType")}
              className="ml-2"
            />{" "}
            أجار
          </label>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="sale"
              {...register("dealType")}
              className="ml-2"
            />{" "}
            بيع
          </label>
          <Error error={errors.dealType?.message} />
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="true" 
              {...register("isnew")}
              className="ml-2"
            />{" "}
            جديدة
          </label>
          <label>
            <input
              type="radio"
              value="false" 
              {...register("isnew")}
              className="ml-2"
            />{" "}
            مستعملة
          </label>

          <Error error={errors.isnew?.message} />
        </div>
      </div>

      <div
        onClick={() => videoRef.current?.click()}
        className="flex-between w-full border p-2 rounded border-[#B9B5FF] cursor-pointer"
      >
        <p>إضافة فيديو</p>
        <img src={uploadVideo} alt="رفع فيديو" />
      </div>
      <input
        type="file"
        ref={videoRef}
        accept="video/*"
        className="hidden"
        onChange={(e) =>
          setValue("video", e.target.files?.[0], { shouldValidate: true })
        }
      />
      {errors.video && (
        <p className="text-red-500 text-sm">{errors.video?.message}</p>
      )}

      <button
        type="submit"
        className="self-end bg-primary text-white rounded-xl py-1 px-5 mt-3"
      >
        حفظ ومتابعة
      </button>
    </form>
  );
};

export default StepTwoCars;
