import React, { useState } from 'react';
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { splitString } from "../../utils/functionCommon";
import "../../css/animation.css"; // Import file CSS để thêm hiệu ứng

function ContentHome() {
    const [favorites, setFavorites] = useState({});
    const [page, setPage] = useState(0);
    const itemsPerPage = 4;

    const listingsContent = [
        { id: 1, title: "Chính chủ cho Hộ Gia đình thuê phòng 40m2 đầy đủ tiện nghi", price: "7 triệu", size: "40 m²", location: "173 Trung Kính, Yên Hoà, Cầu Giấy, Hà Nội", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/nsOzYGZI4fDYJz6g2mcKUT82ghz4tCII6j8UjDvbdLM.jpg" },
        { id: 2, title: "Chính chủ cho Hộ Gia đình thuê phòng 40m2 đầy đủ tiện nghi", price: "6.5 triệu", size: "35 m²", location: "Phường 15, Bình Thạnh, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/Pwqv1o4Wq5X-kNS8U07aJnutn38XktX6Y_4J8cIlFgQ.jpg" },
        { id: 3, title: "Chính chủ cho Hộ Gia đình thuê phòng 40m2 đầy đủ tiện nghi", price: "4.3 triệu", size: "20 m²", location: "Đường Võ Văn Kiệt, Phường 2, Quận 6, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/3tkyLi8xJsaaCiNON9r48GkXkAGR1ZIKr9HC2Z2jTY0.jpg" },
        { id: 4, title: "Phòng trọ 30m2, nội thất đầy đủ", price: "5 triệu", size: "30 m²", location: "Quận 1, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/3tkyLi8xJsaaCiNON9r48GkXkAGR1ZIKr9HC2Z2jTY0.jpg" },
        { id: 5, title: "Phòng trọ 30m2, nội thất đầy đủ", price: "5 triệu", size: "30 m²", location: "Quận 1, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/3tkyLi8xJsaaCiNON9r48GkXkAGR1ZIKr9HC2Z2jTY0.jpg" },
        { id: 6, title: "Phòng trọ 30m2, nội thất đầy đủ", price: "5 triệu", size: "30 m²", location: "Quận 1, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/3tkyLi8xJsaaCiNON9r48GkXkAGR1ZIKr9HC2Z2jTY0.jpg" },
        { id: 7, title: "Phòng trọ 30m2, nội thất đầy đủ", price: "5 triệu", size: "30 m²", location: "Quận 1, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/3tkyLi8xJsaaCiNON9r48GkXkAGR1ZIKr9HC2Z2jTY0.jpg" },
        { id: 8, title: "Phòng trọ 30m2, nội thất đầy đủ", price: "5 triệu", size: "30 m²", location: "Quận 1, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/3tkyLi8xJsaaCiNON9r48GkXkAGR1ZIKr9HC2Z2jTY0.jpg" },
        { id: 9, title: "Phòng trọ 30m2, nội thất đầy đủ", price: "5 triệu", size: "30 m²", location: "Quận 1, Hồ Chí Minh", date: "Đăng hôm nay", image: "https://storage.googleapis.com/a1aa/image/3tkyLi8xJsaaCiNON9r48GkXkAGR1ZIKr9HC2Z2jTY0.jpg" }
    ];

    const toggleFavorite = (id) => {
        setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const nextPage = () => setPage((prev) => (prev + 1) % Math.ceil(listingsContent.length / itemsPerPage));
    const prevPage = () => setPage((prev) => (prev - 1 + Math.ceil(listingsContent.length / itemsPerPage)) % Math.ceil(listingsContent.length / itemsPerPage));

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-center text-2xl font-bold mb-4">Cho Thuê Phòng Trọ</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {listingsContent.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(({ id, title, price, size, location, date, image }) => (
                    <div key={id} className="fade-in bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={image} alt={title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-medium mb-2">{splitString(title, 20)}</h3>
                            <p className="text-red-500 font-bold">{price}</p>
                            <p className="text-gray-600 text-sm">{size}</p>
                            <p className="text-gray-500 text-sm my-2">{splitString(location, 30)}</p>
                            <p className="text-gray-400 text-xs">{date}</p>
                            <div className="text-right">
                                <FaHeart className={`cursor-pointer ${favorites[id] ? "text-red-500" : "text-gray-400"}`} onClick={() => toggleFavorite(id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6 space-x-4">
                <button onClick={prevPage} className="p-2 border border-gray-300 rounded hover:bg-gray-200">
                    <FaChevronLeft />
                </button>
                <button onClick={nextPage} className="p-2 border border-gray-300 rounded hover:bg-gray-200">
                    <FaChevronRight />
                </button>
            </div>
            <div className="text-center mt-6">
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">
                    Xem thêm
                </button>
            </div>
        </div>
    );
}

export default ContentHome;
