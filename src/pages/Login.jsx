import AuthForm from "../components/forms/AuthForm";
import { loginField } from "../components/inputs/inputFields";
import { loginSchema } from "../validation/auth";

const Register = () => {
  return (
    <AuthForm
      fields={loginField}
      schema={loginSchema}
      btnAuth={"تسجيل الدخول"}
    />
  );
};

export default Register;
