import {
  UserOutlined,
  FileTextOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  DownOutlined,
  RightOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useUser } from "../../utils/customHook";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Sidebarr = () => {
  const userCurren = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const lastSegment = location?.pathname?.split("/")?.pop() || "";
  const userRole = userCurren?.data?.role;

  // Trạng thái mở của từng dropdown
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Danh sách menu
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const baseMenuItems = [
      {
        icon: <UserOutlined className="mr-3" />,
        text: "Thông tin cá nhân",
        path: "/quan-ly/tai-khoan",
      },
      { icon: <RightOutlined className="mr-3" />, text: "Đổi mật khẩu", path: "/doi-mat-khau" },
      {
        icon: <FileTextOutlined className="mr-3" />,
        text: "Quản lý bài đăng",
        isDropdown: true,
        children: [
          {
            icon: <PlusOutlined className="mr-3" />,
            text: "Đăng tin",
            path: "/quan-ly/dang-tin",
          },
          {
            icon: <UnorderedListOutlined className="mr-3" />,
            text: "Danh sách",
            path: "/quan-ly/danh-sach",
          },
          {
            icon: <BarChartOutlined className="mr-3" />,
            text: "Phân tích",
            path: "/quan-ly/phan-tich",
          },
        ],
      },
    ];
    setMenuItems(baseMenuItems);
  }, [userCurren]);

  // Điều hướng có kiểm tra quyền
  const handleNavigation = (path) => {
    if (userRole !== "Landlord" && path !== "/quan-ly/tai-khoan") {
      const toastId = "custom-toast";
if (!toast.isActive(toastId)) {
  toast.error(
    <div>
      <p>Bạn cần đăng ký trở thành <span style={{ color: "blue" , fontWeight: "bold"}}>chủ trọ</span> để sử dụng chức năng này?</p>
      <div className="flex justify-end mt-2">
        <button
          onClick={() => {
            toast.dismiss(toastId);
            navigate("/quan-ly/nap-tien");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600 "
        >
          OK
        </button>
        <button
          onClick={() => toast.dismiss(toastId)}
          className="bg-gray-300 px-3 py-1 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      toastId,
      position: "top-right", 
    }
  );
}
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-5">
      <ToastContainer />
      <div className="flex flex-col items-center">
        <img
          className="w-12 h-12 rounded-full"
          src={userCurren?.data?.image || "https://example.com/default-avatar.jpg"}
          alt="Profile"
        />
        <h2 className="text-lg font-semibold mt-2">{userCurren?.data?.name}</h2>
        <p className="text-sm text-gray-500" style={{ color: "red" }}>
          Tài khoản {userCurren?.data?.role}
        </p>
      </div>

      <div className="mt-5">
        <button className="w-full bg-red-500 text-white py-2 rounded-lg mb-2">
          Tạo tin
        </button>
        <button onClick={() => {
            navigate("/quan-ly/nap-tien");
          }} className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg mb-4">
          Nạp tiền
        </button>
      </div>

      <div className="mt-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-1">
            <div
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md"
              onClick={() =>
                item.isDropdown ? toggleDropdown(index) : handleNavigation(item.path)
              }
            >
              {item.icon}
              <span
                className={`ml-2 ${lastSegment === item.path?.split("/").pop() ? "text-red-500" : "text-black"}`}
              >
                {item.text}
              </span>
              {item.isDropdown && (
                <span className="ml-auto">
                  {openDropdowns[index] ? <DownOutlined /> : <RightOutlined />}
                </span>
              )}
            </div>

            {item.isDropdown && openDropdowns[index] && (
              <div className="ml-5">
                {item.children.map((child, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                    onClick={() => handleNavigation(child.path)}
                  >
                    {child.icon}
                    <span
                      className={`ml-2 ${
                        lastSegment === child.path?.split("/").pop() ? "text-red-500" : "text-black"
                      }`}
                    >
                      {child.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebarr;
