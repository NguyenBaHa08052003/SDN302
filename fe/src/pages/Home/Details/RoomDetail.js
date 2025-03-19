import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "antd";
import withAuth from "../../../stores/hoc/withAuth";
import { formatDate } from "../../../utils/convert";
const properties = [
  {
    img: "j4nI71HkO0g7aKNw2PLq-1y1QbPQ6i4vTIWwAWpFKXw.jpg",
    price: "3.2 triệu",
    size: "20 m²",
    title: "Chính chủ cần cho thuê Phòng tiện nghi- Giá 3.200.000",
    type: "Phòng trọ",
    area: "Hồ Chí Minh",
  },
  {
    img: "KOqr08Ns10KS_TwTOYquPmNH89M3j_nU5uGEMmTjKS4.jpg",
    price: "3.5 triệu",
    size: "20 m²",
    title: "PHÒNG TRỌ 20M2 MỘT TRỆT MỘT LẦU GIÁ RẺ",
    type: "Phòng trọ",
    area: "Bắc Kạn",
  },
  {
    img: "gWWG5S-fWgquRmu5EojbqZehvNQ6EMD1fmrGlKJbQ80.jpg",
    price: "600,000 đ",
    size: "18 m²",
    title: "Phòng ban công, full nội thất giá rẻ đường Nguyễn Xí, bình...",
    type: "Phòng trọ",
    area: "An Giang",
  },
];

const RoomDetail = () => {
  const location = useLocation();
  const listing = location.state || {};
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(listing);

  // State cho bộ lọc
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("Phòng trọ");
  const [areaFilter, setAreaFilter] = useState("");
  // Danh sách dữ liệu mẫu (có thể thay bằng dữ liệu từ API)
  // Hàm lọc dữ liệu
  const filteredProperties = properties.filter((property) => {
    const matchesType = propertyTypeFilter
      ? property.type === propertyTypeFilter
      : true;
    const matchesArea = areaFilter ? property.area === areaFilter : true;
    return matchesType && matchesArea;
  });

  // const setupRecaptcha = () => {
  //   window.r
  // }

  // Danh sách loại bất động sản và khu vực
  const propertyTypes = [
    "Phòng trọ",
    "Nguyên căn",
    "Căn hộ",
    "Mặt bằng",
    "Tìm người ở ghép",
  ];
  const areas = ["Hồ Chí Minh", "Bắc Kạn", "An Giang", "Bạc Liêu"];
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto mt-8 px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column */}
          <div className="lg:w-9/12">
            {/* Property Card */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="relative">
                <Carousel
                  autoplay
                  dots
                  draggable // Cho phép kéo bằng chuột
                  swipeToSlide // Cho phép vuốt trượt trên thiết bị cảm ứng
                  className="rounded-lg overflow-hidden"
                >
                  {listing.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`House ${index}`}
                        className="h-64 w-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </Carousel>
                <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded">
                  {listing?.type?.name}
                </span>
              </div>
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {listing?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Room image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-bold">{listing.title}</h1>
                <p className="text-gray-600 mt-2">{listing.address}</p>
              </div>
            </div>
            {/* Modal hiển thị ảnh lớn */}
            {selectedImage && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-full max-h-[90vh] rounded-lg"
                />
              </div>
            )}
            {/* Property Details */}
            <div className="bg-white shadow rounded-lg p-4 mt-6">
              <div className="flex space-x-4">
                <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <p className="text-red-500 text-xl font-bold">
                    {listing.price.toLocaleString()} VND
                  </p>
                </div>
                <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <p className="text-gray-600">{listing.area} m²</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-4">Thông tin mô tả</h3>
              <p className="text-gray-700 mt-2">{listing.description}</p>
              <div className="flex space-x-4 mt-4">
                <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                  <p className="text-gray-600">Ngày đăng</p>
                  <p className="text-gray-800 font-semibold">
                    {formatDate(listing.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Related Properties */}
            <div className="bg-white shadow rounded-lg p-4 mt-6">
              <h2 className="text-xl font-bold">
                {listing?.type?.name} dành cho bạn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {filteredProperties.map((property, index) => (
                  <div key={index} className="bg-white shadow rounded-lg p-4">
                    <div className="relative">
                      <img
                        src={`https://storage.googleapis.com/a1aa/image/${property.img}`}
                        alt="Property"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded">
                        {property.type}
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-red-500 text-xl font-bold">
                        {property.price}
                      </p>
                      <p className="text-gray-600">{property.size}</p>
                      <p className="text-gray-700 mt-2">{property.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-3/12 lg:ml-4 mt-4 lg:mt-0 sticky">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  src="https://storage.googleapis.com/a1aa/image/nDRhOb1CpJUj-rl30bpCZE64V0eQCU8UKoH9EpiQR5U.jpg"
                  alt="User avatar"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="text-gray-700 font-semibold">
                    {listing?.user?.fullname}
                  </p>
                  <a
                    href={`https://zalo.me/${listing?.user.phoneNumber}`}
                    className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
                  >
                    Chat qua Zalo
                  </a>
                </div>
              </div>
              <button
                className="bg-green-500 text-white w-full py-2 rounded mt-4"
                onClick={() =>
                  (window.location.href = `tel:${listing?.user?.phoneNumber}`)
                }
              >
                {listing?.user?.phoneNumber}
              </button>
              <button
                className="bg-gray-200 text-gray-700 w-full py-2 rounded mt-2"
                onClick={() => {
                  console.log(listing?.user?.email);
                  const email = listing?.user?.email || "";
                  const subject = encodeURIComponent(
                    "Liên hệ từ website Phòng Trọ VIP Hải đẹp trai"
                  );
                  const body = encodeURIComponent(
                    `Xin chào,\n\nTôi đang quan tâm đến ${listing?.title}`
                  );
                  window.open(
                    `https://mail.google.com/mail/?view=cm&to=${email}&su=${subject}&body=${body}`,
                    "_blank"
                  );
                }}
              >
                Gửi mail
              </button>
            </div>
            {/* Property Types Filter */}
            <div className="bg-white shadow rounded-lg p-4 mt-4 sticky top-12">
              <h2 className="text-xl font-bold">Loại bất động sản</h2>
              <ul className="mt-4 space-y-2">
                {propertyTypes.map((item, index) => (
                  <li
                    key={index}
                    className={`text-gray-700 cursor-pointer ${
                      propertyTypeFilter === item
                        ? "font-bold text-blue-500"
                        : ""
                    }`}
                    onClick={() => setPropertyTypeFilter(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <h2 className="text-xl font-bold">Khu vực</h2>
              <ul className="mt-4 space-y-2">
                {areas.map((item, index) => (
                  <li
                    key={index}
                    className={`text-gray-700 cursor-pointer ${
                      areaFilter === item ? "font-bold text-blue-500" : ""
                    }`}
                    onClick={() => setAreaFilter(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default withAuth(RoomDetail);
