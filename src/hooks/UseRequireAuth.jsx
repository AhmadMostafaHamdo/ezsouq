import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const useRequireAuth = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const requireAuth = (callbackIfAuthenticated) => {
    if (token) {
      callbackIfAuthenticated?.();
    } else {
      toast.info("للقيام بهذه العملية، يجب تسجيل الدخول أولاً.", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return { requireAuth, token };
};
