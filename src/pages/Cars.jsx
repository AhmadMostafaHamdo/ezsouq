import React from "react";
import { Helmet } from "react-helmet";
import CategoryFilter from "../components/categoryFilter/CategoryFilter";

const Cars = () => {
  return (
    <>
      {/* SEO for Cars Page */}
      <Helmet>
        <title>سيارات للبيع في سوريا | EzSouq</title>
        <meta
          name="description"
          content="تصفح أحدث السيارات للبيع في سوريا عبر EzSouq. سيارات جديدة ومستعملة بأسعار منافسة مع إمكانية التواصل المباشر مع البائع."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ezsouq.store/cars" />

        {/* Open Graph */}
        <meta property="og:title" content="سيارات للبيع في سوريا | EzSouq" />
        <meta
          property="og:description"
          content="أفضل منصة سورية لتصفح وشراء السيارات الجديدة والمستعملة في سوريا."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SY" />
        <meta property="og:url" content="https://www.ezsouq.com/cars" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="سيارات للبيع في سوريا | EzSouq" />
        <meta
          name="twitter:description"
          content="تصفح أحدث السيارات في سوريا بسهولة عبر EzSouq."
        />
      </Helmet>

      {/* Page Content */}
      <CategoryFilter category="سيارات" />
    </>
  );
};

export default Cars;
