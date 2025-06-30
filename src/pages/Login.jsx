import AuthForm from "../components/forms/AuthForm";
import { loginField } from "../components/inputs/inputFields";
import { loginSchema } from "../validation/auth";

const Login = () => {
  return (
    <AuthForm
      fields={loginField}
      schema={loginSchema}
      btnAuth={"تسجيل الدخول"}
    />
  );
};

export default Login;
