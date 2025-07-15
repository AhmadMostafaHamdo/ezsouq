import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import SuspenseFallback from "../feedback/suspenseFallback/suspenseFallback";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyCode from "../pages/VerifyCode";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
import Main from "../components/main/Main";
import Filters from "../components/website/Filters";
const App = lazy(() => import("../App"));
const OfferDetails = lazy(() => import("../pages/OfferDetails"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const MainProfile = lazy(() => import("../components/website/MainProfile"));
const ContactInfo = lazy(() => import("../components/website/ContactInfo"));
const CreateOffer = lazy(() => import("../pages/CreateOffer"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const Cars = lazy(() => import("../pages/Cars"));
const Tech = lazy(() => import("../pages/Tech"));
const RealEstate = lazy(() => import("../pages/RealEstate"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Search = lazy(() => import("../pages/Search"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspenseFallback>
        <App />
      </SuspenseFallback>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseFallback>
            <Main />
            <Filters />
          </SuspenseFallback>
        ),
      },
      {
        path: "offer-details/:id",
        element: (
          <SuspenseFallback>
            <OfferDetails />
          </SuspenseFallback>
        ),
      },
      {
        path: "wishlist",
        element: (
          <SuspenseFallback>
            <Wishlist />
          </SuspenseFallback>
        ),
      },
      {
        path: "cars",
        element: (
          <SuspenseFallback>
            <Cars />
          </SuspenseFallback>
        ),
      },
      {
        path: "real-estate",
        element: (
          <SuspenseFallback>
            <RealEstate />
          </SuspenseFallback>
        ),
      },
      {
        path: "contact-us",
        element: (
          <SuspenseFallback>
            <ContactUs />
          </SuspenseFallback>
        ),
      },
      {
        path: "search",
        element: (
          <SuspenseFallback>
            <Search />
          </SuspenseFallback>
        ),
      },
      {
        path: "tech",
        element: (
          <SuspenseFallback>
            <Tech />
          </SuspenseFallback>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <SuspenseFallback>
            <PrivacyPolicy />
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
      <RedirectIfAuthenticated>
        <SuspenseFallback>
          <Login />
        </SuspenseFallback>
      </RedirectIfAuthenticated>
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
