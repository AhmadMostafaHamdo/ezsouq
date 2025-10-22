import { useEffect } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
function App() {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    // If token exists in root URL, redirect to google-callback
    if (token && window.location.pathname === "/") {
      window.location.href = `/google-callback?token=${token}`;
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
