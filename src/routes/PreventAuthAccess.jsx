import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Spinner from "../feedback/loading/Spinner";

const PreventAuthAccess = ({ children }) => {
  const token = Cookies.get("token");
  const [redirect, setRedirect] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        setRedirect(true);
        setChecking(false);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setChecking(false);
    }
  }, [token]);

  // أثناء الانتظار يظهر سبينر أنيق
  if (checking && !token)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size={60} />
      </div>
    );

  if (!token && redirect) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PreventAuthAccess;
