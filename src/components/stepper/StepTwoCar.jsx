import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import uploadVideo from "../../assets/images/uploadVideo.svg";
import InputCreateOffer from "../inputs/InputCreateOffer";
import Error from "../../feedback/error/Error";

// Zod schema للتحقق من البيانات
const stepTwoHomeSchema = z.object({
  carName: z.string().nonempty("يجب إدخال اسم السيارة"),
  color: z.string().nonempty("يجب إدخال اللون"),
  dealType: z.enum(["rent", "sale"], {
    errorMap: () => ({ message: "اختر نوع العملية" }),
  }),
  isnew: z.enum(["جديدة", "مستعملة"], {
    errorMap: () => ({ message: "اختر الحالة" }),
  }),
  video: z
    .any()
    .refine((file) => file instanceof File || file === undefined, {
      message: "يجب رفع ملف فيديو صحيح",
    })
    .optional(),
});

const StepTwoCars = ({ onSubmit }) => {
  const videoRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepTwoHomeSchema),
    mode: "onSubmit", // يظهر الأخطاء مباشرة عند التغيير
    defaultValues: {
      carName: "",
      color: "",
      dealType: "",
      isnew: "",
      video: undefined,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-[80vw] md:w-[60vw] lg:w-[45vw] pb-6 text-[#B9B5FF]"
    >
      {/* اسم السيارة */}
      <InputCreateOffer placeholder="اسم السيارة" {...register("carName")} />
      <Error error={errors.carName?.message} />
      {/* اللون */}
      <InputCreateOffer placeholder="اللون" {...register("color")} />
      <Error error={errors.color?.message} />
      {/* نوع العملية + الحالة */}
      <div className="flex gap-6 my-3">
        {/* العملية */}
        <div>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="rent"
              {...register("dealType")}
              className="ml-2"
            />
            أجار
          </label>
          <label className="block cursor-pointer mb-2">
            <input
              type="radio"
              value="sale"
              {...register("dealType")}
              className="ml-2"
            />
            بيع
          </label>
          <Error error={errors.dealType?.message} />
        </div>

        {/* الحالة */}
        <div>
          <label className="block cursor-pointer">
            <input
              type="radio"
              value="جديدة"
              {...register("isnew")}
              className="ml-2"
            />
            جديدة
          </label>
          <label className="block cursor-pointer mb-2">
            <input
              type="radio"
              value="مستعملة"
              {...register("isnew")}
              className="ml-2"
            />
            مستعملة
          </label>
          <Error error={errors.isnew?.message} />
        </div>
      </div>

      {/* رفع فيديو */}
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
        onChange={(e) => {
          setValue("video", e.target.files?.[0], { shouldValidate: true });
        }}
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
