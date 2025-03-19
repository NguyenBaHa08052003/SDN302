import React, { useState } from "react";
import axios from "axios";

const memberRanks = [
  {
    rank: "Bạc",
    price: 50000, // Giá 50.000 VND
    color: "bg-gray-300 text-gray-800",
    benefits: [
      "Được đưa lên danh sách tìm kiếm Bạc",
      "Ưu tiên đứng trước",
      "Giá cả hợp lý",
      "Tham gia sự kiện VIP",
    ],
  },
  {
    rank: "Vàng",
    price: 150000, // Giá 150.000 VND
    color: "bg-yellow-400 text-yellow-900",
    benefits: [
      "Gói siêu cấp vip pro",
      "Đưa lên trang nhất",
      "Ưu thế tìm kiếm",
      "Tham gia sự kiện VIP",
    ],
  },
];

const CartPayment = () => {
  const [loadingState, setLoadingState] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async (method, index) => {
    setLoadingState((prev) => ({ ...prev, [index]: true }));
    setPaymentStatus(null);
  
    const selectedRank = memberRanks[index];
    let userId = sessionStorage.getItem("UserId");
  
    console.log("🔍 userId từ sessionStorage:", userId, typeof userId); // Kiểm tra kiểu dữ liệu
  
    if (!userId) {
      setPaymentStatus("Lỗi: Không tìm thấy userId.");
      setLoadingState((prev) => ({ ...prev, [index]: false }));
      return;
    }
  
    // 🔥 Chắc chắn gửi lên API dưới dạng string
    userId = String(userId); 
  
    try {
      const response = await axios.post(`http://localhost:3000/api/${method}/payment`, {
        user_id: userId, // ⚠️ Đảm bảo `user_id` là string
        amount: selectedRank.price,
        description: `Đăng ký ${selectedRank.rank} - ${selectedRank.price} VND`,
        method: method,
        rank: selectedRank.rank,
      });
  
      console.log("✅ API Response:", response.data);
  
      if (response.data.order_url) {
        window.location.href = response.data.order_url;
      }
      if (response.data.payUrl) {
        window.location.href = response.data.payUrl;
      }
    } catch (error) {
      console.error("❌ Payment Error:", error.response?.data || error);
      setPaymentStatus("Lỗi khi xử lý thanh toán.");
    } finally {
      setLoadingState((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-roboto">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-center text-2xl font-bold mb-4">Thẻ Thành Viên</h1>
        <p className="text-center text-gray-600 mb-6">
          Nâng hạng thẻ - nhận nhiều ưu đãi đặc quyền!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memberRanks.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full"
            >
              <div>
                <span
                  className={`font-medium py-1 px-4 rounded-full mb-4 inline-block ${card.color}`}
                >
                  {card.rank}
                </span>
                <h2 className="text-xl font-bold mb-2">
                  Giá: {card.price.toLocaleString()} VND
                </h2>
                <h3 className="text-lg font-semibold mb-4">Đặc quyền:</h3>
                <ul className="text-gray-600 mb-6">
                  {card.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  className="bg-black text-white font-bold py-2 px-4 rounded-full w-full hover:bg-gray-800 transition"
                  onClick={() => handlePayment("zalo", index)}
                  disabled={loadingState[index]}
                >
                  {loadingState[index] ? "Đang xử lý..." : "NÂNG HẠNG NGAY"}
                </button>
                {paymentStatus && (
                  <p className="text-red-500 mt-2">{paymentStatus}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPayment;
