import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/images/logoWithTitle.svg";
import Input from "../inputs/Input";
import ImageSlider from "../slider/Swiper";
import { Link } from "react-router";
import DividerWithText from "../dividerWithText/DividerWithText";
import loginImage from "../../assets/images/loginImage.svg";
import googleIcon from "../../assets/images/googleLogo.svg";
const AuthForm = ({ fields, schema, btnAuth }) => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    shouldUnregister: false,
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = form;
  const onSubmit = (data) => {
    reset();
    console.log(data);
  };

  return (
    <div className=" flex-center h-screen  overflow-hidden">
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[90vw]  md:[90vw] max-h-[96vh]  flex-center shadow-custom"
        >
          {/* right */}
          <div className="hidden md:block w-[35vw]">
            {btnAuth === "إنشاء حساب" ? (
              <ImageSlider />
            ) : (
              <div className="w-[35vw] p-3 h-[96vh] bg-secondary flex flex-col items-center justify-evenly">
                <h1 className="text-primary text-[1.56rem]  font-bold">
                  أهلا بعودتك !
                </h1>
                <p className="font-sans text-[#282828] text-[1.25rem] mb-5 w-full lg:w-[23.56rem]">
                  سجّل الدخول للوصول إلى حسابك ومتابعة نشاطك.
                </p>
                <img src={loginImage} className="max-w-[40vw] max-h-[96vh]" />
              </div>
            )}
          </div>
          {/* left */}
          <div className="w-full md:w-[55vw]  h-[96vh] bg-white ">
            {btnAuth == "تسجيل الدخول" && (
              <div className="w-full flex justify-center h-[20vh]">
                <img src={logo} alt="logo" />
              </div>
            )}
            <div className="w-full   sm:w-[400px]  lg:w-[487px] m-auto p-2 ">
              <h1 className="mb-2 w-full font-normal m-auto">
                {btnAuth !== "تسجيل الدخول" ? "إنشاء حساب" : "تسجيل الدخول"}
              </h1>
              <div className="m-auto w-full">
                {fields.map((input, index) => (
                  <div key={index}>
                    <Input
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                    />
                    <p className="text-red my-1  h-[18px] text-[12px]">
                      {errors[input.name]?.message}
                    </p>
                  </div>
                ))}
                {btnAuth === "إنشاء حساب" && (
                  <>
                    <p className=" text-[12px]">
                      <input
                        type="checkbox"
                        className="ml-2"
                        {...register("checkbox")}
                      />
                      أوافق على سياسة الخصوصية
                    </p>
                    <p className="text-red my-1  h-[18px] text-[13px]">
                      {errors["checkbox"]?.message}
                    </p>
                  </>
                )}
                <button
                  disabled={isSubmitting}
                  className="w-full h-[40px] text-white bg-primary rounded-xl"
                >
                  {isSubmitting ? "جارٍ الإرسال" : btnAuth}
                </button>
                <p className="my-3  text-[12px] text-center font-normal ">
                  لديك حساب بالفعل ؟
                  <Link
                    to={btnAuth == "تسجيل الدخول" ? "/register" : "/login"}
                    className="mr-1 w-[80%] text-primary font-medium"
                  >
                    {btnAuth === "تسجيل الدخول" ? "إنشاء حساب" : "تسجيل الدخول"}
                  </Link>
                </p>
                <DividerWithText text="أو" />
                <button className="flex-center p-2 font-sans font-medium text-[1rem] my-3 gap-2 shadow-custom rounded-xl w-full">
                  <img src={googleIcon} alt="googleLogo" /> تسجيل دخول بواسطة
                  Google
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthForm;
