import { useFormContext } from "react-hook-form";

const Input = ({ type, name, placeholder }) => {
  const { register } = useFormContext();
  return (
    <input
      className="w-full h-[52px] px-2 text-[17px] text-[#282828] placeholder::text-white rounded-lg border-none bg-[#D9D8FF] placeholder:text-white"
      type={type}
      {...register(name)}
      placeholder={placeholder}
    />
  );
};
export default Input;
