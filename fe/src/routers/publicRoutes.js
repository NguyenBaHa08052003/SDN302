import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

import { Route } from "react-router-dom";
import GuestMiddleware from "../middlewares/GuestMiddleware";
import Login from "../pages/auth/Login";
import HomePage from "../pages/Home/HomePage";
import LodgingPage from "../pages/Home/LodgingPage";
import NotFound from "../pages/not_found/NotFound";
//import RoomRental from "../pages/Home/Details/RoomRental";
import RoomRental from "../pages/Home/Details/Dashboard"
export const publicRoutes = (
  <>
    <Route path="*" element={<NotFound />} />
    <Route element={<DefaultLayout />}>
        <Route index path="/" element={<HomePage />} />
        <Route path="/lodging" element={<LodgingPage />} />
        <Route path="/loging/room-rental" element={<RoomRental/>}/>
    </Route>

    <Route element={<AuthLayout />}>
      <Route element={<GuestMiddleware />}>
        <Route path="/dang-nhap" element={<Login />} />
      </Route>
    </Route>
  </>
);
