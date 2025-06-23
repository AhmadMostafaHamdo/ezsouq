import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../assets/lottifiles/web home animation.json";
const Main = () => {
  return (
    <div className="md:h-[636px] w-[100vw] p-4 md:p-0 text-white font-sans flex-col-reverse md:flex-row flex   bg-primary">
      <div className="w-[50vw" style={{ paddingRight: "50px" }}>
        <h1 className="text-[24px]  md:text-[36px] text-nowrap font-[800] md:mt-[161px]">
          بيع، اشتري، وابدأ تجارتك من مكانك
        </h1>
        <p className="w-[464px] font-bold mt-[35px] text-[1rem]">
          كل ما تحتاجه من عقارات، سيارات، إلكترونيات وأكثر <br />
          في منصة سورية موثوقة.
        </p>
        <Link
          to=""
          className="rounded-xl mt-[55px] bg-white w-[262px] h-[70px] font-bold text-primary block flex-center text-[1rem]"
        >
          نشر إعلان
        </Link>
      </div>
      <div className="w-full flex justify-center md:justify-end items-center">
        <div className="w-[70%]  transform   md:translate-x-[0px] md:-translate-y-[11vh]">
          <Lottie animationData={animationData} loop={false} />
        </div>
      </div>
    </div>
  );
};

export default Main;
