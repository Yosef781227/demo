import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "@pages/Home.page";
import Root from "@layouts/Root";
import LoginPage from "@pages/Auth/Login.page";
import Collections from "@pages/Collections/Collections.page";
import Setting from "@pages/Setting.page";
import SignupPage from "@pages/Auth/Signup.page";
import ResetPassword from "@pages/Auth/ResetPassword";
import NextPage from "@pages/NextPage";
import TiktokPage from "@pages/integrations/Tiktok.page";
import InstagramPage from "@pages/integrations/Instagram.page";
import ChooseInstagram from "@pages/Auth/chooseInstagram";

export const authRouter = createBrowserRouter([
  {
    path: "/",
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
    path: "*",
    element: <Navigate to="/" />,
  },
]);
export const protectedRouter = createBrowserRouter([
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
    path: "ChooseInstagram",
    element: <ChooseInstagram />,
  },
  {
    path: "/",
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
]);
