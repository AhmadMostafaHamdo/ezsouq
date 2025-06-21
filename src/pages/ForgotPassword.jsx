import Logo from "../components/logo/Logo";
import forgotPassword from "../assets/images/undraw_forgot-password_odai 1.svg";
const ForgotPassword = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center ">
      <div className="w-[90vw] h-[90vh]  flex-center shadow-custom">
        <div className="hidden md:block w-[35vw]  bg-secondary h-[90vh]">
          {/* right */}
          <Logo />
          <div>
            <img
              src={forgotPassword}
              className="object-contain w-[96%] m-auto mt-6"
            />
          </div>
        </div>
        {/* left */}
        <div className="sm-w-full md:w-[55vw] bg-white ">
          <div className="md:hidden">
            <Logo />
          </div>
          <form className="w-[90vw] p-3 sm:w-[357px] md:w-[357px] lg:w-[487px] m-auto">
            <div className="h-[157px]">
              <h1 className="text-primary font-bold text-[1.25rem] sm:text-[2.25rem] font-sans h-[67px]">
                نسيان كلمة المرور
              </h1>
              <p className="font-sans font-normal text-[#282828] text-[1.25rem] sm:text-[1.5rem] ">
                قم بإدخال رقم الهاتف أو البريد الالكتروني لإعادة تعيين كلمة
                المرور
              </p>
            </div>
            <div className="md:[330px] lg:[487px]">
              <input
                type="email"
                className="w-full h-[56px] rounded-xl bg-[#D9D8FF] text-white py-4 px-2 mb-14 mt-10"
                placeholder="الايميل"
              />
              <button
                type="submit"
                className="w-full h-[56px] bg-primary text-white font-sans font-bold rounded-xl  py-4 px-2"
              >
                إرسال رمز التحقق
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
