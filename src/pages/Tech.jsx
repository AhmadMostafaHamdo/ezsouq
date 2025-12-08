import { Helmet } from "react-helmet";
import CategoryFilter from "../components/categoryFilter/CategoryFilter";

const Tech = () => {
  return (
    <>
      <Helmet>
        <title>منتجات وتقنيات | EzSouq</title>
        <meta
          name="description"
          content="تصفح أحدث الأجهزة والتقنيات الإلكترونية، الحواسيب، الهواتف، والإكسسوارات على منصة EzSouq."
        />
        <meta property="og:url" content="https://www.ezsouq.store/tech" />
        <link rel="canonical" href="https://www.ezsouq.store/tech" />

        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="منتجات وتقنيات | EzSouq" />
        <meta
          property="og:description"
          content="تصفح أحدث الأجهزة والتقنيات الإلكترونية، الحواسيب، الهواتف، والإكسسوارات على منصة EzSouq."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="منتجات وتقنيات | EzSouq" />
        <meta
          name="twitter:description"
          content="تصفح أحدث الأجهزة والتقنيات الإلكترونية، الحواسيب، الهواتف، والإكسسوارات على منصة EzSouq."
        />
      </Helmet>

      <CategoryFilter category="تقنيات" />
    </>
  );
};

export default Tech;
