import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/customHook";
import { toast } from "react-toastify";
import authService from "../../services/authService/auth.service";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/redux/slices/userSlice";
import authTokenControl from "../../utils/authToken";

const Header = () => {
  const user = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    sessionStorage.removeItem("welcomeToast");
    authTokenControl.removeToken();
    setTimeout(() => {
      dispatch(logout());
    }, 500);
    toast.info("Bạn đã đăng xuất thành công!");
    window.location.reload();
  };
  return (
    <div>
      <nav className="flex items-center p-4 bg-white border-b border-gray-200">
        <Link to={'/'}> <img
          src="https://storage.googleapis.com/a1aa/image/TG6zox_QG2zNfmvJ0esdOmJp3_ttxAP0RUHhtPl4E4s.jpg"
          alt="Phongtro.vn logo"
          className="h-8 w-24 mr-5"
        /></Link>
        {user?.data?.role !== 'Admin' && (
          <>
            <Link to={'/loging/room-rental'} className="text-black mr-5 text-sm font-bold">Phòng trọ</Link>
            <a href="#" className="text-black mr-5 text-sm font-bold">Nguyên căn</a>
            <a href="#" className="text-black mr-5 text-sm font-bold">Căn hộ</a>
            <a href="#" className="text-black mr-5 text-sm font-bold">Mặt bằng</a>
            <a href="#" className="text-black mr-5 text-sm font-bold">Tìm người ở ghép</a>
            <a href="#" className="text-black mr-5 text-sm font-bold">Tin tức</a>
          </>
        )}
        <div className="ml-auto flex items-center">
          {user?.data?.role !== 'Admin' && (
            <a className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 mr-2"
            >
              <i className="far fa-heart mr-1"></i> Yêu thích
            </a>
          )}
          {/* Test login success => Day la gốc !user?.success */}
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

          {/* Test login success => Day la gốc user?.success */}
          <div className="mt-5 flex lg:mt-0">
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
                {user?.data?.role !== "Admin" && (
                  <span className="sm:ml-3">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleProfile}
                    >
                      Profile
                    </button>
                  </span>
                )}
              </>
            )}
          </div>
          {user?.data?.role !== "Admin" && (
            <Link to={"/dang-bai"} className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-red-500 ml-2"
            >Đăng tin
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
