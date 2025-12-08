import AuthForm from "../components/forms/AuthForm";
import { loginField } from "../components/inputs/inputFields";
import { loginSchema } from "../validation/auth";
import { Helmet } from "react-helmet";

const Login = () => {
  return (
    <div>
      {/* SEO Helmet */}
      <Helmet>
        <title>تسجيل الدخول | EzSouq</title>
        <meta
          name="description"
          content="قم بتسجيل الدخول إلى EzSouq للوصول إلى حسابك وإدارة إعلاناتك للسيارات، العقارات، والأجهزة التقنية في سوريا بسهولة وأمان."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ezsouq.store/login" />

        {/* Open Graph */}
        <meta property="og:title" content="تسجيل الدخول | EzSouq" />
        <meta
          property="og:description"
          content="قم بتسجيل الدخول إلى EzSouq للوصول إلى حسابك وإدارة إعلاناتك للسيارات، العقارات، والأجهزة التقنية في سوريا بسهولة وأمان."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SY" />
        <meta property="og:url" content="https://www.ezsouq.store/login" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="تسجيل الدخول | EzSouq" />
        <meta
          name="twitter:description"
          content="قم بتسجيل الدخول إلى EzSouq للوصول إلى حسابك وإدارة إعلاناتك للسيارات، العقارات، والأجهزة التقنية في سوريا بسهولة وأمان."
        />
      </Helmet>

      <AuthForm
        fields={loginField}
        schema={loginSchema}
        btnAuth={"تسجيل الدخول"}
      />
    </div>
  );
};

export default Login;
