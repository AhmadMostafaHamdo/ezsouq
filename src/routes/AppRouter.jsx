import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import SuspenseFallback from "../feedback/suspenseFallback/suspenseFallback";
import App from "../App";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyCode from "../pages/VerifyCode";
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspenseFallback>
        <App />
      </SuspenseFallback>
    ),
  },
  {
    path: "login",
    element: (
      <SuspenseFallback>
        <Login />
      </SuspenseFallback>
    ),
  },
  {
    path: "forgot-password",
    element: (
      <SuspenseFallback>
        <ForgotPassword />
      </SuspenseFallback>
    ),
  },
  {
    path: "verify-code",
    element: (
      <SuspenseFallback>
        <VerifyCode />
      </SuspenseFallback>
    ),
  },
  {
    path: "register",
    element: (
      <SuspenseFallback>
        <Register />
      </SuspenseFallback>
    ),
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
