import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RedirectIfAuthenticated = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return token ? null : children;
};

export default RedirectIfAuthenticated;
