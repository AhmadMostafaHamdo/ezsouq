import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../assets/images/logoWithTitle.svg";
import Input from "../inputs/Input";
import ImageSlider from "../slider/Swiper";
import { Link, useNavigate } from "react-router-dom";
import DividerWithText from "../dividerWithText/DividerWithText";
import loginImage from "../../assets/images/loginImage.svg";
import googleIcon from "../../assets/images/googleLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { thunkAuth } from "../../store/auth/thunk/authThunk";
import { ToastContainer } from "react-toastify";
const AuthForm = ({ fields, schema, btnAuth }) => {
  const isLogin = btnAuth !== "إنشاء حساب";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading, token } = useSelector((state) => state.auth);
  console.log(token);
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
  const onSubmit = async (data) => {
    try {
      const { name, infoContact, password } = data;
      const info = isLogin
        ? { infoContact, password }
        : { name, infoContact, password };
      await dispatch(thunkAuth({ info, isLogin })).unwrap();
      isLogin && token ? navigate("/") : navigate("/login");
      reset();
    } catch (err) {}
  };

  return (
      <div className=" flex-center h-screen  overflow-hidden">
        <FormProvider {...form}>
          <ToastContainer />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[100vw] h-[100vh]  flex-center shadow-custom"
          >
            {/* right */}
            <div className="hidden md:block w-[40vw] h-[100vh]">
              {!isLogin ? (
                <ImageSlider />
              ) : (
                <div className="w-[40vw] p-3 h-[100vh] bg-secondary flex flex-col items-center justify-evenly">
                  <h1 className="text-primary text-[1.56rem]  font-bold">
                    أهلا بعودتك !
                  </h1>
                  <p className="font-sans text-[#282828] text-center text-[1.25rem] mb-5 w-full lg:w-[23.56rem]">
                    سجّل الدخول للوصول إلى حسابك ومتابعة نشاطك.
                  </p>
                  <img src={loginImage} className="max-w-[40vw] h-[100vh]" />
                </div>
              )}
            </div>
            {/* left */}
            <div className="w-full md:w-[60vw]  h-[100vh] bg-white ">
              {btnAuth == "تسجيل الدخول" && (
                <div className="w-full flex justify-center h-[20vh]">
                  <img src={logo} alt="logo" />
                </div>
              )}
              <div className="w-full   sm:w-[400px]  lg:w-[487px] m-auto p-2 ">
                <h1
                  className={`${
                    isLogin ? "mb-3" : "mb-2"
                  }  w-full font-normal m-auto`}
                >
                  {!isLogin ? "إنشاء حساب" : "تسجيل الدخول"}
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
                        {errors[input.name]?.message ||
                          (input.name === "infoContact" && error && !isLogin)}
                      </p>
                    </div>
                  ))}
                  {btnAuth === "إنشاء حساب" && (
                    <>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="ml-2"
                          {...register("checkbox")}
                          id="accept"
                        />
                        <label htmlFor="accept" className="text-[12px]">
                          أوافق على سياسة الخصوصية
                        </label>
                      </div>
                      <p className="text-red mb-1  h-[18px] text-[13px]">
                        {errors["checkbox"]?.message}
                      </p>
                    </>
                  )}
                  <button
                    disabled={isSubmitting}
                    className="w-full h-[2.9rem] text-white bg-primary rounded-xl"
                  >
                    {isSubmitting ? "جارٍ الإرسال" : btnAuth}
                  </button>
                  <p
                    className={`${
                      isLogin ? "my-5" : "my-3"
                    }  text-[12px] text-center font-normal`}
                  >
                    لديك حساب بالفعل ؟
                    <Link
                      to={btnAuth == "تسجيل الدخول" ? "/register" : "/login"}
                      className="mr-1 w-[80%] text-primary font-medium"
                    >
                      {btnAuth === "تسجيل الدخول"
                        ? "إنشاء حساب"
                        : "تسجيل الدخول"}
                    </Link>
                  </p>
                  <DividerWithText text="أو" />
                  <button
                    className={`flex-center ${
                      isLogin ? "my-10" : "my-3 "
                    } p-3 font-sans font-medium text-[.9rem] gap-2 shadow-[0px_2px_13.7px_0px_#0000001A] rounded-xl w-full`}
                  >
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
