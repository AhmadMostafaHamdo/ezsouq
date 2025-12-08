import React from "react";
import { Helmet } from "react-helmet";
import CategoryFilter from "../components/categoryFilter/CategoryFilter";

const AllProducts = () => {
  return (
    <>
      {/* SEO for All Products Page */}
      <Helmet>
        <title>جميع المنتجات | EzSouq</title>
        <meta
          name="description"
          content="تصفح جميع السيارات، العقارات، الموبايلات، واللابتوبات المتوفرة للبيع في سوريا عبر EzSouq."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ezsouq.store" />

        {/* Open Graph */}
        <meta property="og:title" content="جميع المنتجات | EzSouq" />
        <meta
          property="og:description"
          content="أفضل منصة سورية لتصفح وشراء جميع المنتجات بما فيها السيارات، العقارات، الموبايلات، واللابتوبات."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SY" />
        <meta property="og:url" content="https://www.ezsouq.store" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="جميع المنتجات | EzSouq" />
        <meta
          name="twitter:description"
          content="تصفح جميع المنتجات في سوريا بسهولة عبر EzSouq."
        />
      </Helmet>

      {/* Page Content */}
      <CategoryFilter />
    </>
  );
};

export default AllProducts;
