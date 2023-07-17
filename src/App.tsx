import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { User } from "./interfaces/user.interface";
import Router from "./utils/routes";
import Loading from "./components/Loading";
import useGetMe from "./hooks/user";
import { Message } from "./interfaces/message";
import useMessage from "./utils/context/message";
export const UserContext = createContext<User | null>(null);
export const MessageContext = createContext<Message | null>(null);
function App() {
  const { loading, userInfo } = useGetMe();
  const messageDefault = useMessage();

  if (loading) {
    return <Loading />;
  }
  return (
    <UserContext.Provider value={{ ...userInfo, }} >
      <MessageContext.Provider value={messageDefault}>
        <Router isAuth={userInfo.isAuth} />
      </MessageContext.Provider>
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
