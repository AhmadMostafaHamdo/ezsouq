import React, { useEffect, useRef } from "react";

const AboutUs = () => {
  const about = useRef(null);

  useEffect(() => {
    if (about.current) {
      about.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={about}
      className="pt-[5rem] min-h-screen"
      style={{ backgroundColor: "#F9FAFB", color: "#374151" }}
    >
      {/* عنوان الصفحة */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1
          className="text-2xl md:text-4xl font-bold mb-4"
          style={{ color: "#4F46E5" }}
        >
          عن موقعنا وتطبيقنا
        </h1>
        <p className="text-lg md:text-xl mb-12" style={{ color: "#374151" }}>
          نوفر لك أفضل منصة في سوريا للسيارات، العقارات، والتقنيات، تجمع بين
          السهولة في الاستخدام والسرعة في الوصول إلى أفضل العروض.
        </p>
      </div>

      {/* أقسام مميزة */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center mb-16">
        <div
          className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: "#4F46E5" }}
          >
            السيارات
          </h2>
          <p style={{ color: "#6B7280" }}>
            اكتشف أحدث السيارات في سوريا، مع تفاصيل دقيقة وصور عالية الجودة. بيع
            وشراء السيارات أصبح أسهل من أي وقت مضى.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: "#4F46E5" }}
          >
            العقارات
          </h2>
          <p style={{ color: "#6B7280" }}>
            تجد كل أنواع العقارات للبيع أو الإيجار، من الشقق والمنازل إلى
            الأراضي والمباني التجارية، مع إمكانية التواصل المباشر مع المعلن.
          </p>
        </div>

        <div
          className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2
            className="text-2xl font-semibold mb-2"
            style={{ color: "#4F46E5" }}
          >
            التقنيات
          </h2>
          <p style={{ color: "#6B7280" }}>
            ابحث عن أحدث الأجهزة التكنولوجية، الهواتف، الحواسيب، والإكسسوارات،
            مع مقارنة الأسعار والعروض الأفضل.
          </p>
        </div>
      </div>

      {/* نص إضافي */}
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
