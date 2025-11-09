// Main.jsx
import { lazy, Suspense } from "react";
import Cookies from "js-cookie";
import Spinner from "../../feedback/loading/Spinner";

// Lazy load Lottie animation for performance
const Lottie = lazy(() => import("lottie-react"));
import animationData from "../../assets/lottifiles/web home animation.json";
import { useRequireAuth } from "../../hooks/UseRequireAuth";

/**
 * Main Landing Section
 * - Arabic text content
 * - Mobile-friendly download buttons without scroll
 * - Lazy loaded animation
 */
const Main = () => {
  const token = Cookies.get("token");
  const { requireAuth } = useRequireAuth();

  // Example URLs (replace with your real app links)
  const iosLink = "https://apps.apple.com"; // App Store URL
  const androidLink = "https://play.google.com"; // Google Play URL

  return (
    <div className="flex w-screen overflow-hidden pt-24 md:pt-44 flex-col-reverse bg-primary pb-24 text-white md:h-[100vh] md:flex-row md:px-20">
      {/* Text Content Section */}
      <div className="container text-center md:text-start flex w-screen justify-center md:items-start flex-col items-center md:w-[50vw] md:pr-0 lg:pr-[4.7rem]">
        <h1 className="mt-12 text-wrap w-[300px] md:w-fit md:text-nowrap text-[24px] font-[800] md:text-[1.5rem] lg:text-[2.25rem]">
          بيع، اشتري، وابدأ تجارتك من مكانك
        </h1>

        <p className="mt-[1.5rem] w-fit md:w-[464px] text-[1rem] font-bold">
          كل ما تحتاجه من عقارات، سيارات، إلكترونيات وأكثر <br />
          في منصة سورية موثوقة.
        </p>

        {/* Main Action Button */}
        <button
          onClick={() =>
            requireAuth(() => (window.location.href = "/create-offer"))
          }
          className="mt-8 block h-[8vh] w-[70vw] flex-center h-[55px] md:p-3 rounded-xl bg-white text-[1rem] font-bold text-primary md:h-[60px] md:w-[262px] hover:scale-105 hover:bg-[#ffffffe8]"
          aria-label="Publish Offer"
        >
          نشر إعلان
        </button>

        {/* =========================================
            Download App Buttons (iPhone & Android)
            - Mobile: buttons fit screen width without scroll
           ========================================= */}
        <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3 mt-8
                        max-h-[200px] overflow-hidden sm:max-h-full">
          {/* iPhone Download Button */}
          <a
            href={iosLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-black px-5 py-3 rounded-xl hover:scale-105 transition-transform w-[70vw] sm:w-auto"
            aria-label="Download on App Store"
          >
            {/* Apple Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 384 512"
            >
              <path d="M318.7 268.7c-.3-37.4 16.4-65.8 50-86.6-18.2-26.2-45.8-40.6-84.2-43.3-35.3-2.7-74.1 20.9-88.1 20.9-14.6 0-49.4-19.9-76.3-19.9C72.4 139.8 19 181.1 19 267.8c0 25.2 4.6 51.1 13.9 76.9 12.4 33.3 57.2 114.9 104.2 113.3 24.6-.9 42-17.3 73.8-17.3 31.1 0 47.4 17.3 76.3 17 47.8-.7 86.6-73.8 98.3-107.2-63.5-30.1-66.8-88.1-67.8-81.8zM255.3 119.1c27.4-33.3 24.9-63.7 24.1-74.1-24.4 1.3-52.7 16.4-69.5 37.1-17.9 21.5-28.7 48.1-26.5 76.8 26.8 2.1 54.2-12.1 71.9-39.8z" />
            </svg>
            <div className="text-start leading-tight">
              <p className="text-[15px] font-semibold text-white">App Store</p>
            </div>
          </a>

          {/* Android Download Button */}
          <a
            href={androidLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#3DDC84] px-5 py-3 rounded-xl hover:scale-105 transition-transform w-[70vw] sm:w-auto"
            aria-label="Get it on Google Play"
          >
            {/* Play Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path d="M325.3 234.3L104.6 13.7C99.3 8.4 92.7 5.3 85.8 5.3 70.4 5.3 58 17.7 58 33.1V478.9c0 15.4 12.4 27.8 27.8 27.8 6.9 0 13.5-3 18.8-8.4l220.6-220.6c6.6-6.6 10.2-15.3 10.2-24.6 0-9.2-3.6-18-10.1-24.5zM372.2 190.9L312.9 250.2l59.3 59.3 100.8 56.8c5.5 3.1 8.9 8.9 8.9 15.2 0 9.7-7.8 17.5-17.5 17.5-2.9 0-5.8-.7-8.4-2.1l-143-80.6v-99.3l143-80.6c2.6-1.5 5.5-2.1 8.4-2.1 9.7 0 17.5 7.8 17.5 17.5 0 6.3-3.4 12.1-8.9 15.2l-100.8 56.8z" />
            </svg>
            <div className="text-start leading-tight">
              <p className="text-[15px] font-semibold text-white">Google Play</p>
            </div>
          </a>
        </div>
      </div>

      {/* Animation Section */}
      <div className="flex w-full items-center justify-center md:justify-end">
        <div className="md:mt-0 ml-[-2rem] w-[43%] transform md:ml-20 md:-translate-x-[2rem] translate-y-4 md:-translate-y-[5vh] scale-[1.4] md:scale-[2.5] lg:-translate-y-[.2rem] lg:translate-x-[0px] lg:scale-[1.4]">
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
