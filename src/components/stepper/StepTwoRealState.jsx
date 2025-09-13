import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCreateOffer from "../inputs/InputCreateOffer";
import Select from "../select/Select";
import { stepTwoRealStateSchema } from "../../validation/createOffer";

const StepTwoRealState = ({ onSubmit }) => {
  const videoRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepTwoRealStateSchema),
    defaultValues: { type: "", dealType: "", condition: "", video: undefined },
  });

  return (
    <form
      id="form-step2"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-[80vw] md:w-[60vw] lg:w-[45vw] pb-6 text-[#B9B5FF]"
    >
      <Select
        options={[{ name: "النوع" }, { name: "شقة" }, { name: "بيت" }]}
        type="governorate"
      />
      {errors.type && <p className="text-red-500">{errors.type.message}</p>}

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
          {errors.dealType && (
            <p className="text-red-500">{errors.dealType.message}</p>
          )}
        </div>

        <div>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="مفروشة"
              {...register("condition")}
              className="ml-2"
            />{" "}
            مفروشة
          </label>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="غير مفروشة"
              {...register("condition")}
              className="ml-2"
            />{" "}
            غير مفروشة
          </label>
          {errors.condition && (
            <p className="text-red-500">{errors.condition.message}</p>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={videoRef}
        accept="video/*"
        className="hidden"
        onChange={(e) => setValue("video", e.target.files?.[0])}
      />
      {errors.video && <p className="text-red-500">{errors.video.message}</p>}

      <button
        type="submit"
        className="self-end bg-primary text-white rounded-xl py-1 px-5"
      >
        حفظ ومتابعة
      </button>
    </form>
  );
};

export default StepTwoRealState;
