import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../assets/lottifiles/web home animation.json";

const Main = () => {
  return (
    <div className="flex w-screen flex-col-reverse bg-primary pb-4 font-sans text-white md:h-[636px] md:flex-row md:px-20">
      {/* Text Content Section */}
      <div className="container flex w-screen flex-col items-center md:w-[50vw] md:pr-0 lg:pr-[4.7rem]">
        <h1 className="mt-12 text-nowrap text-[24px] font-[800] md:text-[1.5rem] lg:text-[2.25rem]">
          بيع، اشتري، وابدأ تجارتك من مكانك
        </h1>

        <p className="mt-[2.3rem] w-[464px] text-center text-[1rem] font-bold">
          كل ما تحتاجه من عقارات، سيارات، إلكترونيات وأكثر <br />
          في منصة سورية موثوقة.
        </p>

        <Link
          to=""
          className="mt-[55px] block h-[7vh] w-[42vw] flex-center rounded-xl bg-white text-[1rem] font-bold text-primary md:h-[70px] md:w-[262px]"
        >
          نشر إعلان
        </Link>
      </div>

      {/* Animation Section */}
      <div className="flex w-full items-center justify-center md:justify-end">
        <div className="ml-[-2rem] w-[70%] transform md:ml-20 md:-translate-x-[2rem] md:-translate-y-[20vh] md:scale-[2.2] lg:-translate-y-[13vh] lg:translate-x-[0px] lg:scale-[1.3]">
          <Lottie animationData={animationData} loop={false} />
        </div>
      </div>
    </div>
  );
};

export default Main;
