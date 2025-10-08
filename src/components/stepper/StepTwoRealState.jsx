import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "../select/Select";
import { stepTwoRealStateSchema } from "../../validation/createOffer";

const StepTwoRealState = ({ onSubmit }) => {
  const videoRef = useRef(null);

  // Initialize React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepTwoRealStateSchema),
    defaultValues: {
      real_estate_type: "",
      for_sale: "",
      is_Furniture: "",
      video: undefined,
      name: "",
    },
  });

  // Auto-copy real_estate_type to name
  const handleRealEstateChange = (val) => {
    setValue("real_estate_type", val);
    setValue("name", val); // ✅ اسم الإعلان نفس نوع العقار
  };

  return (
    <form
      id="form-step2"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-[80vw] md:w-[60vw] lg:w-[45vw] pb-6 text-[#B9B5FF]"
    >
      {/* Real Estate Type */}
      <Controller
        name="real_estate_type"
        control={control}
        render={({ field }) => (
          <Select
            options={[{ name: "النوع" }, { name: "شقة" }, { name: "بيت" }]}
            type="governorate"
            value={field.value}
            onSelect={handleRealEstateChange}
          />
        )}
      />
      {errors.real_estate_type && (
        <p className="text-red">{errors.real_estate_type.message}</p>
      )}

      {/* For Sale / Rent & Furniture Options */}
      <div className="flex gap-6 my-3">
        {/* Sale / Rent */}
        <div>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="rent"
              {...register("for_sale")}
              className="ml-2"
            />{" "}
            أجار
          </label>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="sale"
              {...register("for_sale")}
              className="ml-2"
            />{" "}
            بيع
          </label>
          {errors.for_sale && (
            <p className="text-red">{errors.for_sale.message}</p>
          )}
        </div>

        {/* Furniture Status */}
        <div>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="مفروشة"
              {...register("is_Furniture")}
              className="ml-2"
            />{" "}
            مفروشة
          </label>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="غير مفروشة"
              {...register("is_Furniture")}
              className="ml-2"
            />{" "}
            غير مفروشة
          </label>
          {errors.is_Furniture && (
            <p className="text-red">{errors.is_Furniture.message}</p>
          )}
        </div>
      </div>

      {/* Video Upload */}
      <input
        type="file"
        ref={videoRef}
        accept="video/*"
        className="hidden"
        onChange={(e) => setValue("video", e.target.files?.[0])}
      />
      {errors.video && <p className="text-red">{errors.video.message}</p>}

      {/* Submit Button */}
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
