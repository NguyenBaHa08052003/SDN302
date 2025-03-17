import React, { useEffect, useState } from "react";
import { addFavoriteLodging, getFavoriteLodging } from "../../../services/customerService/customer.service";
import axios from "axios";
import { FaHeart, FaChevronLeft, FaChevronRight, FaRegTimesCircle } from "react-icons/fa";
import Cookies from "js-cookie";
const PropertyList = () => {
    const [listFavorites, setListFavorites] = useState([]);
    const [lodgingType, setLodgingType] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Lưu từ khóa tìm kiếm
    const [currentPage, setCurrentPage] = useState(1); // Lưu trạng thái trang hiện tại
    const itemsPerPage = 4; // Số lượng item mỗi trang
    const token = Cookies.get("authToken");
    const userId = sessionStorage.getItem("UserId");

    useEffect(() => {
        const fetchData = async () => {
            const resData = await getFavoriteLodging(userId);
            const resDataType = await axios.get("http://localhost:3000/api/lodgings/lodging-types");
            if (resData) setListFavorites(resData.data);
            if (resDataType) setLodgingType(resDataType.data);
        };
        fetchData();
    }, []);

    // Lọc danh sách dựa trên searchTerm
    const filteredFavorites = listFavorites.filter((property) => {
        const lodgingName = lodgingType.find(lodgType => lodgType._id === property.type)?.name || "";
        return (
            property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lodgingName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    // Phân trang
    const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);
    const displayedFavorites = filteredFavorites.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const handleOnClick = async (idLodging) => {
        try {
            if (window.confirm("Bạn có chắc chắn muốn xóa nhà trọ này khỏi yêu thích ?")) {
                const resDataAddLodging = await addFavoriteLodging(userId, idLodging, token)
                if (resDataAddLodging) {
                    setListFavorites(listFavorites.filter(favorite => favorite._id !== idLodging));
                }
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="w-4/4">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Danh sách nhà trọ yêu thích</h1>

                {/* Ô tìm kiếm */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo loại trọ hoặc tiêu đề..."
                    className="w-full p-2 mb-4 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Hiển thị danh sách nhà trọ */}
                {displayedFavorites.map((property, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow mb-4 flex">
                        <img alt="House" className="w-1/4 rounded-lg" src={property.images[0]} />
                        <div className="ml-4 w-2/3">
                            <div className="flex items-center mb-1">
                                <span className="bg-red-500 text-white px-2 py-1 rounded">
                                    {lodgingType.find(lodgType => lodgType._id === property.type)?.name}
                                </span>
                            </div>
                            <h2 className="text-xl font-semibold">{property?.title}</h2>
                            <p className="text-red-500 font-semibold">{property?.price}</p>
                            <p className="text-red-500 font-semibold">{property?.area}</p>
                            <p className="text-gray-600">{property?.address}</p>
                            <p className="text-gray-500">{property?.description}</p>
                        </div>
                        <div className="ml-auto">
                            <button onClick={() => handleOnClick(property._id)} className="text-red-500">
                                <FaRegTimesCircle />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Phân trang */}
                <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyList;
