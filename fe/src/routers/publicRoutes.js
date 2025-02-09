import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

import { Route } from "react-router-dom";
import GuestMiddleware from "../middlewares/GuestMiddleware";
import Login from "../pages/auth/Login";
import HomePage from "../pages/Home/HomePage";
import LodgingPage from "../pages/Home/LodgingPage";
export const publicRoutes = (
  <>
    <Route element={<DefaultLayout/>}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/lodging" element={<LodgingPage/>}/>
    </Route>
    <Route element={<AuthLayout />}>
      <Route element={<GuestMiddleware />}>
        <Route path="/dang-nhap" element={<Login />} />
      </Route>
    </Route>
  </>
);
