import CategoryFilter from "../components/categoryFilter/CategoryFilter";
import { Helmet } from "react-helmet";

const RealEstate = () => {
  return (
    <>
      <Helmet>
        <title>عقارات للبيع والإيجار في سوريا | EzSouq</title>
        <meta
          name="description"
          content="استعرض أفضل إعلانات العقارات في سوريا على EzSouq. بيع وشراء الشقق والمنازل والأراضي بسهولة وسرعة."
        />
        <meta
          name="keywords"
          content="عقارات للبيع في سوريا, شراء شقق, تأجير شقق, أراضي للبيع, سوق العقارات السورية, EzSouq"
        />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <CategoryFilter category="عقارات" />
    </>
  );
};

export default RealEstate;
