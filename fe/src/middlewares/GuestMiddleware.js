import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux"; // Sử dụng useSelector để truy xuất state từ Redux
import { fetchUser } from "../stores/redux/slices/userSlice"; // Giả sử bạn đã có slice cho user
import { useLoading, useUser } from "../utils/customHook";
import Cookies from "js-cookie";
function GuestMiddleware() {
  const dispatch = useDispatch();
  const user = useUser();
  const loading = useLoading();
  console.log(user);
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, user]);
  if (loading) {
    return (
      <div
        style={{ zIndex: 9999, marginTop: "-50px" }}
        className="flex items-center justify-center h-screen w-screen"
      >
        <div className="flex flex-row gap-3 items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default GuestMiddleware;
