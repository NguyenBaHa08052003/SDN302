import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import { Route } from "react-router-dom";
import Profile from "../pages/auth/Profile";
import AuthMiddleware from "../middlewares/authMiddleware";
// import DashBoard from "../pages/admins/DashBoard";
import DashboardPage from "../pages/admin/DashboardPage";
import CreateLodgingPage from "../pages/lodging/CreateLodgingPage";
import LayoutDasboard from "../pages/dasboard/LayoutDasboard";
import ProfilePage from "../pages/dasboard/ProfilePage";
import LodgingManagement from "../pages/dasboard/LodgingManagement";
export const privateRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      <Route element={<AuthMiddleware />}>
        <Route path="/tai-khoan" element={<Profile />} />
        <Route path="/vi-tien" element={<Profile />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/quan-ly" element={<LayoutDasboard />}  >
          <Route path="tai-khoan" element={<ProfilePage />} index />
          <Route path="bai-dang/dang-tin" element={<CreateLodgingPage />} />
          <Route path="bai-dang" element={<LodgingManagement />} />
        </Route>
      </Route>
    </Route>

  </>
);
