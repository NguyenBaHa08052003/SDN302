import React from "react";

const PropertyList = () => {
  const properties = [
    {
      type: "Nguyên căn",
      title: "Nhà 2 mặt tiền, 124m2, 3 phòng ngủ, 1 phòng khách, 1 phòng bếp Phước Hiệp, Củ Chi",
      price: "4.5 triệu 124 m²",
      location: "Phước Hiệp, Củ Chi, Hồ Chí Minh",
      date: "Đăng 1 tuần trước",
      image: "https://storage.googleapis.com/a1aa/image/1FOg3w1O58BRQMuzwcHIxIAGKLx0TdX_PSQr0tqA5LM.jpg",
      tagColor: "bg-red-500",
    },
    {
      type: "Phòng trọ",
      title: "Phòng trọ Bùi Đình Tuý - Hẻm Rộng - Giờ Giấc Tự Do - An Ninh - Yên Tĩnh",
      price: "4 triệu 18 m²",
      location: "Bùi Đình Tuý, Phường 12, Bình Thạnh, Hồ Chí Minh",
      date: "Đăng hôm nay",
      image: "https://storage.googleapis.com/a1aa/image/F-E-ZM5Y3TsJQszjlGawZOW_r2OF-9oraYLIyZPyG0o.jpg",
      tagColor: "bg-yellow-500",
    },
    {
        type: "Nguyên căn",
        title: "Nhà 2 mặt tiền, 124m2, 3 phòng ngủ, 1 phòng khách, 1 phòng bếp Phước Hiệp, Củ Chi",
        price: "4.5 triệu 124 m²",
        location: "Phước Hiệp, Củ Chi, Hồ Chí Minh",
        date: "Đăng 1 tuần trước",
        image: "https://storage.googleapis.com/a1aa/image/1FOg3w1O58BRQMuzwcHIxIAGKLx0TdX_PSQr0tqA5LM.jpg",
        tagColor: "bg-red-500",
      },
      {
        type: "Phòng trọ",
        title: "Phòng trọ Bùi Đình Tuý - Hẻm Rộng - Giờ Giấc Tự Do - An Ninh - Yên Tĩnh",
        price: "4 triệu 18 m²",
        location: "Bùi Đình Tuý, Phường 12, Bình Thạnh, Hồ Chí Minh",
        date: "Đăng hôm nay",
        image: "https://storage.googleapis.com/a1aa/image/F-E-ZM5Y3TsJQszjlGawZOW_r2OF-9oraYLIyZPyG0o.jpg",
        tagColor: "bg-yellow-500",
      },
    
  ];

  return (
    <div className="w-3/4">
      <h1 className="text-2xl font-bold mb-4">Danh sách nhà trọ yêu thích</h1>
      {properties.map((property, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 flex">
          <img alt="House" className="w-1/3 rounded-lg" src={property.image} />
          <div className="ml-4 w-2/3">
            <div className="flex items-center mb-2">
              <span className={`${property.tagColor} text-white px-2 py-1 rounded`}>{property.type}</span>
            </div>
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-red-500 font-semibold">{property.price}</p>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-gray-500">{property.date}</p>
          </div>
          <div className="ml-auto">
            <button className="text-red-500">
              <i className="fas fa-heart"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Sidebar = () => (
  <div className="w-1/4 ml-4">
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Loại bất động sản</h2>
      <ul className="space-y-2">
        {["Phòng trọ", "Nguyên căn", "Căn hộ", "Mặt bằng", "Tìm người ở ghép"].map((type) => (
          <li key={type}>
            <a className="text-gray-700 hover:text-red-500" href="#">
              {type}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Khu vực</h2>
      <ul className="space-y-2">
        {["Bắc Kạn", "An Giang", "Bạc Liêu", "Bắc Giang", "Hà Giang", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Điện Biên", "Lai Châu", "Sơn La", "Yên Bái", "Hoà Bình", "Thái Nguyên", "Lạng Sơn"].map((area) => (
          <li key={area}>
            <a className="text-gray-700 hover:text-red-500" href="#">
              {area}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const WishList = () => (
  <div className="bg-gray-100 min-h-screen">
    <main className="container mx-auto px-4 py-6 flex">
      <PropertyList />
      <Sidebar />
    </main>
  </div>
);

export default WishList;
