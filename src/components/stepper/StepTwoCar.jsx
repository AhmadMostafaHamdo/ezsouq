import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCreateOffer from "../inputs/InputCreateOffer";
import VideoUploader from "../common/VideoUploader";
import { stepTwoCarsSchema } from "../../validation/createOffer";
const StepTwoCars = ({ onSubmit }) => {
  // Initialize React Hook Form with Zod validation
  const methods = useForm({
    resolver: zodResolver(stepTwoCarsSchema),
    defaultValues: {
      name: "",
      color: "",
      for_sale: "",
      isnew: "",
      video: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        id="form-step2-cars"
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80vw] md:w-[60vw] lg:w-[45vw] flex flex-col gap-3 text-[#B9B5FF] pb-6"
      >
        {/* Car Name */}
        <InputCreateOffer placeholder="اسم السيارة" {...register("name")} />
        {errors.name && <p className="text-red">{errors.name.message}</p>}

        {/* Color */}
        <InputCreateOffer placeholder="اللون" {...register("color")} />
        {errors.color && <p className="text-red">{errors.color.message}</p>}

        {/* For Sale Type */}
        <div className="flex flex-col gap-2">
          <label>نوع العملية:</label>
          <select {...register("for_sale")} className="p-2 rounded border">
            <option value="">اختر نوع العملية</option>
            <option value="rent">إيجار</option>
            <option value="sale">بيع</option>
          </select>
          {errors.for_sale && (
            <p className="text-red">{errors.for_sale.message}</p>
          )}
        </div>

        {/* New or Used */}
        <div className="flex self-start gap-6">
          <label>
            <input type="radio" value="true" {...register("isnew")} /> جديدة
          </label>
          <label>
            <input type="radio" value="false" {...register("isnew")} /> مستعملة
          </label>
        </div>
        {errors.isnew && <p className="text-red">{errors.isnew.message}</p>}

        {/* Video Upload */}
        <VideoUploader name="video" label="إضافة فيديو للسيارة (اختياري)" error={errors.video} />
        
        {/* Submit Button */}
        <button
          type="submit"
          className="self-end bg-primary text-white rounded-xl py-1 px-5"
        >
          حفظ ومتابعة
        </button>

      </form>
    </FormProvider>
  );
};

export default StepTwoCars;
