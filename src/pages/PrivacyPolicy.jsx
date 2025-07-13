import { Link } from "react-router";
import security from "../assets/images/security.svg";
const PrivacyPolicy = () => {
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
            أو من خلال صفحة <Link to="/contact-us">تواصل معنا</Link>
          </>,
        ],
      },
    ];

  return (
    <div className="pt-16">
      <div className="container">
        <h1 className="font-normal text-[#23193E]  text-[1.5rem]">
          سياسة الخصوصية
        </h1>
        <p className="text-primary text-[.87rem] py-2">
          نحن نُقدّر خصوصيتك ونحرص على حماية بياناتك الشخصية. توضح هذه السياسة
          كيفية جمع واستخدام ومشاركة المعلومات عند استخدامك لتطبيقنا.
        </p>
        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <p className="text-[#23193E] text-[1.25rem] font-normal">
              {section.title}
            </p>
            <div className="pr-2">
              {section?.points?.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </div>
          </div>
        ))}
        <p className="text-[#23193E] text-[.87rem] text-center m-10">
          آخر تحديث: 11 يوليو 2025
        </p>
        <img src={security} alt="" className="absolute top-40 left-28 " />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
