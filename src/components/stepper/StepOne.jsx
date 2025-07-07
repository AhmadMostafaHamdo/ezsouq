import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCities } from "../../store/cities/thunk/citiesThunk";
import uploadImage from "../../assets/images/uploadImage.svg";
import closeImg from "../../assets/images/closeImg.svg";
import addImg from "../../assets/images/addImg.svg";
import Select from "../select/Select";
import InputCreateOffer from "../inputs/InputCreateOffer";

const StepOne = () => {
  const dispatch = useDispatch();
  const imgFile = useRef(null);
  const [images, setImages] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const imageUrlsRef = useRef([]);
  const { governorates } = useSelector((state) => state.governorates);
  const { cities } = useSelector((state) => state.cities);

  useEffect(() => {
    if (selectedGovernorate) {
      dispatch(thunkCities(selectedGovernorate));
    }
  }, [selectedGovernorate, dispatch]);

  const imageUrls = useMemo(() => {
    imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    const newUrls = images.map((image) => URL.createObjectURL(image));
    imageUrlsRef.current = newUrls;
    return newUrls;
  }, [images]);

  useEffect(() => {
    return () => {
      imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handelImage = () => {
    imgFile.current.click();
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[45vw]">
      <form className="w-full flex-center flex-col gap-3 text-[#B9B5FF]">
        <Select
          options={governorates}
          type="governorate"
          onSelect={setSelectedGovernorate}
        />

        <Select options={cities} type="city" onSelect={setSelectedCity} />

        <textarea
          className="w-full h-24 outline-none border-solid border-[1px] p-2 rounded-[5px] border-[#B9B5FF]"
          placeholder="وصف..."
        ></textarea>

        <InputCreateOffer name="السعر" />

        <div
          onClick={handelImage}
          className="flex-between w-full border-solid border-[1px] p-2 rounded-[5px] cursor-pointer border-[#B9B5FF]"
        >
          <p className="text-[#B9B5FF]">صور أخرى (يمكنك رفع اكثر من صورة)</p>
          <img src={uploadImage} alt="" />
          <input
            type="file"
            className="hidden"
            ref={imgFile}
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setImages((prev) => [...prev, ...Array.from(e.target.files)]);
              }
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-3 ">
          {imageUrls.map((url, index) => (
            <div className="relative" key={index}>
              <img
                src={url}
                className="w-16 h-16 object-cover rounded border border-[#B9B5FF]"
                alt={`Uploaded ${index + 1}`}
              />
              <img
                src={closeImg}
                alt="x"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 z-10 cursor-pointer bg-white rounded-full w-5 h-5"
              />
            </div>
          ))}
          <img
            src={addImg}
            alt=""
            onClick={handelImage}
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default StepOne;
