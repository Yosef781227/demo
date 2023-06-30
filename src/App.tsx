import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { User } from "./interfaces/user.interface";
import Router from "./utils/routes";
import Loading from "./components/Loading";
import useGetMe from "./hooks/user";
export const UserContext = createContext<User | null>(null);
function App() {
  const { loading, userInfo } = useGetMe();
  if (loading) {
    return <Loading />;
  }
  return (
    <UserContext.Provider value={{ ...userInfo, }} >
      <Router isAuth={userInfo.isAuth} />
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
