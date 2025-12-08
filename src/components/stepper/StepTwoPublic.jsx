import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VideoUploader from "../common/VideoUploader";
import { stepTwoRealStateSchema } from "../../validation/createOffer";

const StepTwoPublic = ({ onSubmit }) => {
  // Initialize React Hook Form with Zod validation
  const methods = useForm({
    resolver: zodResolver(stepTwoRealStateSchema),
    defaultValues: {
      video: undefined,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        id="form-step2-video"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-[80vw] md:w-[60vw] lg:w-[45vw] pb-6 text-[#B9B5FF]"
      >
        {/* Video Upload */}
        <VideoUploader
          name="video"
          label="إضافة فيديو للعقار (اختياري)"
          error={errors.video}
        />
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

export default StepTwoPublic;
