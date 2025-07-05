import ContentLoader from "react-content-loader";

const CardSkeleton = () => {
  return (
    <div className="p-[.5rem] w-[86vw] md:w-60  [.75rem] [1.375rem]  shadow-card bg-white rounded-[8px]">
      <div className="flex flex-col items-start md:full">
        <ContentLoader
          speed={2}
          width={350}
          height={340}
          viewBox="0 0 350 340"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          className="w-full" // Added for responsiveness
        >
          {/* Top row - date, publisher, and heart icon */}
          <rect x="0" y="10" rx="4" ry="4" width="80" height="12" />
          <rect x="120" y="10" rx="4" ry="4" width="100" height="12" />
          <rect x="300" y="8" rx="5" ry="5" width="24" height="24" />

          {/* Main image */}
          <rect x="0" y="40" rx="8" ry="8" width="340" height="180" />

          {/* Title */}
          <rect x="0" y="240" rx="4" ry="4" width="300" height="20" />

          {/* Location */}
          <rect x="0" y="270" rx="4" ry="4" width="200" height="16" />

          {/* Price and type section */}
          <rect x="0" y="300" rx="4" ry="4" width="90" height="18" />
          <rect x="110" y="300" rx="4" ry="4" width="80" height="18" />
        </ContentLoader>
      </div>
    </div>
  );
};

export default CardSkeleton;
