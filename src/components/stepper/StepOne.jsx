import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form"; // استيراد FormProvider
import { useDispatch, useSelector } from "react-redux";
import { stepOneSchema } from "../../validation/createOffer";
import Select from "../select/Select";
import InputCreateOffer from "../inputs/InputCreateOffer";
import ImageUploader from "../common/ImageUploader";
import { thunkCities } from "../../store/cities/thunk/citiesThunk";
import Error from "../../feedback/error/Error";

const StepOne = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { governorates } = useSelector((state) => state.governorates);
  const { cities } = useSelector((state) => state.cities);

  const methods = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      Governorate_name: "",
      city: "",
      description: "",
      price: "",
      main_photos: [],
    },
  });
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  console.log(errors);
  const handleGovernorateChange = (value) => {
    setValue("Governorate_name", value);
    dispatch(thunkCities(value));
  };

  const handleCityChange = (value) => {
    setValue("city", value);
  };

  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[45vw]">
      <FormProvider {...methods}>
        <form
          className="w-full flex-center flex-col gap-3 text-[#B9B5FF]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Select
            options={governorates}
            type="governorate"
            onSelect={handleGovernorateChange}
          />
          <Select options={cities} type="city" onSelect={handleCityChange} />
          <textarea
            {...register("description")}
            className="w-full h-24 outline-none border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
            placeholder="وصف..."
          ></textarea>
          <Error error={errors?.description?.message} />
          <InputCreateOffer
            placeholder="السعر"
            name="السعر"
            {...register("price")}
          />
          <Error error={errors?.price?.message} />

          <ImageUploader
            name="main_photos"
            label="صور أخرى (يمكنك رفع أكثر من صورة)"
            error={errors.main_photos}
          />
          <Error error={errors?.main_photos?.message} />
          <button type="submit" id="submit-step1" className="hidden"></button>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepOne;
