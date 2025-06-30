    import AuthForm from "../components/forms/AuthForm";
    import { registerField } from "../components/inputs/inputFields";
    import { registerSchema } from "../validation/auth";

    const Register = () => {
      return (
        <AuthForm
          fields={registerField}
          schema={registerSchema}
          btnAuth={"إنشاء حساب"}
        />
      );
    };

    export default Register;
