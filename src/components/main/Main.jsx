// Main.jsx
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Cookies from "js-cookie";
import Spinner from "../../feedback/loading/Spinner";

// Lazy load Lottie animation for performance
const Lottie = lazy(() => import("lottie-react"));
import animationData from "../../assets/lottifiles/web home animation.json";
import { useRequireAuth } from "../../hooks/UseRequireAuth";

/**
 * Main Landing Section
 * - Original layout preserved
 * - Lazy load Lottie animation
 * - Spinner fallback displayed while loading
 */
const Main = () => {
  const token = Cookies.get("token");
  const { requireAuth } = useRequireAuth();
  return (
    <div className="flex w-screen overflow-hidden pt-24 md:pt-44 flex-col-reverse bg-primary pb-24 text-white md:h-[636px] md:flex-row md:px-20">
      {/* Text Content Section */}
      <div className="container text-center md:text-start flex w-screen justify-center md:items-start flex-col items-center md:w-[50vw] md:pr-0 lg:pr-[4.7rem]">
        <h1 className="mt-12 text-wrap w-[300px] md:w-fit md:text-nowrap text-[24px] font-[800] md:text-[1.5rem] lg:text-[2.25rem]">
          بيع، اشتري، وابدأ تجارتك من مكانك
        </h1>

        <p className="mt-[1.5rem] w-fit md:w-[464px] text-[1rem] font-bold">
          كل ما تحتاجه من عقارات، سيارات، إلكترونيات وأكثر <br />
          في منصة سورية موثوقة.
        </p>

        <button
          onClick={() =>
            requireAuth(() => (window.location.href = "/create-offer"))
          }
          className="mt-8 block h-[8vh] hover:scale-105 w-[70vw] flex-center rounded-xl bg-white text-[1rem] font-bold text-primary md:h-[60px] md:w-[262px]"
          aria-label="Publish Offer"
        >
          نشر إعلان
        </button>
      </div>
      {/* Animation Section */}
      <div className="flex w-full items-center justify-center md:justify-end">
        <div className="md:mt-0 ml-[-2rem] w-[70%] transform md:ml-20 md:-translate-x-[2rem] translate-y-4 md:-translate-y-[5vh] scale-[1.4] md:scale-[2.5] lg:-translate-y-[.2rem] lg:translate-x-[0px] lg:scale-[1.4]">
          <Suspense fallback={<Spinner size={80} className="mx-auto" />}>
            <Lottie
              animationData={animationData}
              loop={false}
              aria-label="Homepage Animation"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Main;
