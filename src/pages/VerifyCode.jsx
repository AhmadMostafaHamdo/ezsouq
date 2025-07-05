import { useEffect, useRef, useState } from "react";
import VerifyCodeImg from "../assets/images/undraw_two-factor-authentication_8tds 1.svg";
import Logo from "../components/logo/Logo";
import { useForm } from "react-hook-form";

const VerifyCode = () => {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    // Focus the first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;

    // Only allow single digits
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      // Auto-focus next input if a digit was entered
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }

      // Check if all digits are filled
      if (newDigits.every((digit) => digit !== "") && onComplete) {
        onComplete(newDigits.join(""));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (
      e.key === "Backspace" &&
      !digits[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pasteData)) {
      const pastedDigits = pasteData.split("");
      setDigits(pastedDigits);

      // Focus the last input after paste
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }

      if (onComplete) {
        onComplete(pasteData);
      }
    }
  };
  const onSubmit = (data) => {};
  return (
    <div className="h-[100vh] flex-center font-sans">
      <div className="w-[90vw] h-[90vh] md:[90vw]  flex-center shadow-custom">
        <div className="hidden md:block w-[35vw]  bg-secondary h-[90vh]">
          {/* right */}
          <Logo />
          <div>
            <img
              src={VerifyCodeImg}
              className="object-contain w-[96%] m-auto mt-6"
            />
          </div>
        </div>
        {/* left */}
        <div className="w-full md:w-[55vw] bg-white ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[96%] sm:w-[340px]  md:w-[340px] lg:w-[487px] m-auto"
          >
            <div className="md:hidden">
              <Logo />
            </div>
            <div className="h-[157px]">
              <h1 className="text-primary font-bold text-[2.25rem]  h-[67px]"></h1>
              <p className=" font-normal text-[#282828] text-[1.25rem] sm:text-[1.5rem] ">
                لقد أرسلنا رمزًا مكوّنًا من 6 أرقام إلى بريدك الإلكتروني.
              </p>
            </div>
            <div className="h-[235px] flex flex-col justify-between md:w-[329.2px] lg:w-[487px]">
              <div className="flex justify-between w-full">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-[42.6px] lg:w-[76px] h-[76px] rounded-lg bg-secondary border-none py-4 px-2"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full h-[56px] bg-primary text-white  font-bold rounded-xl  py-4 px-2"
              >
                تأكيد
              </button>
              <p className="text-red font-[14px] h-3"></p>
              <p className="text-center  text-[12px] text-primary cursor-pointer">
                إرسال الرمز مرة أخرى؟
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
