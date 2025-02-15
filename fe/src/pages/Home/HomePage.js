import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useError, useLoading, useUser } from "../../utils/customHook";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Cookies from "js-cookie";
import { logout } from "../../stores/redux/slices/userSlice";
import authService from "../../services/authService/auth.service";
import withAuth from "../../stores/hoc/withAuth";
import LodgingPage from "./LodgingPage";
function HomePage() {
  const navigate = useNavigate();
  const user = useUser();
  const error = useError();
  const loading = useLoading();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!Cookies.get("authToken") && ((error?.success && error?.message !== "Bạn không có quyền truy cập") || !error)){
      toast('🦄Chào mừng bạn trở lại với Countless New Rooms!. Hãy đăng nhập để có trải nghiệm tốt nhất nhé', {
        position: "bottom-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        return;
    };
    if(!user && user?.success){
      Cookies.remove("authToken");
      toast.error("Hệ thống không nhận diện được tài khoản của bạn!. Mọi quá trình thao tác của bạn đã được ghi lại. Vui lòng đăng nhập để sử dụng hệ thống.", 
        {
          autoClose: 5500,
        }
      );
      return;
    }
    if(user?.success && Cookies.get("authToken")){
      toast.success(`🦄 ${user?.message} - ${(user?.data.name).toUpperCase()}`);
    }
  }, [dispatch]);

  // Xử lý profile
  const handleProfile = () => {
    if (!user?.success) {
      toast.error("Bạn không có quyền truy cập");
      return;
    }
    toast.success(`Đang tải dữ liệu`);
    setTimeout(() => {
      navigate("/tai-khoan", { state: { data: user } });
    }, 1000);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    authService.logout();
    setTimeout(() => {
      dispatch(logout());
    }, 500); 
    toast.success("Logged out successfully!");
  };

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
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Home page
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg
              className="mr-1.5 size-5 shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z"
                clipRule="evenodd"
              />
              <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
            </svg>
            Full-time
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg
              className="mr-1.5 size-5 shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg
              className="mr-1.5 size-5 shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152Z" />
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z"
                clipRule="evenodd"
              />
            </svg>
            $120k &ndash; $140k
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg
              className="mr-1.5 size-5 shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                fillRule="evenodd"
                d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                clipRule="evenodd"
              />
            </svg>
            Closing on January 9, 2020
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {!user?.success && (
          <>
            <span className="hidden sm:block">
              <Link
                to={"/dang-nhap"}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                <svg
                  className="mr-1.5 -ml-0.5 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path d="M10 3a7 7 0 1 1-7 7 7 7 0 0 1 7-7ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm3-7a4 4 0 1 0-4 4 4 4 0 0 0 4-4ZM3 9h10l2 2-2 2H3l-2-2 2-2Zm11 7v4h-3v-4h3Z" />
                </svg>
                Đăng nhập
              </Link>
            </span>

            <span className="ml-3 hidden sm:block">
              <Link
                to={"/register"}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                <svg
                  className="mr-1.5 -ml-0.5 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path d="M5 2a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2-7a4 4 0 1 0-4 4 4 4 0 0 0 4-4ZM3 9h10l2 2-2 2H3l-2-2 2-2Zm11 7v4h-3v-4h3Z" />
                </svg>
                Đăng ký
              </Link>
            </span>
          </>
        )}

        {user?.success && (
          <>
            <span className="ml-3 hidden sm:block">
              <button
                onClick={handleLogout}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                <svg
                  className="mr-1.5 -ml-0.5 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path d="M5 2a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm5 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2-7a4 4 0 1 0-4 4 4 4 0 0 0 4-4ZM3 9h10l2 2-2 2H3l-2-2 2-2Zm11 7v4h-3v-4h3Z" />
                </svg>
                Đăng xuất
              </button>
            </span>
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleProfile}
              >
                Profile
              </button>
            </span>
          </>
        )}
      </div>
        <LodgingPage/>
    </div>
  );
}
export default withAuth(HomePage);