import { Helmet } from "react-helmet";
import MainCreateOffer from "../components/main/MainCreateOffer";

const CreateOffer = () => {
  return (
    <div>
      {/* SEO Helmet */}
      <Helmet>
        <title>إنشاء إعلان | EzSouq</title>
        <meta
          name="description"
          content="أنشئ إعلانك على EzSouq لبيع السيارات، العقارات، أو الأجهزة التقنية بسهولة وأمان في سوريا."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ezsouq.store/create-offer" />

        {/* Open Graph */}
        <meta property="og:title" content="إنشاء إعلان | EzSouq" />
        <meta
          property="og:description"
          content="أنشئ إعلانك الآن على EzSouq لعرض وبيع السيارات، العقارات، أو الأجهزة التقنية في سوريا."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SY" />
        <meta
          property="og:url"
          content="https://www.ezsouq.store/create-offer"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="إنشاء إعلان | EzSouq" />
        <meta
          name="twitter:description"
          content="أنشئ إعلانك الآن على EzSouq لعرض وبيع السيارات، العقارات، أو الأجهزة التقنية في سوريا."
        />
      </Helmet>

      <MainCreateOffer />
    </div>
  );
};

export default CreateOffer;
