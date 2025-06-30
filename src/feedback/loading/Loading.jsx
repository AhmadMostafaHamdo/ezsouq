import Lottie from "lottie-react";
import loading from "../../assets/lottifiles/Animation - 1749642657146.json";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-primary dark:bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
      <div className="w-80 h-80 md:w-48 md:h-48">
        <Lottie animationData={loading} loop={true} className="w-full h-full" />
      </div>
      <p className="text-lg font-medium text-gray-600 text-white animate-pulse">
        جارٍ التحميل ...
      </p>
    </div>
  );
};

export default Loading;
