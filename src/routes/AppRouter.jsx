import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import { lazy } from "react";
import SuspenseFallback from "../feedback/suspenseFallback/suspenseFallback";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyCode from "../pages/VerifyCode";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
const App = lazy(() => import("../App"));
const OfferDetails = lazy(() => import("../pages/OfferDetails"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const MainProfile = lazy(() => import("../components/website/MainProfile"));
const ContactInfo = lazy(() => import("../components/website/ContactInfo"));
const CreateOffer = lazy(() => import("../pages/CreateOffer"));
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
    path: "/offer-details/:id",
    element: (
      <SuspenseFallback>
        <OfferDetails />
      </SuspenseFallback>
    ),
  },
  {
    path: "/profile",
    element: (
      <SuspenseFallback>
        <Profile />
      </SuspenseFallback>
    ),
    children: [
      { index: true, element: <MainProfile /> },
      {
        path: "contact-info",
        element: <ContactInfo />,
      },
    ],
  },
  {
    path: "/create-offer",
    element: (
      <SuspenseFallback>
        <CreateOffer />
      </SuspenseFallback>
    ),
  },
  {
    path: "login",
    element: (
      <SuspenseFallback>
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
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
        <RedirectIfAuthenticated>
          <Register />
        </RedirectIfAuthenticated>
      </SuspenseFallback>
    ),
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
