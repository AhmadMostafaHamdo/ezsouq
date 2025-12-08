import { Link } from "react-router-dom";
import security from "../assets/images/security.svg";
import { useEffect, useRef } from "react";
import Heading from "../components/common/Heading";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";

const PrivacyPolicy = () => {
  // Define all sections of the privacy policy
  const sections = [
    {
      title: "1. المعلومات التي نقوم بجمعها:",
      points: [
        "الاسم والبريد الإلكتروني ورقم الهاتف عند التسجيل",
        "معلومات الإعلان التي تقوم بإدخالها (مثل الصور والوصف والموقع)",
        "بيانات الاستخدام (مثل الصفحات التي تزورها داخل التطبيق)",
      ],
    },
    {
      title: "2. كيفية استخدامنا لهذه المعلومات:",
      points: [
        "عرض الإعلانات وإدارتها داخل التطبيق",
        "تحسين تجربة المستخدم",
        "التواصل معك في حال وجود أي مخالفة أو تحديثات مهمة",
      ],
    },
    {
      title: "3. مشاركة البيانات:",
      points: [
        "نحن لا نشارك بياناتك الشخصية مع أطراف ثالثة دون موافقتك، إلا في حال طُلب منا ذلك بموجب القانون.",
      ],
    },
    {
      title: "4. حماية المعلومات:",
      points: [
        "نستخدم وسائل أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الفقدان.",
      ],
    },
    {
      title: "5. حقوق المستخدم:",
      points: [
        "يحق لك طلب حذف حسابك أو تعديل بياناتك في أي وقت من خلال إعدادات الحساب أو التواصل معنا.",
      ],
    },
    {
      title: "6. ملفات تعريف الارتباط (Cookies):",
      points: [
        "قد نستخدم ملفات الكوكيز لتحسين الأداء، ويمكنك رفض استخدامها من خلال إعدادات جهازك.",
      ],
    },
    {
      title: "7. تواصل معنا:",
      points: [
        "لأي استفسار حول سياسة الخصوصية، يُرجى التواصل عبر:",
        "البريد الإلكتروني: support@ezsouq.sy",
        "رقم الواتساب: 0999 999 999",
        <>
          أو من خلال صفحة{" "}
          <Link
            to="/contact-us"
            className="text-primary hover:underline font-semibold"
          >
            تواصل معنا
          </Link>
        </>,
      ],
    },
  ];

  const offer = useRef();

  // Scroll to the top of the page when component mounts
  useEffect(() => {
    offer.current.scrollIntoView();
  }, []);

  return (
    <div className="pt-16" ref={offer}>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>سياسة الخصوصية | EzSouq</title>
        <meta
          name="description"
          content="تعرف على سياسة الخصوصية في تطبيق EzSouq وكيفية حماية بياناتك الشخصية."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://www.ezsouq.store/privacy-policy`}
        />
        <meta
          property="og:url"
          content={`https://www.ezsouq.store/privacy-policy`}
        />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <div className="container mx-auto px-4">
        {/* Heading with back link based on login status */}
        <Heading
          title="سياسة الخصوصية"
          url={Cookies.get("token") ? "/" : "/register"}
        />

        {/* Introductory paragraph */}
        <p className="text-primary text-[.87rem] py-2">
          نحن نُقدّر خصوصيتك ونحرص على حماية بياناتك الشخصية. توضح هذه السياسة
          كيفية جمع واستخدام ومشاركة المعلومات عند استخدامك لتطبيقنا.
        </p>

        {/* Security image for mobile devices */}
        <img
          src={security}
          className="block md:hidden my-6"
          alt="أمان البيانات"
        />

        {/* Render all sections */}
        <div className="leading-8">
          {sections.map((section, index) => (
            <div key={index} className="mb-8 w-full md:w-3/5 lg:w-full">
              {/* Section title */}
              <h2 className="text-[#23193E] text-[1.25rem] font-semibold mb-4">
                {section.title}
              </h2>

              {/* Section points as bullet list */}
              <ul className="pr-4 list-disc list-inside space-y-2 text-[#716D97]">
                {section.points.map((point, idx) => (
                  <li key={idx} className="font-medium">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Last updated date */}
        <p className="text-[#23193E] text-[.87rem] text-center my-10">
          آخر تحديث: 11 يوليو 2025
        </p>

        {/* Security image for larger devices */}
        <img
          src={security}
          alt="أمان البيانات"
          className="hidden md:block md:absolute top-40 left-28 md:w-1/3 lg:w-fit"
        />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
