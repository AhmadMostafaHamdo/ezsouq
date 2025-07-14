import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepTwoTecSchema } from "../../validation/createOffer";
import InputCreateOffer from "../inputs/InputCreateOffer";
import VideoUploader from "../common/VideoUploader";

const StepTwoTec = ({ onSubmit }) => {
  const methods = useForm({
    resolver: zodResolver(stepTwoTecSchema),
    defaultValues: {
      name: "",
      Category_name: "",
      color: "",
      isnew: "",
      processor: "",
      memory: "",
      video: undefined,
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-[80vw] md:w-[60vw] lg:w-[45vw] flex flex-col gap-3 text-[#B9B5FF] pb-6"
      >
        <InputCreateOffer placeholder="الجهاز" {...methods.register("name")} />
        {methods.formState.errors.name && (
          <p className="text-red-500">
            {/* {methods.formState.errors.device.message} */}
          </p>
        )}

        <select
          {...methods.register("Category_name")}
          className="w-full p-2 bg-white rounded border border-[#B9B5FF]"
        >
          <option value="">النوع</option>
          <option value="لابتوب">عقارات</option>
          <option value="موبايلات">موبايلات</option>
          <option value="تابلت">سيارات</option>
        </select>
        {methods.formState.errors.Category_name && (
          <p className="text-red-500">
            {methods.formState.errors.Category_name.message}
          </p>
        )}

        <InputCreateOffer placeholder="اللون" {...methods.register("color")} />
        {methods.formState.errors.color && (
          <p className="text-red-500">
            {methods.formState.errors.color.message}
          </p>
        )}

        <div className="flex self-start gap-6">
          <label className="cursor-pointer">
            <input
              type="radio"
              value="new"
              {...methods.register("isnew")}
              className="ml-2"
            />{" "}
            جديدة
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              value="used"
              {...methods.register("isnew")}
              className="ml-2"
            />{" "}
            مستعملة
          </label>
        </div>
        {methods.formState.errors.isnew && (
          <p className="text-red-500">
            {methods.formState.errors.isnew.message}
          </p>
        )}

        <InputCreateOffer
          placeholder="المعالج"
          {...methods.register("processor")}
        />
        {methods.formState.errors.processor && (
          <p className="text-red-500">
            {methods.formState.errors.processor.message}
          </p>
        )}

        <InputCreateOffer
          placeholder="الذاكرة"
          {...methods.register("memory")}
        />
        {methods.formState.errors.memory && (
          <p className="text-red-500">
            {methods.formState.errors.memory.message}
          </p>
        )}

        <VideoUploader name="video" label="إضافة فيديو" />
        {methods.formState.errors.video && (
          <p className="text-red-500">
            {methods.formState.errors.video.message}
          </p>
        )}

        <button
          type="submit"
          id="submit-step2"
          className="self-end bg-primary text-white rounded-xl py-1 px-5"
        >
          حفظ ومتابعة
        </button>
      </form>
    </FormProvider>
  );
};

export default StepTwoTec;
