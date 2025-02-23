import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useError, useLoading, useUser } from "../../utils/customHook";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Cookies from "js-cookie";
import authService from "../../services/authService/auth.service";
import withAuth from "../../stores/hoc/withAuth";
import LodgingPage from "./LodgingPage";
import NewsPage from "./NewsPage";
import ContentHome from "./ContentHome";
function HomePage() {
  const user = useUser();
  const error = useError();
  const loading = useLoading();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !Cookies.get("authToken") &&
      ((error?.success && error?.message !== "Bạn không có quyền truy cập") ||
        !error)
    ) {
      toast(
        "🦄Chào mừng bạn trở lại với Countless New Rooms!. Hãy đăng nhập để có trải nghiệm tốt nhất nhé",
        {
          position: "bottom-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
      return;
    }
    if (!user && user?.success) {
      Cookies.remove("authToken");
      toast.error(
        "Hệ thống không nhận diện được tài khoản của bạn!. Mọi quá trình thao tác của bạn đã được ghi lại. Vui lòng đăng nhập để sử dụng hệ thống.",
        {
          autoClose: 5500,
        }
      );
      return;
    }
  }, [dispatch]);
  useEffect(() => {
    if (user?.success && Cookies.get("authToken")) {
      const hasShownToast = sessionStorage.getItem("welcomeToast");
      if (!hasShownToast) {
        toast.success(
          `🦄 ${user?.message} - ${(user?.data.name).toUpperCase()}`
        );
        sessionStorage.setItem("welcomeToast", "true");
      }
    }
  }, [user]);


  if (loading) {
    return (
      <div
        style={{ zIndex: 9999, marginTop: "-50px" }}
        class="flex items-center justify-center h-screen w-screen"
      >
        <div class="flex flex-row gap-3 items-center justify-center">
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between">
        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />


      </div>
      <div className="bg-gray-100">
        {/* <LodgingPage /> */}
        {/* News homepage */}
        <NewsPage />
      </div>
      <div>
        {/* // content home page */}
        <ContentHome />
      </div>
    </>
  );
}
export default withAuth(HomePage);
