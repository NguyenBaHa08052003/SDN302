import { useState } from "react";
import { FaInfoCircle, FaTasks, FaWallet, FaChevronDown } from "react-icons/fa";

const Dashboard = () => {
  const [showManagePosts, setShowManagePosts] = useState(false);
  const [showFinance, setShowFinance] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  const posts = [
    { id: 1, title: "Phòng trọ 20m2, gần trường ĐH X", date: "2025-03-11", author: "Nguyễn Văn A", type: "Phòng trọ" },
    { id: 2, title: "Căn hộ mini đầy đủ tiện nghi", date: "2025-03-10", author: "Trần Thị B", type: "Căn hộ mini" },
    { id: 3, title: "Nhà nguyên căn cho thuê giá rẻ", date: "2025-03-09", author: "Lê Văn C", type: "Nhà nguyên căn" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
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
          <MenuItem icon={<FaInfoCircle />} text="Thông tin" />
          
          {/* Quản lý bài đăng Dropdown */}
          <DropdownItem
            icon={<FaTasks />}
            text="Quản lý bài đăng"
            showDropdown={showManagePosts}
            setShowDropdown={setShowManagePosts}
            items={["Đăng tin", <li key="danh-sach" className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg" onClick={() => setShowPosts(!showPosts)}>Danh sách</li>]}
          />
          
          {/* Quản lý tài chính Dropdown */}
          <DropdownItem
            icon={<FaWallet />}
            text="Quản lý tài chính"
            showDropdown={showFinance}
            setShowDropdown={setShowFinance}
            items={["Thông tin số dư", "Nạp tiền vào tài khoản"]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {showPosts && (
          <>
            <h1 className="text-2xl font-bold mb-4">Danh sách bài đăng</h1>
            <table className="w-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border-b">Tên bài đăng</th>
                  <th className="p-2 border-b">Ngày đăng</th>
                  <th className="p-2 border-b">Người đăng</th>
                  <th className="p-2 border-b">Loại trọ</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{post.title}</td>
                    <td className="p-2">{post.date}</td>
                    <td className="p-2">{post.author}</td>
                    <td className="p-2">{post.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text }) => (
  <div className="flex items-center text-gray-700">
    {icon}
    <span className="ml-2">{text}</span>
  </div>
);

const DropdownItem = ({ icon, text, showDropdown, setShowDropdown, items }) => (
  <div>
    <div 
      className={`flex items-center p-2 rounded-lg cursor-pointer justify-between ${showDropdown ? "text-red-500 bg-red-100" : "text-gray-700"}`} 
      onClick={() => setShowDropdown(!showDropdown)}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-2">{text}</span>
      </div>
      <FaChevronDown className={`transition-transform ${showDropdown ? "rotate-180" : "rotate-0"}`} />
    </div>
    {showDropdown && (
      <ul className="ml-4 bg-white shadow-lg rounded-lg mt-2 p-2">
        {items.map((item, index) => (
          typeof item === "string" ? (
            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer rounded-lg">{item}</li>
          ) : (
            item
          )
        ))}
      </ul>
    )}
  </div>
);

export default Dashboard;
