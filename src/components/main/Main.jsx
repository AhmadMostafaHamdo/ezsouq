import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../assets/lottifiles/web home animation.json";

const Main = () => {
  return (
    <div className="flex w-screen overflow-hidden  pt-24  md:pt-44 flex-col-reverse bg-primary pb-24 font-sans text-white md:h-[636px] md:flex-row md:px-20">
      {/* Text Content Section */}
      <div className="container flex w-screen justify-center flex-col items-start md:w-[50vw] md:pr-0 lg:pr-[4.7rem]">
        <h1 className="mt-12  text-wrap w-[300px] md:w-fit md:text-nowrap text-[24px] font-[800] md:text-[1.5rem] lg:text-[2.25rem]">
          بيع، اشتري، وابدأ تجارتك من مكانك
        </h1>

        <p className="mt-[2rem] w-fit md:w-[464px] text-start  text-[1rem]  font-bold">
          كل ما تحتاجه من عقارات، سيارات، إلكترونيات وأكثر <br />
          في منصة سورية موثوقة.
        </p>

        <Link
          to=""
          className="mt-9   block h-[8vh] w-[70vw] flex-center rounded-xl bg-white text-[1rem] font-bold text-primary md:h-[70px] md:w-[262px]"
        >
          نشر إعلان
        </Link>
      </div>

      {/* Animation Section */}
      <div className="flex w-full items-center justify-center md:justify-end">
        <div className="md:mt-0 ml-[-2rem] w-[70%] transform md:ml-20 md:-translate-x-[2rem]  translate-y-4 md:-translate-y-[20vh] scale-[1.4] md:scale-[2.2] lg:-translate-y-[10px] lg:translate-x-[0px] lg:scale-[1.4]">
          <Lottie animationData={animationData} loop={false} />
        </div>
      </div>
    </div>
  );
};

export default Main;
