import React, { useState } from "react";
import { FaTasks, FaWallet, FaTachometerAlt } from "react-icons/fa";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-lg p-4">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
          D
        </div>
        <div className="ml-4">
          <div className="font-semibold text-lg">Dương Trần Thị Minh</div>
          <div className="text-gray-500 text-sm">Tài khoản thường</div>
        </div>
      </div>
      <button className="w-full bg-red-500 text-white py-2 rounded-lg mb-2">Tạo tin</button>
      <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg mb-4">Nạp tiền</button>
      <div className="space-y-2">
        <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg" onClick={() => setActivePage("dashboard")}>
          <FaTachometerAlt className="mr-2" /> Dashboard
        </button>
        <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg" onClick={() => setActivePage("posts")}>
          <FaTasks className="mr-2" /> Quản lý bài đăng
        </button>
        <button className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-lg" onClick={() => setActivePage("finance")}>
          <FaWallet className="mr-2" /> Quản lý tài chính
        </button>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded shadow text-center">
      <h3 className="text-gray-500 text-lg mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

const DashboardContent = () => {
  const stats = [
    { title: "Tổng số nhà trọ", value: "25" },
    { title: "Đặt chỗ đang chờ", value: "8" },
    { title: "Đăng tin", value: "12" },
    { title: "Doanh thu tháng", value: "150,000,000 VNĐ" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chào mừng đến với Trọ</h1>
      <p>Quản lý hệ thống thuê nhà trọ của bạn</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

const PostsContent = () => {
  return <h1 className="text-2xl font-bold mb-4">Danh sách bài đăng</h1>;
};

const FinanceContent = () => {
  return <h1 className="text-2xl font-bold mb-4">Quản lý tài chính</h1>;
};

// Danh sách nhà trọ
const listings = [
  { id: "#001", name: "Nhà trọ Bình An", location: "Quận 7, TP.HCM", price: "3,500,000 VNĐ", status: "Còn trống" },
  { id: "#002", name: "Nhà trọ Hoa Sen", location: "Quận 1, TP.HCM", price: "5,000,000 VNĐ", status: "Đã thuê" },
  { id: "#003", name: "Nhà trọ Thanh Xuân", location: "Bình Thạnh, TP.HCM", price: "4,200,000 VNĐ", status: "Còn trống" },
];

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setActivePage={setActivePage} />
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg">
        {activePage === "dashboard" && (
          <>
            <DashboardContent />
            {/* Bảng danh sách nhà trọ */}
            <div className="bg-white p-6 rounded shadow mt-6">
              <h2 className="text-xl font-bold mb-4">Danh sách nhà trọ gần đây</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3 text-left border border-gray-300">ID</th>
                    <th className="p-3 text-left border border-gray-300">Tên nhà trọ</th>
                    <th className="p-3 text-left border border-gray-300">Địa chỉ</th>
                    <th className="p-3 text-left border border-gray-300">Giá</th>
                    <th className="p-3 text-left border border-gray-300">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing) => (
                    <tr key={listing.id} className="border-b">
                      <td className="p-3 border border-gray-300">{listing.id}</td>
                      <td className="p-3 border border-gray-300">{listing.name}</td>
                      <td className="p-3 border border-gray-300">{listing.location}</td>
                      <td className="p-3 border border-gray-300">{listing.price}</td>
                      <td className="p-3 border border-gray-300">{listing.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {activePage === "posts" && <PostsContent />}
        {activePage === "finance" && <FinanceContent />}
      </div>
    </div>
  );
};

export default Dashboard;
