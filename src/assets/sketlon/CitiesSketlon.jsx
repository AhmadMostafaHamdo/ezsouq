  import ContentLoader from "react-content-loader";

  const CitiesSketlon = () => {
    return (
      <ContentLoader
        speed={2}
        width={400}
        height={40}
        viewBox="0 0 400 40"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* Tab 1 */}
        <rect x="0" y="0" rx="3" ry="3" width="60" height="16" />
        <rect x="15" y="25" rx="3" ry="3" width="30" height="3" />

        {/* Tab 2 */}
        <rect x="80" y="0" rx="3" ry="3" width="60" height="16" />

        {/* Tab 3 */}
        <rect x="160" y="0" rx="3" ry="3" width="60" height="16" />

        {/* Tab 4 */}
        <rect x="240" y="0" rx="3" ry="3" width="60" height="16" />
      </ContentLoader>
    );
  };

  export default CitiesSketlon;
