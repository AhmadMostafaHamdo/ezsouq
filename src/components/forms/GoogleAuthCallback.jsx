import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Spinner from "../../feedback/loading/Spinner";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token"); // Extract JWT from query params

    if (token) {
      try {
        Cookies.set("token", token); // Save JWT to cookies
        const { Role } = jwtDecode(token); // Decode user role
        navigate(Role === "OWNER" ? "/dashboard" : "/"); // Redirect based on role
      } catch (err) {
        console.error("Invalid token:", err);
        navigate("/login", { replace: true });
      }
    } else {
      console.error("Token not found in URL");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex-center h-screen bg-white flex-col">
      <h1 className="text-xl mb-3 text-primary">Signing in with Google...</h1>
      <Spinner />
    </div>
  );
};

export default GoogleAuthCallback;
