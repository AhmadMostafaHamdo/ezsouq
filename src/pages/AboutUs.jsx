import React, { useEffect, useRef } from "react";
import Heading from "../components/common/Heading";
import { Helmet } from "react-helmet";
const AboutUs = () => {
  const about = useRef(null);

  useEffect(() => {
    if (about.current) {
      about.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const data = [
    {
      title: "السيارات",
      text: " اكتشف أحدث السيارات في سوريا، مع تفاصيل دقيقة وصور عالية الجودة. بيع وشراء السيارات أصبح أسهل من أي وقت مضى",
    },
    {
      title: "العقارات",
      text: "  تجد كل أنواع العقارات للبيع أو الإيجار، من الشقق والمنازل إلى الأراضي والمباني التجارية، مع إمكانية التواصل المباشر مع المعلن.",
    },
    {
      title: "التقنيات",
      text: "ابحث عن أحدث الأجهزة التكنولوجية، الهواتف، الحواسيب، والإكسسوارات مع مقارنة الأسعار والعروض الأفضل.",
    },
  ];
  return (
    <div
      ref={about}
      className="pt-[5rem] min-h-screen"
      style={{ backgroundColor: "#F9FAFB", color: "#374151" }}
    >
      {/* SEO Configuration */}
      <Helmet>
        <title>EzSouq | بيع وشراء سيارات وعقارات وتقنيات في سوريا</title>
        <meta
          name="description"
          content="منصة EzSouq تقدم لك تجربة مميزة وسهلة لبيع وشراء السيارات، العقارات، والتقنيات في سوريا. تواصل مباشرة مع المعلنين واحصل على أفضل العروض."
        />
        <meta
          name="keywords"
          content="EzSouq, بيع سيارات سوريا, عقارات سوريا, موبايلات, لابتوبات, موقع سهل, تسوق سوري"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ezsouq.store/about-us" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content=" EzSouq | بيع وشراء سيارات وعقارات وتقنيات في سوريا"
        />
        <meta
          property="og:description"
          content="منصة سورية موثوقة وسهلة الاستخدام لتداول السيارات والعقارات والموبايلات واللابتوبات."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SY" />
        <meta property="og:url" content="https://www.ezsouq.com/about" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="عن EzSouq | بيع وشراء في سوريا" />
        <meta
          name="twitter:description"
          content="منصة موثوقة وسهلة لبيع وشراء السيارات والعقارات والتقنيات."
        />
      </Helmet>
      <Heading title={"الرجوع"} />
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "#4F46E5" }}
        >
          عن موقعنا وتطبيقنا
        </h1>
        <p
          className="text-lg md:text-[1.2rem] mb-12"
          style={{ color: "#374151" }}
        >
          نوفر لك أفضل منصة في سوريا للسيارات، العقارات، والتقنيات، تجمع بين
          السهولة في الاستخدام والسرعة في الوصول إلى أفضل العروض.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center mb-16">
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((d, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: "#4F46E5" }}
              >
                {d.title}
              </h2>
              <p style={{ color: "#6B7280" }}>{d.text}</p>
            </div>
          ))}
      </div>

      <div className="max-w-4xl mx-auto pb-10 px-4 text-center">
        <h3 className="text-3xl font-bold mb-2" style={{ color: "#4F46E5" }}>
          رؤيتنا
        </h3>
        <p style={{ color: "#374151" }} className="text-lg">
          نهدف لتقديم منصة موثوقة وسهلة الاستخدام لكل من يبحث عن سيارات، عقارات،
          أو تقنيات في سوريا، مع ضمان تجربة سلسة وآمنة للمستخدمين.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
