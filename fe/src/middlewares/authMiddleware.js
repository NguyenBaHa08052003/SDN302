import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";

import { fetchUser } from "../stores/redux/slices/userSlice";
import { useLoading, useUser } from "../utils/customHook";

function AuthMiddleware() {
  const dispatch = useDispatch();
  const user = useUser();
  const loading = useLoading();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch]);
  if (loading) {
    return (
      <div style={{ zIndex: 9999 , marginTop: "-50px"}}  class="flex items-center justify-center h-screen w-screen">
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

export default AuthMiddleware;
