import React, { useState } from 'react';

const RoomDetail = () => {
    // State cho bộ lọc
    const [propertyTypeFilter, setPropertyTypeFilter] = useState('Phòng trọ');
    const [areaFilter, setAreaFilter] = useState('');

    // Danh sách dữ liệu mẫu (có thể thay bằng dữ liệu từ API)
    const properties = [
        {
            img: "j4nI71HkO0g7aKNw2PLq-1y1QbPQ6i4vTIWwAWpFKXw.jpg",
            price: "3.2 triệu",
            size: "20 m²",
            title: "Chính chủ cần cho thuê Phòng tiện nghi- Giá 3.200.000",
            type: "Phòng trọ",
            area: "Hồ Chí Minh"
        },
        {
            img: "KOqr08Ns10KS_TwTOYquPmNH89M3j_nU5uGEMmTjKS4.jpg",
            price: "3.5 triệu",
            size: "20 m²",
            title: "PHÒNG TRỌ 20M2 MỘT TRỆT MỘT LẦU GIÁ RẺ",
            type: "Phòng trọ",
            area: "Bắc Kạn"
        },
        {
            img: "gWWG5S-fWgquRmu5EojbqZehvNQ6EMD1fmrGlKJbQ80.jpg",
            price: "600,000 đ",
            size: "18 m²",
            title: "Phòng ban công, full nội thất giá rẻ đường Nguyễn Xí, bình...",
            type: "Phòng trọ",
            area: "An Giang"
        }
    ];

    // Hàm lọc dữ liệu
    const filteredProperties = properties.filter(property => {
        const matchesType = propertyTypeFilter ? property.type === propertyTypeFilter : true;
        const matchesArea = areaFilter ? property.area === areaFilter : true;
        return matchesType && matchesArea;
    });

    // Danh sách loại bất động sản và khu vực
    const propertyTypes = ["Phòng trọ", "Nguyên căn", "Căn hộ", "Mặt bằng", "Tìm người ở ghép"];
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
                                <img
                                    src="https://storage.googleapis.com/a1aa/image/j4nI71HkO0g7aKNw2PLq-1y1QbPQ6i4vTIWwAWpFKXw.jpg"
                                    alt="House with red gate"
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded">
                                    Phòng trọ
                                </span>
                            </div>
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold">
                                    Chính chủ cần cho thuê Phòng tiện nghi- Giá 3.200.000
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Huỳnh Văn Bánh, Phường 13, Phú Nhuận, Hồ Chí Minh
                                </p>
                                <div className="flex space-x-2 mt-4 overflow-x-auto">
                                    {[
                                        "0z4KyKhoDg6F_DFkBGinNlI-veHfxlyAPtVb1wxivUo.jpg",
                                        "XJ9ozaNaPO_K8DKwsrk5nWs1bnRO7Rum5pmTIApmjuU.jpg",
                                        "rb8qxe6X9lcKU-gsEnwZS50QEzQLuKNyqjmPuE_rJLY.jpg",
                                        "DeboJDYNySvSWiU1qRRKQSUvy0-obZVQ2TjKEvtmKN8.jpg",
                                        "e-HODBUBy4yyQIb_rGcvdNSGrRifQsSwyMF71SDld0E.jpg"
                                    ].map((img, index) => (
                                        <img
                                            key={index}
                                            src={`https://storage.googleapis.com/a1aa/image/${img}`}
                                            alt={`Room image ${index + 1}`}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="bg-white shadow rounded-lg p-4 mt-6">
                            <div className="flex space-x-4">
                                <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                                    <p className="text-red-500 text-xl font-bold">3.2 triệu</p>
                                </div>
                                <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                                    <p className="text-gray-600">20 m²</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-4">Thông tin mô tả</h3>
                            <p className="text-gray-700 mt-2">
                                Phòng đẹp tiện nghi- Nội thất lịch sự- Nơi để xe rộng rãi, giờ giấc tự do.
                            </p>
                            <p className="text-gray-700 mt-2">
                                Phòng thuê tốt- hướng nhà Đông- Nam
                            </p>
                            <p className="text-gray-700 mt-2">
                                Diện tích 20m2 bao gồm WC, không bếp, Internet free.
                            </p>
                            <p className="text-gray-700 mt-2">
                                Kết thích hợp cho Sinh viên, người đi làm kinh doanh & làm việc văn phòng...
                            </p>
                            <p className="text-gray-700 mt-2">
                                Khu vực an ninh- lịch sự- Nội thất thanh lịch- ít bị kẹt xe & không bị ngập nước vào mùa mưa. Giao thông
                                thuận tiện, gần chợ, Nhà Ga & Sân bay & trung tâm thể thao... Giáp Quận 3, Tân Bình.
                            </p>
                            <div className="flex space-x-4 mt-4">
                                {[
                                    { label: "Ngày đăng", value: "24/02/2025" },
                                    { label: "Ngày hết hạn", value: "11/03/2025" },
                                    { label: "Loại tin", value: "BẠC" },
                                    { label: "Mã tin", value: "152811" }
                                ].map((item, index) => (
                                    <div key={index} className="border border-gray-300 p-4 rounded-lg bg-white shadow-md">
                                        <p className="text-gray-600">{item.label}</p>
                                        <p className="text-gray-800 font-semibold">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Related Properties */}
                        <div className="bg-white shadow rounded-lg p-4 mt-6">
                            <h2 className="text-xl font-bold">Bất động sản dành cho bạn</h2>
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
                                            <p className="text-red-500 text-xl font-bold">{property.price}</p>
                                            <p className="text-gray-600">{property.size}</p>
                                            <p className="text-gray-700 mt-2">{property.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-3/12 lg:ml-4 mt-4 lg:mt-0">
                        <div className="bg-white shadow rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="https://storage.googleapis.com/a1aa/image/nDRhOb1CpJUj-rl30bpCZE64V0eQCU8UKoH9EpiQR5U.jpg"
                                    alt="User avatar"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <p className="text-gray-700 font-semibold">Thi Lan Thanh Le</p>
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
                                        Chat qua Zalo
                                    </button>
                                </div>
                            </div>
                            <button className="bg-green-500 text-white w-full py-2 rounded mt-4">
                                0933956 ***
                            </button>
                            <button className="bg-gray-200 text-gray-700 w-full py-2 rounded mt-2">
                                Gửi mail
                            </button>
                        </div>

                        {/* Property Types Filter */}
                        <div className="bg-white shadow rounded-lg p-4 mt-4">
                            <h2 className="text-xl font-bold">Loại bất động sản</h2>
                            <ul className="mt-4 space-y-2">
                                {propertyTypes.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={`text-gray-700 cursor-pointer ${propertyTypeFilter === item ? 'font-bold text-blue-500' : ''}`}
                                        onClick={() => setPropertyTypeFilter(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Areas Filter */}
                        <div className="bg-white shadow rounded-lg p-4 mt-6">
                            <h2 className="text-xl font-bold">Khu vực</h2>
                            <ul className="mt-4 space-y-2">
                                {areas.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={`text-gray-700 cursor-pointer ${areaFilter === item ? 'font-bold text-blue-500' : ''}`}
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

export default RoomDetail;