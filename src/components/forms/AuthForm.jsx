import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";

import Spinner from "../../feedback/loading/Spinner";
import Input from "../inputs/Input";
import DividerWithText from "../dividerWithText/DividerWithText";
import ImageSlider from "../slider/Swiper";
import { thunkAuth } from "../../store/auth/thunk/authThunk";

// Icons & Images
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/images/logoWithTitle.svg";
import loginImage from "../../assets/images/loginImage.svg";
import googleIcon from "../../assets/images/googleLogo.svg";

const AuthForm = ({ fields, schema, btnAuth }) => {
  const isLogin = btnAuth !== "إنشاء حساب";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Setup form validation
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

  // Handle login/register
  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      const info = isLogin ? { email, password } : { name, email, password };

      const res = await dispatch(thunkAuth({ info, isLogin })).unwrap();

      if (res?.token) {
        Cookies.set("token", res.token, { expires: 7 });
        const decoded = jwtDecode(res.token);
        const role = decoded.Role || decoded.role;
        navigate(role === "OWNER" ? "/dashboard" : "/", { replace: true });
      }

      reset();
    } catch (err) {
      console.error("Auth Error:", err);
    }
  };

  // Handle Google OAuth login
  const handleAuthGoogle = (e) => {
    e.preventDefault();
    setLoadingGoogle(true);
    window.location.href = `https://api.ezsouq.store/auth/google?redirect_uri=${encodeURIComponent(
      window.location.origin + "/google-callback"
    )}`;
  };

  // Password toggle button
  const PasswordToggle = ({ visible, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-6 left-2 -translate-y-1/2 text-xs text-primary"
    >
      {!visible ? <EyeOff /> : <Eye />}
    </button>
  );

  return (
    <div className="relative flex-center h-screen overflow-hidden bg-white">
      {/* Global overlay spinner for both Google and Auth loading */}
      {(loadingGoogle || loading) && (
        <div className="absolute inset-0 bg-white/70 flex-center z-50">
          <Spinner />
        </div>
      )}

      <FormProvider {...form}>
        <ToastContainer />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-screen h-screen flex-center shadow-custom"
        >
          {/* Right Section (Image or Welcome Message) */}
          <div className="hidden md:block w-[40vw] h-full">
            {!isLogin ? (
              <ImageSlider />
            ) : (
              <div className="w-full h-full bg-secondary flex flex-col items-center justify-evenly p-3">
                <h1 className="text-primary text-[1.56rem] font-bold">
                  أهلا بعودتك!
                </h1>
                <p className="text-[#282828] text-center text-[1.25rem] mb-5 w-full lg:w-[23.56rem]">
                  سجّل الدخول للوصول إلى حسابك ومتابعة نشاطك.
                </p>
                <img
                  src={loginImage}
                  className="max-w-full h-full"
                  loading="lazy"
                  alt="صورة تسجيل الدخول"
                />
              </div>
            )}
          </div>

          {/*  Left Section (Form) */}
          <div className="w-full md:w-[60vw] h-full bg-white relative z-10">
            {isLogin && (
              <div className="w-full flex justify-center h-[20vh]">
                <img src={logo} alt="شعار الموقع" loading="lazy" />
              </div>
            )}

            <div className="w-full sm:w-[400px] lg:w-[487px] m-auto p-2">
              <h1 className={`${isLogin ? "mb-3" : "mb-2"} w-full font-normal`}>
                {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
              </h1>

              {/* Dynamic Input Fields */}
              {fields.map((input, index) => (
                <div key={index} className="relative">
                  <Input
                    type={
                      input.name === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : input.name === "confirm_password"
                        ? showConfirmPassword
                          ? "text"
                          : "password"
                        : input.type
                    }
                    name={input.name}
                    placeholder={input.placeholder}
                  />

                  {input.name === "password" && (
                    <PasswordToggle
                      visible={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}

                  {input.name === "confirm_password" && (
                    <PasswordToggle
                      visible={showConfirmPassword}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}

                  <p className="text-red my-1 h-[18px] text-[12px]">
                    {errors[input.name]?.message ||
                      (input.name === "email" && error && !isLogin)}
                  </p>
                </div>
              ))}

              {/*  Privacy Policy */}
              {!isLogin && (
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="ml-2"
                      {...register("checkbox")}
                      id="accept"
                    />
                    <Link
                      to="/privacy-policy"
                      htmlFor="accept"
                      className="text-[12px]"
                    >
                      أوافق على سياسة الخصوصية
                    </Link>
                  </div>
                  <p className="text-red mb-1 h-[18px] text-[13px]">
                    {errors["checkbox"]?.message}
                  </p>
                </>
              )}

              {/*  Forgot Password */}
              {isLogin && (
                <Link to="/forgot-password" className="mb-3 block text-[.9rem]">
                  هل نسيت كلمة المرور؟
                </Link>
              )}

              {/*  Submit Button */}
              <button
                disabled={isSubmitting}
                className="w-full h-[2.9rem] text-white bg-primary rounded-xl"
              >
                {isSubmitting ? "جارٍ الإرسال..." : btnAuth}
              </button>

              {/* Switch Login/Register */}
              <p
                className={`${
                  isLogin ? "my-5" : "my-6 md:my-3"
                } text-[12px] text-center font-normal`}
              >
                لديك حساب بالفعل ؟
                <Link
                  to={isLogin ? "/register" : "/login"}
                  className="mr-1 w-[80%] text-primary font-medium"
                >
                  {isLogin ? "إنشاء حساب" : "تسجيل الدخول"}
                </Link>
              </p>

              {/* Divider */}
              <DividerWithText text="أو" />

              {/* Google Login */}
              <button
                type="button"
                onClick={handleAuthGoogle}
                disabled={loadingGoogle}
                className={`flex-center hover:scale-105 ${
                  isLogin ? "my-6" : "my-10 md:my-3"
                } p-3 font-medium text-[.9rem] gap-2 shadow-[0px_2px_13.7px_0px_#0000001A] rounded-xl w-full ${
                  loadingGoogle ? "bg-black bg-opacity-10" : ""
                }`}
              >
                {!loadingGoogle && (
                  <img src={googleIcon} alt="شعار Google" loading="lazy" />
                )}
                تسجيل دخول بواسطة Google
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AuthForm;
