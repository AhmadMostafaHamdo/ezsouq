import { useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {jwtDecode} from "jwt-decode"; // default export
import Cookies from "js-cookie";

function App() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Get token from URL and from cookies
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const tokenFromCookie = Cookies.get("token");

    // Decode role if token exists
    if (tokenFromCookie) {
      try {
        const decoded = jwtDecode(tokenFromCookie);
        console.log("Role:", decoded.Role);

        // Redirect OWNER to dashboard
        if (decoded.Role === "OWNER") {
          window.location.href = "/dashboard";
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }

    // If token exists in URL on root path, redirect to google-callback
    if (tokenFromUrl && window.location.pathname === "/") {
      window.location.href = `/google-callback?token=${tokenFromUrl}`;
    }
  }, [user]);

  return (
    <>
      <ToastContainer />
      <MainLayout />
    </>
  );
}

export default App;
