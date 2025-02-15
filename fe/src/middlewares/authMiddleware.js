import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";

import { useError, useLoading, useUser } from "../utils/customHook";
import withAuth from "../stores/hoc/withAuth";
import { toast, ToastContainer } from "react-toastify";

function AuthMiddleware() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useUser();
  const error = useError();
  const loading = useLoading();
  useEffect(() => {
    
    if (!error?.success && error?.message === "Bạn không có quyền truy cập") {
      console.log("hello");
      Cookies.remove("authToken");
      toast.error(
        "Hệ thống không nhận diện được tài khoản của bạn!. Mọi quá trình thao tác của bạn đã được ghi lại. Vui lòng đăng nhập để sử dụng hệ thống.",
        {
          autoClose: 5500,
        }
      );
      navigate("/");
      return;
    }
    if (!Cookies.get("authToken")) {
      navigate("/");
      return;
    }
  }, [dispatch]);
  if (loading) {
    return (
      <div
        style={{ zIndex: 9999, marginTop: "-50px" }}
        class="flex items-center justify-center h-screen w-screen"
      >
        <ToastContainer position="bottom-right"/>
        <div class="flex flex-row gap-3 items-center justify-center">
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }
  return user ? (
    <Outlet />
  ) : (
    setTimeout(() => <Navigate to="/dang-nhap" />, 1000, clearTimeout())
  );
}

export default withAuth(AuthMiddleware);
