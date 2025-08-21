import { useForm, FormProvider, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { stepOneSchema } from "../../validation/createOffer";
import Select from "../select/Select";
import InputCreateOffer from "../inputs/InputCreateOffer";
import ImageUploader from "../common/ImageUploader";
import { thunkCities } from "../../store/cities/thunk/citiesThunk";
import Error from "../../feedback/error/Error";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCategory } from "../../store/category/sliceCategory";

const StepOne = ({ onSubmit }) => {
  const dispatch = useDispatch();
  let { governorates } = useSelector((state) => state.governorates);
  let { cities } = useSelector((state) => state.cities);
  let { category } = useSelector((state) => state.category);
  const methods = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      category: "",
      Governorate_name: "",
      city: "",
      description: "",
      price: "",
      main_photos: [],
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const handleGovernorateChange = (value) => {
    dispatch(thunkCities(value));
  };
  governorates = [{ name: "المحافظة" }, ...governorates];
  cities = ["المنطقة", ...cities];
  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[45vw]">
      <FormProvider {...methods}>
        <form
          className="w-full flex-center flex-col gap-3 text-[#B9B5FF]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* التصنيف */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                options={category}
                type=""
                onSelect={(val) => {
                  dispatch(setCategory(val));
                  field.onChange(val);
                }}
              />
            )}
          />
          <Error error={errors?.category?.message} />

          {/* المحافظة */}
          <Controller
            name="Governorate_name"
            control={control}
            render={({ field }) => (
              <Select
                options={governorates}
                type="governorate"
                onSelect={(val) => {
                  field.onChange(val);
                  handleGovernorateChange(val);
                }}
              />
            )}
          />
          <Error error={errors?.Governorate_name?.message} />

          {/* المنطقة */}
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                options={cities}
                type="city"
                onSelect={(val) => field.onChange(val)}
              />
            )}
          />
          <Error error={errors?.city?.message} />

          {/* الوصف */}
          <textarea
            {...register("description")}
            className="w-full h-24 outline-none border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
            placeholder="وصف..."
          ></textarea>
          <Error error={errors?.description?.message} />

          {/* السعر */}
          <InputCreateOffer
            placeholder="السعر"
            name="السعر"
            {...register("price")}
          />
          <Error error={errors?.price?.message} />

          {/* الصور */}
          <Controller
            name="main_photos"
            control={control}
            render={({ field }) => (
              <ImageUploader
                name="main_photos"
                label="صور أخرى (يمكنك رفع أكثر من صورة)"
                error={errors.main_photos}
                onChange={(files) => field.onChange(files)}
              />
            )}
          />
          <Error error={errors?.main_photos?.message} />

          <button type="submit" id="submit-step1" className="hidden"></button>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepOne;
