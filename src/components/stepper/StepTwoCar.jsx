import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCreateOffer from "../inputs/InputCreateOffer";
import VideoUploader from "../common/VideoUploader";
import { stepTwoCarsSchema } from "../../validation/createOffer";

const StepTwoCars = ({ onSubmit, defaultCategory }) => {
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

  return (
    <FormProvider {...methods}>
      <form
        id="form-step2-cars"
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-[80vw] md:w-[60vw] lg:w-[45vw] flex flex-col gap-3 text-[#B9B5FF] pb-6"
      >
        <InputCreateOffer
          placeholder="اسم السيارة"
          {...methods.register("name")}
        />
        {methods.formState.errors.name && (
          <p className="text-red">{methods.formState.errors.name.message}</p>
        )}

        <InputCreateOffer placeholder="اللون" {...methods.register("color")} />
        {methods.formState.errors.color && (
          <p className="text-red">{methods.formState.errors.color.message}</p>
        )}

        <div className="flex flex-col gap-2">
          <label>نوع العملية:</label>
          <select
            {...methods.register("for_sale")}
            className="p-2 rounded border"
          >
            <option value="">اختر نوع العملية</option>
            <option value="rent">إيجار</option>
            <option value="sale">بيع</option>
          </select>
          {methods.formState.errors.for_sale && (
            <p className="text-red">
              {methods.formState.errors.for_sale.message}
            </p>
          )}
        </div>

        <div className="flex self-start gap-6">
          <label>
            <input type="radio" value="true" {...methods.register("isnew")} />{" "}
            جديدة
          </label>
          <label>
            <input type="radio" value="false" {...methods.register("isnew")} />{" "}
            مستعملة
          </label>
        </div>
        {methods.formState.errors.isnew && (
          <p className="text-red">{methods.formState.errors.isnew.message}</p>
        )}

        <VideoUploader name="video" label="إضافة فيديو" />

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
