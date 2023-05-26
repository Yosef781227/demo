import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@pages/Home.page";
import Root from "@layouts/Root";
import LoginPage from "@pages/Auth/Login.page";
import Collections from "@pages/Collections/Collections.page";
import Setting from "@pages/Setting.page";
import SignupPage from "@pages/Auth/Signup.page";
import ResetPassword from "@pages/Auth/ResetPassword";
import NextPage from "@pages/NextPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TiktokPage from "./pages/integrations/Tiktok.page";
import InstagramPage from "./pages/integrations/Instagram.page";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "nextpage",
    element: <NextPage />,
  },
  {
    path: "home",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "collections",
        element: <Collections />,
      },
      {
        path: "integration",
        children: [
          {
            path: "tiktok",
            element: <TiktokPage />,
          },
          {
            path: "instagram",
            element: <InstagramPage />,
          },
        ],
      },
      {
        path: "settings",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginPage />,
    // element: <Root />,
    // errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
