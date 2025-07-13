  import { useRef } from "react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { stepTwoHomeSchema } from "../../validation/createOffer";
  import InputCreateOffer from "../inputs/InputCreateOffer";
  import uploadVideo from "../../assets/images/uploadVideo.svg";

  const StepTwoHome = ({ onSubmit }) => {
    const videoRef = useRef(null);

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(stepTwoHomeSchema),
      defaultValues: {
        carName: "",
        color: "",
        dealType: "",
        condition: "",
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
        {errors.carName && (
          <p className="text-red-500">{errors.carName.message}</p>
        )}

        {/* اللون */}
        <InputCreateOffer placeholder="اللون" {...register("color")} />
        {errors.color && <p className="text-red-500">{errors.color.message}</p>}

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
            <label className="block cursor-pointer">
              <input
                type="radio"
                value="sale"
                {...register("dealType")}
                className="ml-2"
              />
              بيع
            </label>
          </div>

          {/* الحالة */}
          <div>
            <label className="block cursor-pointer">
              <input
                type="radio"
                value="new"
                {...register("condition")}
                className="ml-2"
              />
              جديدة
            </label>
            <label className="block cursor-pointer">
              <input
                type="radio"
                value="used"
                {...register("condition")}
                className="ml-2"
              />
              مستعملة
            </label>
          </div>
        </div>
        {errors.dealType && (
          <p className="text-red-500">{errors.dealType.message}</p>
        )}
        {errors.condition && (
          <p className="text-red-500">{errors.condition.message}</p>
        )}

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
            setValue("video", e.target.files?.[0]);
          }}
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

  export default StepTwoHome;
