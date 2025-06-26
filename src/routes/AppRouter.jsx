import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import SuspenseFallback from "../feedback/suspenseFallback/suspenseFallback";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyCode from "../pages/VerifyCode";
const App = lazy(() => import("../pages/OfferDetails"));
const OfferDetails = lazy(() => import("../App"));
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
    path: "/offer-details",
    element: (
      <SuspenseFallback>
        <OfferDetails />
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
