import { useFormContext } from "react-hook-form";

// Reusable input component integrated with React Hook Form
const Input = ({ type, name, placeholder }) => {
  const { register } = useFormContext();

  return (
    <input
      type={type}
      {...register(name)}
      placeholder={placeholder}
      className="w-full h-[52px] px-2 text-[17px] text-[#282828] placeholder:text-white rounded-lg border-none bg-[#D9D8FF]"
    />
  );
};

export default Input;
