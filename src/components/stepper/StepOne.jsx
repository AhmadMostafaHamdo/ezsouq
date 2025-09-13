import { useForm, FormProvider, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { stepOneSchema } from "../../validation/createOffer";
import InputCreateOffer from "../inputs/InputCreateOffer";
import ImageUploader from "../common/ImageUploader";
import { thunkCities } from "../../store/cities/thunk/citiesThunk";
import Error from "../../feedback/error/Error";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCategory } from "../../store/category/sliceCategory";
import Select from "../select/Select";

const StepOne = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const { governorates } = useSelector((state) => state.governorates);
  const { cities } = useSelector((state) => state.cities);
  const { category, selectedCategory } = useSelector((state) => state.category);

  const methods = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      Category_name: selectedCategory || category[0],
      Governorate_name: "",
      city: "",
      description: "",
      price: "",
      main_photos: [],
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleGovernorateChange = (value) => dispatch(thunkCities(value));
  const governorateOptions = [{ name: "المحافظة" }, ...governorates];
  const cityOptions = ["المنطقة", ...cities];

  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[45vw]">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex-center flex-col gap-3 text-[#B9B5FF]"
        >
          {/* التصنيف */}
          <Controller
            name="Category_name"
            control={control}
            render={({ field }) => (
              <Select
                options={category}
                type="category"
                value={field.value}
                onSelect={(val) => {
                  field.onChange(val);
                  dispatch(setCategory(val));
                }}
              />
            )}
          />
          <Error error={errors.Category_name?.message} />

          {/* المحافظة */}
          <Controller
            name="Governorate_name"
            control={control}
            render={({ field }) => (
              <Select
                options={governorateOptions}
                type="governorate"
                value={field.value}
                onSelect={(val) => {
                  field.onChange(val);
                  handleGovernorateChange(val);
                }}
              />
            )}
          />
          <Error error={errors.Governorate_name?.message} />

          {/* المنطقة */}
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                options={cityOptions}
                type="city"
                value={field.value}
                onSelect={(val) => field.onChange(val)}
              />
            )}
          />
          <Error error={errors.city?.message} />

          {/* الوصف */}
          <textarea
            {...register("description")}
            className="w-full h-24 outline-none border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
            placeholder="وصف..."
          />
          <Error error={errors.description?.message} />

          {/* السعر */}
          <InputCreateOffer placeholder="السعر" {...register("price")} />
          <Error error={errors.price?.message} />

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
          <Error error={errors.main_photos?.message} />

          <button type="submit" className="hidden" id="submit-step1"></button>
        </form>
      </FormProvider>
    </div>
  );
};

export default StepOne;
