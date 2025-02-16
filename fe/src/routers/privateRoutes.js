import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import { Route } from "react-router-dom";
import Profile from "../pages/auth/Profile";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import DashBoard from "../pages/admins/DashBoard";
export const privateRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      <Route element={<AuthMiddleware />}>
        <Route path="/tai-khoan" element={<Profile />} />
        <Route path="/vi-tien" element={<Profile />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Route>
    </Route>
  </>
);
