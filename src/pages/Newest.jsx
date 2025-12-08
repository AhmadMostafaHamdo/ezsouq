import CategoryFilter from "../components/categoryFilter/CategoryFilter";
import { Helmet } from "react-helmet";

const Newest = () => {
  return (
    <div>
      {/* SEO Helmet */}
      <Helmet>
        <title>الأحدث | EzSouq</title>
        <meta
          name="description"
          content="استعرض أحدث الإعلانات في EzSouq للسيارات، العقارات، والأجهزة التقنية في سوريا بشكل مرتب وسهل التصفح."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ezsouq.store/newest" />

        {/* Open Graph */}
        <meta property="og:title" content="الأحدث | EzSouq" />
        <meta
          property="og:description"
          content="استعرض أحدث الإعلانات في EzSouq للسيارات، العقارات، والأجهزة التقنية في سوريا بشكل مرتب وسهل التصفح."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SY" />
        <meta property="og:url" content="https://www.ezsouq.store/newest" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="الأحدث | EzSouq" />
        <meta
          name="twitter:description"
          content="استعرض أحدث الإعلانات في EzSouq للسيارات، العقارات، والأجهزة التقنية في سوريا بشكل مرتب وسهل التصفح."
        />
      </Helmet>

      <CategoryFilter />
    </div>
  );
};

export default Newest;
