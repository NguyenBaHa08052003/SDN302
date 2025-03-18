import React from "react";

const memberRanks = [
  {
    rank: "Đồng",
    color: "bg-yellow-200 text-yellow-800",
    benefits: [
      "Giảm 5% trên mỗi đơn hàng",
      "Ưu tiên tham gia sự kiện thường niên",
      "Tích điểm đổi quà"
    ],
    note: "Điều kiện: Tổng chi tiêu từ 1 triệu đồng.",
  },
  {
    rank: "Bạc",
    color: "bg-gray-300 text-gray-800",
    benefits: [
      "Giảm 10% trên mỗi đơn hàng",
      "Ưu tiên hỗ trợ khách hàng",
      "Miễn phí vận chuyển toàn quốc",
      "Tích điểm đổi quà giá trị hơn"
    ],
    note: "Điều kiện: Tổng chi tiêu từ 5 triệu đồng.",
  },
  {
    rank: "Vàng",
    color: "bg-yellow-400 text-yellow-900",
    benefits: [
      "Giảm 15% trên mỗi đơn hàng",
      "Tặng quà sinh nhật giá trị",
      "Miễn phí vận chuyển và ưu tiên xử lý đơn",
      "Tham gia sự kiện VIP",
      "Tích điểm đổi quà cao cấp"
    ],
    note: "Điều kiện: Tổng chi tiêu từ 10 triệu đồng.",
  },
];

const MemberCard = () => {
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
                <h2 className="text-xl font-bold mb-4">Ưu đãi:</h2>
                <ul className="text-gray-600 mb-6">
                  {card.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center mb-2">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
