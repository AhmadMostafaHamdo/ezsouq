import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import SuspenseFallback from "../feedback/suspenseFallback/suspenseFallback";
import GoogleAuthCallback from "../components/forms/GoogleAuthCallback";
import PreventAuthAccess from "./PreventAuthAccess";

// ⚡ Lazy Load Pages & Components
const App = lazy(() => import("../App"));

//  Auth
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const VerifyCode = lazy(() => import("../pages/VerifyCode"));
const NewPassword = lazy(() => import("../pages/NewPassword"));
const RedirectIfAuthenticated = lazy(() => import("./RedirectIfAuthenticated"));

//  Website
const Main = lazy(() => import("../components/main/Main"));
const Filters = lazy(() => import("../components/website/Filters"));
const AllProducts = lazy(() => import("../pages/AllProducts"));
const OfferDetails = lazy(() => import("../pages/OfferDetails"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Cars = lazy(() => import("../pages/Cars"));
const Tech = lazy(() => import("../pages/Tech"));
const RealEstate = lazy(() => import("../pages/RealEstate"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const Search = lazy(() => import("../pages/Search"));
const Report = lazy(() => import("../pages/Report"));
const Commits = lazy(() => import("../pages/Commits"));
const Newest = lazy(() => import("../pages/Newest"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const We = lazy(() => import("../pages/AboutUs"));
const Profile = lazy(() => import("../pages/Profile"));
const MainProfile = lazy(() => import("../components/website/MainProfile"));
const ContactInfo = lazy(() => import("../components/website/ContactInfo"));
const Rating = lazy(() => import("../components/website/Rating/Rating"));
const CreateOffer = lazy(() => import("../pages/CreateOffer"));

// Dashboard
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Statistic = lazy(() => import("../pages/dashboard/Statistic"));
const Offers = lazy(() => import("../pages/dashboard/Offers"));
const UsersDashboard = lazy(() =>
  import("../components/dashoard/UsersDashboard")
);
const UserDetails = lazy(() => import("../components/dashoard/UserDetails"));
const RatingDashboard = lazy(() => import("../pages/dashboard/Rating"));
const RatingDetails = lazy(() =>
  import("../components/dashoard/RatingDetails")
);
const Reports = lazy(() => import("../pages/dashboard/Reports"));
const ReportDetails = lazy(() =>
  import("../components/dashoard/ReportsDetails")
);
const Setting = lazy(() => import("../pages/dashboard/Setting"));
const Notification = lazy(() => import("../pages/dashboard/Notification"));

//  Routes Configuration
const router = createBrowserRouter([
  //  Public Website Routes
  {
    path: "/",
    element: (
      <SuspenseFallback>
        <App />
      </SuspenseFallback>
    ),
    children: [
      { index: true, element: <MainWithFilters /> },
      { path: "offer-details/:id", element: <PreventAuthAccess ><OfferDetails /> </PreventAuthAccess>},
      { path: "offer-details/:id/report/:userId", element: <Report /> },
      { path: "google-callback", element: <GoogleAuthCallback /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "cars", element: <Cars /> },
      { path: "tech", element: <Tech /> },
      { path: "real-estate", element: <RealEstate /> },
      { path: "all-product", element: <AllProducts /> },
      { path: "newest", element: <Newest /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "search", element: <Search /> },
      {
        path: "commits/:id",
        element: (
          <PreventAuthAccess>
            <Commits />
          </PreventAuthAccess>
        ),
      },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "about-us", element: <We /> },
      {
        path: "profile/:id",
        element: <Profile />,
        children: [
          { path: "contact-info", element: <ContactInfo /> },
          { path: "rating", element: <Rating /> },
        ],
      },
      {
        path: "create-offer",
        element: (
          <PreventAuthAccess>
            <CreateOffer />{" "}
          </PreventAuthAccess>
        ),
      },
    ],
  },

  //  Dashboard (Admin Panel)
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Statistic /> },
      { path: "offers", element: <Offers /> },
      { path: "users", element: <UsersDashboard /> },
      { path: "users/:id", element: <UserDetails /> },
      { path: "rating", element: <RatingDashboard /> },
      { path: "rating/:id", element: <RatingDetails /> },
      { path: "reports", element: <Reports /> },
      { path: "reports/:id", element: <ReportDetails /> },
      { path: "setting", element: <Setting /> },
      { path: "notification", element: <Notification /> },
    ],
  },

  //  Authentication
  {
    path: "login",
    element: (
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "register",
    element: (
      <RedirectIfAuthenticated>
        <Register />
      </RedirectIfAuthenticated>
    ),
  },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "reset-password/:token", element: <NewPassword /> },
  { path: "verify-code", element: <VerifyCode /> },

  //  404 Not Found
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);

// ⚡ Helper Component
// For combining Main + Filters together
function MainWithFilters() {
  return (
    <SuspenseFallback>
      <Main />
      <Filters />
    </SuspenseFallback>
  );
}

//  AppRouter Export
const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
