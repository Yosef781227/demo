import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@pages/Home.page";
import Root from "@layouts/Root";
import LoginPage from "@pages/Auth/Login.page";
import Collections from "@pages/Collections/Collections.page";
import Setting from "@pages/Setting.page";
import SignupPage from "@pages/Auth/Signup.page";
import ResetPassword from "@pages/Auth/ResetPassword";
import TiktokPage from "@pages/integrations/Tiktok.page";
import InstagramPage from "@pages/integrations/Instagram.page";
import Collection from "@/pages/Collections/Collection.page";

function Router({ isAuth }: { isAuth: boolean }) {
  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<HomePage />} />
            <Route path="collections" element={<Collections />} />
            <Route path="settings" element={<Setting />} />
            <Route path="collections" element={<Collections />} />
            <Route path="collection/:collectionId" element={<Collection />} />
            <Route path="integration">
              <Route path="tiktok" element={<TiktokPage />} />
              <Route path="instagram" element={<InstagramPage />} />R
            </Route>
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default Router;
