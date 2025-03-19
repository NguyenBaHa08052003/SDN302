import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

import { Route } from "react-router-dom";
import GuestMiddleware from "../middlewares/GuestMiddleware";
import Login from "../pages/auth/Login";
import HomePage from "../pages/Home/HomePage";
import LodgingPage from "../pages/Home/LodgingPage";
import NotFound from "../pages/not_found/NotFound";
import RoomRental from "../pages/Home/Details/RoomRental"
import RoomDetail from "../pages/Home/Details/RoomDetail";
import VerifyUserPage from "../pages/admin/VerifyUserPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import SignUp from "../pages/auth/SignUp";
import VIPAllRental from "../pages/Home/Details/VIPAllRental";
import SupportSystem from "../pages/Home/support/SupportSystem";
export const publicRoutes = (
  <>
    <Route path="*" element={<NotFound />} />
    <Route element={<DefaultLayout />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/lodging" element={<LodgingPage />} />
      <Route path="/loging/room-rental" element={<RoomRental />} />
      <Route path="/loging/nguyen-can" element={<RoomRental />} />
      <Route path="/loging/room-rental/room-detail/:id" element={<RoomDetail />} />
      <Route path="/verify-account/:id" element={<VerifyUserPage />} />
      <Route path="/loging/vip-all-rental" element={<VIPAllRental />} />
      <Route path="/support-system" element={<SupportSystem />} />
    </Route>

    <Route element={<AuthLayout />}>
      <Route element={<GuestMiddleware />}>
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Route>
  </>
);
