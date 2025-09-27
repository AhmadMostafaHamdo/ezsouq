import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { thunkGoogleLogin } from "../../store/auth/thunk/authThunk";
import { jwtDecode } from "jwt-decode";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      dispatch(thunkGoogleLogin(code))
        .unwrap()
        .then((res) => {
          const { token } = res;
          const { Role } = jwtDecode(token);
          if (Role === "OWNER") navigate("/dashboard");
          else navigate("/");
        });
    }
  }, [dispatch, location, navigate]);

  return (
    <div className="flex-center h-screen">جارٍ تسجيل الدخول عبر Google...</div>
  );
};

export default GoogleCallback;
