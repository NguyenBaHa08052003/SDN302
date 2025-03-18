import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import { Route } from "react-router-dom";
import AuthMiddleware from "../middlewares/authMiddleware";
import DashboardPage from "../pages/admin/DashboardPage";
import CreateLodgingPage from "../pages/lodging/CreateLodgingPage";
import LayoutDasboard from "../pages/dasboard/LayoutDasboard";
import ProfilePage from "../pages/dasboard/ProfilePage";
import LodgingManagement from "../pages/dasboard/LodgingManagement";
import LodgingChart from "../pages/dasboard/LogingChart";
import WishListPage from "../pages/Home/WishList/WishListPage";
import PaymentZalo from "../pages/Payment/Payment_Zalo";
import ChangePassword from "../pages/dasboard/ChangePassword";
export const privateRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      <Route element={<AuthMiddleware />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dang-bai" element={<CreateLodgingPage />} />
        <Route path="/quan-ly" element={<LayoutDasboard />}  >
          <Route path="tai-khoan" element={<ProfilePage />} index />
          <Route path="dang-tin" element={<CreateLodgingPage />} />
          <Route path="danh-sach" element={<LodgingManagement />} />
          <Route path="phan-tich" element={<LodgingChart/>} />
          <Route path="nap-tien" element={<PaymentZalo/>} />
          <Route path="doi-mat-khau" element={<ChangePassword />} />
        </Route>
        <Route path="yeu-thich" element={<WishListPage />} />
      </Route>
    </Route>

  </>
);