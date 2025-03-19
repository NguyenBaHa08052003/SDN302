import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../utils/customHook";
import { toast } from "react-toastify";
import authService from "../../services/authService/auth.service";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/redux/slices/userSlice";
import authTokenControl from "../../utils/authToken";
import { Dropdown, Menu, Button } from "antd";
import { UserOutlined, LogoutOutlined, PlusCircleOutlined } from "@ant-design/icons";

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
    toast.success("Đang tải dữ liệu");
    setTimeout(() => {
      navigate("/quan-ly/tai-khoan", { state: { data: user } });
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      // Gọi API logout
      await authService.logout();
      sessionStorage.clear();
      authTokenControl.removeToken();
      dispatch(logout());
      toast.info("Bạn đã đăng xuất thành công!");
      navigate("/");
    } catch (error) {
      console.error("Logout error: ", error);
      toast.error("Có lỗi khi đăng xuất!");
    }
  };

  // Menu Dropdown
  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={handleProfile} icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      {user?.data?.role === "Landlord" && (
        <Menu.Item key="post" icon={<PlusCircleOutlined />}>
          <Link to="/quan-ly/dang-tin">Đăng tin</Link>
        </Menu.Item>
      )}
      <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <nav className="flex items-center p-4 bg-white border-b border-gray-200">
        <Link to={"/"}>
          <img
            src="https://storage.googleapis.com/a1aa/image/TG6zox_QG2zNfmvJ0esdOmJp3_ttxAP0RUHhtPl4E4s.jpg"
            alt="Phongtro.vn logo"
            className="h-8 w-24 mr-5"
          />
        </Link>

        {user?.data?.role !== "Admin" && (
          <>
            <Link to={"/loging/room-rental"} className="text-black mr-5 text-sm font-bold">
              Phòng trọ
            </Link>
            <Link to={"/loging/nguyen-can"} className="text-black mr-5 text-sm font-bold">
              Nguyên căn
            </Link>
            {/* <a href="#" className="text-black mr-5 text-sm font-bold">
              Căn hộ
            </a>
            <a href="#" className="text-black mr-5 text-sm font-bold">
              Mặt bằng
            </a>
            <a href="#" className="text-black mr-5 text-sm font-bold">
              Tìm người ở ghép
            </a>
            <a href="#" className="text-black mr-5 text-sm font-bold">
              Tin tức
            </a> */}
          </>
        )}

        <div className="ml-auto flex items-center">
          {user?.data?.role !== "Admin" && (
            <Link to={'/yeu-thich'}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 mr-2"
            >
              <i className="far fa-heart mr-1"></i> Yêu thích
            </Link>
          )}

          {/* Hiển thị đăng nhập / đăng ký nếu chưa đăng nhập */}
          {!user?.success && (
            <>
              <Link
                to={"/dang-nhap"}
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Đăng nhập
              </Link>
              <Link
                to={"/register"}
                className="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              >
                Đăng ký
              </Link>
            </>
          )}

          {/* Dropdown menu khi đã đăng nhập */}
          {user?.success && (
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="primary" shape="round" icon={<UserOutlined />}>
                Tài khoản
              </Button>
            </Dropdown>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
