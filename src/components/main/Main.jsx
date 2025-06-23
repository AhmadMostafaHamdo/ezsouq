import { Link } from "react-router";
import Lottie from "lottie-react";
import animationData from "../../assets/lottifiles/web home animation.json";

const Main = () => {
  return (
    <div className="h-[636px] w-[100vw] text-white font-sans flex justify-between  bg-primary">
      <div className="w-[50vw" style={{ paddingRight: "50px" }}>
        <h1 className="text-[36px] text-nowrap font-[800] mt-[161px]">
          بيع، اشتري، وابدأ تجارتك من مكانك
        </h1>
        <p className="w-[464px] font-bold mt-[35px]">
          كل ما تحتاجه من عقارات، سيارات، إلكترونيات وأكثر  <br/>في منصة سورية
          موثوقة.
        </p>
        <Link
          to=""
          className="rounded-xl mt-[55px] bg-white w-[262px] h-[70px] font-bold text-primary block flex-center text-[16px]"
        >
          نشر إعلان
        </Link>
      </div>
      <div className="w-full relative " >
        <div className="absolute w-[72%]  transform   -translate-x-[230px] -translate-y-[80px]">
          <Lottie animationData={animationData} loop={false}  />
        </div>
      </div>
    </div>
  );
};

export default Main;
