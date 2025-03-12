import { UserOutlined, FileTextOutlined, PlusOutlined, UnorderedListOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useUser } from "../../utils/customHook";
import { Link } from "react-router-dom";

const Sidebarr = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const userCurren = useUser()

    const menuItems = [
        { icon: <UserOutlined className="mr-3" />, text: "Thông tin cá nhân" },
        {
            icon: <FileTextOutlined className="mr-3" />,
            text: "Quản lý bài đăng",
            isDropdown: true,
            children: [
                { icon: <PlusOutlined className="mr-3" />, text: "Đăng tin" },
                { icon: <UnorderedListOutlined className="mr-3" />, text: "Danh sách" },
            ],
        },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-5">
            <img
                className="w-12 h-12 rounded-full"
                src={userCurren?.data.image ? userCurren?.data.image : "https://storage.googleapis.com/a1aa/image/y85mz9wkfMBFqMTHT1zIVrYagfQfyyxDvCS5QcQo7iM.jpg"}
                alt="Profile"
            />
            <h2 className="text-lg font-semibold mt-2">Hà Nguyễn Bá</h2>
            <p className="text-sm text-gray-500">Tài khoản thường</p>

            <div className="mt-4">
                {menuItems.map((item, index) => (
                    <div key={index} className="mb-1">
                        <div
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                            onClick={() => {
                                if (item.isDropdown) setOpenDropdown(!openDropdown);
                            }}
                        >
                            {item.icon}
                            {item.text === "Thông tin cá nhân" ? <Link to={`/quan-ly/tai-khoan`}>{item.text}</Link> : `${item.text}`}
                            {item.isDropdown && (
                                <span className="ml-auto">
                                    {openDropdown ? <DownOutlined /> : <RightOutlined />}
                                </span>
                            )}
                        </div>

                        {/* Hiển thị dropdown nếu item có children */}
                        {item.isDropdown && openDropdown && (
                            <div className="ml-5">
                                {item.children.map((child, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                    >
                                        {child.icon}
                                        {child.text === "Đăng tin" ? <Link to={"/quan-ly/dang-tin"}>{child.text}</Link> : `${child.text}`}
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
