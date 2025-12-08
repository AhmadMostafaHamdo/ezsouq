import AuthForm from "../components/forms/AuthForm";
import { registerField } from "../components/inputs/inputFields";
import { registerSchema } from "../validation/auth";
import { Helmet } from "react-helmet";

const Register = () => {
  return (
    <>
      <Helmet>
        <title>إنشاء حساب جديد | EzSouq</title>
        <meta
          name="description"
          content="سجل الآن في EzSouq لإنشاء حساب جديد والوصول إلى أفضل الإعلانات الإلكترونية في سوريا."
        />
        <meta
          name="keywords"
          content="تسجيل, إنشاء حساب, EzSouq, الإعلانات الإلكترونية, عقارات, سيارات"
        />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary" />
      </Helmet>

      <AuthForm
        fields={registerField}
        schema={registerSchema}
        btnAuth={"إنشاء حساب"}
      />
    </>
  );
};

export default Register;
