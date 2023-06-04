//@ts-nocheck
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import ChooseInstagram from "./pages/Auth/chooseInstagram";
import { BASE_URL } from "./constants";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Box, CircularProgress } from "@chakra-ui/react";

const authRouter = createBrowserRouter([
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
const protectedRouter = createBrowserRouter([
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
export const UserContext = createContext(null);
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [instagramId, setInstagramId] = useState("");
  const [instagrams, setInstagrams] = useState([]);
  const [instaID, setInstaID] = useState(0);
  const [hasInstagram, setHasInstagram] = useState(false);
  const authenticate = async () => {
    try {
      const response = await axios.post(
        BASE_URL,
        {
          query: `
          query Query {
            me {
              id
              has_tiktok
              has_instagram
              instagrams {
                id
                username
                connected
              }
            }
          }
          `,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data.data == null || response.data?.errors) {
        console.log("User is not logged in");
        setIsAuth(false);
        setIsLoading(false);
      } else if (!response.data.data.me.has_instagram) {
        setIsAuth(true);
        setIsLoading(false);
        setHasInstagram(false);
      } else {
        setIsAuth(true);
        setIsLoading(false);
        setHasInstagram(false);
        const index: number =
          localStorage.getItem("selectedInstagramIndex") !== null
            ? parseInt(localStorage.getItem("selectedInstagramIndex") || "")
            : 0;

        const instas: any =
          JSON.parse(localStorage.getItem("instagrams") || "[]") || [];
        if (instas.length === 0) {
          localStorage.setItem("selectedInstagramIndex", "0");
          localStorage.setItem(
            "instagrams",
            JSON.stringify(response.data.data.me.instagrams)
          );
        } else {
          setInstaID(index);
          setInstagramId(instas[index]?.id);
          setInstagrams(response.data.data.me.instagrams);
        }
      }
    } catch (error) { }
  };

  useEffect(() => {
    authenticate();
  }, [instaID]);
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress isIndeterminate color="#8B5CF6" />
      </Box>
    );
  }
  return (
    <UserContext.Provider
      value={{
        isAuth,
        hasInstagram,
        instaID,
        instagramId,
        instagrams,
        setHasInstagram: (value) => { setHasInstagram(value) },
        setInstagrams: (value) => { setInstagrams(value) },
        setInstaID: (value) => { setInstaID(value) },
        setToggled: (value) => { console.log("setToggled" + value) },
      }}
    >
      <ToastContainer />
      <RouterProvider router={isAuth ? protectedRouter : authRouter} />
    </UserContext.Provider>
  );
}

export default App;
