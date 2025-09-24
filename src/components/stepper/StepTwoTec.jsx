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
        id="form-step2"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-[80vw] md:w-[60vw] lg:w-[45vw] flex flex-col gap-3 text-[#B9B5FF] pb-6"
      >
        <InputCreateOffer placeholder="الجهاز" {...methods.register("name")} />
        {methods.formState.errors.name && (
          <p className="text-red">
            {methods.formState.errors.name.message}
          </p>
        )}

        <InputCreateOffer placeholder="اللون" {...methods.register("color")} />
        {methods.formState.errors.color && (
          <p className="text-red">
            {methods.formState.errors.color.message}
          </p>
        )}

        <div className="flex self-start gap-6">
          <label>
            <input
              type="radio"
              value="true"
              {...methods.register("isnew")}
              className="ml-2"
            />{" "}
            جديدة
          </label>
          <label>
            <input
              type="radio"
              value="false"
              {...methods.register("isnew")}
              className="ml-2"
            />{" "}
            مستعملة
          </label>
        </div>
        {methods.formState.errors.isnew && (
          <p className="text-red">
            {methods.formState.errors.isnew.message}
          </p>
        )}

        <InputCreateOffer
          placeholder="المعالج"
          {...methods.register("processor")}
        />
        {methods.formState.errors.processor && (
          <p className="text-red">
            {methods.formState.errors.processor.message}
          </p>
        )}

        <InputCreateOffer
          placeholder="الذاكرة"
          {...methods.register("memory")}
        />
        {methods.formState.errors.memory && (
          <p className="text-red">
            {methods.formState.errors.memory.message}
          </p>
        )}

        <VideoUploader name="video" label="إضافة فيديو" />
        {methods.formState.errors.video && (
          <p className="text-red">
            {methods.formState.errors.video.message}
          </p>
        )}

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

export default StepTwoTec;
