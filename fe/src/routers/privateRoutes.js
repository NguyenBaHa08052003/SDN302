import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import { Route } from "react-router-dom";
import Profile from "../pages/auth/Profile";
import AuthMiddleware from "../middlewares/AuthMiddleware";
// import DashBoard from "../pages/admins/DashBoard";
import DashboardPage from "../pages/admins/DashboardPage";
export const privateRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      <Route element={<AuthMiddleware />}>
        <Route path="/tai-khoan" element={<Profile />} />
        <Route path="/vi-tien" element={<Profile />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Route>
    
  </>
);
