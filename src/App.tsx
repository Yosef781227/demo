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

export const UserContext = createContext(null);
function App() {
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
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [instagramId, setInstagramId] = useState("");
  const [instagrams, setInstagrams] = useState([]);
  const [instagramIndex, setInstagramIndex] = useState(0);
  const [hasInstagram, setHasInstagram] = useState(false);
  const [tiktokId, settiktokId] = useState("");
  const [tiktoks, settiktoks] = useState([]);
  const [tiktokIndex, settiktokIndex] = useState(0);
  const [hasTiktok, setHasTiktok] = useState(false);
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
              tiktoks {
                id
                uniqueId
                connected
              }
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
      setIsLoading(false);
      if (response.data.data == null || response.data?.errors) {
        console.log("User is not logged in");
        setIsAuth(false);
      } else {
        console.log("User is logged in");
        setIsAuth(true);
        if (response.data.data.me.has_instagram) {
          console.log("User has instagram");
          const index: number =
            localStorage.getItem("selectedInstagramIndex") !== null ? parseInt(localStorage.getItem("selectedInstagramIndex") || "") : 0;
          const instagrams = response.data.data.me.instagrams;
          localStorage.setItem("selectedInstagramIndex", index.toString());
          localStorage.setItem("instagrams", JSON.stringify(instagrams));
          setHasInstagram(true);
          setInstagramId(instagrams[index]?.id);
          setInstagrams(instagrams);
          setInstagramIndex(index);
        } else {
          console.log("User has no instagram");
          localStorage.removeItem("selectedInstagramIndex");
          localStorage.removeItem("instagrams");
        }
        if (response.data.data.me.has_tiktok) {
          console.log("User has tiktok");
          const index: number =
            localStorage.getItem("selectedTiktokIndex") !== null ? parseInt(localStorage.getItem("selectedTiktokIndex") || "") : 0;
          const tiktoks = response.data.data.me.tiktoks;
          localStorage.setItem("selectedTiktokIndex", index.toString());
          localStorage.setItem("tiktoks", JSON.stringify(tiktoks));
          settiktokId(tiktoks[index]?.id);
          settiktoks(tiktoks);
          settiktokIndex(index);
          setHasTiktok(true);
        } else {
          console.log("User has tiktok");
          localStorage.removeItem("selectedTiktokIndex");
          localStorage.removeItem("tiktoks");
        }
      }
    } catch (error) { }
  };

  useEffect(() => {
    authenticate();
  }, []);
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
        instagramIndex,
        instagramId,
        instagrams,
        hasTiktok,
        tiktokId,
        tiktoks,
        tiktokIndex,
        setHasInstagram: (value) => { setHasInstagram(value) },
        setInstagrams: (value) => { setInstagrams(value) },
        setInstagramIndex: (value) => { setInstagramIndex(value) },
        setInstagramId: (value) => { setInstagramId(value) },
        setHasTiktok: (value) => { setHasTiktok(value) },
        settiktoks: (value) => { settiktoks(value) },
        settiktokId: (value) => { settiktokId(value) },
        settiktokIndex: (value) => { settiktokIndex(value) },
      }}
    >
      <ToastContainer />
      <RouterProvider router={isAuth ? protectedRouter : authRouter} />
    </UserContext.Provider>
  );
}

export default App;
